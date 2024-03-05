<script setup>
// 引入函式庫
import {ref,onMounted,onBeforeUnmount} from 'vue'
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

//windows width
const nowWidth = ref(window.innerWidth);
function updataWidth(){
    nowWidth.value = window.innerWidth;
}
onMounted(() => {
    updataWidth();
    window.addEventListener('resize',updataWidth);
})
onBeforeUnmount(()=>{
    window.removeEventListener('resize',updataWidth);
})
const DESKTOP = 1024;
</script>

<template>
    <button :class="{active:types}" @click="typeOpen()"><h4>{{props.title}}</h4></button>
    <Questions v-for="(data,index) in QAs" :key="index" v-if=" nowWidth < DESKTOP && types" :title="data.question" :ans="data.answer"/>
</template>

<style lang="scss" scoped>

button{
    display:block;
    width: 80vw;
    height: 20vw;
    border: none;
    border-radius: 10px;
    background-color: $blue-2;
    color: $dark;
    margin: 10px auto;
    @include desktop{
            border-radius: 30px;
        }
    h4{
        font-weight: bold;
    }
    &:hover{
        background-color: $blue-3;
        color: $white01;
    }
    
    @include desktop{
        width: 15vw;
        height: 3rem;
        margin:  auto;
    }
}
.active{
    background-color: $blue-3;
    color: $white01;
}
</style>