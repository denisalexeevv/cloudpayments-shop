import Vue from 'vue'
import Vuex from 'vuex'

import catalogData from "@/store/modules/catalogData";
import cartData from '@/store/modules/cartData';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { catalogData, cartData }
})
