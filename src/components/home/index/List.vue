<template>
  <div class="seller-list">
      <div class="title">
        <h3 class="one-bottom-px">
            <span>推荐商家</span>
        </h3>
      </div>
      <ul class="list">
        <li class="seller-item one-bottom-px" v-for="(seller, index) in listData" :key="index" @click="goDetail(seller.id)">
            <!-- <router-link class="detail" :to='"/home/detail/"+seller.id'> -->
            <div class="seller-logo">
                <img :src="seller.img">
            </div>
            <div class="seller-info">
                <h4>{{seller.name}}</h4>
                <p class="score_info clearfix">
                    <star-score :score="seller.rating"></star-score>
                    <span>月售{{seller.recent_order_num}}单</span>
                    <charter-icon v-if="seller.delivery_mode" :name="seller.delivery_mode.text" :color="seller.delivery_mode.color" id="fb_right"></charter-icon>
                </p>
                <p>
                    <span>￥{{seller.piecewise_rule_price}}起送</span><i>|</i><span>{{seller.piecewise_description}}</span>
                    <span class="dt_right">{{seller.distance}}<i>|</i>{{seller.order_lead_time}}分钟</span>
                </p>
                <p v-if="seller.recommend" class="clearfix">
                    <img :src="seller.recommend.image_hash" class="goodstoreImg">
                    <span class="goodstoreTxt">{{seller.recommend.reason}}</span>
                </p>
                <div class="activities one-top-px" v-if="seller.activities">
                    <ul class="act-list">
                        <li v-for='(act, act_index) in seller.activities' :key='act_index' v-if='act_index<2 || seller.isShow'>
                        <!-- <span v-color='act.icon_color'>{{act.icon_name}}</span> -->
                        <charter-icon :name="act.icon_name" :color="act.icon_color"></charter-icon>{{act.description}}
                        </li>
                    </ul>
                    <span class="btn_down" @click.stop="showAct(index)" v-if="seller.activities.length>2">{{seller.activities.length}}个活动</span>
                </div>
            </div>
            <!-- </router-link> -->
        </li>
      </ul>
  </div>
</template>

<script>
import {getHomeSeller} from '../../../service/HomeService'
import CharterIcon from '../../../common/CharterIcon.vue'
import Star from '../../../common/Star.vue'
import Vuex from 'vuex'
export default {
    name: 'home-list',
    data(){
        return{
            listData: [],
            limit: 12,
        }
    },
    components: {
        [CharterIcon.name]: CharterIcon,
        [Star.name]: Star
    },
    computed: {
        ...Vuex.mapState({
            lat: state=>state.location.latitude,
            lon: state=>state.location.longitude
        }),
        offset(){
            return this.listData.length;
        }
    },
    methods: {
        requestData(callback){
            return getHomeSeller(this.lat, this.lon, this.offset, this.limit)
            .then((data)=>{
                this.listData=this.listData.concat(data);
                console.log(this.listData);
                this.$nextTick(()=>{
                    //请求完成执行停止加载更多动画
                    if(callback){
                        callback();
                    }
                })
            })
        },
        //查看列表展开
        showAct(index){
            this.listData[index].isShow = !this.listData[index].isShow;
            //执行完上面的后紧接着更新滚动视图
            this.$nextTick(()=>{
                //告诉home组件更新滚动
                this.$emit('list-change');
            })
        },
        goDetail(id){
			this.$router.push('/home/detail/'+id);//进入一个新的页面			
        }
    },
    mounted(){
        //初始化请求
        if(this.lat && this.lon){
            this.requestData();
        }
        //监听经度纬度的变化,重新请求地址
        this.$watch('lat', ()=>{
            // console.log('监听到了')
            if(this.lat && this.lon){
                this.listData=[];
                this.requestData();
            }     
        })    
    },
}
</script>

<style scoped>
.seller-list{
    width: 100%;
    background: #fff;
    margin-top: 0.07rem;
}
.seller-list .title{
    background: #fff;
    height: 0.48rem;
}
.seller-list h3{
    line-height: 0.48rem;
    height: 0.24rem;
    width: 1.36rem;
    margin: 0 auto;
    border-color: #999;
    position: relative;
}
.seller-list h3 span{
    position: absolute;
    display: block;
    padding: 0 0.1rem;
    top: 0;
    left: 0.3rem;
    background: #fff;
    z-index: 2;
}
.seller-list .list .seller-item{
    box-sizing: border-box;
    width: 100%;
    padding: 0.14rem 0.1rem;
    display: flex;
}
.seller-list .list .seller-logo img{
    padding-right: 0.1rem;
    border-radius: 0.02rem;
}
.seller-list .list .seller-info{
    flex: 1;
}
.seller-list .list .seller-info h4{
    font-size: 0.14rem;
    font-weight: 600;
}
.seller-list .list .seller-info p{
    color: #666;
    line-height: 0.22rem;
}
.seller-list .list .seller-info p i{
    color: #ccc;
    padding: 0 0.04rem;
}
.score_info span{
    float: left;
    display: block;
    margin-right: 0.02rem;
}
#fb_right{
    float: right;
    margin-top: 0.04rem;
}
.dt_right{
    float: right;
    color: #999;
}
.goodstoreImg{
    float: left;
    margin: 0.05rem 0.05rem 0 0;
}
.goodstoreTxt{
    float: left;
    color: #e8470b;
}
.activities.one-top-px::before{
    border-bottom-style: dotted; 
}
.activities{
    margin-top: 0.05rem;
    padding-top: 0.1rem;
    line-height: 0.2rem;
    color: #666;
}
.activities .btn_down{
    position: absolute;
    top: 0.1rem;
    right: 0.1rem;
    color: #999;
}
.activities .btn_down:after{
    position: absolute;
    top: 0.06rem;
    right: -0.1rem;
    content: '';
    display: block;
    width: 0;
    height: 0;
    border: 0.04rem solid #999;
    border-left: 0.04rem solid transparent;
    border-right: 0.04rem solid transparent;
    border-bottom: 0.04rem solid transparent; 
}
</style>
