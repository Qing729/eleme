<template>
<div class="searchdetail">
    <sub-search @getVal='handlegetVal' @startSearch='search' ref="subsearch"></sub-search>
    <nav-list v-show="isShow==3"></nav-list>
    <sub-page subpageId="searchdetail" ref="subpage" @load-more-action="handleLoadMore" :canLoadMore="isShow==3">
        <div class="searchdetail">
        <div v-show="isShow==1">
            <div class="sear_history" v-if="historyArr.length>0">
                <i class="iconfont icon-delect" @click="deletelocal()"></i>
                <h2>历史搜索</h2>
                <button v-for="(item, index) in historyArr" :key="index" @click="searchAction(item)">{{item}}</button>
            </div>
            <div class="sear_hot">
                <h2>热门搜索</h2>
                <button v-for="(item, index) in hotsearchwords" :key="index" @click="searchAction(item.word)">{{item.word}}</button>
            </div>
        </div>
        <div class="sear_info" v-show="isShow==2">
            <ul>
                <li v-for="(item, index) in restaurants" :key="index" @click="goDetail(item.id)">
                    <img :src="item.image_path" />
                    <div class="one-bottom-px">
                        <strong>{{item.name}}</strong>
                        <b v-for="(tag, index) in item.tags" :key="index">
                            <charter-icon :name="tag.name" :color="tag.name_color"></charter-icon>
                        </b>
                        <span class="right">评价{{item.rating}}</span>
                    </div>
                </li>
                <li v-for="word in words" @click="searchAction(word)">
                    <img  />
                    <div class="one-bottom-px">
                        <strong>{{word}}</strong>
                    </div>
                </li>
            </ul>
        </div>
        </div>
        <search-list :keyword='sear_val' ref="list" v-show="isShow==3" @list-change='handleListChange' @filter='getFilter'></search-list>
    </sub-page>
</div>
</template>

<script>
import SubPage from '../../common/Subpage.vue'
import Sublist from '../../components/home/subpage/Sublist.vue'
import Navlist from '../../components/home/subpage/Navlist.vue'
import Subsearch from '../../components/home/subpage/Subsearch.vue'
import {getSearchData, getHotSearchData} from '../../service/HomeService'
import CharterIcon from '../../common/CharterIcon.vue'
import Vuex from 'vuex'
export default {
    data(){
        return{
            sear_val: '',
            words: [],
            restaurants: [],
            hotsearchwords: [],
            isShow: 1,
            isSearch: true,
            historyArr: []
        }
    },
    watch: {
        sear_val(){   
            clearTimeout(this.timer);
            //用户在200ms内没有输入内容，才发请求
            this.timer = setTimeout(()=>{       
                if(this.sear_val){
                    if(this.isSearch){
                        this.isShow = 2;
                        this.handlegetSearch();
                    }else{
                        //点击热搜或历史搜索按钮时 isSearch=false 
                        //则在输入框value值改变的情况下不触发handlegetSearch方法
                        //直接触发search方法进行搜索
                        this.search();
                        this.isSearch = true;
                    }
                }else{
                    this.isShow = 1;
                }
            },200)
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
        [Sublist.name]: Sublist,
        [Subsearch.name]: Subsearch,
        [Navlist.name]: Navlist,
        [CharterIcon.name]: CharterIcon
    },
    methods: {
        handlegetVal(val){
            this.sear_val=val
        },
        searchAction(val){
            this.isSearch = false;
            this.$refs.subsearch.sear_val = val;  
        },
        goDetail(id){
			this.$router.push('/home/detail/'+id);//进入一个新的页面			
        },
        handlegetSearch(){
            getSearchData(this.sear_val, this.lat, this.lon, this.city_id)
            .then(
                (data)=>{
                    if(data){
                        console.log(data);    
                        this.words=data.words;
                        this.restaurants=data.restaurants;
                    }    
                }
            )
        },
        handlegetHotSearchData(){
            getHotSearchData(this.lat, this.lon)
            .then((data)=>{
                this.hotsearchwords = data;
            })
        },
        search(){
            if(this.historyArr.indexOf(this.sear_val)==-1){
                //通过historyArr中的值判断，当localStorage中没有与当前搜索内容相同的值时将搜索内容存入localStorage
                this.localStoragePut(this.sear_val);
            }          
            this.isShow = 3;
            this.$refs.list.listData = [];
            this.$refs.list.requestData();         
        },
        handleListChange(){
            this.$refs.subpage.pageRefresh();
        },
        handleLoadMore(){
            //让list请求下一页数据
            this.$refs.list.requestData(()=>{
                // 请求完成，执行停止加载更多的动画
                this.$refs.subpage.endLoadMoreAni();
            });
            // 如果请求完成，就刷新滚动视图
        },
        getFilter(filter){
            this.filter = filter;
        },
        localStoragePut(value){           
           this.historyArr.push(value);
        //    console.log(this.historyArr);
            localStorage.setItem('SEARCH_HISTORY', JSON.stringify(this.historyArr));
        },
        deletelocal(){
            localStorage.removeItem('SEARCH_HISTORY');
            this.historyArr=[];
        }
    },
    created(){
        // console.log(this.historyArr);
        let result=JSON.parse(localStorage.getItem('SEARCH_HISTORY'));
        if(result!=null){
            this.historyArr=result; 
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
.searchdetail{
    width: 100%;
    height: 100%;
    background: #fff;
}
#searchdetail{
    background: #fff;
    top: 0.48rem;
}
.sear_history{
    position: relative;
}
.icon-delect{
    position: absolute;
    top: 0;
    right: 0.15rem;
    font-size: 0.12rem;
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
    background: #f7f7f7;
    color: #666;
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
