<script setup>
// 引入函式庫
import mainFAQ from '../components/FAQ/mainFAQ.vue';
import contactForm from '../components/FAQ/contactForm.vue';
import { ref, onMounted,onBeforeUnmount } from 'vue';

const flag = ref(true);
const changeFlag = ()=>{
  flag.value = !flag.value;
}

const windows1024 = ref(window.innerWidth);
function updataWindows(){
  windows1024.value = window.innerWidth;
}
onMounted(() => {
  updataWindows();
  window.addEventListener('resize',updataWindows);
})

onBeforeUnmount(() => {
  window.removeEventListener('resize',updataWindows);
})


</script>

<template>
  <div class="banner-bgc">
    <div class="title-wrap">
    <h2>常見問題</h2>
    <h4>疑難雜症大解惑</h4>
    </div>
  </div>

  <mainFAQ v-if="windows1024 > 1023 || flag" 
  @changeToForm="changeFlag"
  />
  <contactForm v-if=" windows1024 > 1023 || !flag "
  @changeToMain="changeFlag"
  />
</template>

<style lang="scss" scoped>
@import '../src/assets/sass/base/_reset.scss';
@import '../src/assets/sass/base/_color.scss';
@import '../src/assets/sass/base/_text.scss';
.title-wrap { //banner標題&副標題
    padding-top: 70px;
    margin-left: 80px;
    color: $blue-4;
}
.banner-bgc {
    background-color: $blue-1;
    height: 200px;
    width: 100%;
}

</style>
