<template>
<div>
	<header-app :title="title" @goback="handlegoback"></header-app>
	<page pageId="mine">	
		<div class="login">			
			<div class="log_l">
				<span class="iconfont icon-touxiang"></span>
				<div>
					<h4>登录/注册</h4>
					<p>登录后享受更多特权</p>
				</div>		
			</div>
			<span class="right iconfont icon-right"></span>
		</div>
		<div class="menu">
			<a href="#" class="one-right-px">
				<span class="iconfont icon-redpacket"></span>
				<p>红包</p>
			</a>
			<a href="#">
				<span class="iconfont icon-gold_coin"></span>
				<p>金币</p>
			</a>
		</div>
		<div class="listnav">
			<a href="#">
				<i class="iconfont icon-distance"></i>
			  	<h5>我的地址<span class="right iconfont icon-right"></span></h5>			
			</a>
		</div>
		<div class="listnav">
			<a href="#">
				<i class="iconfont icon-goldshop"></i>
			  	<h5 class="one-bottom-px">金币商城<span class="right iconfont icon-right"></span></h5>				
			</a>
			<a href="#">
				<i class="iconfont icon-present"></i>
			  	<h5>分享拿5元现金<span class="right iconfont icon-right"></span></h5>			
			</a>
		</div>
		<div class="listnav">
			<a href="#">
				<i class="iconfont icon-service"></i>
			  	<h5 class="one-bottom-px">我的客服<span class="right iconfont icon-right"></span></h5>
			</a>
			<a href="#">
				<i class="iconfont icon-home"></i>
			  	<h5>下载饿了么App<span class="right iconfont icon-right"></span></h5>			
			</a>
		</div>
	</page>
</div>
</template>

<script>
	import Page from '../../common/Page.vue'
	import Header from '../../common/Header.vue'
	export default {
		data(){
			return{
				title: '我的'
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
.icon-redpacket{
	color: #ff6000;
	font-size: 0.2rem;
}
.icon-gold_coin{
	color: rgb(49, 223, 49);
	font-size: 0.2rem;
}
.icon-distance{
	color: #0094ff;
}
.icon-goldshop{
	color: rgb(49, 223, 49);
}
.icon-present{
	color: #ff6000;
}
.icon-service{
	color: #0094ff;
}
.icon-home{
	color: #0094ff;
}
#mine{
	background: #f5f5f5;
	top: 0.42rem;
}
.login{
	height: 1.05rem;
	background-image: linear-gradient(90deg,#0af,#0085ff);
	display: flex;
	color: #fff;
	align-items: center;
	justify-content: space-between;
	padding: 0 0.15rem;
}
.login .log_l{
	display: flex;
}
.login .log_l span{
	font-size: 0.42rem;
	margin-right: 0.1rem;
}
.login h4{
	font-size: 0.2rem;
	font-weight: 600;
}
.login .right{
	font-size: 0.12rem;
}
.menu{
	width: 100%;
	height: 0.8rem;
	background: #fff;
}
.menu a{
	width: 50%;
	height: 100%;
	float: left;
	display: flex;	
	justify-content: center;
	align-items: center;
	flex-direction: column;
	position: relative;
}
.listnav{
	width: 100%;
	background: #fff;
	margin-top: 0.12rem;
}
.listnav a{
	display: flex;
	width: 100%;
	height: 0.42rem;
	line-height: 0.42rem;
	padding-left: 0.15rem;
	box-sizing: border-box;
	position: relative;
}
.listnav a i{
	margin-right: 0.1rem;
}
.listnav a h5{
	font-size: 0.16rem;
	width: 100%;
}
.listnav a .right{
	position: absolute;
	top: 0;
	right: 0.15rem;
	font-size: 0.12rem;
	color: #ccc;
}
</style>