<script>
//測試用大圖小圖組件
// import newsImgGallery from "@/components/home/newsImgGallery.vue"
// import { getDBImage } from "@/assets/js/common";
import { getDBImage } from "@/assets/js/common";


export default {
    name: 'newsArticle',
    // components: {
    //     newsImgGallery
    // },
    // props: {
    //     newsTitle: {
    //         type: String,
    //         requre: true,
    //     },
    //     newsDate: {
    //         type: String,
    //         requre: true,
    //     },
    //     newsText: {
    //         type: String,
    //         requre: true,
    //     },
    //     small1: {
    //         type: Object,
    //         required: true,
    //     },
    //     small2: {
    //         type: Object,
    //         required: true,
    //     },
    //     small3: {
    //         type: Object,
    //         required: true,
    //     },
    //     large: {
    //         type: Object,
    //         required: true,
    //         default: () => ({ src: '', alt: '' }),
    //     },
    // },
    props: [
        "title",
        "publish_date",
        "content",
        "img1",
        "img2",
        "img3",
        "large",
    ],
    methods: {
        // getDBImage(paths){
        //     console.log(paths);
        //     return getDBImage(paths);
        // },

        // changeLargeImage(index) {
        //     this.$emit('update:large', { ...this.smalls[index] });
        // },//在changeLargeImage被觸發時，建一個新的smalls物件陣列，將指定的索引值內容更新到large物件
        changeLargeImage(image) {
            this.$emit('update:large', image)
        },
        init() {
        },
        getDBImage(paths) {
            // console.log(paths);
            return getDBImage(paths);
        },
    },
    mounted() {
        // if (this.smalls.length > 0) {
        //     this.changeLargeImage(0);
        // }
        // this.init();
        // 將第一張照片設置為初始化
        // if (this.small1.src != '') {
        //     this.changeLargeImage(this.small1);
        // }
        // this.init();
        if (this.img1 != '') {
            this.changeLargeImage(this.img1);
        }
        this.init();
    },
};
</script>

<template>
    <article class="News-article">
        <div class="News-text">
            <div class="title">
                <h2>{{ title }}</h2>
                <p class="tinyp">{{ publish_date }}</p>
            </div>
            <p>{{ content }}</p>
        </div>
        <!-- <div class="News-img" v-show="this.small1.src != ''">
            <div class="large-images">
                <img :src=getNewsImgUrl(large.src) :alt="large.alt" id="large" />
            </div>
            <div class="images-row">
                <img :src="getNewsImgUrl(this.small1.src)" :alt="small1.alt" @click="changeLargeImage(this.small1)"
                    class="small">
                <img :src="getNewsImgUrl(this.small2.src)" :alt="small2.alt" @click="changeLargeImage(this.small2)"
                    class="small" v-if="this.small2.src != ''">
                <img :src="getNewsImgUrl(this.small3.src)" :alt="small3.alt" @click="changeLargeImage(this.small3)"
                    class="small" v-if="this.small3.src != ''">
            </div>
        </div> -->
        <div class="News-img" v-if="this.img1 != getDBImage(null)">
            <div class="large-images">
                <img :src="large" :alt="large" id="large" />
            </div>
            <div class="images-row">
                <img :src="img1" :alt="img1.alt" @click="changeLargeImage(img1)" class="small">
                <img :src="img2" :alt="img2.alt" @click="changeLargeImage(img2)" class="small"
                    v-if="img2 != getDBImage(null)">
                <img :src="img3" :alt="img3.alt" @click="changeLargeImage(img3)" class="small"
                    v-if="img3 != getDBImage(null)">
            </div>
        </div>
        <!-- <div class="News-img" v-show="smalls.length > 0">
            <div class="large-images">
                <img :src=getNewsImgUrl(large.src) :alt="large.alt" id="large" />
            </div>

            <div class="images-row">
                <img v-for="(small, index) in  smalls " :src=getNewsImgUrl(small.src) :alt="small.alt" class="small"
                    @click="changeLargeImage(index)" :key="index" />
            </div>
        </div> -->
    </article>
</template>

<style lang="scss" scoped>
.News-article {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: $white01;
    border-radius: 30px;
    margin-left: 65px;

    @include desktop {
        width: 100%;
        flex-direction: row;
        margin: 10px 0;
        margin-left: 0;
    }
}

.News-text {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: fit-content;
    height: 100%;
    align-items: start;
    padding: 20px;

    @include desktop {
        width: 60%;
    }

    .title {
        width: 80vw;

        @include desktop {
            width: 100%;
            margin: 10px 0;
        }
    }
}

.News-img {
    margin: 20px;
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