<template>
<div>
	<!--首页面 -->
	<page pageId="home">
		<home-header></home-header>
		<home-banner></home-banner>
		<home-list></home-list>
	</page>
	<!--装载子页面-->
	<router-view></router-view>
</div>
</template>

<script>
	import Page from '../../common/Page.vue'
	import Header from '../../components/home/index/Header.vue'
	import Banner from '../../components/home/index/Banner.vue'
	import List from '../../components/home/index/List.vue'
	export default {
		components:{
			[Page.name]: Page,
			[Header.name]: Header,
			[Banner.name]: Banner,
			[List.name]: List,
		}
	}
</script>

<style>
	#home{
		background: #fff;
	}
</style>