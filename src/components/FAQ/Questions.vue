<script setup>
// 引入函式庫
import {ref} from 'vue'

const props = defineProps({
    title:{
        type:String,
        default:'A忘記輸入標題ㄌ',
    },
    ans:{
        type:String,
    }
});

const ans = ref(false);
const ansOpen = () => {
    ans.value = !ans.value;
};
</script>

<template>
    <div>
        <button @click="ansOpen()"><h4>{{props.title}}</h4></button>
        <p v-if="ans">{{ props.ans }}</p>
    </div>
</template>

<style lang="scss" scoped>
p{
    width: 75vw;
    display: block;
    margin: auto;
}
button{
    display:block;
    width: 80vw;
    height: auto;
    border: none;
    border-radius: 10px;
    background-color: $blue-2;
    margin: 10px auto;

    h4{
        padding: 0.5rem 0.5rem;
        text-align: start;
        font-size: 20px;
        font-weight: 500;
    }

}
</style>