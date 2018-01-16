<template>
  <header class="header">
      <div class="address">广东省深圳市宝安区</div>
      <div class="search"><span>搜索商家、商品名称</span></div>
  </header>
</template>

<script>
export default {
    name: 'home-header'
}
</script>

<style>
.header{
    width: 100%;
    height: 0.9rem;
    background-image: linear-gradient(90deg,#0af,#0085ff);
}
.header .address{
    height: 0.42rem;
    padding-left: 0.2rem;
    line-height: 0.42rem; 
    color: #fff;
    font-size: 0.14rem;
}
.header .search{
    height: 0.48rem; 
}

</style>
