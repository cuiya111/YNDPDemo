<template>
    <ChartFrame title="各项信息最大值统计">
        <div class="summary">
            <div class="box-list">
                <InfoBlock v-for="(item,index) in chartData.summary" :key="index" :title="item!.name" :count="item!.max.toString()" class="box"></InfoBlock>
            </div>
        </div>
    </ChartFrame>
</template>

<script lang="ts">
    export default {
        name: "Summary"
    }
</script>

<script lang="ts" setup>
    import { onMounted } from "vue";
    import InfoBlock from './InfoBlock.vue';
    import { useChartDataStore } from "@/store/index";
    import ChartFrame from "@/components/ChartFrame/index.vue";

    const chartData = useChartDataStore();

    onMounted(() => {
        // 请求年龄事故统计数据
        chartData.getCarAgeNumData();
    });
    
</script>

<style scoped lang="scss">
.summary{
    width: 100%;
}
.box-list{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-top: px2vh(47);
    justify-content: space-between;

    .box{
        margin-bottom: px2vh(47);
    }
}
</style>