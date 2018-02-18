<template>
<div class="menu">
  <ul class="ban_menu">
      <li v-if='menuData' v-for="(item, index) in menuData" :key="index">
          <a :class="{active:item.isActive==1}" href="javascript:" @click="select(index)">{{item.name}}</a>
      </li>
  </ul>
</div> 
</template>

<script>
export default {
    name: 'sub-menu',
    props: {
        menuData: Array,
    },
    methods: {
        select(index){
            this.menuData.map((item)=>{
                item.isActive = 0
            });
            this.menuData[index].isActive = 1;
            this.$emit('select', index);
        }
    },
    mounted(){
        if(this.menuData){
            console.log(this.menuData);
        }

    }
}
</script>

<style scoped>
.menu{
    position: absolute;
    left: 0;
    top: 42px;
    z-index: 6;
    width: 100%;
    background-image: linear-gradient(90deg,#0af,#0085ff);
}
.ban_menu{
    width: 85%;
    overflow-x: auto;
    height: 40px;
    display: flex;
    align-items: center;
}
.ban_menu li{
    padding: 0 0.15rem;
    flex: none;
}
.ban_menu li a{
    display: inline-block;
    line-height: 0.3rem;
    box-sizing: border-box;
    color: #fff;
    opacity: 0.7;
    font-size: 0.14rem;
}
.ban_menu li a.active{
    border-bottom: 2px solid #fff;
    opacity: 1;
    font-weight: 600;
}
</style>
