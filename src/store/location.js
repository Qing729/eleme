const state = {
    latitude: null,
    longitude: null,
    address: '',
    city_id: Number
};
const mutations = {
    modifylatAndlon(state, param){
        console.log(param);
        state.latitude = param.lat;
        state.longitude = param.lon;
    },
    modifyAddress(state, param){
        state.address = param;
    },
    modifyCity(state, param){
        state.city_id = param;
    }
};
const actions = {
    //获取经度和纬度
    initLoaction(module){
        //执行定位
        setTimeout(() => {
            let lat = '22.54286';
            let lon = '114.0595';
            module.commit('modifylatAndlon', {lat, lon});
        }, 0);
    },
    modifyAddressAction(module, param){
        module.commit('modifyAddress', param.address)
    },
    modifyCityAction(module, param){
        module.commit('modifyCity', param.city_id)
    },
    modifyLocationAction(module, param){
        module.commit('modifylatAndlon', {lat:param.lat, lon:param.lon});
        module.commit('modifyAddress', param.address);
        module.commit('modifyCity', param.city_id)
    },
};
const locationModule = {
    namespaced: true,//拥有独立的命名空间
    state,
    mutations,
    actions
}
export default locationModule;