<template>
  <div class="cart">
    <vs-table>
      <template #thead>
        <vs-tr>
          <vs-th>
            Товар
          </vs-th>
          <vs-th>
            Количество
          </vs-th>
          <vs-th>
            Стоимость
          </vs-th>
          <vs-th>
            Действия
          </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr v-for="p in cart" :key="p.id" :set="t = getCatalogItemById(p.id)">
          <vs-td>{{ t.title }}</vs-td>
          <vs-td>{{ p.quantity }}</vs-td>
          <vs-td>{{ p.quantity * t.price }}</vs-td>
          <vs-td style="display: flex; flex-direction: row; justify-content: center;">
            <vs-button danger icon @click="removeItemFromCart(p.id)" title="Убрать 1"><i class='bx bx-minus-circle'></i></vs-button>
            <vs-button danger icon @click="removeItemFromCart(p.id, 999)" title="Удалить"><i class='bx bx-x-circle' ></i></vs-button>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
    <div class="right">
      <vs-button @click="dialog = true" :disabled="cart.length === 0">Оплатить</vs-button>
    </div>
    <PaymentDialog v-model="dialog"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {mapGetters, mapMutations, mapState} from "vuex";
import PaymentDialog from '@/components/PaymentDialog.vue'
import CartDataEntity from "@/interfaces/CartDataEntity";
import PizzaDataEntity from "@/interfaces/PizzaDataEntity";

@Component({
  components: { PaymentDialog },
  computed: {
    ...mapState('cartData', ['cart']),
    ...mapState('catalogData', ['catalog']),
    ...mapGetters('catalogData', ['getCatalogItemById'])
  },
  methods: {
    ...mapMutations('cartData', ['removeItemFromCart'])
  }
})
export default class Cart extends Vue {
  cart!: CartDataEntity[];
  catalog!: PizzaDataEntity[];
  getCatalogItemById!: PizzaDataEntity;

  dialog = false
}
</script>

<style scoped>
  .cart {
    padding: 5% 20%;
  }
  .right {
    width: 100%;
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
</style>
