<template>
<div>
	<header-app :title="title" @goback="handlegoback"></header-app>
	<page pageId="mine">	
		<div class="login">			
			<div>
				<span></span>
				<div>
					<h4>登录/注册</h4>
					<p>登录后享受更多特权</p>
				</div>		
			</div>
			<span class="right">&gt;</span>
		</div>
		<div class="menu">
			<a href="#">
				<span></span>
				<p>红包</p>
			</a>
			<a href="#">
				<span></span>
				<p>金币</p>
			</a>
		</div>
		<div class="listnav">
			<a href="#">
			  	<h5>我的地址</h5>
				<span class="right">&gt;</span>
			</a>
		</div>
		<div class="listnav">
			<a href="#">
			  	<h5 class="one-bottom-px">金币商城</h5>
				<span class="right">&gt;</span>
			</a>
			<a href="#">
			  	<h5>分享拿5元现金</h5>
				<span class="right">&gt;</span>
			</a>
		</div>
		<div class="listnav">
			<a href="#">
			  	<h5 class="one-bottom-px">我的客服</h5>
				<span class="right">&gt;</span>
			</a>
			<a href="#">
			  	<h5>下载饿了么App</h5>
				<span class="right">&gt;</span>
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
.login h4{
	font-size: 0.2rem;
	font-weight: 600;
}
.login .right{
	font-size: 0.16rem;
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
.menu a:nth-child(1)::after{
	position: absolute;
    top: 0;
    right: -1px;
    content: '';
    display: block;
    width: 1;
    height: 0.8rem;
    border-right: 1px solid #c8c8c8;
    transform: scaleY(0.5);
    z-index: 1; 
}
.listnav{
	width: 100%;
	background: #fff;
	margin-top: 0.12rem;
}
.listnav a{
	display: block;
	width: 100%;
	height: 0.42rem;
	line-height: 0.42rem;
	padding-left: 0.15rem;
	box-sizing: border-box;
	position: relative;
}
.listnav a h5{
	font-size: 0.16rem;
}
.listnav a .right{
	position: absolute;
	top: 0;
	right: 0.15rem;
	font-size: 0.16rem;
	color: #ccc;
}
</style>