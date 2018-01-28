<template>
<div>
  <header-app :title="title" @goback="handlegoback"></header-app>
  <sub-menu :menuData='menuData' @select="handleselect"></sub-menu>
  <sub-nav></sub-nav>
  <sub-page subpageId="bannerdetail" ref="subpage" @load-more-action="handleLoadMore" :canLoadMore='true'>
      <sub-list :ids='ids' ref="list" @list-change='handleListChange'></sub-list>
  </sub-page>
</div>
</template>

<script>
import Header from '../../common/Header.vue'
import Menu from '../../components/home/subpage/Menu.vue'
import Subnav from '../../components/home/subpage/Subnav.vue'
import List from '../../components/home/subpage/List.vue'
import SubPage from '../../common/Subpage.vue'
import {getBannerMenu} from '../../service/HomeService'
import Vuex from 'vuex'
export default {
    data(){
        return {
            title: '美食',
            menuData: [],
            ids: []
        }
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
    components: {
        [SubPage.name]: SubPage,
        [Header.name]: Header,
        [Menu.name]: Menu,
        [List.name]: List,
        [Subnav.name]: Subnav
    },
    methods: {
        handlegoback(){
            this.$router.back();
        },
        handlegetBannerMenu(){
            getBannerMenu(this.$route.params.id, this.lon, this.lat)
            .then(data=>{
                data[0].isActive = 1;
                this.menuData = data;
                this.ids = data[0].restaurant_ids;
                console.log(this.menuData)                        
            })
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
        handleselect(index){
            console.log('触发了');
            this.ids = this.menuData[index].restaurant_ids;
            console.log(this.ids);
        }
    },
    created(){
         //初始化请求
        if(this.lat && this.lon){
            this.handlegetBannerMenu();
        }
        //监听经度纬度的变化,重新请求地址
        this.$watch('lat', ()=>{
            console.log('监听到了');
            if(this.lat && this.lon){
                this.handlegetBannerMenu();
            }     
        })  
        
    },
    mounted(){
        console.log(this.menuData);
    }

}
</script>

<style scoped>
#bannerdetail{
    background: #fff;
}
</style>
