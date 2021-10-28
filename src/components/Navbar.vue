<template>
  <vs-navbar fixed>
    <template #left>
      <router-link to="/">
        <img src="@/assets/logo.png" alt="logo" width="35px" height="35px"/>
      </router-link>
    </template>
    <template #right>
      <vs-button flat to="/cart">Корзина {{ cartCount }}</vs-button>
    </template>
  </vs-navbar>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {mapGetters} from "vuex";

@Component({
  computed: {
    ...mapGetters('cartData', ['cartCount'])
  }
})
export default class Navbar extends Vue {
}
</script>

<style scoped>

</style>
