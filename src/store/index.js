import { createStore } from 'vuex'
import axios from "axios"
export default createStore({
  state: {
    apiUrl: 'https://swapi.dev/api/',
    originList: [],
    currItem: []
  },
  mutations: {
  },
  actions: {


    async getFromApi({state},data){
      let result = []
      await axios
          .get(state.apiUrl + data.url)
          .then(response => (result = response))

      if(data.single){
        let res = JSON.parse(JSON.stringify(result.data))
        state.currItem = res
        return res
      }
      state.originList = JSON.parse(JSON.stringify(result.data))
    }
  },
  modules: {
  }
})
