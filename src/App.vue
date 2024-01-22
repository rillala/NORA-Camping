<script setup>
import { RouterLink, RouterView } from 'vue-router';
import headerCom from '@/components/header.vue';
import footerCom from '@/components/footer.vue';
import backToTop from '@/components/button/backToTop.vue';
import loading from '@/components/loading.vue';

// 以下做loading畫面用
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const isLoading = ref(false);
const router = useRouter();

const setLoading = loading => {
  isLoading.value = loading;
};

const beforeEach = () => {
  setLoading(true);
};

const afterEach = () => {
  setLoading(false);
};

onMounted(() => {
  router.beforeEach(beforeEach);
  router.afterEach(afterEach);
});

onUnmounted(() => {
  // 在這裡，您需要正確移除守衛
  router.beforeEach().unbind(beforeEach);
  router.afterEach().unbind(afterEach);
});
</script>

<template>
  <section>
    <headerCom />
    <div id="app-content-wrap">
      <div>
        <!-- 加載畫面 -->
        <div v-if="isLoading" id="app-loading"><loading /></div>

        <!-- 路由視圖 -->
        <RouterView v-else />
      </div>

      <div id="app-sidebar">
        <backToTop id="app-top-btn" />
      </div>
    </div>
    <footerCom />
  </section>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}

#app-content-wrap {
  position: relative;
}

#app-sidebar {
  position: absolute;
  top: 0;
  left: calc(90% - 50px);
  height: 100%;
  padding: 20px 0;
  z-index: 2;
}

#app-top-btn {
  position: sticky;
  top: 85svh;
}

// loading 畫面,測試用
#app-loading {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
