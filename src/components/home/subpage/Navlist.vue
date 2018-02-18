<template>
    <nav class="nav">
        <ul>
            <li>分类</li>
            <li>综合排序</li>
            <li>筛选</li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'nav-list',
}
</script>

<style scoped>
.nav{
    background: #fff;
    z-index: 6;
    position: absolute;
    top: 0.48rem;
    left: 0;
    width: 100%;
}
.nav ul{
    display: flex;
    width: 100%;
    height: 0.4rem;
}
.nav ul li{
    flex: 1;
    text-align: center;
    line-height: 0.4rem;
    font-size: 0.14rem;
}
</style>
