<script setup>
// 引入函式庫
import { useRoute } from 'vue-router';
import mainFAQ from '../components/FAQ/mainFAQ.vue';
import contactForm from '../components/FAQ/contactForm.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';;

const flag = ref(true);
const changeFlag = () => {
  flag.value = !flag.value;
};
const DESKTOP = 1024;
const windows1024 = ref(window.innerWidth);
function updataWindows() {
  windows1024.value = window.innerWidth;
}
onMounted(() => {
  updataWindows();
  window.addEventListener('resize', updataWindows);
  checkSourcePage();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updataWindows);
});
const route = useRoute();
function checkSourcePage() {
  // 從路由參數獲得來源訊息
  const currentPath = route.query.title;
  // 根據來源訊息決定是否開啟聯絡表單
  if (currentPath === '/shelter') {
    console.log('轉跳來源是 收容所');
    changeFlag();
  } else {
    console.log('轉跳來源不是 收容所');
    console.log(route.query.title);
  }
}
</script>

<template>
  <div class="banner-bgc">
    <div class="title-wrap">
      <div id="nora-faq"></div>
      <h2>常見問題</h2>
      <h4>疑難雜症大解惑</h4>
    </div>
  </div>

  <mainFAQ v-if="windows1024 > DESKTOP || flag" @changeToForm="changeFlag" />
  <div id="nora-contact"></div>

  <contactForm
    v-if="windows1024 > DESKTOP || !flag"
    @changeToMain="changeFlag"
  />
</template>

<style lang="scss" scoped>
@import '../src/assets/sass/base/_reset.scss';
@import '../src/assets/sass/base/_color.scss';
@import '../src/assets/sass/base/_text.scss';
.title-wrap {
  //banner標題&副標題
  width: 100%;
  padding-top: 10vw;
  padding-left: 10vw;
  color: $blue-4;
  @include desktop {
    padding-top: 5vw;
    // margin-left: 15vw;
    padding-left: 15vw;
    width: 100%;
  }
  h2 {
    @include desktop {
      font-size: 48px;
    }
  }
  h4 {
    @include desktop {
      font-size: 32px;
    }
  }
}
.banner-bgc {
  background-color: $blue-1;
  height: 200px;
  width: 100%;
  @include desktop {
    height: auto;
    padding-bottom: 3rem;
  }
}
</style>
