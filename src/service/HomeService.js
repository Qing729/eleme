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
                    search_word: item.search_word
                }
            })
            resolve(result);
        })
        //请求失败
        .catch((error)=>{

        })
    })
}