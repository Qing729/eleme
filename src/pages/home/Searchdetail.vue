<template>
    <sub-page subpageId="searchdetail">
        <div class="searchdetail">
        <header class="header">
            <span @click="goback()">&lt;</span>
            <input type="search" placeholder="请输入商家、商品名称" v-model="sear_val">
            <b>搜索</b>
        </header>
        <div class="sear_history" v-show='false' v-if="!isShow">
            <h2>历史搜索</h2>
        </div>
        <div class="sear_hot" v-show="!isShow">
            <h2>热门搜索</h2>
            <button v-for="(item, index) in hotsearch" :key="index" @click="searchAction(item.search_word)">{{item.search_word}}</button>
        </div>
        <div class="sear_info" v-show="isShow">
            <ul>
                <li v-for="(item, index) in restaurants" :key="index">
                    <img :src="item.image_path" />
                    <div class="one-bottom-px">
                        <strong>{{item.name}}</strong>
                        <b v-for="(tag, index) in item.tags" :key="index">
                            <charter-icon :name="tag.name" :color="tag.name_color"></charter-icon>
                        </b>
                        <span class="right">评价{{item.rating}}</span>
                    </div>
                </li>
                <li v-for="word in words">
                    <img  />
                    <div class="one-bottom-px">
                        <strong>{{word}}</strong>
                    </div>
                </li>
            </ul>
        </div>
        </div>
    </sub-page>
</template>

<script>
import SubPage from '../../common/Subpage.vue'
import {getSearchData, getHotSearchData} from '../../service/HomeService'
import CharterIcon from '../../common/CharterIcon.vue'
import Vuex from 'vuex'
export default {
    data(){
        return{
            sear_val: '',
            words: [],
            restaurants: [],
            hotsearch: [],
            isShow: false
        }
    },
    watch: {
        sear_val(){           
            if(this.sear_val){
                this.handlegetSearch();
            }else{
                this.isShow = false;
            }
        }
    },
    computed: {
        ...Vuex.mapState({
            lat: state=>state.location.latitude,
            lon: state=>state.location.longitude,
            city_id: state=>state.location.city_id
        })
    },
    components: {
        [SubPage.name]: SubPage,
        [CharterIcon.name]: CharterIcon
    },
    methods: {
        goback(){
            this.$router.back();
        },
        searchAction(val){
            this.sear_val = val;
            this.$nextTick(()=>{
                this.handlegetSearch();
            })    
        },
        handlegetSearch(){
            getSearchData(this.sear_val, this.lat, this.lon, this.city_id)
            .then(
                (data)=>{
                    if(data){
                        console.log(data);
                        this.isShow=true;    
                        this.words=data.words;
                        this.restaurants=data.restaurants;
                    }    
                }
            )
        },
        handlegetHotSearchData(){
            getHotSearchData(this.lat, this.lon)
            .then((data)=>{
                this.hotsearch = data;
                console.log(this.hotsearch);
            })
        }
    },
    mounted(){
        console.log(this.city_id);
        if(this.lat, this.lon){
            this.handlegetHotSearchData();
        }
        this.$watch('lat', ()=>{
            if(this.lat && this.lon){
                this.handlegetHotSearchData();
            }
        })
        
    },
    updated(){
        console.log('搜索更新')
    }
}
</script>

<style scoped>
#searchdetail{
    background: #fff;
}
.header{
    width: 100%;
    height: 0.48rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 0.1rem;
}
.header span{
    font-size: 0.2rem;
    font-weight: 600;
}
.header input{
    width: 2.6rem;
    height: 0.26rem;
    background: #f2f2f2; 
    color: #999;
    border:0;
    outline: none;
    box-sizing: border-box;
    padding: 0 0.1rem;
}
.header b{
    font-size: 0.16rem;
    font-weight: 600;
}
.sear_history,.sear_hot{
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.1rem;
}
.sear_history h2,.sear_hot h2{
    font-size: 0.16rem; 
    font-weight: 600;
    margin-bottom: 0.2rem;
}
.sear_history button,.sear_hot button{
    border: 0;
    outline: none;
    box-sizing: border-box;
    padding: 0 0.1rem;
    line-height: 0.3rem;
    background: #f2f2f2;
    text-align: center;
    margin: 0 0.1rem 0.1rem 0;
    border-radius: 0.02rem; 
}
.sear_info ul li{
    padding: 0 0.1rem;
    display: flex;
    align-items: center;
    line-height: 0.52rem;
}
.sear_info ul li img{
    width: 0.24rem;
    /* height: 0.24rem; */
    padding-right: 0.1rem
}
.sear_info ul li div{
    flex: 1;
}   
.sear_info ul li div strong{
    font-size: 0.14rem;
    /* width: 50%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; */
}
.sear_info ul li div .right{
    float: right;
    color: #999;
}
</style>
