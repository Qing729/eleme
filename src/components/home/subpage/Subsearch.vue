<template>
    <header class="header">
        <span class="iconfont icon-left" @click="goback()"></span>
        <input type="search" placeholder="请输入商家、商品名称" v-model="sear_val">
        <b @click="search()">搜索</b>
    </header>
</template>

<script>
export default {
    name:'sub-search',
    data(){
        return{
            sear_val:''
        }
    },
    watch:{
        sear_val(){
            this.$emit('getVal',this.sear_val)
        }
    },
    methods:{
        goback(){
            this.$router.back();
        },
        search(){
           this.$emit('startSearch')
        }
    }
}
</script>

<style scoped>
.header{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 0.48rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 0.1rem;
    z-index: 6;
    background: #fff;
}
.header span{
    font-size: 0.18rem;
    font-weight: 600;
}
.header input{
    width: 2.6rem;
    height: 0.26rem;
    background: #f7f7f7; 
    color: #666;
    border:0;
    outline: none;
    box-sizing: border-box;
    padding: 0 0.1rem;
}
.header b{
    font-size: 0.16rem;
    font-weight: 600;
}
</style>
