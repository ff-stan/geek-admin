<template>
    <div>
        <h1>
            这是关于页面
        </h1>
        <FullScreenToggle />
        <h1>你的评分是{{ score }}</h1>
        <!-- @update-rate就是传给子组件的自定义的方法名 -->
        <!-- <Rate :value="score" @update-rate="update"> </Rate> -->
        <!-- model绑定监听数据 -->
        <Rate v-model="score"> </Rate>
        <Rate v-model="score">
            <!-- 传入子元素会被渲染在slot标签的位置 -->
            <img width="14" src="/geek.svg" alt="">
        </Rate>
        <Heading :level="3">hello Amadeus</Heading>
        
    </div>
</template>
<script setup>
import { ref } from 'vue'
import FullScreenToggle from '../components/FullScreenToggle.vue';
import Rate from '../components/Rate.vue';
import Heading from '../components/Heading'
let score = ref(3.5);
// 应该是只有调用父组件的方法才能访问到对应的变量 才能做到响应式修改
// 在子组件中修改props传递的值是不会相应给父组件的
function update(num) {
    score.value = num
}
</script>   