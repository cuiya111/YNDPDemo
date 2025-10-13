<template>
    <div class="chart-frame">
        <div class="header">
            <!-- 图标 -->
            <img :src="iconUrl" class="icon" />
            <!-- 标题 -->
            <div class="title">{{ title }}</div>
            <!-- 边框 -->
            <img class="border" src="../../assets/chart/chart-frame.png">
        </div>
        <!-- 默认插槽 -->
        <div class="show">
            <slot name="default"></slot>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "ChartFrame"
    }
</script>

<script lang="ts" setup>

    import { onMounted, ref } from "vue";
    import iconWhite from "@/assets/chart/round-white.png";
    import iconBlue from "@/assets/chart/round-blue.png";

    type iconType = "white" | "blue";

    let iconUrl = ref(iconWhite);

    const props = withDefaults(
        defineProps<{
            title: string;
            icon?: iconType;
        }>(),
        {
            icon: "white"
        }
    );

    onMounted(() => {
        if (props.icon === "blue") {
            iconUrl.value = iconBlue;
        }
    });

</script>

<style scoped lang="scss">
.chart-frame{
    width: px2vw(470);
    // margin-bottom: px2vh(8);

    .show{
        width: 100%;
        height: px2vh(270);
        display: flex;
        justify-content: center;
        // background-color: #bfa;
    }

    .header{
        display: flex;
        width: 100%;
        // height: px2vh(30);
        align-items: center;
        position: relative;
        margin-bottom: px2vh(15);

        .icon{
            width: px2vw(12);
            margin-right: px2vw(5);
            display: block;
        }
        .title{
            font-size: px2vw(18);
            font-weight: normal;
            letter-spacing: 0em;
            color: #FFFFFF;
        }
        .border{
            width: 100%;
            display: block;
            position: absolute;
            top: px2vh(8);
        }
    }
}
</style>