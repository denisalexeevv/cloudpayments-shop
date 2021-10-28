<template>
  <vs-dialog v-model="dialog">
    <template #header>
      <h4>Оплата</h4>
    </template>
    <form class="form" id="paymentForm" autocomplete="off" @submit.prevent="pay">
      <input type="number" placeholder="Номер карты" v-model="cardNumber" data-cp="cardNumber">
      <div class="warning" v-if="cardNumberInvalid">Номер карты введен неверно.</div>
      <div class="row">
        <input type="number" placeholder="Месяц" min="01" max="12" data-cp="expDateMonth">
        <input type="number" placeholder="Год" min="21" max="99" data-cp="expDateYear">
        <input type="number" placeholder="CVV" min="111" max="999" data-cp="cvv">
      </div>
      <input type="text" v-model="cardholder" placeholder="Имя и фамилия держателя карты" style="text-transform: uppercase"/>
      <div class="warning" v-if="cardholderInvalid">Имя и фамилия держателя введены неверно.</div>
      <div class="bottom">
        <vs-button type="submit">Оплатить {{ sum }} ₽</vs-button>
      </div>
    </form>
  </vs-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {mapMutations, mapState} from "vuex";

declare const cp: any;

@Component({
  props: ['value'],
  computed: {
    ...mapState('cartData', ['cart']),
    ...mapState('catalogData', ['catalog'])
  },
  methods: {
    ...mapMutations('cartData', ['clearCart'])
  }
})
export default class PaymentDialog extends Vue {
  cardNumber = ''
  cardholder = ''

  pay() {
    const checkout = new cp.Checkout('test_api_00000000000000000000001', document.getElementById('paymentForm'))
    const result = checkout.createCryptogramPacket();
    if(result.success) {
      alert(result.packet);
      this.clearCart();
      this.dialog = false;
    }
    else {
      alert('error, see console')
      console.log('cp error ', result.messages)
    }
  }

  get dialog() {
    return this.value;
  }
  set dialog(v) {
    this.$emit('input', v);
  }

  get cardNumberInvalid() {
    return this.cardNumber !== '' && (this.cardNumber.toString().length < 16 || this.cardNumber.toString().length > 19);
  }
  get cardholderInvalid() {
    return this.cardholder && this.cardholder.split(' ').length != 2;
  }

  get sum() {
    if(this.cart.length === 0) return 0;
    let s = 0;
    this.cart.forEach(x => {
      s += x.quantity * this.catalog.find(x => x.id === x.id).price;
    })
    return s;
  }
}
</script>

<style scoped>
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  input {
    border: 2px solid transparent;
    background: rgba(var(--vs-gray-2), 1);
    color: rgba(var(--vs-text), 1);
    -webkit-transition: all 0.25s ease;
    transition: all 0.25s ease;
    padding: 7px 13px 7px 10px;
    width: 350px;
    border-radius: 12px;
  }
  .row > input { width: 95px; }
  .warning {
    font-size: 0.7rem;
    position: relative;
    overflow: hidden;
    padding: 2px 7px 0;
    color: red;
  }
  .bottom {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
</style>
<style>
  .form > * {
    width: 100%;
    margin-bottom: 10px;
  }
  .form:nth-child(1) {
    margin-top: 15px;
  }
</style>
