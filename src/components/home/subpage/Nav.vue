<template>
  <ul class="clearfix one-top-px one-bottom-px">
      <li><a class="select" href='javascript:'>点餐</a></li>
      <li><a href='javascript:'>评价</a></li>
      <li><a href='javascript:'>商家</a></li>
  </ul>
</template>

<script>
export default {
    name: 'sub-nav'
}
</script>

<style scoped>
ul{
    width: 100%; 
    display: flex;
    z-index: 6;
    background: #fff;
}
ul li{
    flex: 1;
    text-align: center;    
}
ul li a{  
    color: #666;
    font-size: 0.14rem; 
    line-height: 0.4rem;
    display: inline-block;
    box-sizing: border-box;
}
ul li a.select{
    color:#333; 
    font-weight: 600;
    border-bottom: 2px solid #0094ff;
}
.one-top-px::before{
    border-color: #f2f2f2;
}
</style>
