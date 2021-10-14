<template>
  <transition name="show">
    <div class="sidebar"  v-if="open">
      <div v-if="Active=='people'">
        <div style="margin-top: 30px">
          <span class="fstylew">Male:</span> <input v-model="filterA" v-on:change="useFilterA"/> <br/>
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
        producer: <input v-model="filterA" v-on:change="useFilterA"/>
        release: <input type="date" v-model="filterB" v-on:change="useFilterB"/>
<!--        <div v-if="Active=='films'" class="container">
          <div class="slider-track"/>
          <input  type="range" :min="minP" :max="maxF" v-model.number="minF" v-on:change="useFilterB"/>
          <input  type="range" :min="minP" :max="maxF" v-model.number="maxF" v-on:change="useFilterB"/>
        </div>-->
      </div>

      <div v-if="Active=='starships'">
        class: <input v-model="filterA" v-on:change="useFilterA"/>
        manufacturer: <input v-model="filterB" v-on:change="useFilterB"/>
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
      maxF: 2021
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

      if(this.filterA == ''){
        this.$emit('filtered',null)
        return
      }

      res.results = this.arrData.results.filter(function(item){
          if(this.Active == 'films'){
            return item['producer'].toLowerCase().indexOf(this.filterA.toLowerCase()) > -1
          }else if (this.Active == 'people'){
            return item['mass'].indexOf(this.filterA) > -1
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
          return item['release_date'].indexOf(this.filterB) > -1
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