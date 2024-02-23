<script>
import { ref } from 'vue';
import { gsap } from 'gsap';

export default {
    data() {
        return {
            isLampOn: false,
        };
    },
    methods: {
        //露營燈開關
        openLamp() {
            this.isLampOn = true;
        },
        closeLamp() {
            this.isLampOn = false;
        },

        //露營燈晃動
        shakelamp() {
            const tl = gsap.timeline();
            // 在 Timeline 中依次添加旋轉動畫
            tl.
                to(this.$refs.lamp, { rotation: -15, duration: 0.1, ease: 'power1.inOut' }) // 左rotation 30
                .to(this.$refs.lamp, { rotation: 12, duration: 0.2, ease: 'power1.inOut' }) // 右rotation 50
                .to(this.$refs.lamp, { rotation: -9, duration: 0.3, ease: 'power1.inOut' }) // 左rotation 30
                .to(this.$refs.lamp, { rotation: 6, duration: 0.4, ease: 'power1.inOut' }) // 右rotation 15
                .to(this.$refs.lamp, { rotation: -3, duration: 0.5, ease: 'power1.inOut' }) // 左rotation 5
                .to(this.$refs.lamp, { rotation: 0, duration: 0.5, ease: 'power1.inOut' }); // 左rotation 5

            // 啟動 Timeline
            tl.play();
        },
        //人類移動
        humanMovein() {
            gsap.to(this.$refs.human, { x: '+=240px', autoAlpha: 1, duration: 0.5 }) // 向右移动 20px
        },
        humanMoveout() {
            const tl = gsap.timeline();

            tl
                .to(this.$refs.human, { x: '+=10px', duration: 0.2 }) // 向右移动 20px
                .to(this.$refs.human, { x: '-=250px', autoAlpha: 0, duration: 0.5 }) // 向左移动 40px（因为前面已经向右移动了 20px，所以这里是 -40px）
            tl.play();
        },
        //狗狗移動
        doggyMovein() {
            gsap.to(this.$refs.doggy, { y: '-=290px', duration: 0.5 }) // 向右移动 20px
        },
        doggyMoveout() {
            const tl = gsap.timeline();

            tl
                .to(this.$refs.doggy, { y: '-=10px', duration: 0.2 }) // 向右移动 20px
                .to(this.$refs.doggy, { y: '+=300px', duration: 0.5 }) // 向左移动 40px（因为前面已经向右移动了 20px，所以这里是 -40px）
            tl.play();
        },
        //開關動作和體
        openAction() {
            this.openLamp();
            setTimeout(this.shakelamp, 10)
            this.humanMoveout();
            this.doggyMoveout();
        },
        closeAction() {
            this.closeLamp();
            setTimeout(this.shakelamp, 10)
            this.humanMovein();
            this.doggyMovein();
        },
    }
};
</script>

<template>
    <div class="banner-container">
        <!-- <button @click="doggyMoveout" style=" position: absolute;">測試按鈕</button> -->
        <div class="layer5">
            <img class="banner-grass" src="@/assets/image/homeView/banner/Banner_grass.png" alt="Banner草叢">
            <!-- 關燈圖片 -->
            <img v-if="isLampOn === false" ref="lamp" class="banner-lampoff"
                src="@/assets/image/homeView/banner/Banner_lampOff.png" alt="露營燈關" @click="openAction">
            <!-- 開燈圖片 -->
            <img v-if="isLampOn === true" ref="lamp" class="banner-lampon"
                src="@/assets/image/homeView/banner/Banner_lampOn.png" alt="露營燈開" @click="closeAction">
        </div>
        <div class="layer4">
            <img class="back-stick" src="@/assets/image/homeView/banner/Banner_stick.png" alt="架子">
            <img ref="doggy" class="back-dog" src="../../assets/image/homeView/banner/Banner_dog.png" alt="狗狗">
        </div>
        <img class="Banner_tent" src="@/assets/image/homeView/banner/Banner_tent.png" alt="外帳">
        <img ref="human" class="Banner_person" src="@/assets/image/homeView/banner/Banner_person.png" alt="人類">
        <div class="layer1">
            <img ref="day" v-if="isLampOn === false" class="back-ground" src="@/assets/image/homeView/banner/Banner_bg.png"
                alt="白天">
            <img ref="night" v-if="isLampOn === true" class="back-night" src="@/assets/image/homeView/banner/Banner_ni.png"
                alt="晚上">
        </div>
    </div>
</template>

<style lang="scss" scoped>
.banner-container {
    position: relative;
    z-index: -1;
    max-width: 1600px;
    height: 700px;
    margin: auto;
    overflow: hidden;
}

.layer1 {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: -10;
}

.back-ground {
    height: 700px;
    width: 100%;
    object-fit: cover;
    object-position: 60%;

    @include desktop {
        object-position: 40%;
    }
}

.back-night {
    height: 700px;
    width: 100%;
    object-fit: cover;
    object-position: 60%;


    @include desktop {
        object-position: 40%;
    }
}


.Banner_person {
    display: none;

    @include tablet {
        display: block;
        position: relative;
        z-index: -7;
        top: -95%;
        left: -33%;
        transform: rotate(45deg);
        left: -20%;
    }

    @include desktop {
        position: relative;
        z-index: -8;
        transform: rotate(25deg);
        top: -61%;
        left: 27%;
    }
}


.Banner_tent {
    width: 100%;
    height: 700px;
    object-fit: cover;
    object-position: 60%;
    position: absolute;
    top: 0%;
    z-index: -7;

    @include desktop {
        object-position: 40%;
    }
}

.banner-lampoff {
    position: absolute;
    z-index: 2;
    top: 30px;
    right: 38%;
    transform-origin: top;
    cursor: pointer;

    @include tablet {
        right: 10%;
    }

    @media (min-width: 600px) {
        right: 20%;
    }

    @media (min-width: 785px) {
        right: 28%;
    }

    @include desktop {
        right: 30%;
    }
}

.banner-lampon {
    position: absolute;
    z-index: 2;
    top: 30px;
    right: 9%;
    transform-origin: top;
    cursor: pointer;

    @include tablet {
        right: -11%;
    }

    @media (min-width: 600px) {
        right: 3%;
    }

    @media (min-width: 785px) {
        right: 15%;
    }

    @include desktop {
        right: 20%;
    }
}

.layer4 {
    width: 100%;
    height: 100%;
    position: relative;
    top: 0;
    z-index: -6;
}

.back-stick {
    height: 650px;
    position: relative;
    top: 35px;
    left: 45%;

    @include desktop {
        left: 65%;
    }

}

.back-dog {
    position: relative;
    top: -30%;

    @media (min-width:418px) {
        top: 8%;
        left: -20%;
    }

    @include desktop {
        left: 7%;
    }
}

.layer5 {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: -5;
}

.banner-grass {
    height: 200px;
    width: 100%;
    object-fit: cover;
    object-position: center;
    position: relative;
    top: 83%;
}
</style>