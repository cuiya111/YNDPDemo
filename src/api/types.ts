// 响应数据
export interface Response {
    code: number;
    message: string;
    [property: string]: any;
}

// 车型数量
export interface CarType {
    carmodels: string;
    num: number;
    [property: string]: any;
}
// 车型列表
export type CarTypeList = CarType[];
// 车型列表响应数据
export interface CarTypeResponse extends Response{
    data: CarTypeList;
    [property: string]: any;
}


// 事故与天气的关系
export interface CarWeather {
    num: number;
    weacondition: string;
    [property: string]: any;
}
export type CarWeatherList = CarWeather[];
// 车辆与天气的关系响应数据
export interface CarWeatherResponse extends Response{
    data: CarWeatherList;
    [property: string]: any;
}


// 事故与年龄段的关系
export interface CarAge {
    groups: string;
    num: number;
    [property: string]: any;
}
export type CarAgeList = CarAge[];
// 车辆与年龄的关系响应数据
export interface CarAgeResponse extends Response{
    data: CarAgeList;
    [property: string]: any;
}


// 事故与年龄的关系
export interface CarAgeNum {
    age: number;
    total: number;
    [property: string]: any;
}
export type CarAgeNumList = CarAgeNum[];
// 车辆与年龄的关系响应数据
export interface CarAgeNumResponse extends Response{
    data: CarAgeNumList;
    [property: string]: any;
}

// 事故与月份的关系
export interface CarMonth {
    month: string;
    num: number;
    [property: string]: any;
}
export type CarMonthList = CarMonth[];
// 车辆与月份的关系响应数据
export interface CarMonthResponse extends Response{
    data: CarMonthList;
    [property: string]: any;
}


// 车辆颜色数量
export interface CarColor {
    carcolor: string;
    num: number;
    [property: string]: any;
}
// 车辆颜色列表
export type CarColorList = CarColor[];
// 车辆颜色列表响应数据
export interface CarColorResponse extends Response{
    data: CarColorList;
    [property: string]: any;
}

// 所有数据
export interface CarAllDate {
    carType: CarTypeList | null,
    weather: CarWeatherList | null,
    age: CarAgeList | null,
    ageNum: CarAgeNumList | null,
    month: CarMonthList | null,
    carColor: CarColorList | null,
    [property: string]: any;
}

// 汇总的最大值
export type Summary = [
    {name: string, max: number}?,
]