<script>
import newsImgGallery from '@/components/home/newsImagGallery.vue';


export default {
    name: 'newsArticle',
    components: {
        newsImgGallery,
    },
    data() {
        return {
            newsTitle: '2024春季優惠開跑中',
            newsDate: '2024/1/24',
            newsText: '探險春季，NORA Camp誠摯邀請您攜帶心愛的寵物一同感受大自然的懷抱！透過我們獨家的「春季寵物露營樂享包」優惠，獲得精心準備的狗狗貓貓歡迎禮 包，內含美味零食、趣味玩具及特別的寵物地圖。優惠僅限春季特定日期，請提前預訂，確保您和寵物共享這春之樂。期待您們一家人一起加入NORA Camp的大家庭，享受春日露營的美好時光！',
        };
    },
};
</script>

<template>
    <article class="News-article">
        <div class="News-text">
            <div class="title">
                <h2>{{ newsTitle }}</h2>
                <p class="tinyp">{{ newsDate }}</p>
            </div>
            <p>{{ newsText }}</p>
        </div>
        <newsImgGallery style="display: inline-block;" />
    </article>
</template>

<style lang="scss" scoped>
.News-article {
    display: flex;
    flex-direction: column;
    background-color: $white01;
    border-radius: 30px;
    padding: 20px;

    @include desktop {
        flex-direction: row;
    }
}

.News-text {
    display: inline-block;
    height: 100%;
    align-items: start;
    margin: 20px;

    .title {
        margin: 10px 0;
    }
}
</style>