<template>
    <div class="info-block">
        <div class="count">{{ count }}</div>
        <div class="title">{{ title }}</div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "InfoBlock"
    }
</script>

<script lang="ts" setup>
    defineProps<{
        count: string;
        title: string;
    }>();
</script>

<style scoped lang="scss">
.info-block {
    box-sizing: border-box;
    width: px2vw(139);
    // height: px2vh(68);
    padding: px2vh(10) px2vw(12);
    text-align: center;
    background: rgba(47, 109, 255, 0.1);
    color: #fff;
    box-sizing: border-box;
    border: px2vw(1) solid;
    border-image: linear-gradient(116deg, #2F6DFF 0%, rgba(255, 255, 255, 0.5411) 50%, #2F6DFF 100%) 1;

    .count{
        font-size: px2vw(16);
        font-weight: normal;  
    }

    .title{
        font-size: px2vw(12);
        margin-top: px2vh(8);
        font-family: 'Source Han Sans', sans-serif;
        font-weight: 400;
    }
}
</style>