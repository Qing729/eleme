<template>
    <header class="header">
        <span class="iconfont icon-left" @click="goback()"></span>
        <h3>{{title}}</h3>
    </header> 
</template>

<script>
export default {
    name: 'header-app',
    props: {
        title: String
    },
    methods:{
        goback(){
            this.$emit('goback')
        }
    }
}
</script>

<style scoped>
.header{
    width: 100%;
	height: 0.42rem;
	background-image: linear-gradient(90deg,#0af,#0085ff);
	color: #fff;
	text-align: center;
	line-height: 0.42rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 6;
}
.header h3{
	font-size: 0.18rem;
}
.header span{
    position: absolute;
    left: 0.1rem;
    font-size: 0.18rem;
}
</style>
