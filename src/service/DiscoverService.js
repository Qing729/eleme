import axios from 'axios'
import Api from '../api'
import {handleImage} from '../util/handleImage'
import {handleDistance} from '../util/handleDistance'

//获取discover页面数据
export function getDiscoverdata(lat, lon, offset, limit){
    return new Promise((resolve, reject)=>{
        axios.get(Api.DISCOVER_URL, {
            params: {
                latitude:lat,
                longitude:lon,
                offset,
                limit
            }
        })
        .then((response)=>{
            let result = response.data.items.map(item=>{
                return{
                    name: item.food.name,
                    img: handleImage(item.food.image_path, 160),
                    id: item.food.id,
                    month_sales: item.food.month_sales,
                    satisfy_rate: item.food.satisfy_rate,
                    price: item.food.price,
                    original_price: item.food.original_price,
                    restaurant_name: item.food.restaurant_name
                }
            })
            resolve(result);
        })
        //请求失败
        .catch((error)=>{

        })
    })
}

export function getDiscovermenu(platform, block_index, latitude, longitude){
    return new Promise((resolve, reject)=>{
        axios.get(Api.DISCOVERMENU_URL, {
            params: {
                platform,
                block_index,
                latitude,
                longitude
            }
        })
        .then((response)=>{
            let result = response.data[1].map(item=>{
                return{
                    title: item.title,
                    title_color: item.title_color,
                    subtitle: item.subtitle,
                    img: handleImage(item.main_pic_hash, 42),
                }
            })
            resolve(result);
        })
        //请求失败
        .catch((error)=>{

        })
    })
}

export function getDiscovertime(){
    return new Promise((resolve, reject)=>{
        axios.get(Api.DISCOVETIME_URL)
        .then((response)=>{
            let result = response.data.map(item=>{
                return{
                    corner_marker: item.corner_marker,
                    title: item.title,
                    points_required: item.points_required,
                    original_price: item.original_price,
                    img: handleImage(item.image_hash, 100),
                }
            })
            resolve(result);
        })
        //请求失败
        .catch((error)=>{

        })
    })
}
