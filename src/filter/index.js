import Vue from 'vue'

// 定义函数，用于格式化金额
const money = val => Number(val).toFixed(2)

// 注册全局过滤器
Vue.filter('money', money)
