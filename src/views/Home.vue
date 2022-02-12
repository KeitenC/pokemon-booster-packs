<template>
  <div class="home">
    <form class="form">
      <input v-model="filter">
    </form>
    <div class="sets">
      <router-link class="set" v-for="set in sets" :key="set.id"
                   :to="{ name: 'Pack', params: { setId: set.id } }">
        <img class="set-logo" alt="Set Logo" :src="set.images.logo">
        <h3>{{set.name}}</h3>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const filter = ref('');
    const store = useStore();
    const sets = computed(() => {
      const regex = new RegExp(filter.value, 'i');
      return store
        .getters
        .setsByRelease
        .filter((set) => set.name.match(regex));
    });

    return {
      sets,
      filter,
    };
  },
};
</script>

<style lang="scss">
.sets {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
}

.set {
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 300ms ease-out;
  text-decoration: none;
  color: black;
}

.set:hover {
  transform: scale(1.2);
}

.set-logo {
  height: 100px;
}

.form {
  width: 90%;
  margin: auto;

  input {
    width: 100%;
    font-size: 3rem;
  }
}
</style>
