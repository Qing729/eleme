<template>
  <ul class="clearfix one-bottom-px">
      <li><a href='javascript:'>综合排序</a></li>
      <li><a href='javascript:'>距离最近</a></li>
      <li><a href='javascript:'>会员领红包</a></li>
      <li><a href='javascript:'>筛选</a></li>
  </ul>
</template>

<script>
export default {
    name: 'sub-nav'
}
</script>

<style scoped>
ul{
    position: absolute;
    left: 0;
    top: 82px;
    z-index: 6;
    background: #fff;
    width: 100%; 
    display: flex;
}
ul li{
    flex: 1;
    text-align: center;    
}
ul li a{  
    color: #666;
    font-size: 0.14rem; 
    line-height: 40px;
    display: inline-block;
    box-sizing: border-box;
}
.one-bottom-px::after{
    border-color: #f2f2f2;
}
</style>
