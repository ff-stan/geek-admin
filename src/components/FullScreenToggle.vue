<!-- @切换全屏组件 -->
<template>
<div>
        <h1 @click="getList">发送get请求</h1>
        <h1 @click="postFrom">发送post请求</h1>
</div>    
</template>
<script setup>
import api from '../api/api'
function getList (){
        api.getListAPI('/admin/movie').then(res => {
                console.log(res);
        }).catch(err => console.log(err))
}

let data = {userName:"Amadeus",
                token:"5a96f1803a48b4dc8d1e126c4e70e17b",
                id:"622d8bd8f08798ff8d580b98",
                userId:"622c4c41a8bc7153b47d157b"}
function postFrom (){
        api.postFormAPI('/admin/stopUser',data).then(res => {
                console.log(res);
        }).catch(err => console.log(err))
}
</script>
<style>
    
</style>