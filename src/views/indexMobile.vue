<template>
  <a-navBarDesk class="mnavbar">
    <a-imageIcon class="micon"/>
    <a-siteNameTextD class="mName">Star Wars Enciclopedia</a-siteNameTextD>
    <a-bar>
      <div class="mMenu">
        <a-barline/>
        <a-barline/>
        <a-barline/>
      </div>
    </a-bar>
  </a-navBarDesk>
  <mobile-menu></mobile-menu>
  <a-divider style="height: 95px"/>
  <a-content>
   <a-shortView class="mCard">text</a-shortView>
  </a-content>
</template>

<script>
import mobileMenu from "../components/mobileMenu.vue"

export default {
  name: "indexMobile",
  components: {
    mobileMenu
  },
}
</script>

<style scoped>

</style>