import { createStore } from 'vuex';

export default createStore({
  state: {
    loading: false,
    loadingCards: false,
    sets: [],
    cards: [],
  },
  getters: {
    setsByRelease(state) {
      return state.sets.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    },
    setsById(state) {
      return new Map(state.sets.map((set) => [set.id, set]));
    },
    cardsByRarity(state) {
      return state
        .cards
        .reduce((byId, card) => {
          if (!byId.has(card.rarity)) {
            byId.set(card.rarity, []);
          }
          byId.set(card.rarity, card);
          return byId;
        }, new Map());
    },
  },
  actions: {
    async getCards({ state }, setId) {
      state.loadingCards = true;
      const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${setId}`);
      const json = await response.json();
      state.cards = json.data;
      state.loadingCards = false;
      console.log(json.data);
    },
    async getSets({ state }) {
      state.loading = true;
      const response = await fetch('https://api.pokemontcg.io/v2/sets');
      const json = await response.json();
      state.sets = json.data;
      state.loading = false;
    },
  },
  modules: {
  },
});
