<template>
  <header class="header">
      <div class="address"><router-link to="/home/address"><p><i class="iconfont icon-distance"></i>&nbsp;{{address}}</p></router-link></div>
      <search-bar></search-bar>
  </header>
</template>

<script>
//https://h5.ele.me/restapi/bgs/poi/reverse_geo_coding?latitude=22.54286&longitude=114.059563
import {getAddressData} from '../../../service/HomeService'
import Search from './Search'
import Vuex from 'vuex'
export default {
    name: 'home-header',
    data(){
        return {
            address:''
        }
    },
    components: {
        [Search.name]: Search
    },
    computed: {
        ...Vuex.mapState({
            lat: state=>state.location.latitude,
            lon: state=>state.location.longitude
        })
    },
    methods: {
        handlegetAddress(){
            getAddressData(this.lat, this.lon)
            .then(data=>{
                this.address = data.name;
                // console.log(data);
                this.$store.dispatch('location/modifyAddressAction', {
                    address: this.address
                })
                this.$store.dispatch('location/modifyCityAction', {
                    city_id: data.city_id
                })
            })
        }
    },
    mounted(){
        //初始化请求
        if(this.lat && this.lon){
            this.handlegetAddress();
        }
        //监听经度纬度的变化,重新请求地址
        this.$watch('lat', ()=>{
            if(this.lat && this.lon){
                this.handlegetAddress();
            }
        })
    },
    beforeUpdate(){
        console.log('更新前')
    },
    updated(){
        console.log('更新')    
    },
    beforeDestroy(){
        console.log("销毁")
    }
}
</script>

<style scoped>
.header{
    width: 100%;
    height: 90px;
    background-image: linear-gradient(90deg,#0af,#0085ff);
}
.header .address{
    height: 42px;
    padding-left: 0.2rem;
}
.header .address a{
    display: block;
    width: 100%;
    height: 42px;  
}
.header .address a p{
    color: #fff;
    font-size: 0.14rem;
    font-weight: 600;
    line-height: 42px;
    width: 1.4rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
