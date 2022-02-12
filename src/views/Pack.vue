<template>
  <div>
    <h1>Open a Pack!</h1>
    <div v-if="loading">
      <h1>Loading...</h1>
    </div>
    <div v-if="!loading && !currentSet">
      <h1>Set Id not found!</h1>
    </div>
    <div v-if="!loading && currentSet">
      <img class="set-logo" alt="Set Logo" :src="currentSet.images.logo">
    </div>
    <div class="cards">
      <div class="card" v-for="card in cardsInSet" :key="card.id">
        <img class="card-image" v-on:click="showJson($card)"  :src="card.images.small" alt="Card Image" >
        <h3>{{card.name}} - {{card.rarity}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {

  setup() {
    const route = useRoute();
    const store = useStore();
    const loading = computed(() => store.state.loading);
    const currentSet = computed(() => store
      .getters
      .setsById
      .get(route.params.setId));
    const cardsInSet = computed(() => store.state.cards);

    store.dispatch('getCards', route.params.setId);

    return {
      currentSet,
      loading,
      cardsInSet,
    };
  },
};
</script>

<style>
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
}

.card {
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 300ms ease-out;
  text-decoration: none;
  color: black;
}

.card:hover {
  transform: scale(1.2);
}

.card-image {
}
</style>
