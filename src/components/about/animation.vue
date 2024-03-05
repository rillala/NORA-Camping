<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 使用 ref 創建響應式數據
const showOverlay = ref(false);

// 定義滾動事件處理函數
const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    showOverlay.value = scrollTop > 300;
    // 如果遮罩顯示，則啟動計時器
    if (showOverlay.value) {
        setTimeout(() => {
            showOverlay.value = false;
            window.removeEventListener('scroll', handleScroll);
        }, 2000); // 5000毫秒即5秒
    }
};

// 在組件掛載時添加滾動事件監聽器
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

// 在組件銷毀前移除滾動事件監聽器
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <div>
    <!-- 滾動到指定點後顯示遮罩 -->
        <div class="content" @scroll="handleScroll">
            HELLLLLO
        </div>

    <!-- 遮罩 -->
    <transition name="fade">
        <div class="overlay" v-if="showOverlay"></div>
    </transition>
    </div>
</template>

<style>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
}
</style>
