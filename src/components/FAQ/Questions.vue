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
        <p v-if="ans">{{ props.ans }}</p>
    </div>
</template>

<style lang="scss" scoped>
.qaWrap{
    p{
        width: 75vw;
        display: block;
        margin: auto;
        @include desktop{
            font-size: 24px;
            margin: 0 auto;
            width: 55%;
        }
        
    }
    button{
        display:block;
        width: 80vw;
        height: auto;
        border: none;
        border-radius: 10px;
        background-color: $blue-2;
        color: $dark;
        margin: 10px auto;
        @include desktop{
            border-radius: 50px;
            margin: 30px auto;
            height: 4rem;
            width: 60%;
            border-radius: 30px;
        }

        h4{
            padding: 0.5rem 0.5rem;
            text-align: start;
            font-size: 20px;
            font-weight: 500;
            color: $dark;
            @include desktop{
                font-size: 28px;
                padding-left: 2rem;
            }
        }
    }

    @include desktop{
        width: 100%;
        margin: 0;
    }
}
</style>