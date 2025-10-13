<template>
    <div class="container">
        <!-- 背景组件 -->
        <!-- <BlackLayer/> -->
        <!-- 大屏显示区域 -->
        <div class="screen">
            <!-- 导航栏 -->
            <Header></Header>
            <!-- 主体内容 -->
            <Main></Main>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "App"
    }
</script>

<script lang="ts" setup>
    // 背景和黑色遮罩层
    import BlackLayer from './components/BlackLayer.vue';
    // 导航栏
    import Header from './components/Header/index.vue';
    // 主体内容
    import Main from './components/Main.vue';
</script>

<style scoped lang="scss">
.container{
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    position: relative;
    padding: px2vh(25) px2vw(25);

    .screen{
        width: 100%;
        height: 100%;
    }
}
</style>