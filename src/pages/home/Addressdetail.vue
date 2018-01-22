<template>
<div>
    <header-app :title="title" @goback="handlegoback"></header-app>
    <sub-page subpageId="addressdetail">
        <div class="address_sear">
            <input type="search" placeholder="请输入地址" v-model="keyword">
        </div>
        <div class="address_info" v-show="isShow">
            <p>当前地址</p>
            <div class="address_now">
                <b>{{this.$store.state.location.address}}</b>
                <span @click="reposition()">重新定位</span>
            </div>
        </div>
        <div class="addresslist" v-show="!isShow">
            <ul>
                <li class="one-top-px" v-for="(item, index) in addressList" :key="index" @click='modifyPosition(index)'>
                    <h4>{{item.name}}</h4>
                    <p>{{item.address}}</p>
                </li>
            </ul>
        </div>
    </sub-page>
</div>
</template>

<script>
import Header from '../../common/Header.vue'
import SubPage from '../../common/Subpage.vue'
import {getAddressData, getSearchAddressData} from '../../service/HomeService'
import Vuex from 'vuex'
export default {
    data(){
        return {
            keyword:'',
            addressData: {},
            addressList: [],
            isShow: true,
            limit:20,
            title: '选择收货地址'
        }
    },
    watch: {
        keyword: function(){
            clearTimeout(this.timer);
            //用户在1s内没有输入内容，才发请求
            this.timer = setTimeout(()=>{
                if(this.keyword){
                    this.handlegetSearchAddress();
                    
                }else{
                    this.isShow = true;
                }
            },1000)         
        }
    },
    components: {
        [SubPage.name]: SubPage,
        [Header.name]: Header
    },
    computed: {
        ...Vuex.mapState({
            lat: state=>state.location.latitude,
            lon: state=>state.location.longitude
        }),
        offset(){
            return this.addressList.length;
        }
    },
    methods:{
        handlegoback(){
            this.$router.back();
        },
        handlegetSearchAddress(){
            getSearchAddressData(this.keyword, this.lat, this.lon, this.offset, this.limit)
            .then(data=>{
                if(data){
                    console.log(data);
                    this.isShow = false;
                    this.addressList=data;                   
                }               
            })
        },
        reposition(){
            this.$store.dispatch('location/initLoaction');      
        },
        modifyPosition(index){
            this.$store.dispatch('location/modifyLocationAction',{
                lat:this.addressList[index].lat,
                lon:this.addressList[index].lon,
                address:this.addressList[index].name
            })
            this.handlegoback();      
        }
    },
    mounted(){
        
    },
    updated(){  
        console.log('地址更新')
    }
}
</script>

<style scoped>
#addressdetail{
    background: #f2f2f2; 
    top: 0.42rem;
}
.address_sear{
    height: 0.48rem;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}
.address_sear input{
    width: 3.3rem;
    height: 0.3rem;
    background: #f2f2f2; 
    color: #999;
    border:0;
    outline: none;
    box-sizing: border-box;
    padding: 0 0.1rem;
}
.address_info p{
    line-height: 0.4rem;
    color: #666;
    padding-left: 0.15rem;
}
.address_info .address_now{
    height: 0.42rem;
    background: #fff;
    padding: 0 0.15rem;
    line-height: 0.42rem;
}
.address_now b{
    font-weight: 600;
    float: left;
    font-size: 0.14rem;
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.address_now span{
    float: right;
    color: #0094ff;
}
.addresslist{
    background: #fff;
}
.addresslist li{
    height: 0.56rem;
    padding: 0.08rem 0.15rem;
    box-sizing: border-box;
}
.addresslist li h4{
    font-size: 0.14rem;
    font-weight: 600;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.addresslist li p{
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
