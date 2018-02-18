<template>
<div>
	<header-app :title="title" @goback="handlegoback"></header-app>
	<page pageId="order">
		<div class="orderinto"> 
			<img :src="imgPath" />
			<p>登录后查看外卖订单</p>
			<button>立即登录</button>
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
				imgPath: '/static/images/order_bg.png',
				title: '订单'
			}
		},
		components:{
			[Page.name]: Page,
			[Header.name]: Header,
		},
		methods:{
			handlegoback(){
				this.$router.back();
			}
		}
	}
</script>

<style scoped>
#order{
	background: #f5f5f5;
	top: 0.42rem;
}
.orderinto{
	width: 100%;
	height: 4.6rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.orderinto img{
	width: 1.92rem;
}
.orderinto p{
	font-size: 0.16rem;
	line-height: 0.34rem;
	color: #666;
}
.orderinto button{
	width: 1.14rem;
	height: 0.34rem;
	background: #56d176;
	border: 0;
	outline: none;
	color: #fff;
	line-height: 0.34rem;
	text-align: center;
	font-size: 0.14rem;
	border-radius: 0.02rem;
}
</style>