<template>
    <div :style="fontstyle">
        <!-- {{rate}} -->
        <div class="rate" @mouseout="mouseOut">
            <span @mouseover="mouseOver(num)" v-for="num in 5" :key="num">☆</span>
            <span class="hollow" :style="fontwidth">
                <span @click="onRate(num)" @mouseover="mouseOver(num)" v-for="num in 5" :key="num">★</span>
            </span>
        </div>
        <!-- 插槽  -->
        <slot></slot>
    </div>
</template>
<script setup>
import { defineProps,defineEmits,computed,ref } from 'vue';
let props = defineProps({
    modelValue:Number,
    theme:{type:String,default:'orange'}
});
console.log(props);
// let rate = computed(() => "★★★★★☆☆☆☆☆".slice(5 - props.value,10 - props.value));

const themeObj = {
    'black': '#00',
    'white': '#fff',
    'red': '#f5222d',
    'orange': '#fa541c',
    'yellow': '#fadb14',
    'green': '#73d13d',
    'blue': '#40a9ff'
}

const fontstyle = computed(() => {
    return `color:${themeObj[props.theme]};`
});

let width = ref(props.modelValue);

function mouseOver(i){
    width.value = i;
}

function mouseOut(){
    width.value = props.modelValue;
}

const fontwidth = computed(() => `width:${width.value}em;`);


let emits = defineEmits(['update:modelValue']);

// 接收父组件传过来的方法
// let emits = defineEmits('update-rate');
function onRate(num){
        // 这里是自定义的方法名 以及要改变的值
        // 个人认为应该是调用父组件的方法 
        // 然后使用这个方法并传入一个参数来在方法内修改父组件那边的变量
        // emits('update-rate',num);
        // 这里是通知父组件值已被修改
        emits('update:modelValue',num);
}
</script>

<style scoped>
body{
    margin:0;
    padding:20px;
}

html,body{
    font-family: serif;
}
.rate{
    position: relative;
    display: inline-block;
}
.rate > span.hollow{
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    width: 0;
    overflow: hidden;
}
</style>