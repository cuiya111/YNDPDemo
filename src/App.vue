<template>
    <div class="container">
        <!-- 1. 始终显示 Globe 组件，传递点击中国的回调 -->
        <!-- <Globe @click-china="handleClickChina" /> -->
        <Globe/>
        <!-- <China/> -->
        <!-- 2. 条件渲染 China 组件：点击中国后才显示 -->
        <!-- <China v-if="showChinaMap" /> -->
        

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
    // import China from './components/ChartList/China.vue';
    import Globe from './components/ChartList/Globe.vue';
    // import BlackLayer from './components/BlackLayer.vue';  // 黑色渐变背景层
    
    import Header from './components/Header/index.vue'; // 导航栏
    
    import Main from './components/Main.vue'; // 主体内容
</script>

<style scoped lang="scss">
.container{
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    position: relative;
    background-color: black;
    padding: px2vh(25) px2vw(25);

    .screen{
        width: 100%;
        height: 100%;
    }
}
</style>