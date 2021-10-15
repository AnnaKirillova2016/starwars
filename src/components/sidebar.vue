<template>
  <transition name="show">
    <div class="sidebar"  v-if="open">
      <div v-if="Active=='people'">
        <div style="margin-top: 30px">
          <span class="fstylew">Male:</span>
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
          <div class="fstylew">Height: <span>{{minP}}</span> <span>&dash;</span> <span>{{ maxP }}</span></div>
          <div v-if="Active=='people'" class="container">
            <div class="slider-track"/>
             <input  type="range" min="0" max="202" v-model.number="minP" v-on:change="useFilterB"/>
             <input  type="range" min="0" max="202" v-model.number="maxP" v-on:change="useFilterB"/>
          </div>
        </div>
      </div>
      <div v-if="Active=='films'">
        <div style="margin-top: 30px">
          <span class="fstylew" style="margin-right: 5px">Producer:</span><input v-model="filterA" v-on:change="useFilterA"/>
          <br/>
          <div style="height: 20px; width: 100%; "/>
          <div class="fstylew">Release year: <span>{{minF}}</span> <span>&dash;</span> <span>{{ maxF }}</span></div>
          <div v-if="Active=='films'" class="container">
            <div class="slider-track"/>
            <input  type="range" min="1970" :max="2021" v-model.number="minF" v-on:change="useFilterB"/>
            <input  type="range" min="1970" :max="2021" v-model.number="maxF" v-on:change="useFilterB"/>
          </div>
        </div>
      </div>
      <div v-if="Active=='starships'">
        <div style="margin-top: 30px">
          <div style="height: 20px; width: 100%; "/>
          <span class="fstylew" style="margin-right: 5px">Starship class:</span> <input style="width: 250px" v-model="filterA" v-on:change="useFilterA"/>
          <div style="height: 20px; width: 100%; "/>
          <span class="fstylew" style="margin-right: 10px">Manufacturer:</span> <input style="width: 250px" v-model="filterB" v-on:change="useFilterB"/>
        </div>
      </div>

    </div>
  </transition>
</template>

<script>
export default {
  name: "sidebar",
  props: [
    'open',
    'arrData',
    'Active',
  ],
  data(){
    return {
      filterA: '',
      filterB: '',
      minP: 0,
      maxP: 202,
      minF: 1970,
      maxF: 2021,
      male: 'male',
      female: 'female',
      na: 'n/a',
    }
  },
  methods:{
    resArray(){
      return {
        count: 0,
        next: null,
        previous: null,
        results:[]
      }
    },
    useFilterA(){

      let res = this.resArray()

      if(this.filterA == '' && !this.male == '' && !this.female == '' && !this.na == ''){
        this.$emit('filtered',null)
        return
      }

      res.results = this.arrData.results.filter(function(item){
          if(this.Active == 'films'){
            return item['producer'].toLowerCase().indexOf(this.filterA.toLowerCase()) > -1
          }else if (this.Active == 'people'){
            return item['gender'] == this.male || item['gender'] == this.female || item['gender'] == this.na
          }else if (this.Active == 'starships'){
            return item['starship_class'].toLowerCase().indexOf(this.filterA.toLowerCase()) > -1
          }
      },this)
      this.$emit('filtered',res)
    } ,
    useFilterB(){
      let res = this.resArray()

      if(this.filterB == '' && this.minP == '' && this.maxP == ''){
        this.$emit('filtered',null)
        return
      }

      res.results = this.arrData.results.filter(function(item){
        if(this.Active == 'films'){
          //return item['release_date'].indexOf(this.filterB) > -1
          return  this.minF <= parseInt(item['release_date'].substr(0,4)) && parseInt(item['release_date'].substr(0,4)) <= this.maxF
        }else if (this.Active == 'people'){
          return  this.minP <= parseInt(item['height']) && parseInt(item['height']) <= this.maxP
        }else if (this.Active == 'starships'){
          return item['manufacturer'].toLowerCase().indexOf(this.filterB.toLowerCase()) > -1
        }
      },this)
      this.$emit('filtered',res)
    },
    clear(nFilter = ''){
      if(this.filterA == '' && this.filterB == '')
        this.$emit('filtered',null)
      else if(this.filterA == '' || nFilter == 1){
        this.useFilterB()
      }else if((this.filterB == '' || nFilter == 2)){
        this.useFilterB()
      }
    }
  }
}
</script>

<style scoped>

</style>