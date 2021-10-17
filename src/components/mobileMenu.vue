<template>
  <a-divider style="height: 105px"/>
  <a-bodyMenu>
    <a-divider style="height: 50px"/>
    <a-mmbtn class="mmbtn-first">films</a-mmbtn>
    <a-mmbtn>people</a-mmbtn>
    <a-mmbtn class="mmbtn-end">starships</a-mmbtn>
    <a-navsearch class="msearch">
      <input style="width: 200px" v-model="search"/>
      <a-searchbtn style="position: absolute">search</a-searchbtn>
      <a-searchbtn style="position: relative"><font-awesome-icon icon="filter" /></a-searchbtn>
    </a-navsearch>
  </a-bodyMenu>
</template>

<script>

export default {
  name: "mobileMenu",
  data(){
    return{
      search:''
    }
  }
}
</script>

<style scoped>

</style>