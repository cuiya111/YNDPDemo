import { ref,computed } from "vue";
import { defineStore } from "pinia";
import type { 
    CarAgeList,
    CarTypeList,
    CarColorList,
    CarMonthList,
    CarWeatherList,
    CarAgeNumList,
    CarAllDate,
    Summary} from "@/api/types";
import { carAge,carMonth,carColor,carType,carWeather,carAgeNum } from "@/api/index";

export const useChartDataStore = defineStore("chartData", function(){

    const base_url = import.meta.env.VITE_BASE_URL;
    
    // 年龄段
    const carAgeList = ref<CarAgeList>([]);
    // 年龄
    const carAgeNumList = ref<CarAgeNumList>([]);
    // 车型
    const carTypeList = ref<CarTypeList>([]);
    // 车颜色
    const carColorList = ref<CarColorList>([]);
    // 月份
    const carMonthList = ref<CarMonthList>([]);
    // 天气
    const carWeatherList = ref<CarWeatherList>([]);

    // 汇总最大值
    const summary = computed(function(){
        let count: Summary = [];
        // 获取年龄段最大item
        if(carAgeList.value.length > 0){
            const maxItem = carAgeList.value.reduce((prev, curr) => {
                return prev.num > curr.num ? prev : curr;
            });
            count.push({name: maxItem.groups.replace("[","").replace("]","")+"岁",max: maxItem.num});
        }
        // 获取年龄最大item
        if(carAgeNumList.value.length > 0){
            const maxItem = carAgeNumList.value.reduce((prev, curr) => {
                return prev.total > curr.total ? prev : curr;
            });
            count.push({name: "年龄/"+maxItem.age.toString()+"岁",max: maxItem.total});
        }
        // 获取车型最大item
        if(carTypeList.value.length > 0){
            const maxItem = carTypeList.value.reduce((prev, curr) => {
                return prev.num > curr.num ? prev : curr;
            });
            count.push({name: "车型/"+maxItem.carmodels,max: maxItem.num});
        }
        // 获取车颜色最大item
        if(carColorList.value.length > 0){
            const maxItem = carColorList.value.reduce((prev, curr) => {
                return prev.num > curr.num ? prev : curr;
            });
            count.push({name: "车色/"+maxItem.carcolor,max: maxItem.num});
        }
        // 获取月份最大item
        if(carMonthList.value.length > 0){
            const maxItem = carMonthList.value.reduce((prev, curr) => {
                return prev.num > curr.num ? prev : curr;
            });
            count.push({name: "月份/"+maxItem.month+"月",max: maxItem.num});
        }
        // 获取天气最大item
        if(carWeatherList.value.length > 0){
            const maxItem = carWeatherList.value.reduce((prev, curr) => {
                return prev.num > curr.num ? prev : curr;
            });
            count.push({name: maxItem.weacondition,max: maxItem.num});
        }

        return count;

    });


    // 获取年龄段数据
    async function getCarAgeData() {
        const res = await carAge();
        carAgeList.value = res.data.map((item)=>{
            if(typeof item.num === "string"){
                item.num = parseInt(item.num);
            }
            return item;
        });
    }

    // 获取年龄数据
    async function getCarAgeNumData() {
        const res = await carAgeNum();
        carAgeNumList.value = res.data.map(function(item){
            if(typeof item.total === "string"){
                item.total = parseInt(item.total);
            }
            return item;
        });
    }
    // 获取车型数据
    async function getCarTypeData() {
        const res = await carType();
        carTypeList.value = res.data;
    }
    // 获取车颜色数据
    async function getCarColorData() {
        const res = await carColor();
        carColorList.value = res.data;
    }
    // 获取月份数据
    async function getCarMonthData() {
        const res = await carMonth();
        carMonthList.value = res.data;
    }
    // 获取天气数据
    async function getCarWeatherData() {
        const res = await carWeather();
        carWeatherList.value = res.data;
    }

    // 创建 SSE 连接
    function createEventSource() {
        const eventSource = new EventSource(`${base_url}/event/sse`);
        // 监听消息
        eventSource.onmessage = (event) => {
            const data: CarAllDate = JSON.parse(event.data);
            if(data.age){
                carAgeList.value = data.age.map(function(item){
                    if(typeof item.num === "string"){
                        item.num = parseInt(item.num);
                    }
                    return item;
                });
            }
            if(data.ageNum){
                carAgeNumList.value = data.ageNum.map(function(item){
                    if(typeof item.total === "string"){
                        item.total = parseInt(item.total);
                    }
                    return item;
                });
            }
            if(data.carType){
                carTypeList.value = data.carType;
            }
            if(data.carColor){
                carColorList.value = data.carColor;
            }
            if(data.month){
                carMonthList.value = data.month;
            }
            if(data.weather){
                carWeatherList.value = data.weather;
            }
        };
  
        // 监听错误
        eventSource.onerror = (error) => {
          console.error('SSE Error:', error);
          if (eventSource.readyState === EventSource.CLOSED) {
            console.log('Connection closed. Reconnecting...');
            setTimeout(() => {
              createEventSource(); // 重新创建连接
            }, 5000); // 等待 5 秒后重连
          }
        };
      }

    return {
        carAgeList,
        carTypeList,
        carColorList,
        carMonthList,
        carWeatherList,
        carAgeNumList,
        summary,
        getCarAgeData,
        getCarTypeData,
        getCarColorData,
        getCarMonthData,
        getCarWeatherData,
        getCarAgeNumData,
        createEventSource
    }
});