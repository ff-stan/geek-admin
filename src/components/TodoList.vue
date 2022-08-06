<template>
    <div>
        <input type="text" v-model="title" @keydown.enter="addTodo">
        <button v-if="active < all" @click="clear">清理</button>
        <ul v-if="todos.length">
            <transition-group name="flip-list" tag="ul">
                <li v-for="(todo,i) in todos" :key="todo.title">
                    <input type="checkbox" v-model="todo.done">
                    <span :class="{ done:todo.done }">{{ todo.title }}</span>
                    <span class="remove-btn" @click="removeTodo($event,i)">
                        ❌
                    </span>
                </li>
            </transition-group>
        </ul>
        <div v-else>暂无数据</div>
        <div>
            全选<input type="checkbox" v-model="allDone">
            <span>{{ active }} / {{ all }}</span>
        </div>
        <transition name="modal">
            <div class="info-wrapper" v-if="showModal">
                <div class="info">
                    未输入内容...
                </div>
            </div>
        </transition>
    </div>
</template>
<script setup>
import {userTodos} from '../utils/userTodos.ts';
let { title,todos,addTodo,clear,active,all,allDone,showModal,removeTodo } = userTodos();
</script>
<style lang="scss" scoped>
$padding:2em;
$white:#fff;
ul{
    width: 500px;
    margin: 0 auto;
    padding: 0;
    li{ 
        &:hover{
            cursor: pointer;
        }
        list-style: none;
        margin-bottom: $padding;
        padding: $padding;
        background-color: $white;
        box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
    }
}
.info-wrapper{
    position: fixed;
    top: 20px;
    width: 200px;
}
.info{
    padding: 20px;
    color:white;
    background: #d88986;
}
.modal-enter-from,
.modal-leave-to{
    opacity: 0;
    transform: translateY(-60px);
}
.modal-enter-active,
.modal-leave-active{
    transition:  all 0.3s ease;
}
.flip-list-move{
    transition: transform 0.8s ease;
}

.flip-list-enter-from,
.flip-list-leave-to{
    opacity: 0;
    transform:  translateX(30px);
}

.flip-list-enter-active,
.flip-list-leave-active{
    transition: all 1s ease;
}
</style>