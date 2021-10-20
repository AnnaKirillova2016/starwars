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
      <a-shortView class="mCard">
        <view-card
          :Active = "Active"
          :mobile ='true'
          :item = "item"/>
      </a-shortView>
    </a-col>

    <a-col>
      <a-paginator v-if="pages > 0">
        <div v-for="index in pages"
             :key="index"
             style="display: inline-block; margin-bottom: 20px">
          <a-pnum v-if="currentPage==index" style="color: #FFFFFF; background-color: #13B4E7">
            {{ index }}
          </a-pnum>
          <a-pnum v-else
                  v-on:click="chPage(index)">
            {{ index }}
          </a-pnum>
        </div>
      </a-paginator>
    </a-col>
  </a-content>
</template>

<script>
import mobileMenu from "../components/mobileMenu.vue"
import {mapActions, mapState} from "vuex"
import viewCard from "../components/viewCard.vue"

export default {
  name: "indexMobile",
  components: {
    mobileMenu, viewCard
  },
  computed:{
    ...mapState(["originList"]),
  },
  data() {
    return {
      Active: 'films',
      openMenu: false ,
      arrData:[],
      pages: 0,
      currentPage: 0,
      sText: ''
    }
  },
  methods: {
    ...mapActions(['getFromApi']),
    async getArrayData(link){
      let req = {url: link, single: false}
      await this.getFromApi(req)
      this.arrData = this.originList
      this.pagesCalc()
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
        if(result['sText']){
         this.sText = result.sText
         this.arrData = result.arrData
        }else {
          this.arrData = result
        }
      }
    },
    resChTAb(ntab){
      this.Active=ntab
      this.openMenu = false
      this.getArrayData(this.Active)
    },
    pagesCalc() {
      this.pages = parseInt(this.arrData.count) < 11 ? 0 : Math.ceil(parseInt(this.arrData.count) / 10)
      //console.log(this.pages)
    },
    chPage(index) {
      let link = this.sText != '' ? '/?search=' + this.sText + '&page=' + index : '/?page=' + index
      this.getArrayData(this.Active + link)
      this.currentPage = index
    },
  },
  mounted() {
    this.getArrayData(this.Active)
  }
}
</script>

<style scoped>

</style>