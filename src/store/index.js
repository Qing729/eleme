import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import locationModule from './location'
// const state = {
//     //纬度
//     latitude: 22.54286,
//     // 经度
//     longitude: 114.0595
// }
// const getters = {
//     //计算属性
//     count(state){
//         return state.latitude + state.longitude;
//     }
// }
// const mutations = {
//     //修改方法
//     modifylatAndlon(state, param){
//         console.log(param);
//         state.latitude = param.lat;
//         state.longitude = param.lon;
//     }
// }
// const actions = {
//     //修改方法，包含逻辑处理
//     modifylatAndlonAct(context, action){
//         console.log(action);
//         context.commit('modifylatAndlon',action);
//     }
// }
//创建全局状态管理的仓库
// const store = new Vuex.Store({
//     //配置仓库拥有的所有内容

//     //全局状态
//     //在外部访问：组件的dom结构中$store.state 组件的js中this.$store.state
//     //外部不能直接修改state，将修改操作放在mutations
//     state: state,
    
//     //全局计算状态
//     getters: getters,
    
//     //修改全局状态的方法
//     //key值为修改的方法名字，value为修改state具体操作
//     mutations: mutations,
    
//     //包含了逻辑处理的代码、事件
//     actions: actions,
    
//     //将状态划分成模块
//     modules: {}
// })

export default new Vuex.Store({
    modules: {
        //key值：模块名字，在外部访问，就直接使用这个名字
        //value值：模块对象
        location: locationModule
    }
});