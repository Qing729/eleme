<template>
	<page pageId="mine">
		<h1>我的</h1>
	</page>
</template>

<script>
	import Page from '../../common/Page.vue'
	export default {
		components:{
			[Page.name]: Page,
		}
	}
</script>

<style>
	#mine{
		background: plum;
	}
</style>