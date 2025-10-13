<template>
    <div class="filter-button">
        <div class="text">分析数据源筛选</div>
        <img src="../../assets/bot-icon.png" class="bot-icon">
    </div>
</template>

<script lang="ts">
    export default {
        name: "FilterButton"
    }
</script>

<script lang="ts" setup>

</script>

<style scoped lang="scss">
.filter-button{
    display: inline-flex;
    align-items: center;
    padding: px2vh(14) px2vw(12);
    background: rgba(47, 109, 255, 0.2);
    cursor: pointer;
    border-radius: px2vw(3.5);
    border: px2vw(1) solid rgba(47, 109, 255, 1.00);

    .text{
        margin-right: px2vw(7);
        color: #fff;
        font-size: px2vw(16);
    }

    .bot-icon{
        display: block;
        width: px2vw(12);
    }

}
</style>