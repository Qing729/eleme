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

/*
搜索得到的页面的请求接口
offset=0
limit=8
keyword=%E6%89%8B%E6%8A%93%E9%A5%BC
latitude=22.54286
longitude=114.059563
search_item_type=3
is_rewrite=1
extras[]=activities
extras[]=coupon
terminal=h5
*/
//https://h5.ele.me/restapi/shopping/v2/restaurants/search?offset=0&limit=8&keyword=%E6%89%8B%E6%8A%93%E9%A5%BC&latitude=22.54286&longitude=114.059563&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5
const SEARCHDATA_URL = '/restapi/shopping/v2/restaurants/search';

/*
商家详情页请求接口
extras[]=activities albums license identification qualification
terminal=h5
latitude=22.54286
longitude=114.059563
//https://h5.ele.me/restapi/shopping/restaurant/155170084?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification&terminal=h5&latitude=22.54286&longitude=114.059563
*/
const DETAIL_URL = '/restapi/shopping/restaurant/';

/*
商家菜单请求接口
restaurant_id=161376533
//https://h5.ele.me/restapi/shopping/v2/menu?restaurant_id=161376533
*/
const DETAILMENU_URL = '/restapi/shopping/v2/menu';

/*
banner菜单详情导航请求接口
entry_id=20008089
longitude=114.059563
latitude=22.54286
terminal=h5
//https://h5.ele.me/restapi/shopping/v2/foods_page/sift_factors?entry_id=20008089&longitude=114.059563&latitude=22.54286&terminal=h5
*/
const BANNERMENU_URL = '/restapi/shopping/v2/foods_page/sift_factors';

/*
banner菜单详情请求接口
latitude=22.54286
longitude=114.059563
keyword=
offset=0
limit=8
extras[]=activities tags
terminal=h5
brand_ids[]=
restaurant_category_ids[]=209
//https://h5.ele.me/restapi/shopping/v3/restaurants?latitude=22.54286&longitude=114.059563&keyword=&offset=0&limit=8&extras[]=activities&extras[]=tags&terminal=h5&brand_ids[]=&restaurant_category_ids[]=209
*/
const BANNERDETAIL_URL = '/restapi/shopping/v3/restaurants';

/*
发现页面数据请求接口
latitude=22.54286
longitude=114.059563
offset=0
limit=6
//https://h5.ele.me/restapi/shopping/v1/find/recommendation?latitude=22.54286&longitude=114.059563&offset=0&limit=6
*/
const DISCOVER_URL = '/restapi/shopping/v1/find/recommendation';

/*
platform=2
block_index=0
latitude=22.54286
longitude=114.059563
//https://h5.ele.me/restapi/member/v1/discover?platform=2&block_index=0&latitude=22.54286&longitude=114.059563
*/
const DISCOVERMENU_URL = '/restapi/member/v1/discover';

/*
//https://h5.ele.me/restapi/member/gifts/suggest
*/
const DISCOVETIME_URL = '/restapi/member/gifts/suggest';

export default {
    IMAGE_HOST,
    BANNER_URL,
    ADDRESS_URL,
    SEARCHADDRESS_URL,
    SELLER_URL,
    SEARCH_URL,
    HOTSEARCH_URL,
    SEARCHDATA_URL,
    DETAIL_URL,
    DETAILMENU_URL,
    BANNERMENU_URL,
    BANNERDETAIL_URL,
    DISCOVER_URL,
    DISCOVERMENU_URL,
    DISCOVETIME_URL
}