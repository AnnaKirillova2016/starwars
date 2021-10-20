<template>
  <div class="modal-header" >
    <div v-if="mobile">
      <div v-if="Active=='films'">
        <h1 class="viewCard" style="margin-top: 5px; height: 40px"> Star wars </h1>
        <h1 class="viewCard" style="height: 40px"> Episode {{item.episode_id}} </h1>
        <h1 class="viewCard" style="height: 35px"> {{item.title}} </h1>
      </div>
      <div v-else>
        <h1 class="viewCard" style="margin-top: 60px;"> {{item.name}} </h1>
      </div>
    </div>
    <div v-else class="modal-header">
      <div v-if="Active=='films'">
        <h1 class="viewCard" style="margin-top: 30px;"> Star wars </h1>
        <h1 class="viewCard"> Episode {{item.episode_id}} </h1>
        <h1 class="viewCard"> {{item.title}} </h1>
      </div>
      <div v-else>
        <h1 class="viewCard" style="margin-top: 100px;"> {{item.name}} </h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "viewCard",
  props:[
    'Active',
    'item',
    'mobile'
  ],

}
</script>

<style scoped>

</style>