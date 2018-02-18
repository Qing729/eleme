import axios from 'axios'
import Api from '../api'
import {handleImage} from '../util/handleImage'
import {handleDistance} from '../util/handleDistance'

//获取banner轮播图数据
export function getBannerdata(lat, lon, tmp){
    return new Promise((resolve, reject)=>{
        axios.get(Api.BANNER_URL, {
            params: {
                'latitude': lat,
                'longitude': lon,
                'templates': tmp
            }
        })
        .then((response)=>{
            let newData = response.data[0].entries.map(item=>{
                return {
                    name: item.name,
                    img: handleImage(item.image_hash, 45),
                    id: item.id
                }
            });
            //对数据执行8条为一页banner的切割
            let resultData = [];
            while(newData.length > 0){
                resultData.push(newData.splice(0, 8));
            }
            resolve(resultData);
        })
        //请求失败
        .catch((error)=>{

        })
    })
}

//获取地址定位数据
//https://h5.ele.me/restapi/bgs/poi/reverse_geo_coding?latitude=22.54286&longitude=114.059563
export function getAddressData(lat, lon){
    return new Promise((resolve, reject)=>{
        axios.get(Api.ADDRESS_URL, {
            params: {
                'latitude': lat,
                'longitude': lon,
            }
        })
        .then((response)=>{  
            let result = {
                name:response.data.name,
                address:response.data.address,
                city_id:response.data.city_id
            }
            resolve(result);
        })
        //请求失败
        .catch((error)=>{

        })
    })
}
//获取搜索地址数据
//https://h5.ele.me/restapi/bgs/poi/search_poi_nearby?keyword=%E6%B7%B1&offset=0&limit=20&latitude=22.609725&longitude=114.029113
export function getSearchAddressData(keyword, lat, lon, offset, limit){
    return new Promise((resolve, reject)=>{
        axios.get(Api.SEARCHADDRESS_URL,{
            params: {
                keyword,
                offset,
                limit,
                latitude:lat,
                longitude:lon,
            }
        })
        .then(response=>{
            let result = response.data.map(item=>{
                return{
                    name:item.name,
                    address:item.address,
                    city_id:item.city_id,
                    lat:item.latitude,
                    lon:item.longitude
                }
            })
            resolve(result);
        })
        //请求失败
        .catch((error)=>{

        })
    })
}

//请求首页推荐商家的函数
export function getHomeSeller(lat, lon, offset, limit){
    return new Promise((resolve, reject)=>{
        axios.get(Api.SELLER_URL, {
            params: {
                latitude: lat,
                longitude: lon,
                offset,
                limit,
                extras: ['activities', 'tags'],
                extra_filters: 'home',
                rank_id: '984553df2830414c9058eaff4b63bbaa',
                terminal: 'h5'
            }
        })
        .then(response=>{
            let result = response.data.items.map(item=>{
                return {
                    id: item.restaurant.id,
                    img: handleImage(item.restaurant.image_path, 62),
                    name: item.restaurant.name,
                    distance: handleDistance(item.restaurant.distance),//距离
                    order_lead_time: item.restaurant.order_lead_time,//时间
                    rating: item.restaurant.rating,//星星分数
                    recent_order_num: item.restaurant.recent_order_num,//月单数
                    piecewise_description: item.restaurant.piecewise_agent_fee.description,//配送费
                    piecewise_rule_price: item.restaurant.piecewise_agent_fee.rules[0].price,//起送费
                    recommend: item.restaurant.recommend?{//口碑人气好店
                        color: item.restaurant.recommend.color,
                        image_hash: handleImage(item.restaurant.recommend.image_hash, 12),
                        reason: item.restaurant.recommend.reason
                    }:null,
                    delivery_mode:item.restaurant.delivery_mode?{//蜂鸟专送
                        color: item.restaurant.delivery_mode.color,
                        text: item.restaurant.delivery_mode.text,
                        text_color: item.restaurant.delivery_mode.text_color
                    }:null,
                    activities: item.restaurant.activities?item.restaurant.activities.map(act=>{
                        return {
                            icon_name: act.icon_name,
                            icon_color: act.icon_color,
                            description: act.description
                        }
                    }):null,
                    isShow: false
                }
            })
            resolve(result);
        })
        .catch(error=>{
        })
    })
}

