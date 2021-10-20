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
      <a-searchbtn style="position: relative; width: 50px; min-width: 20px; color: #13B4E7" @click="openFilter = !openFilter"><font-awesome-icon icon="filter" style="padding-top: 6px;"/></a-searchbtn>
    </a-navsearch>

    <div v-if="openFilter" style="position: relative">
      <div v-if="active=='people'">
        <div style="margin-top: 70px">
          <span class="fstylew" style="margin-left: 3%">Male:</span>
          <span style="display: inline-block">
            <input type="checkbox" v-model="male"
                   v-on:change="useFilterA"
                   v-bind:true-value="'male'"
                   v-bind:false-value="''"/><span class="chb-color">Male</span>
            <input type="checkbox" v-model="female"
                   v-on:change="useFilterA"
                   v-bind:true-value="'female'"
                   v-bind:false-value="''"/><span class="chb-color">Female</span>
            <input type="checkbox" v-model="na"
                   v-on:change="useFilterA"
                   v-bind:true-value="'n/a'"
                   v-bind:false-value="''"/><span class="chb-color">N/A</span>
          </span>
          <br/>
          <div style="height: 20px; width: 100%; "/>
          <div style="display: inline-flex; width: 97%;">
           <div class="fstylew" style="margin-left: 3%">Height: <span>{{minP}}</span> <span>&dash;</span> <span>{{ maxP }}</span></div>
          </div>
          <div v-if="active=='people'">
            <div class="slider-track slider-track-m"/>
            <input  type="range" min="0" max="202" v-model.number="minP" v-on:change="useFilterB"
                    style="margin-top: 74px; right: 3%; width: 74%"/>
            <input  type="range" min="0" max="202" v-model.number="maxP" v-on:change="useFilterB"
                    style="margin-top: 74px; right: 3%; width: 74%"/>
          </div>
        </div>
      </div>
      <div v-if="active=='films'">
        <div style="margin-top: 70px">
          <div style="display: inline-flex; width: 97%;">
            <span class="fstylew" style="margin-right: 5px; margin-top: 8px; margin-left: 3%">Producer:</span><input v-model="filterA" v-on:change="useFilterA" style="width: 100%"/>
          </div>
          <br/>
          <div style="height: 20px; width: 100%; "/>
          <div class="fstylew" style="margin-left: 3%">Release year: <span>{{minF}}</span> <span>&dash;</span> <span>{{ maxF }}</span></div>
          <div v-if="active=='films'">
            <div class="slider-track slider-track-m"/>
            <input type="range" min="1970" :max="2021" v-model.number="minF" v-on:change="useFilterB"
                   style="margin-top: 83px; right: 3%; width: 74%"/>
            <input type="range" min="1970" :max="2021" v-model.number="maxF" v-on:change="useFilterB"
                   style="margin-top: 83px; right: 3%; width: 74%"/>
          </div>
        </div>
      </div>
      <div v-if="active=='starships'">
        <div style="margin-top: 70px">
          <div style="height: 20px; width: 100%; "/>
          <div style="display: inline-flex; width: 97%">
            <span class="fstylew" style="margin-right: 5px; margin-left: 3%">Starship class:</span> <input style="width: 100%" v-model="filterA" v-on:change="useFilterA"/>
          </div>
          <div style="height: 20px; width: 100%; "/>
          <div style="display: inline-flex; width: 97%">
            <span class="fstylew" style="margin-right: 10px; margin-left: 3%; margin-top: 8px">Manufacturer:</span> <input style="width: 100%" v-model="filterB" v-on:change="useFilterB"/>
          </div>
        </div>
      </div>
    </div>
  </a-bodyMenu>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: "mobileMenu",
  props:[
      'active',
      'arrData'
  ],
  data(){
    return{
      search:'',
      filterA: '',
      filterB: '',
      openFilter: false,
      minP: 0,
      maxP: 202,
      minF: 1970,
      maxF: 2021,
      male: 'male',
      female: 'female',
      na: 'n/a',
    }
  },
  computed:{
    ...mapState(['originList'])
  },
  methods:{
    ...mapActions(['getFromApi']),
    find(){
      if (this.search != '') {
        this.getArrayData(this.active + '/?search=' + this.search, true)
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
    async getArrayData(link, find = false) {
      let arrData =[]
      let req = {url: link, single: false}
      await this.getFromApi(req)
      arrData = this.originList
      if(!find) {
        this.$emit('result', arrData)
      }else{
        this.$emit('result', {'sText':this.search,'arrData':arrData})
      }
      //console.log(this.arrData)
    },
    isActive(tab){
      this.$emit('ntab',tab)
    },
    useFilterA(){

      let res = this.resArray()

      if(this.filterA == '' && !this.male == '' && !this.female == '' && !this.na == ''){
        this.$emit('result',null)
        return
      }

      res.results = this.arrData.results.filter(function(item){
        if(this.active == 'films'){
          return item['producer'].toLowerCase().indexOf(this.filterA.toLowerCase()) > -1
        }else if (this.active == 'people'){
          return item['gender'] == this.male || item['gender'] == this.female || item['gender'] == this.na
        }else if (this.active == 'starships'){
          return item['starship_class'].toLowerCase().indexOf(this.filterA.toLowerCase()) > -1
        }
      },this)
      this.$emit('result',res)
    } ,
    useFilterB(){
      let res = this.resArray()

      if(this.filterB == '' && this.minP == '' && this.maxP == ''){
        this.$emit('result',null)
        return
      }

      res.results = this.arrData.results.filter(function(item){
        if(this.active == 'films'){
          //return item['release_date'].indexOf(this.filterB) > -1
          return  this.minF <= parseInt(item['release_date'].substr(0,4)) && parseInt(item['release_date'].substr(0,4)) <= this.maxF
        }else if (this.active == 'people'){
          return  this.minP <= parseInt(item['height']) && parseInt(item['height']) <= this.maxP
        }else if (this.active == 'starships'){
          return item['manufacturer'].toLowerCase().indexOf(this.filterB.toLowerCase()) > -1
        }
      },this)
      this.$emit('result',res)
    },
    clear(nFilter = ''){
      if(this.filterA == '' && this.filterB == '')
        this.$emit('result',null)
      else if(this.filterA == '' || nFilter == 1){
        this.useFilterB()
      }else if((this.filterB == '' || nFilter == 2)){
        this.useFilterB()
      }
    },
    resArray() {
      return {
        count: 0,
        next: null,
        previous: null,
        results: []
      }
    }
  }
}
</script>

<style scoped>

</style>