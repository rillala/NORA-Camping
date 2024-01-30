<script setup>
// 引入函式庫
import {ref,onMounted,onBeforeUnmount} from 'vue'

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

const nowWidth = ref(window.innerWidth);
function updataWidth(){
    nowWidth.value = window.innerWidth;
}
onMounted(() => {
    updataWidth();
    window.addEventListener('resize',updataWidth);
})
onBeforeUnmount(() => {
    window.removeEventListener('resize',updataWidth);  
})
</script>

<template>
    <div class="qaWrap">
        <button @click="ansOpen()"><h4>{{props.title}}</h4></button>
        <p v-if="ans  ">{{ props.ans }}</p>
    </div>
</template>

<style lang="scss" scoped>
.qaWrap{
    p{
        width: 75vw;
        display: block;
        margin: auto;
        @include desktop{
            font-size: 32px;
        }
    }
    button{
        display:block;
        width: 80vw;
        height: auto;
        border: none;
        border-radius: 10px;
        background-color: $blue-2;
        margin: 10px auto;
        @include desktop{
            border-radius: 30px;
            margin: 50px auto;
            height: 5rem;
        }

        h4{
            padding: 0.5rem 0.5rem;
            text-align: start;
            font-size: 20px;
            font-weight: 500;
            @include desktop{
                font-size: 32px;
            }
        }
    }

    @include desktop{
        width: 100%;
    }
}
</style>