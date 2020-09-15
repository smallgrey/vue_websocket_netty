import Vue from "vue"
import Vuex from "vuex"
import user from "./store"
import webSocket from "./webSocket"

Vue.use(Vuex)


const store = new Vuex.Store({
    modules:{
        user,
        webSocket
    }
})

export default  store;