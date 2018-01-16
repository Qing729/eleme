<template>
	<div class="page" :id="pageId" ref="page">
		<div class="wrapper">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import IScroll from 'iscroll'
	export default {
		name: 'page',
		props: {
			pageId: String
		},
		mounted(){
			let pageScroll = new IScroll(this.$refs.page, {
				bounce: true, //弹簧效果
		        click: true, //打开点击事件
		        tap: true, //移动端的点击事件
		        mouseWheel: true, //支持鼠标滚轮事件
		        scrollbars: true, //滚动条
		        fadeScrollbars: true,//不滚动时滚动条淡出
			});
		}
	}
</script>

<style>
.page{
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 49px;
	overflow: hidden;
}
</style>