//获取搜索数据
//https://h5.ele.me/restapi/shopping/v1/typeahead?kw=l&latitude=22.54286&longitude=114.059563&city_id=11
export function getSearchData(kw, lat, lon, city_id){
    return new Promise((resolve, reject)=>{
        axios.get(Api.SEARCH_URL, {
            params: {
                'kw': kw,
                'latitude': lat,
                'longitude': lon,
                'city_id': city_id
            }
        })
        .then((response)=>{  
                let result = {
                    words: response.data.words,
                    restaurants:response.data.restaurants?response.data.restaurants.map(restaurant=>{
                        return {
                            name: restaurant.name,
                            image_path: handleImage(restaurant.image_path,24),
                            id: restaurant.id,
                            rating: restaurant.rating,
                            scheme: restaurant.scheme,
                            tags: restaurant.tags?restaurant.tags:null,
                        }
                    }):null,
                }
                resolve(result);
        })
        //请求失败
        .catch((error)=>{
            reject()
        })
    })
}

//获取热搜数据
//https://h5.ele.me/restapi/shopping/v3/hot_search_words?latitude=22.54286&longitude=114.059563
export function getHotSearchData(lat, lon){
    return new Promise((resolve, reject)=>{
        axios.get(Api.HOTSEARCH_URL, {
            params: {
                'latitude': lat,
                'longitude': lon,
            }
        })
        .then((response)=>{  
            let result = response.data.map(item=>{
                return{
                    word: item.word
                }
            })
            resolve(result);
        })
        //请求失败
        .catch((error)=>{

        })
    })
}

//搜索得到的商家推荐页面数据
//https://h5.ele.me/restapi/shopping/v2/restaurants/search?offset=0&limit=8&keyword=%E6%89%8B%E6%8A%93%E9%A5%BC&latitude=22.54286&longitude=114.059563&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5
export function getSearchInfo(offset, limit, keyword, lat, lon, search_item_type, is_rewrite){
    return new Promise((resolve, reject)=>{
        axios.get(Api.SEARCHDATA_URL, {
            params: {
                offset,                
                limit, 
                keyword,
                latitude: lat,
                longitude: lon,
                search_item_type, 
                is_rewrite,
                extras: ['activities', 'coupon'],
                terminal: 'h5'
            }
        })
        .then((response)=>{  
            let resultData = response.data.inside[0]?response.data.inside[0]:response.data.inside[3];
            let result = {
            filter:{
                multi:resultData.filter.multi?resultData.filter.multi[0].name:null,
                single:resultData.filter.single?resultData.filter.single.map(item=>{
                    return{
                        name: item.name
                    }
                }):null
            },
            restaurant:resultData.restaurant_with_foods.map(item=>{
                return{
                    id: item.restaurant.id,
                    img: handleImage(item.restaurant.image_path, 62),
                    name: item.restaurant.name,
                    distance: handleDistance(item.restaurant.distance),//距离
                    order_lead_time: item.restaurant.order_lead_time,//时间
                    rating: item.restaurant.rating,//星星分数
                    recent_order_num: item.restaurant.recent_order_num,//月单数
                    piecewise_description: item.restaurant.piecewise_agent_fee.description,//配送费
                    piecewise_rule_price: item.restaurant.piecewise_agent_fee.rules[0].price,//起送费
                    recommend: item.restaurant.recommend?{//口碑人气好店
                        color: item.restaurant.recommend.color,
                        image_hash: handleImage(item.restaurant.recommend.image_hash, 12),
                        reason: item.restaurant.recommend.reason
                    }:null,
                    delivery_mode:item.restaurant.delivery_mode?{//蜂鸟专送
                        color: item.restaurant.delivery_mode.color,
                        text: item.restaurant.delivery_mode.text,
                        text_color: item.restaurant.delivery_mode.text_color
                    }:null,
                    activities: item.restaurant.activities?item.restaurant.activities.map(act=>{
                        return {
                            icon_name: act.icon_name,
                            icon_color: act.icon_color,
                            description: act.description
                        }
                    }):null,
                    isShow: false,
                    isMore: false,
                    foods: item.foods?item.foods.map(food=>{
                        return {
                            image_path: handleImage(food.image_path, 84),
                            name: food.name,
                            price: food.price,
                            month_sales: food.month_sales,
                        }
                    }):null
                }
            })
        }
            resolve(result);
        })
        //请求失败
        .catch((error)=>{

        })
    })
}

