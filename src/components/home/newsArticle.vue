<script>

export default {
    name: 'newsArticle',
    props: {
        newsTitle: {
            type: String,
            requre: true,
        },
        newsDate: {
            type: String,
            requre: true,
        },
        newsText: {
            type: String,
            requre: true,
        },
        smalls: {
            type: Array,
            required: true,
            default: () => [],
        },
        large: {
            type: Object,
            required: true,
            default: () => ({ src: '', alt: '' }),
        },
    },
    methods: {
        getNewsImgUrl(paths) {
            return new URL(`../../assets/image/homeView/${paths}`, import.meta.url).href
        },
        changeLargeImage(index) {
            this.$emit('update:large', { ...this.smalls[index] });
        },//在changeLargeImage被觸發時，建一個新的smalls物件陣列，將指定的索引值內容更新到large物件
        init() {
        },
    },
    mounted() {
        if (this.smalls.length > 0) {
            this.changeLargeImage(0);
        }
        this.init();
        // 將第一張照片設置為初始化
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
        <div class="News-img" v-show="smalls.length > 0">
            <div class="large-images">
                <img :src=getNewsImgUrl(large.src) :alt="large.alt" id="large" />
            </div>

            <div class="images-row">
                <img v-for="(small, index) in  smalls " :src=getNewsImgUrl(small.src) :alt="small.alt" class="small"
                    @click="changeLargeImage(index)" :key="index" />
            </div>
        </div>
    </article>
</template>

<style lang="scss" scoped>
.News-text {
    display: inline-block;
    height: 100%;
    align-items: start;
    margin: 20px;

    .title {
        margin: 10px 0;
    }
}

.News-img {
    margin: 0 auto;
    width: fit-content;
}

.large-images {
    display: flex;
    justify-content: center;
    width: 74vw;
    height: 74vw;
    overflow: hidden;
    margin-bottom: 5px;
    border-radius: 20px;

    @include tablet {
        width: 320px;
        height: 320px;
    }
}

#large {
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.images-row {
    display: flex;
    justify-content: start;
}

.small {
    width: 23vw;
    height: 23vw;
    object-fit: cover;
    object-position: center;
    border-radius: 10px;
    margin: 1vw;
    cursor: pointer;

    @include tablet {
        width: 100px;
        height: 100px;
        margin: 3px;

    }
}
</style>