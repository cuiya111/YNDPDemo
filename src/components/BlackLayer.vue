<template>
    <div class="blackLayer">
        <!-- 左侧黑色透明背景 -->
        <div class="black left-black"></div>
        <!-- 右侧黑色透明背景 -->
        <div class="black right-black"></div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "BlackLayer"
    }
</script>

<script lang="ts" setup>

</script>

<style scoped lang="scss">
.blackLayer{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    box-sizing: border-box;
    background-image: url(../assets/banner.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    z-index: -1;

    .black{
        width: 50%;
        height: 100%;
    }
    .left-black{
        border-radius: 0 50% 50% 0;
        background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    }
    .right-black{
        border-radius: 50% 0 0 50%;
        background: linear-gradient(270deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    }
}
</style>