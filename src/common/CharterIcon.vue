<template>
  <span class="icon" :style="{background: '#'+color}">{{name}}</span>
</template>

<script>
export default {
    name: 'charter-icon',
    props: {
        name: String,
        color: String
    }
}
</script>

<style scoped>
.icon {
    color: #fff;
    line-height: 0.14rem;
    padding: 0 0.02rem;
    border-radius: 0.02rem;
    margin-right: 0.05rem;
}
</style>
