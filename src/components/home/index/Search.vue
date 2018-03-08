<template>
  <div class="search" :class="{active: isActive}">
      <router-link to="/home/search">搜索商家、商品名称</router-link>
  </div>
</template>

<script>
export default {
    name: 'search-bar',
    props: {
        isActive: Boolean
    }
}
</script>

<style scoped>
.search{
    height: 48px; 
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(90deg,#0af,#0085ff);
}
.search.active{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
}
.search a{
    display: block;
    width: 3.33rem;
    height: 34px;
    background: #fff;
    text-align: center;
    line-height: 34px;
    color: #cccccc
}
</style>
