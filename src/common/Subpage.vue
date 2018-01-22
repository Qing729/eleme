<template>
    <div class="subpage" :id="subpageId" ref="subpage">
        <div class="wrapper">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'sub-page',
    props: {
        subpageId: String
    },
    mounted(){
        this.pageScroll = new IScroll(this.$refs.subpage, {
            bounce: true, //弹簧效果
            click: true, //打开点击事件
            tap: true, //移动端的点击事件
            mouseWheel: true, //支持鼠标滚轮事件
            scrollbars: true, //滚动条
            fadeScrollbars: true,//不滚动时滚动条淡出
            //设置滚动事件的触发条件:1.不繁忙时，对性能没有影响 2.在势能和反弹范围不触发 3.只要滚动就触发
            probeType: 3
        });
        //用户滚动页面时刷新滚动
        this.pageScroll.on('scrollStart', ()=>{
            this.pageScroll.refresh()
        });
        console.log(this.$route);
    }
}
</script>

<style scoped>
.subpage{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 5;
    overflow: hidden;
}
</style>