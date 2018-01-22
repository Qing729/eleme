<template>
  <span class="star_score">
        <b>
            <img :src='img_path1' v-for="item in solid_num"/>
            <img :src='img_path2' v-if="isShow"/>
            <img :src='img_path3' v-for="item in hollow_num"/>
        </b>
        <b>{{score}}</b>
  </span>
</template>

<script>
export default {
    name: 'star-score',
    props: {
        score: Number
    },
    data(){
        return{
            img_path1:"../../../static/images/star_01.jpg",
            img_path2:"../../../static/images/star_02.jpg",
            img_path3:"../../../static/images/star_03.jpg",
            solid_num:0,
            hollow_num:0,
            isShow:false
        }
    },
    methods:{
        handleStar(score){
            const numInt = Math.floor(Number(score));
            const numFloat = Number(score)*10%10;
            this.solid_num = numInt;
            if(5-numInt>0){
                if(numFloat>0){
                    this.isShow=true;
                }else{
                    this.hollow_num=1;
                }
                this.hollow_num=this.hollow_num+(4-numInt);
            }
        }
    },
    mounted(){
         this.handleStar(this.score);
    }

}

</script>

<style scoped>
.star_score b{
    display: block;
    float: left;
    margin-right: 0.03rem;
}
.star_score b img{
    float: left;
    width: 0.12rem;
    height: 0.12rem;
    margin-top: 0.03rem;
}
</style>
