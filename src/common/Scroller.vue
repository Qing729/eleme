<template>
	<div class="scroller">
		<div class="wrapper clearfix">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name:'sub-scroll',
		mounted(){
			let myScroll = new IScroll('.scroller',{
				bounce: false, //弹簧效果
		        click: true, //打开点击事件
		        tap: true, //移动端的点击事件
			})
		}
	}
</script>

<style scoped>	
.scroller{
	width: 100%;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	overflow: hidden;
}
</style>