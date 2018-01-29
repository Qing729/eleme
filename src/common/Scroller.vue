<template>
	<div class="scroller">
		<div class="wrapper">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name:'sub-scroll',
		mounted(){
			let myScroll = new IScroll('.scroller',{
				bounce: true, //弹簧效果
		        click: true, //打开点击事件
		        tap: true, //移动端的点击事件
			})
		}
	}
</script>

<style scoped>	
.scroller{
	width: 100%;
	height: 600px;
	overflow: hidden;
}
</style>