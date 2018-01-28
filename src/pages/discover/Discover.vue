<template>
<div>
	<header-app :title="title" @goback="handlegoback"></header-app>
	<page pageId="discover">
		<div class="menu">
			<ul class="clearfix">
				<li v-for="(item, index) in dicoverMenu" :key="index">
					<div>
						<h3 :style="{color:item.title_color}">{{item.title}}</h3>
						<p>{{item.subtitle}}</p>
					</div>
					<img :src="item.img">
				</li>
			</ul>
		</div>
		<div class="subbanner">
			<img src="https://fuss10.elemecdn.com/b/6d/656006edcd86033a1b32b23ddea37jpeg.jpeg?imageMogr/format/webp/">
		</div>
		<div class="foodData">
			<h3>为你推荐</h3>
			<p>你的口味，我都懂得</p>
			<ul class="clearfix">
				<li v-for="(item, index) in discoverData" :key="index">
					<img :src="item.img">
					<div class="info">
						<h4>{{item.name}}</h4>
						<p>月售{{item.month_sales}}份&nbsp;&nbsp;好评率{{item.satisfy_rate}}%</p>
						<p><b>￥{{item.price}}</b>&nbsp;<s v-if="item.original_price">￥{{item.original_price}}</s></p>
						<h2 class="one-top-px"><i class="iconfont icon-shop"></i>&nbsp;{{item.restaurant_name}}</h2>
					</div>
				</li>
			</ul>
			<p class="more">查看更多&gt;</p>
		</div>
		<div class="time">
			<h3>限时好礼</h3>
			<p>金币换豪礼</p>
			<ul>
				<li v-for="(item, index) in discoverTime" :key="index" v-if="index<3">
					<img :src="item.img">
					<h4>{{item.title}}</h4>
					<p><b>{{item.points_required}}金币</b><s v-if="item.original_price">￥{{item.original_price}}</s></p>
					<span>{{item.corner_marker}}</span>					
				</li>
			</ul>
			<p class="more">查看更多&gt;</p>
		</div>
	</page>
</div>
</template>

<script>
	import Page from '../../common/Page.vue'
	import Header from '../../common/Header.vue'
	import Vuex from 'vuex'
	import {getDiscoverdata, getDiscovermenu, getDiscovertime} from '../../service/DiscoverService'
	export default {
		data(){
			return{
				title: '发现',
				limit: 6,
				discoverData: [],
				dicoverMenu: [],
				discoverTime: []
			}
		},
		components:{
			[Page.name]: Page,
			[Header.name]: Header,
		},
		computed: {
			...Vuex.mapState({
				lat: state=>state.location.latitude,
				lon: state=>state.location.longitude
			}),
			offset(){
				return this.discoverData.length
			}
    	},
		methods:{
			handlegoback(){
				this.$router.go(-1);
			},
			reqDiscoverData(){
				getDiscoverdata(this.lat, this.lon, this.offset, this.limit)
				.then(data=>{
					this.discoverData=data;
					console.log(data)
				})
				getDiscovermenu(2, 0, this.lat, this.lon)
				.then(data=>{
					this.dicoverMenu=data;
					console.log(data)
				})
				getDiscovertime()
				.then(data=>{
					this.discoverTime=data;
					console.log(data)
				})
			}
		},
		mounted(){
			if(this.lat, this.lon){
            	this.reqDiscoverData();
			}
			this.$watch('lat', ()=>{
				if(this.lat && this.lon){
					this.reqDiscoverData();
				}
			})
		}
	}
</script>

<style scoped>
#discover{
	background: #f5f5f5;
	top: 0.42rem;
} 
.menu{
	background: #fff;
	width: 100%;
}
.menu ul li{
	width: 50%;
	height: 0.8rem;
	float: left;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 0 0.15rem;
}
.menu ul li h3{
	font-size: 0.14rem;
}
.menu ul li p{
	color: #999;
}
.menu ul li img{
	width: 0.42rem;
	height: 0.42rem;
}
.subbanner{
	margin: 0.12rem 0;
}
.subbanner img{
	width: 100%;
}
.foodData{
	width: 100%;
	background: #fff;
	box-sizing: border-box;
	padding: 0.15rem 0.1rem;
}
.foodData>h3{
	text-align: center;
	font-size: 0.18rem;
	font-weight: 600;
}
.foodData>p{
	text-align: center;
	color: #999;
}
.foodData ul{
	width: 3.7rem;
	margin-top: 0.15rem;
}
.foodData ul li img{
	width: 1.65rem;
	height: 1.65rem;
}
.foodData ul li{
	float: left;
	width: 1.65rem;
	height: 2.54rem;
	margin-right: 0.1rem;
	margin-bottom: 0.1rem;
	position: relative;
}
.foodData ul li::after{
	width: 200%;
	height: 200%;
	content: "";
	display: block;
	transform: scale(0.5);
    z-index: 1; 
	border: 1px solid #f2f2f2;
	position: absolute;
	left: -50%;
	top: -50%;
}
.foodData ul li .info{
	box-sizing: border-box;
	padding: 0.06rem;
}
.foodData ul li .info h4{
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: 0.14rem;
	font-weight: 600;
}
.foodData ul li .info p{
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: #666;
}
.foodData ul li .info p b{
	color: #ff6000;
	font-size: 0.14rem;
	font-weight: 600;
}
.foodData ul li .info h2{
	color: #999;
	font-size: 0.12rem;
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	line-height: 0.28rem;
}
.foodData ul li .info h2 i{
	font-size: 0.12rem;
}
.more{
	font-size: 0.14rem;
	margin-top: 0.05rem;
}
.time{
	width: 100%;
	background: #fff;
	box-sizing: border-box;
	padding: 0.15rem 0.1rem;
	margin: 0.12rem 0;
}
.time>h3{
	text-align: center;
	font-size: 0.18rem;
	font-weight: 600;
}
.time>p{
	text-align: center;
	color: #999;
}
.time ul{
	display: flex;
	justify-content: space-between;
	margin: 0.18rem 0;
}
.time ul li{
	width: 1.1rem;
	position: relative;
}
.time ul li img{
	width: 1.1rem;
	height: 1.1rem;
}
.time ul li h4{
	line-height: 0.28rem;
}
.time ul li p b{
	color: #ff6000;
	margin-right: 0.06rem;
}
.time ul li p s{
	color: #999;
}
.time ul li span{
	position: absolute;
	top: 0;
	left: 0;
	background: #000;
	color: #fff;
	padding: 0.02rem;
}
</style>