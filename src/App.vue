<template>
  <div id="app">
    <Navbar/>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component";
import Navbar from "@/components/Navbar.vue";
import {mapActions, mapMutations, mapState} from "vuex";

@Component({
  components: {
    Navbar
  },
  methods: {
    ...mapActions('catalogData', ['loadCatalog']),
    ...mapMutations('cartData', ['syncCartItems'])
  },
  computed: {
    ...mapState('catalogData', ['catalog'])
  }
})
export default class App extends Vue {
  async mounted() {
    await this.loadCatalog();
    if(localStorage.getItem('cart')) this.syncCartItems(JSON.parse(localStorage.getItem('cart')))
    window.addEventListener('storage', e => {
      if(e.key == 'cart') this.syncCartItems(JSON.parse(e.newValue));
    })
  }
}
</script>

<style>
* {
  padding: 0; margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
