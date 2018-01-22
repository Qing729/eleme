const IMAGE_HOST = 'http://fuss10.elemecdn.com/';
/*
首页banner轮播图接口
参数：
latitude：纬度    =22.54286
longitude:经度    =114.059563
templates[]:...   =main_template  favourable_template  svip_template
*/
//https://h5.ele.me/restapi/shopping/openapi/entries?latitude=22.54286&longitude=114.059563&templates[]=main_template&templates[]=favourable_template&templates[]=svip_template
const BANNER_URL = '/restapi/shopping/openapi/entries';

/*
首页地址定位接口
参数：
latitude：纬度   =22.54286
longitude：经度  =114.059563
*/
//https://h5.ele.me/restapi/bgs/poi/reverse_geo_coding?latitude=22.54286&longitude=114.059563
const ADDRESS_URL = '/restapi/bgs/poi/reverse_geo_coding';
/*
地址搜索接口
keyword=%E6%B7%B1
offset=0
limit=20
latitude=22.609725
longitude=114.029113
*/
//https://h5.ele.me/restapi/bgs/poi/search_poi_nearby?keyword=%E6%B7%B1&offset=0&limit=20&latitude=22.609725&longitude=114.029113
const SEARCHADDRESS_URL = '/restapi/bgs/poi/search_poi_nearby';

/*
首页推荐商家请求接口
参数：
latitude=22.54286
longitude=114.059563
offset=0
limit=12
extras[]=activities   tags
extra_filters=home
rank_id=984553df2830414c9058eaff4b63bbaa
terminal=h5
*/
//https://h5.ele.me/restapi/shopping/v3/restaurants?latitude=22.54286&longitude=114.059563&offset=16&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=dc974447a8e94852a14327cfe1b06570&terminal=h5
const SELLER_URL = '/restapi/shopping/v3/restaurants';

/*
搜索页面搜索请求接口
参数：
kw：搜索内容  =
latitude：纬度     =22.54286
longitude：经度    =114.059563
city_id：城市id    =11
*/
//https://h5.ele.me/restapi/shopping/v1/typeahead?kw=l&latitude=22.54286&longitude=114.059563&city_id=11
const SEARCH_URL = '/restapi/shopping/v1/typeahead';

/*
搜索页面热搜请求接口
latitude=22.54286
longitude=114.059563
*/
//https://h5.ele.me/restapi/shopping/v3/hot_search_words?latitude=22.54286&longitude=114.059563
const HOTSEARCH_URL = '/restapi/shopping/v3/hot_search_words';

export default {
    IMAGE_HOST,
    BANNER_URL,
    ADDRESS_URL,
    SEARCHADDRESS_URL,
    SELLER_URL,
    SEARCH_URL,
    HOTSEARCH_URL
}