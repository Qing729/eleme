<template>
<div>
	<!--首页面 -->
	<page pageId="home" ref='page' :canLoadMore="true" @load-more-action="handleLoadMore" @page-scroll="handlePageScroll">
		<home-header></home-header>
		<home-banner></home-banner>
		<div class="newuser">
        	<img src="https://fuss10.elemecdn.com/3/c8/45b2ec2855ed55d90c45bf9b07abbpng.png?imageMogr/format/webp/thumbnail/!710x178r/gravity/Center/crop/710x178/"/>
    	</div>
		<home-list ref='list' @list-change='handleListChange'></home-list>
	</page>
	<!--上拉时显示搜索框-->
	<search-bar v-show="showSearchBar" :isActive="showSearchBar"></search-bar>
	<!--装载子页面-->
	<transition enter-active-class="slideInRight ani" leave-active-class="slideOutRight ani">
	<router-view></router-view>
	</transition>
</div>
</template>

<script>
	import Page from '../../common/Page.vue'
	import Header from '../../components/home/index/Header.vue'
	import Search from '../../components/home/index/Search.vue'
	import Banner from '../../components/home/index/Banner.vue'
	import List from '../../components/home/index/List.vue'
	export default {
		components:{
			[Page.name]: Page,
			[Header.name]: Header,
			[Search.name]: Search,
			[Banner.name]: Banner,
			[List.name]: List,
		},
		data(){
			return {
				showSearchBar: false
			}
		},
		methods: {
			handleListChange(){
				//刷新页面
				this.$refs.page.pageRefresh();
			},
			handleLoadMore(){
				//让list请求下一页数据
				this.$refs.list.requestData(()=>{
					// 请求完成，执行停止加载更多的动画
					this.$refs.page.endLoadMoreAni();
				});
				// 如果请求完成，就刷新滚动视图
			},
			//根据页面滚动的位置，控制是否展示search-bar
			handlePageScroll(y){
				// console.log('y:'+y);
				if(y<-42){
					this.showSearchBar = true;
				}else{
					this.showSearchBar = false;
				}
			}
		},
		beforeDestroy(){
			console.log('销毁前home');
		}
	}
</script>

<style>
	#home{
		background: #f5f5f5;
	}
	.ani{
		animation-duration: 200ms;
		animation-timing-function: ease-in;
	}
	.newuser{
		width: 100%;
		box-sizing: border-box;
		padding: 0 0.05rem 0.1rem;
		background: #ffffff
	}
	.newuser img{
		width: 100%;
	}
</style>