<script setup>
// 引入函式庫

import actionBtn from '../components/button/actionBtn.vue';
import businessHours from '../components/about/businessHours.vue';


</script>

<template>
<div class="banner-bgc">
    <div class="banner-wrap">
    <h2>野良露營</h2>
    <h4>放鬆身心最優選</h4>
    </div>
</div>

<div class="origin-linear">
    <div class="origin-pic">
        <img src="../assets/image/aboutView/oringin-pic.jpg" alt="營區照片" class="environment">
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
    <div class="opinion-wrap">
        <div class="opinion animal">
            <img src="../assets/image/aboutView/animalFriendly.jpg" alt="動物友善">
            <h4>動物友善</h4>
            <p class="tinyp">歡迎毛絨伙伴一同加入露營冒險！營區提供了寬敞而安全的空間，讓牠們與您一同享受大自然的美好。</p>
            <p class="tinyp">
            我們打造了友善的環境，讓毛孩子能夠在安心的氛圍中探索、遊玩並結識新朋友。
            </p>
        </div>
        <div class="opinion environment">
            <img src="../assets/image/aboutView/environment.jpg" alt="環境友善">
            <h4>環境保護</h4>
            <p class="tinyp">
                我們打造了一個環境友善的營地，讓您在大自然中享受的同時，也能共同保護這片美麗的土地。</p>
            <p class="tinyp">
                我們深知地球的寶貴，因此竭盡所能提供一個綠色、可持續的露營體驗，期待您與我們攜手共創一個更美好的環境。
            </p>
        </div>
        <div class="opinion eco">
            <img src="../assets/image/aboutView/ecology.jpg" alt="生態復育">
            <h4>生態復育</h4>
            <p class="tinyp">融合自然之美和生態復育的理念，將這裡打造成一個讓您與大自然深度互動的場所，更是您參與保育努力的一步。透過生態導覽以及環保教育活動，讓來此的每位露營者成為生態復育的推動者。</p>
        </div>
    </div>
</div>

<div class="shelter-wrap">
    <div class="shelter-pic"></div>
    <div class="shelter-title-wrap">
        <h4 class="shelter-title">野良之家</h4>
        <p class="shelter-subtitle">野良 x 中途</p>
    </div>
    <p class="tinyp">
        我們致力於照顧、庇護和尋找新的家園給需要幫助的流浪動物，並提供免費的志工活動，一同為這些可愛的生命奉獻愛心。
    </p>
    <p class="tinyp">
    志工活動包括洗狗、打掃籠舍、餵食等，讓你有機會親身參與流浪動物的照顧，同時建立起與這些可愛生物的深厚連結。
    </p>
    <actionBtn class="more-info" :content="'更多詳細資訊'" />
</div>

<div class="tags">
    <hr>
    <hr>
</div>

