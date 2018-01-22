<template>
<div>
	<header-app :title="title" @goback="handlegoback"></header-app>
	<page pageId="discover">
		
	</page>
</div>
</template>

<script>
	import Page from '../../common/Page.vue'
	import Header from '../../common/Header.vue'
	export default {
		data(){
			return{
				title: '发现'
			}
		},
		components:{
			[Page.name]: Page,
			[Header.name]: Header,
		},
		methods:{
			handlegoback(){
				this.$router.go(-1);
			}
		}
	}
</script>

<style scoped>
#discover{
	background: #f5f5f5;
	top: 0.42rem;
}
</style>