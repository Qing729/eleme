<template>
	<nav class="tabs one-top-px">
		<router-link class='tab' v-for='(tabItem, index) in tabsData' :key='index' :to='tabItem.path'>
			<i class="iconfont" :class="tabItem.class"></i>
			{{tabItem.title}}
		</router-link>
	</nav>
</template>

<script>
	export default{
		name: 'tabs', 
		data(){
			return{
				tabsData: [
					{title: '首页', path: '/home', class:'icon-home'},
					{title: '发现', path: '/discover', class:'icon-discover'},
					{title: '订单', path: '/order', class:'icon-order'},
					{title: '我的', path: '/mine', class:'icon-mine'},
				]
			}
		}
	}
</script>

<style scoped>
.tabs{
	width: 100%;
	height: 49px;
	position: absolute;
	left: 0;
	bottom: 0;
	background: #fff;
	display: flex;
}
.tab{
	flex: 1;
	color: #8e8e93;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
/*.tabs:before{
	content: '';
    display: block;
    position: absolute;
    top: -1px;
    left: 0;
    height: 1px;
    width: 100%;
    border-top: 1px solid #999;
    transform: scaleY(0.5);
    z-index: 1;
}*/
.tab.router-link-active{
	color: #0089dc;
} 

</style>