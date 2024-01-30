<script>
export default {
    name: 'newsImagGallery',
    data() {
        return {
            smalls: [
                { src: 'Camping_dog_lake.jpg', alt: '消息圖片1' },
                { src: 'knowingnora-pic.jpg', alt: '消息圖片2' },
                { src: 'shelter.jpg', alt: '消息圖片3' },
                // 小圖的路徑
            ],
            large: { src: '', alt: '' },
            //大圖連結
        };
    },
    methods: {
        getNewsImgUrl(paths) {
            return new URL(`../../assets/image/homeView/${paths}`, import.meta.url).href
        },
        showLarge(index) {
            // 點擊小圖片時，將大圖片更新為相應的小圖片
            this.large = { ...this.smalls[index] };
            //複製一個新的陣列
        },
        init() {
        },
    },
    mounted() {
        if (this.smalls.length > 0) {
            this.showLarge(0);
        }
        this.init();
        // 將第一張照片設置為初始化
    },
};
</script>

<template>
    <div class="News-img">
        <div class="large-images">
            <img :src=getNewsImgUrl(large.src) :alt="large.alt" id="large" />
        </div>

        <div class="images-row">
            <img v-for="(small, index) in  smalls " :src=getNewsImgUrl(small.src) :alt="small.alt" @click="showLarge(index)"
                class="small" :key="index" />
        </div>

    </div>
</template>

<style lang="scss" scoped>
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