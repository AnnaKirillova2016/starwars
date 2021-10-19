<template>
  <a-divider style="height: 105px"/>
  <a-bodyMenu>
    <a-divider style="height: 50px"/>
    <a-mmbtn class="mmbtn-first mmbtn-activ"
    v-if="active=='films'">films</a-mmbtn>
    <a-mmbtn class="mmbtn-first"
             v-else @click="isActive('films')">films</a-mmbtn>
    <a-mmbtn v-if="active=='people'" class="mmbtn-activ" >people</a-mmbtn>
    <a-mmbtn v-else @click="isActive('people')">people</a-mmbtn>
    <a-mmbtn v-if="active=='starships'" class="mmbtn-activ mmbtn-end">starships</a-mmbtn>
    <a-mmbtn v-else class="mmbtn-end" @click="isActive('starships')">starships</a-mmbtn>
    <a-navsearch class="msearch">
      <input style="width: 100%" v-model="search"/>
      <a-searchbtn style="position: relative; width: 90px; min-width: 30px" @click="find">
        <span style="vertical-align: sub; color: #13B4E7">
          Search
        </span>
      </a-searchbtn>
      <a-searchbtn style="position: relative; width: 50px; min-width: 20px; color: #13B4E7"><font-awesome-icon icon="filter" style="padding-top: 6px;"/></a-searchbtn>
    </a-navsearch>
  </a-bodyMenu>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: "mobileMenu",
  props:[
      'active'
  ],
  data(){
    return{
      search:''
    }
  },
  computed:{
    ...mapState(['originList'])
  },
  methods:{
    ...mapActions(['getFromApi']),
    find(){
      if (this.search != '') {
        this.getArrayData(this.active + '/?search=' + this.search)
      } else {
        this.$moshaToast('Enter text to search!',
            {
              timeout: 2500,
              position: 'bottom-right',
              showIcon: 'true',
              hideProgressBar: 'true',
              type: 'warning',
              transition: 'zoom',
              swipeClose: 'true',
            })
      }
    },
    async getArrayData(link) {
      let arrData =[]
      let req = {url: link, single: false}
      await this.getFromApi(req)
      arrData = this.originList
      this.$emit('result',arrData)
      console.log(this.arrData)
    },
    isActive(tab){
      this.$emit('ntab',tab)
    }
  }
}
</script>

<style scoped>

</style>