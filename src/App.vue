<template>
  <div id="app">
    <router-view></router-view>
    <tabs></tabs>
  </div>
</template>

<script>
import Tabs from './common/Tabs.vue'
export default {
	components: {
		[Tabs.name]: Tabs
	}
}
</script>

<style>


</style>