<div class="business-hours-wrap accordion">
    <businessHours title="管理中心">
        <p>營業時間：06:30~21:00</p>
        <p>管理人員巡場時間：08:00~20:00</p>
        <p>管理中心電話：(049) 2222106－81／非營業時間請撥0988-123-456</p>
        <p><br></p>
        <p>進場時間：<br></p>
        <p>
            一律為當日下午13:00，若提前入場則酌收露營費用300元。
        </p>
        <p>
            退場時間：
            <p>平日下午12:00前<span class="tinyp">(逾時需額外支付半日費用/帳)</span></p>
            <p>假日上午11:00前<span class="tinyp">(逾時需額外支付一日費用/帳)</span></p>
        </p>
        <p><br></p>
        <p>預訂國定假日之兩天一夜露營者，請於隔日上午11:00前離場，以提供清潔人員進行打掃，造成不便敬請見諒。</p>
        
        <p>提前進場酌收每帳半價<span class="tinyp">（現場收費）</span></p>
        
        <p>欲提前進場請於露營日2天前電話連絡確認有無營位可供入住。</p>
        
        <p>18:00後到場請於23:00前搭營完成，避免打擾已就寢露友。</p>
        
        <p>連續假日期間、星期六晚上不提供夜衝服務。</p> 
    </businessHours>    
    <businessHours title="野良之家">            
        <p>野良之家開放時間：1100~1900</p>
        <p>野良之家電話：(049) 2222106－11（非開放時間請聯繫管理中心）</p>
        <p>活動報名請洽官網或提前三日來電聯繫本所。</p>
        <p>為分配當日志工工作及事前準備等，恕不接受當日報名，若造成不便敬請見諒。</p></businessHours>
    <businessHours title="接駁車時段">
        <p>仙山區區公所↔野良露營</p>
        <p>頭末班車</p>
        <p>平日：10:30／19:00</p>
        <p>假日：08:30／20:00</p>
        <p>平日班表－1030 1230 1430 1630 1830</p>
        <p>假日班表－0830 1030 1230 1430 1630 1830 2000</p>
        <p>預訂營區消費者免費，如未告知預約訂單大名，一律酌收新台幣30元/人。</p>
        <p>服務電話 : (049) 2222106－81</p>
    </businessHours>

</div>

</template>

<style lang="scss" scoped>
@import '../src/assets/sass/base/_reset.scss';
@import '../src/assets/sass/base/_color.scss';
@import '../src/assets/sass/base/_text.scss';
/*-----------------banner&背景漸層--------------------*/
.banner-wrap { //banner標題&副標題
    padding-top: 70px;
    margin-left: 80px;
    color: $blue-4;
}
.banner-bgc {
    background-color: $blue-1;
    height: 200px;
    width: 100%;
}
.origin-linear { //頂部漸層
    background: linear-gradient(to bottom, $blue-1 10%, $white01);
}
/*-----------------緣起--------------------*/
.origin-pic img{ //緣起環境照，script秒數切換
    width: 100%;
    aspect-ratio: 1/1;
    max-height: 580px;
    object-fit: cover;
    object-position: bottom;
}
.origin h4{ //緣起標題
    width: 90vw;
    border-radius: 10px;
    margin: 10px auto;
}
.text-wrap { //緣起內文
    width: 90vw;
    border-radius: 10px;
    padding: 10px 20px;
    margin: auto;
    background-color: rgba($yellow-2, 50%);
}
/*-----------------三大理念--------------------*/
.opinion-wrap{//理念容器
    width: 100%;      
    display: flex;
    justify-content: space-between;
    overflow-x: auto;
}
.opinion{ 
    margin: 50px auto;
    width: 100%;
    flex-shrink: 0;
    height: auto;
}
.opinion p,.opinion h4{
    width: 80%;
    margin: 5px auto;
}
.opinion img{
    display: block;
    margin: auto;
    object-fit: cover;
    object-position: center;
    width: 80%;
    aspect-ratio: 25/21;
    border-radius: 15px;
}
.animal img{
    object-position: 0 40%;
}
.eco img{
    object-position: 0 80%;
}

/*-----------------野良之家--------------------*/
.shelter-wrap{
    border-top: 1px solid $dark;
    margin: 10px auto;
    width: 100vw;
}
.shelter-pic{
    margin: auto;
    background-image: url(../assets/image/aboutView/shelter.jpg);
    width: 95%;
    height: auto;
    aspect-ratio: 3/2;
    background-position: center;
    background-size: cover;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
}
.shelter-title-wrap{
    display: flex;
    width: 90%;
    margin: 10px auto;
}
.shelter-subtitle{
    margin-left: 5%;
}
.shelter-wrap>.tinyp{
    width: 90%;
    margin: auto;
}
.more-info{
    display: block;
    margin: 10px auto;
}
.action-btn-01{
    border-radius: 20px;
    border: none;
    color: $white01;
}
.action-btn-01:hover{
    border: none;
}
</style>
