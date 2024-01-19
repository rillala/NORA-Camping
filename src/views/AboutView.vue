
<script setup>
// 引入函式庫

import axios from "axios";

</script>

<template>

        <div class="banner-bgc">
            <div class="title-wrap">
                <h2>野良露營</h2>
                <h4>放鬆身心最優選</h4>
            </div>
        </div>

        <div class="origin-linear">
            <div class="origin-pic">
                <img src="../assets/image/about/oringin-pic.jpg" alt="營區照片" class="environment">
            </div>
            <div class="origin">
                <h4>「野良露營 (NORA Camp)」</h4>
                <div class="text-wrap">
                    <p class="tinyp">始於一群對自然和動物充滿熱愛的朋友的共同夢想。</p>
                    <p class="tinyp">我們相遇在一次露營旅程中，感受到了大自然的寧靜和治癒力，同時也遇到了幾隻無家可歸的流浪動物。此次相遇讓我們深刻意識到，除了享受自然以外，還有機會做些更有意義的事情——</p>
                    <p class="tinyp">幫助那些無助的流浪動物。<br><br></p>
                    <p class="tinyp">那麼該如何將對自然的熱愛與對流浪動物的關心結合起來呢？我們想到了一個獨特的想法：創建一個露營區域，不僅提供給人們一個接近自然的地方，並且能夠參與照顧流浪動物的行動並在活動的同時宣導一般民眾所能為流浪動物提供的較佳照顧措施（如ＴＮＲ或ＴＮＳＡ等）。<br></p>
                    <p class="tinyp">這就是「野良露營」的誕生。</p>
                    
                </div>
            </div>
        </div>


    
</template>

<style lang="scss" scoped>
@import '../src/assets/sass/base/_reset.scss';
@import '../src/assets/sass/base/_color.scss';
@import '../src/assets/sass/base/_text.scss';


.title-wrap{
    padding-top: 70px;
    margin-left: 80px;
    color: $blue-4;
}
.banner-bgc{
    background-color: $blue-1;
    height: 200px;
    width: 100%;
}
.origin-pic{
    width: 100%;
    height: 580px;
}
.origin-linear{
    height: 1000px;
    background: linear-gradient(to bottom, $blue-1 10%, $white01);
}
.origin h4{
    width: 90vw;
    border-radius: 10px;
    margin: auto;
}
.text-wrap {
    width: 90vw;
    border-radius: 10px;
    padding: 10px 20px;
    margin: auto;
    background-color: rgba($yellow-2, 50%);
}

</style>
