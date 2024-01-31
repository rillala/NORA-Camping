<script setup>
// 引入函式庫
import {ref,onBeforeUnmount,onMounted} from 'vue';
const props = defineProps({
    title:{
        type:String,
        default:'you忘記輸入標題ㄌ',
    }
});
const isOpen = ref(false);
const open = () => {
    isOpen.value = !isOpen.value;
};
const DESKTOP = 1024;
const nowWidth = ref(window.innerWidth);
function updataWindows(){
    nowWidth.value = window.innerWidth;
}
onMounted(() => {
    updataWindows();
    window.addEventListener('resize',updataWindows);
    if(nowWidth.value>=DESKTOP){
        isOpen.value = open;
    }
})

onBeforeUnmount(() => {
    window.removeEventListener('resize',updataWindows);
})
</script>

<template>
    <div class="administrative-center business-hours">
        <button class="hours-title-wrap" :class="{ hoursClose:!isOpen }" @click="open()">
            <h4>{{ props.title }}</h4>
        </button>
        <div class="info accordion-content" v-if="nowWidth>= DESKTOP ||isOpen">
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.business-hours{ 
    width: 90vw;
    margin: 20px auto ;
}
.hours-title-wrap{ 
    background-color: $blue-3;
    color: $white01;
    border: none;
    text-align: start;
    width: 90vw;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 1em;
}
.hoursClose{
    border-radius:10px;
}
.business-hours>.info{      //內文
    background-color: $blue-2;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 1em;
}
</style>