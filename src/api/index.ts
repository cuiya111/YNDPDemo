import { request } from "@/utils/request";
import type { 
    CarTypeResponse, 
    CarColorResponse,
    CarWeatherResponse, 
    CarAgeResponse,
    CarMonthResponse,
    CarAgeNumResponse
    } from "@/api/types";

enum API {
    //获取发生事故最多的车辆类型的地址
    CAR_TYPE_URL = '/event/carType',
    //获取不同车辆颜色的发生事故数量的地址
    CAR_COLOR_URL = '/event/carColor',
    //获取不同天气发生事故数量
    WEATHER_URL = '/event/weather',
    // 获取不同年龄段发生事故数量
    AGE_URL = '/event/age',
    // 获取不同年龄发生事故数量
    AGE_NUM_URL = '/event/ageNum',
    // 获取不同月份发生事故的数量
    MONTH_URL = '/event/month',
}

/**
 * 获取不同车辆类型发生事故数量
 * @returns {Promise<CarTypeResponse>} 车辆类型响应数据
 */
export function carType(){
    return request.get<any,CarTypeResponse>(API.CAR_TYPE_URL);
}

/**
 * 获取不同天气发生事故数量
 * @returns {Promise<CarWeatherResponse>} 不同天气发生事故数量
 */
export function carWeather(){
    return request.get<any,CarWeatherResponse>(API.WEATHER_URL);
}

/**
 * 获取不同年龄段发生事故数量
 * @returns {Promise<CarAgeResponse>} 不同年龄段发生事故数量
 */
export function carAge(){
    return request.get<any,CarAgeResponse>(API.AGE_URL);
}

/**
 * 获取不同年龄发生事故数量
 * @returns {Promise<CarAgeNumResponse>} 不同年龄段发生事故数量
 */
export function carAgeNum(){
    return request.get<any,CarAgeNumResponse>(API.AGE_NUM_URL);
}

/**
 * 获取不同月份发生事故的数量
 * @returns {Promise<CarMonthResponse>} 不同月份发生事故的数量
 */
export function carMonth(){
    return request.get<any,CarMonthResponse>(API.MONTH_URL);
}

/**
 * 获取不同车辆颜色发生事故数量
 * @returns {Promise<CarColorResponse>} 车辆颜色响应数据
 */
export function carColor(){
    return request.get<any,CarColorResponse>(API.CAR_COLOR_URL);
}