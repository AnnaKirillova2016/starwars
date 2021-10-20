<template>
  <a-navBarDesk class="mnavbar">
    <a-imageIcon class="micon"/>
    <a-siteNameTextD class="mName">Star Wars Enciclopedia</a-siteNameTextD>
    <a-bar>
      <div class="mMenu" @click="openMenu=!openMenu">
        <a-barline/>
        <a-barline/>
        <a-barline/>
      </div>
    </a-bar>
  </a-navBarDesk>
  <mobile-menu  v-if="openMenu"
    :active="Active"
    :arr-data="arrData"
    @result="resUpd"
    @ntab="resChTAb"
  ></mobile-menu>
  <a-divider style="height: 105px"/>
  <a-content>
    <a-col class="mCol" v-for="(item, index) in arrData.results"
           v-bind:key="index">
      <a-shortView v-if="Active=='films'" class="mCard">{{item.title}}</a-shortView>
      <a-shortView v-else class="mCard">{{item.name}}</a-shortView>
    </a-col>
  </a-content>
</template>

<script>
import mobileMenu from "../components/mobileMenu.vue"
import {mapActions, mapState} from "vuex"

export default {
  name: "indexMobile",
  components: {
    mobileMenu
  },
  computed:{
    ...mapState(["originList"]),
  },
  data() {
    return {
      Active: 'films',
      openMenu: false ,
      arrData:[],
    }
  },
  methods: {
    ...mapActions(['getFromApi']),
    async getArrayData(link){
      let req = {url: link, single: false}
      await this.getFromApi(req)
      this.arrData = this.originList
      //console.log(this.arrData)
    },
    resUpd(result){
      if (result == null) {
        this.arrData = this.originList
        this.$moshaToast('Nothing found!',
            {
              timeout: 2500,
              position: 'bottom-right',
              showIcon: 'true',
              hideProgressBar: 'true',
              type: 'warning',
              transition: 'zoom',
              swipeClose: 'true',
            })
      } else {
        this.arrData = result
      }
    },
    resChTAb(ntab){
      this.Active=ntab
      this.openMenu = false
      this.getArrayData(this.Active)
    }
  },
  mounted() {
    this.getArrayData(this.Active)
  }
}
</script>

<style scoped>

</style>