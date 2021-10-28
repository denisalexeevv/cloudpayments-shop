<template>
  <div class="catalog">
    <vs-card v-for="i in catalog" :key="i.id" class="product">
      <template #img>
        <img :src="'/static/img/products/' + i.img" :alt="i.img">
      </template>
      <template #title>
        <h3>{{ i.title }}</h3>
        {{ i.price }} ₽
      </template>
      <template #text>
        {{ i.description }}
      </template>
      <template #interactions>
        <vs-button success icon @click="addItemToCart(i.id)" title="В корзину"><i class="bx bx-plus-circle"/></vs-button>
      </template>
    </vs-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {mapMutations, mapState} from "vuex";
import PizzaDataEntity from "@/interfaces/PizzaDataEntity";

@Component({
  computed: {
    ...mapState('catalogData', ['catalog'])
  },
  methods: {
    ...mapMutations('cartData', ['addItemToCart'])
  }
})
export default class Catalog extends Vue {
  catalog!: PizzaDataEntity[];
  addItemToCart!: (id: number) => void;
}
</script>

<style scoped>
.catalog {
  padding: 5% 10%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: 10%;
}
</style>
<style>
.product .vs-card { max-width: 100%; height: 100%; }
.product .vs-card__img { max-height: 100%; }
</style>
