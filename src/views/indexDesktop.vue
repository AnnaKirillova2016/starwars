<template>
  <a-navbardesk>

    <a-imageicon/>
    <a-siteNameTextD>Star wars Enciclopedia</a-siteNameTextD>
    <a-navsearch>
      <input v-model="sText"/>
      <a-searchbtn v-on:click="search()" >
        <div style="height: 4px"/>
        Search
    </a-searchbtn>
    </a-navsearch>


    <a-bookmark v-if='Active == "films"'
              :style=bFilms>
      Films
    </a-bookmark>
    <a-bookmark v-else
              v-on:click='changeTab("films")'
              :style=bFilms>
      Films
    </a-bookmark>

    <a-bookmark v-if='Active == "people"'
              :style=bPeople>
      People
    </a-bookmark>
    <a-bookmark v-else
              v-on:click='changeTab("people")'
              :style=bPeople>
      People
    </a-bookmark>

    <a-bookmark v-if='Active == "starships"'
              :style=bShips>
      Starships
    </a-bookmark>
    <a-bookmark v-else
              v-on:click='changeTab("starships")'
              :style=bShips>
      Starships
    </a-bookmark>

  </a-navbardesk>

  <a-divider/>

  <a-pnum v-if ="sideBarOpen == false"
          class="sidebarBtn"
          v-on:click="sideBarOpen = !sideBarOpen"
  ><font-awesome-icon icon="filter" /></a-pnum>
  <a-pnum v-else
          class="sidebarBtn push"
          v-on:click="sideBarOpen = !sideBarOpen"
  ><font-awesome-icon icon="filter" /></a-pnum>
  <sideBar :open="sideBarOpen"
           :Active="Active"
           :arrData="checkFill"
           @filtered="updArrData"/>

  <a-content>
    <a-col v-for="(item, index) in renderArray"
       v-bind:key="index">

      <a-shortView v-for="j in item"
                   v-bind:key="j"
                   v-on:click="popupW(arrData.results[j].url)">
        <p v-if="Active=='films'"><span >{{arrData.results[j].title}}</span></p>
        <p v-else> <span>{{arrData.results[j].name}}</span></p>
          <p v-if="Active=='people'" ></p>


      </a-shortView>


  </a-col>
    <a-paginator v-if="pages > 0">
      <div v-for="index in pages"
           :key="index"
      style="display: inline-block;">
        <a-pnum v-if="currentPage==index" style="color: #FFFFFF; background-color: #13B4E7">
          {{ index }}
        </a-pnum>
        <a-pnum v-else
                v-on:click="chPage(index)">
          {{ index }}
        </a-pnum>
      </div>
    </a-paginator>
    <div style="width: 100%; text-align: center">
    <a-pnum v-if="sText!=''"
            style="width: 100px"
            v-on:click="abroatSearch()">Abroat search</a-pnum>
    </div>
  </a-content>
  <a-divider style="height: 50px"/>

  <film v-if="Active=='films' && showItem==true"
      :showItem = showItem
      :item="currItem"
      @closeW="itemClose"/>

  <people v-if="Active=='people' && showItem==true"
        :showItem = showItem
        :item="currItem"
        @closeW="itemClose"/>

  <starship v-if="Active=='starships' && showItem==true"
        :showItem = showItem
        :item="currItem"
        @closeW="itemClose"/>

  <footer><span style="margin-right: 20px">disigned for swapi.dev</span></footer>


</template>

<script>
import {mapActions, mapState} from "vuex"
import sideBar from "../components/sidebar.vue"
import film from "../components/film.vue"
import people from '../components/people.vue'
import starship from "../components/starship.vue"

export default {
  name: "index",
  components: {sideBar, film, people, starship},
  data() {
    return {
      Active: 'films',
      bFilms: 'border-bottom: 32px solid #FFFFFF; color: #13B4E7; z-index: 101',
      bPeople: 'border-bottom: 32px solid #0CA4D5; color: #FFFFFF; left: 263px; z-index: 100',
      bShips: 'border-bottom: 32px solid #0CA4D5; color: #FFFFFF; left: 526px; z-index: 100',
      arrData: [],
      renderArray: [],
      pages: 0,
      currentPage: 0,
      sText: '',
      sideBarOpen: false,
      maxValue: 0,
      minValue: 0,
      showItem: false,
      currItem: '',
    }
  },
  computed: {
    ...mapState(["originList"]),
    checkFill() {
      return this.arrData.length > 0 ? this.arrData : this.originList
    },
  },
  methods: {
    ...mapActions(['getFromApi']),
    itemClose(close) {
      this.showItem = close
      this.currItem = ''
    },
    popupW(url) {
      this.currItem = this.getItem(url.replace('https://swapi.dev/api/',''))
      this.showItem = !this.showItem
    },
    changeTab(tab) {
      if (tab == 'films') {
        this.bFilms = 'border-bottom: 32px solid #FFFFFF; color: #13B4E7; z-index: 101'
        this.bPeople = 'border-bottom: 32px solid #0CA4D5; color: #FFFFFF; left: 263px; z-index: 100'
        this.bShips = 'border-bottom: 32px solid #0CA4D5; color: #FFFFFF; left: 526px; z-index: 100'
        this.Active = 'films'
      } else if (tab == 'people') {
        this.bFilms = 'border-bottom: 32px solid #0CA4D5; color: #FFFFFF; z-index: 100'
        this.bPeople = 'border-bottom: 32px solid #FFFFFF; color: #13B4E7; left: 263px; z-index: 101'
        this.bShips = 'border-bottom: 32px solid #0CA4D5; color: #FFFFFF; left: 526px; z-index: 100'
        this.Active = 'people'
      } else {
        this.bFilms = 'border-bottom: 32px solid #0CA4D5; color: #FFFFFF; z-index: 100'
        this.bPeople = 'border-bottom: 32px solid #0CA4D5; color: #FFFFFF; left: 263px; z-index: 100'
        this.bShips = 'border-bottom: 32px solid #FFFFFF; color: #13B4E7; left: 526px; z-index: 101'
        this.Active = 'starships'
      }
      this.getArrayData(this.Active)
      this.currentPage = 1
      this.sText = ''
    },
    async getArrayData(link) {
      let req = {url: link, single: false}
      await this.getFromApi(req)
      this.arrData = this.originList
      this.renderViewData()
      this.pagesCalc()
      console.log(this.arrData)
    },
    renderViewData() {
      let count = this.arrData.results.length < 11 ? this.arrData.results.length : 10
      this.renderArray = []
      for (let i = 0; i < count; i++) {
        if (count % 2 > 0 && i == count - 1) {
          this.renderArray.push([i])
          break
        } else {
          this.renderArray.push([i, i += 1])
        }
      }
      console.log(this.renderArray)
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
    search() {
      if (this.sText != '') {
        this.getArrayData(this.Active + '/?search=' + this.sText)
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
    abroatSearch() {
      this.sText = ''
      this.getArrayData(this.Active)
    },
    updArrData(res) {
      if (res == null) {
        this.arrData = this.originList
      } else {
        this.arrData = res
      }
      this.renderViewData()
      this.pagesCalc()
      console.log(this.arrData)

    },
    async getItem(link) {
      let req = {url: link, single: true}
      let result = await this.getFromApi(req)
      this.currItem = result
    },
  },
  mounted() {
    this.getArrayData(this.Active)
  }

}
</script>

<style scoped>

</style>