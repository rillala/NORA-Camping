<script setup>
// 引入函式庫
import {ref} from 'vue'
import Questions from './Questions.vue';

const props = defineProps({
    title:{
        type:String,
        default:'you忘記輸入標題ㄌ',
    },
    QAs:{
        type:Array,
        default:()=>[],
    }
}); 

const types = ref(false);
const typeOpen = () => {
    types.value = !types.value;
};
</script>

<template>
    <button :class="{active:types}" @click="typeOpen()"><h4>{{props.title}}</h4></button>
    <div v-for="(data,index) in QAs" :key="index">
        <Questions v-if="types" :title="data.title" :ans="data.ans"/>
    </div>
</template>

<style lang="scss" scoped>
// @import url(../../assets/sass/_mixin.scss);
button{
    display:block;
    width: 80vw;
    height: 20vw;
    border: none;
    border-radius: 10px;
    background-color: $blue-1;
    margin: 10px auto;

    h4{
        font-weight: bold;
    }
    &:hover{
        background-color: $blue-3;
        color: $white01;
    }
    
    @include desktop{
        width: 15vw;
        height: 5vw;
        margin:  auto;
    }
}
.active{
    background-color: $blue-3;
    color: $white01;
}
</style>