//获取商家详情页数据
//https://h5.ele.me/restapi/shopping/restaurant/155170084?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification&terminal=h5&latitude=22.54286&longitude=114.059563
export function getDetailData(id, lat, lon){
    return new Promise((resolve, reject)=>{
        axios.get(Api.DETAIL_URL+id, {
            params: {
                extras: ['activities','albums','license','identification','qualification'],
                terminal: 'h5',
                latitude: lat,
                longitude: lon
            }
        })
        .then((response)=>{  
            let result = {
                name:response.data.name,
                img: handleImage(response.data.image_path, 62),
                rating: response.data.rating,
                order_lead_time: response.data.order_lead_time,
                recent_order_num: response.data.recent_order_num,
                distance: handleDistance(response.data.distance),
                promotion_info: response.data.promotion_info,
                activities: response.data.activities[0]?{
                    name:response.data.activities[0].icon_name,
                    color:response.data.activities[0].icon_color,
                    description:response.data.activities[0].description
                }:null
            }
            resolve(result);
        })
        //请求失败
        .catch((error)=>{

        })
    })
}

//获取商家菜单数据
//restaurant_id=161376533
export function getDetailMenuData(id){
    return new Promise((resolve,reject)=>{
        axios.get(Api.DETAILMENU_URL,{
            params: {
                restaurant_id: id
            }
        })
        .then((response)=>{
            let result = response.data.map(item=>{
                return{
                    name:item.name,
                    description: item.description,
                    foods: item.foods?item.foods.map(food=>{
                        return{
                            name:food.name,
                            img:handleImage(food.image_path,62),
                            description:food.description,
                            month_sales:food.month_sales,
                            price:food.specfoods[0].price,
                            original_price:food.specfoods[0].original_price,
                            benefit_text:food.activity?food.activity.benefit_text:null,
                            applicable_text:food.activity?food.activity.applicable_quantity_text:null
                        }                   
                    }):null
                }                
            })
            resolve(result);
        })
        .catch((error)=>{

        })
    })
}

//banner菜单详情导航请求
// entry_id=20008089
// longitude=114.059563
// latitude=22.54286
// terminal=h5
export function getBannerMenu(id, lat, lon){
    return new Promise((resolve, reject)=>{
        axios.get(Api.BANNERMENU_URL,{
            params:{
                entry_id: id,
                longitude: lon,
                latitude: lat,
                terminal: 'h5'
            }
        })
        .then(response=>{
            let result = response.data.map(item=>{
                return{
                    id: item.id,
                    name: item.name,
                    restaurant_ids: item.restaurant_category_ids,
                    isActive: 0
                }
            })
            resolve(result);
        })
        .catch(error=>{

        })
    })
}

// banner菜单详情请求
// latitude=22.54286
// longitude=114.059563
// keyword=
// offset=0
// limit=8
// extras[]=activities tags
// terminal=h5
// brand_ids[]=
// restaurant_category_ids[]=209
export function getBannerDetail(lat, lon, offset, limit, ids){
    return new Promise((resolve, reject)=>{
        axios.get(Api.BANNERDETAIL_URL,{
            params:{
                latitude:lat,
                longitude:lon,
                keyword:'',
                offset,
                limit,
                extras:['activities', 'tags'],
                terminal:'h5',
                brand_ids: [''],
                restaurant_category_ids: ids,
            }
        })
        .then(response=>{
            let result = response.data.items.map(item=>{
                return {
                    id: item.restaurant.id,
                    img: handleImage(item.restaurant.image_path, 62),
                    name: item.restaurant.name,
                    distance: handleDistance(item.restaurant.distance),//距离
                    order_lead_time: item.restaurant.order_lead_time,//时间
                    rating: item.restaurant.rating,//星星分数
                    recent_order_num: item.restaurant.recent_order_num,//月单数
                    piecewise_description: item.restaurant.piecewise_agent_fee.description,//配送费
                    piecewise_rule_price: item.restaurant.piecewise_agent_fee.rules[0].price,//起送费
                    recommend: item.restaurant.recommend?{//口碑人气好店
                        color: item.restaurant.recommend.color,
                        image_hash: handleImage(item.restaurant.recommend.image_hash, 12),
                        reason: item.restaurant.recommend.reason
                    }:null,
                    delivery_mode:item.restaurant.delivery_mode?{//蜂鸟专送
                        color: item.restaurant.delivery_mode.color,
                        text: item.restaurant.delivery_mode.text,
                        text_color: item.restaurant.delivery_mode.text_color
                    }:null,
                    activities: item.restaurant.activities?item.restaurant.activities.map(act=>{
                        return {
                            icon_name: act.icon_name,
                            icon_color: act.icon_color,
                            description: act.description
                        }
                    }):null,
                    isShow: false
                }
            })
            resolve(result);
        })
        .catch(error=>{

        })
    })
}