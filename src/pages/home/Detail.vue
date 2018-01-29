<template>
<div>
    <sub-nav v-show="isPosition"></sub-nav>
  <sub-page subpageId="detail" @page-scroll="handlePageScroll">
      <header class="header">
          <div class="logo">
              <img :src="detailData.img"/>
          </div>
          <span class="iconfont icon-left" @click="goback()"></span>
      </header>
      <div class="detailInfo">
          <h3>{{detailData.name}}</h3>
          <p>
              <span>{{detailData.rating}}</span>
              <span>月售{{detailData.recent_order_num}}单</span>
              <span>蜂鸟专送约{{detailData.order_lead_time}}分钟</span>
              <span>距离{{detailData.distance}}</span>
          </p>
          <p>{{detailData.promotion_info}}</p>
            <p v-if="detailData.activities">
                <charter-icon :name="detailData.activities.name" :color="detailData.activities.color"></charter-icon>
                {{detailData.activities.description}}
            </p>
      </div>
      <sub-nav></sub-nav>
      <div class="menuinfo clearfix">  
          <div class="menu">
              <!-- <sub-scroll> -->
              <ul>
                  <li class="one-bottom-px" v-for="(menu, index) in detailMenuData" :key="index">
                      <a href='javascript:'>{{menu.name}}</a>
                  </li>
              </ul>
              <!-- </sub-scroll> -->
          </div>
          
          <div class="info">
              <!-- <sub-scroll> -->
              <div v-for="(info, index) in detailMenuData" :key="index">            
                    <h3 class="title one-bottom-px">
                        <b>{{info.name}}</b><span>{{info.description}}</span>
                    </h3>
                    <ul>
                        <li class="content" v-for="(food, f_index) in info.foods" :key='f_index'>
                            <img :src="food.img" />
                            <div class="foodinfo">
                                <h4>{{food.name}}</h4>
                                <p>{{food.description}}</p>
                                <p>月售{{food.month_sales}}份</p>
                                <p class="ff6c6c" v-if="food.benefit_text || food.applicable_text"><i>{{food.benefit_text}}</i>{{food.applicable_text}}</p>
                                <p><span class="orangered">￥{{food.price}}</span><s v-if="food.original_price">￥{{food.original_price}}</s></p>
                                <span>+</span>
                            </div>
                        </li>
                    </ul>
              </div>
              <!-- </sub-scroll> -->
          </div>
      </div>
  </sub-page>
</div>
</template>

<script>
import Vuex from 'vuex'
import Scroller from '../../common/Scroller.vue'
import CharterIcon from '../../common/CharterIcon.vue'
import SubPage from '../../common/Subpage.vue'
import Nav from '../../components/home/subpage/Nav.vue'
import {getDetailData, getDetailMenuData} from '../../service/HomeService'
export default {
    data(){
        return{
            detailData:{},
            detailMenuData:[],
            isPosition: false
        }
    },
    computed: {
        ...Vuex.mapState({
            lat: state=>state.location.latitude,
            lon: state=>state.location.longitude
        })
    },
    components: {
        [SubPage.name]: SubPage,
        [Nav.name]: Nav,
        [CharterIcon.name]: CharterIcon,
        [Scroller.name]: Scroller
    },
    methods:{
        goback(){
            this.$router.back();
        },
        handlePageScroll(y){
            // console.log('y:'+y);
            if(y<-215){
                this.isPosition = true;
            }else{
                this.isPosition = false;
            }
		}
    },
    mounted(){
        getDetailData(this.$route.params.id, this.lat, this.lon)
        .then(data=>{
            this.detailData=data;
            console.log(data);
        })
        
        getDetailMenuData(this.$route.params.id)
        .then(data=>{
            this.detailMenuData=data;
            console.log(data);
        })
    }

}
</script>

<style scoped>
#detail{
    background: #fff;
}
.header{
    height: 65px;
    background: #cccccc;
    position: relative
}
.header span{
    position: absolute;
    color: #fff;
    font-size: 0.18rem;
    font-weight: 600;
    top: 0.05rem;
    left: 0.15rem;
}
.header img{
    position: absolute;
    top: 0.2rem;
    left: 50%;
    margin-left: -31px;
}
.detailInfo{
    height: 150px;
    text-align: center;
    box-sizing: border-box;
    padding: 30px 0 10px 0;
}
.detailInfo h3{
    font-size: 0.2rem;
    font-weight: 600;
}
.detailInfo p{
    line-height: 0.24rem;
}
.detailInfo p:nth-of-type(1) span{
    margin-right: 0.05rem;
}
.detailInfo p:nth-of-type(2){
    margin: 0 auto;
    color: #999;
    width: 65%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.menuinfo{
    width: 100%;
}
.menu{
    width:20%;
    float: left;
    /* position: relative;
    height: 600px; */
}
.menu li a{
    display: block;
    box-sizing: border-box;
    background: #f7f7f7;
    color: #666;
    display: flex;
    align-items: center;
    padding: 0.15rem 0.08rem;
}
.one-bottom-px::after{
    border-color: rgb(228, 224, 224);
}
.info{
    width: 80%;
    float: left;
    /* position: relative;
    height: 600px; */
}
.info .title{
    box-sizing: border-box;
    line-height: 0.3rem;
    padding-left: 0.1rem;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.info .title b{
    font-size: 0.14rem;
    font-weight: 600;
}
.info .title span{
    font-size: 0.12rem;
    color: #999;
    margin-left: 0.05rem;
}
.info ul li{
    display: flex;
    box-sizing: border-box;
    padding: 0.1rem;
}
.info ul li img{
    width: 0.62rem;
    height: 0.62rem;
    padding-right: 0.1rem;
}
.info ul li .foodinfo{
    flex: 1;
    position: relative;
}
.info ul li .foodinfo>span{
    position: absolute;
    right: 0;
    bottom: 0;
    width: 18px;
    height: 18px;
    background: #0094ff;
    text-align: center;
    line-height: 18px;
    color: #fff;
    border-radius: 9px;
    font-size: 14px;
}
.info ul li .foodinfo h4{
    font-size: 0.14rem;
    font-weight: 600;
    width: 1.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.info ul li .foodinfo p{
    width: 1.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 0.2rem;
}
.info ul li .foodinfo p:nth-of-type(1){
    color: #999;
}
.ff6c6c{
    color: #ff6c6c;
}
.orangered{
    color: orangered;
    font-size: 0.14rem;
    font-weight: 600;
    margin-right: 0.05rem;
}
</style>
