<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <tabs></tabs>
  </div>
</template>

<script>
import Tabs from './common/Tabs.vue'
export default {
	components: {
		[Tabs.name]: Tabs
  },
  created(){
    this.$store.dispatch('location/initLoaction');
  }
}

</script>

<style>


</style>
