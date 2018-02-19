<template>
    <div class="subpage" :id="subpageId" ref="subpage">
        <div class="wrapper">
            <slot></slot>
            <!--上拉加载更多-->
			<div v-if="canLoadMore" class="load-more" :class="{down: isDown == 1}">
				<img :src='imgPath'/>
				<span>{{downInfo}}...</span>
			</div>
        </div>
    </div>
</template>

<script>
const NO_TRIGGER = 0; //没触发
const TRIGGER = 1; //触发
const ACTIVE = 2;
export default {
  name: "sub-page",
  props: {
    subpageId: String,
    canLoadMore: Boolean
  },
  data() {
    return {
      isDown: NO_TRIGGER, //是否触发加载更多
      downInfo: "上拉加载更多",
      imgPath: "/static/images/arrow.png"
    };
  },
  methods: {
    //让页面刷新滚动
    pageRefresh() {
      this.pageScroll.refresh();
      console.log("刷新滚动");
    },
    endLoadMoreAni() {
      (this.isDown = NO_TRIGGER), //是否触发加载更多
        (this.downInfo = "上拉加载更多"),
        (this.imgPath = "/static/images/arrow.png");
    }
  },
  mounted() {
    this.pageScroll = new IScroll(this.$refs.subpage, {
<<<<<<< HEAD
      bounce: false, //弹簧效果
=======
      bounce: true, //弹簧效果
>>>>>>> b2d82ef3dc6dbdc72e85dc253a36a8f52c98faf3
      click: true, //打开点击事件
      tap: true, //移动端的点击事件
      mouseWheel: true, //支持鼠标滚轮事件
      scrollbars: true, //滚动条
      fadeScrollbars: true, //不滚动时滚动条淡出
      //设置滚动事件的触发条件:1.不繁忙时，对性能没有影响 2.在势能和反弹范围不触发 3.只要滚动就触发
      probeType: 3
    });
    //用户滚动页面时刷新滚动
    this.pageScroll.on("scrollStart", this.pageRefresh);
    if (this.canLoadMore) {
      //上拉加载更多，判断距离40
      this.pageScroll.on("scroll", () => {
        if (this.isDown != ACTIVE) {
          let maxScrollY = this.pageScroll.maxScrollY;
          let y = this.pageScroll.y;
          if (y > maxScrollY) {
            (this.downInfo = "上拉加载更多"), (this.isDown = NO_TRIGGER);
          } else if (y <= maxScrollY) {
            this.downInfo = "释放加载更多";
            this.isDown = TRIGGER;
          }
        }
      });
      this.pageScroll.on("scrollEnd", () => {
        if (this.isDown != ACTIVE) {
          //scroll没有正在加载更多时判断
          let maxScrollY = this.pageScroll.maxScrollY;
          let y = this.pageScroll.y;
          if (y > maxScrollY && y < maxScrollY + 40) {
            this.pageScroll.scrollTo(0, maxScrollY + 40, 200);
          } else if (y <= maxScrollY) {
            //满足条件，请求下一页列表数据
            this.isDown = ACTIVE;
            this.imgPath = "/static/images/ajax-loader.gif";
            this.downInfo = "正在加载";
            this.$emit("load-more-action");
          }
        }
      });
    }
    // detail组件需要监听滚动位置
    this.pageScroll.on("scroll", () => {
    //   console.log("监听中sub");
      this.$emit("page-scroll", this.pageScroll.y);
    });
  },
  beforeDestroy() {
    // console.log("销毁前sub");
    this.pageScroll.off("scroll");
  }
};
</script>

<style scoped>
.subpage {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 5;
  overflow: hidden;
}
.load-more {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #fff;
}
.load-more img {
  width: 12px;
  height: 12px;
  display: inline-block;
  transition: 200ms transform;
}
.load-more.down img {
  transform: rotate(180deg);
}
.load-more span {
  color: #666;
}
</style>