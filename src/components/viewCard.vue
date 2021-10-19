<template>
  <div class="modal-header">
    <div v-if="Active=='films'">
      <h1 class="viewCard" style="margin-top: 30px;"> Star wars </h1>
      <h1 class="viewCard"> Episode {{item.episode_id}} </h1>
      <h1 class="viewCard"> {{item.title}} </h1>
    </div>
    <div v-else>
      <h1 class="viewCard" style="margin-top: 100px;"> {{item.name}} </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "viewCard",
  props:[
    'Active',
    'item'
  ],

}
</script>

<style scoped>

</style>