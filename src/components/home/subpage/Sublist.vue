<template>
  <div class="seller-list">
      <div class="menu" v-if='filter.multi'>
          <ul class="clearfix">
              <li class="one-right-px">{{filter.multi}}</li>
              <li v-for="(item, s_index) in filter.single" :key="s_index">{{item.name}}</li>
          </ul>
      </div>
      <ul class="list">
        <li class="seller-item one-bottom-px" v-for="(seller, index) in listData" :key="index" @click="goDetail(seller.id)">
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
                        <charter-icon :name="act.icon_name" :color="act.icon_color"></charter-icon>{{act.description}}
                        </li>
                    </ul>
                    <span class="btn_down" :class="{up: seller.isShow == true}" @click.stop="showAct(index)" v-if="seller.activities.length>2">{{seller.activities.length}}个活动</span>
                </div>
                <div class="food_more" v-if="seller.foods">
                    <ul class="clearfix">
                        <li class="food" v-for="(food, f_index) in seller.foods" :key="f_index" v-if="f_index<3">
                            <img :src="food.image_path" />
                            <h5>{{food.name}}</h5>
                            <p>￥{{food.price}}</p>
                        </li>
                    </ul>
                    <ul v-show="seller.isMore">
                        <li class="more" v-for="(food, f_index) in seller.foods" :key="f_index" v-if="f_index>=3">
                            <h5>{{food.name}}</h5>
                            <p>￥{{food.price}}</p>
                            <span>月售{{food.month_sales}}份</span>
                        </li>
                    </ul>
                    <p class="btn_more" :class="{up: seller.isMore == true}" @click.stop="showMoreAct(index)" v-if="seller.foods.length>3">查看其他相关商品{{seller.foods.length-3}}个</p>
                </div>
            </div>          
        </li>
      </ul>
  </div>
</template>

<script>
import {getSearchInfo} from '../../../service/HomeService'
import CharterIcon from '../../../common/CharterIcon.vue'
import Star from '../../../common/Star.vue'
import Vuex from 'vuex'
export default {
    name: 'search-list',
    props: {
        keyword: String
    },
    data(){
        return{
            listData: [],
            limit: 8,
            filter: {}
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
            console.log(this.offset);
            return getSearchInfo(this.offset, this.limit, this.keyword, this.lat, this.lon, 3, 1)
            .then((data)=>{
                this.listData=this.listData.concat(data.restaurant);
                this.filter=data.filter;
                console.log(data);
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
        },
        showMoreAct(index){
            this.listData[index].isMore = !this.listData[index].isMore;
            this.$nextTick(()=>{
                //告诉home组件更新滚动
                this.$emit('list-change');
            })
        }
    }
}
</script>

<style scoped>
.seller-list{
    width: 100%;
    background: #fff;
    margin-top: 0.42rem;
}
.seller-list .menu ul{
    overflow-x: auto;
    height: 0.46rem;
    display: flex;
    align-items: center;
    padding-left: 0.15rem;
}
.seller-list .menu ul li{
    flex: none;
    box-sizing: border-box;
    padding: 0 0.15rem;
    line-height: 0.34rem;
    background: #f7f7f7;
    color: #666;
    text-align: center;
    margin-right: 0.1rem;
    border-radius: 0.02rem; 
}
.seller-list .menu ul li:nth-of-type(1){
    margin-right: 0.2rem;
}
.seller-list .menu ul li:nth-of-type(1)::after{
    right: -0.1rem;
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
.seller-list .list .seller-info>p{
    color: #666;
    line-height: 0.22rem;
}
.seller-list .list .seller-info>p i{
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
    transition: 100ms transform;
}
.activities .btn_down.up:after{
    transform: rotate(180deg);
    top: 0.03rem;
}
.food_more{
    width: 100%;
    margin-top: 0.1rem;
}
.food_more .food{
    width: 30%;
    float: left;
    margin-right: 0.06rem;
}
.food_more ul li h5{
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #666;
}
.food_more ul li p{
    color: red;
}
.food_more>p{
    text-align: center;
    margin-top: 0.08rem;
    position: relative;
}
.food_more>p::after{
    position: absolute;
    top: 0.06rem;
    right: 0.65rem;
    content: '';
    display: block;
    width: 0;
    height: 0;
    border: 0.04rem solid #999;
    border-left: 0.04rem solid transparent;
    border-right: 0.04rem solid transparent;
    border-bottom: 0.04rem solid transparent; 
    transition: 100ms transform;
}
.food_more>p.up::after{
    transform: rotate(180deg);
    top: 0.03rem;
}
.more{
    position: relative;
    margin-top: 0.08rem;
}
.more span{
    position: absolute;
    top: 0;
    right: 0;
    color: #999;
}
</style>
