<template>
  <div class="banner swiper-container" ref="banner">
    <div class="swiper-wrapper">
        <ul class="swiper-slide clearfix" ref="slide" v-for="(data, index) in bannerData" :key="index">
            <li class="item"  v-for="(bannerItem, index) in data" :key="index">
                <router-link :to='"/home/bannerdetail/"+bannerItem.id'>
                    <img :src="bannerItem.img"/>
                    <span>{{bannerItem.name}}</span>
                </router-link>
            </li>
        </ul>
    </div>
    <!-- 分页器 -->
    <div class="swiper-pagination" id="swiper-pagination" v-show="bannerData.length>1"></div>
</div>
</template>

<script>
import {getBannerdata} from '../../../service/HomeService'
import Vuex from 'vuex'
export default {
    name: 'home-banner',
    data(){
        return {
            bannerData: []
        }
    },
    computed: {
        ...Vuex.mapState({
            lat: state=>state.location.latitude,
            lon: state=>state.location.longitude
        })
    },
    methods: {
         initData(){
            //请求banner数据
            getBannerdata(this.lat, this.lon, [
                    'main_template',
                    'favourable_template',
                    'svip_template'
            ])
            .then(data=>{
                this.bannerData = data;
                console.log(data);
                //banner数据更新，更新swiper
                this.$nextTick(()=>{
                    this.bannerSwiper.update();
                })
            })
        }
    },
    mounted(){
        //创建swiper对象，挂靠在组件对象上
        this.bannerSwiper = new Swiper(this.$refs.banner,{
            pagination: '.swiper-pagination'
        });   
        //初始化请求
        if(this.lat && this.lon){
             this.initData();
        }
        //监听经度纬度的变化,重新请求地址
        this.$watch('lat', ()=>{
            if(this.lat && this.lon){
                 this.initData();
            }
        })    
    }
}
</script>

<style>
.banner{
    width: 100%;
    height: 1.7rem;
    background: #fff;
}
.swiper-slide .item{
    width: 25%;
    float: left;
    margin-top: 0.06rem;
}
.swiper-slide .item a{
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center
}
.swiper-pagination-bullet{
    width: 0.03rem;
    height: 0.03rem;
    background: #999;
}
.swiper-pagination-bullet.swiper-pagination-bullet-active{
    background: #333;
}
</style>
