import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading:{
      titulo:'',
      state: false,
      color:'primary'
    }
  },
  mutations: {
    mostrarLoading(state,payload){
      state.loading.titulo=payload.titulo
      state.loading.color=payload.color
      state.loading.state=true
    },
    ocultarLoading(state){
      state.loading.state=false
    }
  },
  actions: {
  },
  modules: {
  }
})
