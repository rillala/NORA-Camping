<script>
// 引入函式庫
import axios from 'axios';

export default {};
</script>

<template>
  <div class="shelter-wrap">
    <!-- Banner區塊 -->
    <div class="shelter-banner">
      <h1 class="shelter-title">野良之家</h1>
      <h2 class="shelter-subtitle">因為有你，讓牠們不再流浪！</h2>
    </div>

    <!-- 野良之家大圖區塊 -->
    <div class="shelter-top-area">
      <img src="" alt="野良之家大圖" />
    </div>

    <!-- 相愛相伴區塊 -->
    <div class="shelter-love-bg">
      <img src="" alt="相愛相伴布條圖片" />
      <div class="shelter-slogan">
        <p class="shelter-slogan-words">
          讓我們一起<br />尋找尾巴搖曳的快樂，<br />分享彼此擁抱的溫暖！
        </p>
        <img src="" alt="白色愛心圖片" />
      </div>
      <div class="shelter-round-imgs">
        <img src="" alt="相愛相伴圓形貓狗圖片一" />
        <img src="" alt="相愛相伴圓形貓狗圖片二" />
        <img src="" alt="相愛相伴圓形貓狗圖片三" />
      </div>
    </div>

    <!-- 不再流浪區塊 -->

    <div class="shelter-home-bg">
      <img src="" alt="不再流浪布條圖片" />
      <div class="home-cloud">
        <p class="home-cloud-words">我們都在期待…<br />擁有一個溫暖的家</p>
      </div>
      <div class="walk-cat">
        <img src="" alt="走進來的貓咪icon" />
      </div>
      <div class="walk-dog">
        <img src="" alt="走進來的狗狗icon" />
      </div>
      <div class="shelter-home-icon">
        <img src="" alt="不再流浪房子圖片" />
      </div>
      <div class="foot-print">
        <img src="" alt="狗狗腳印" />
        <img src="" alt="狗狗腳印" />
      </div>
    </div>

    <!-- 跑馬燈 -->
    <div class="shelter-marquee-first">
      <img src="" alt="腳印icon" />
      <p class="shelter-marquee-dtl">Warm Paws, Loving Homes.</p>
      <img src="" alt="房子icon" />
      <img src="" alt="愛心icon" />
      <img src="" alt="腳印icon" />
    </div>

    <!-- 我們的理念區塊 -->

    <div class="shelter-idea-bg">
      <div class="shelter-idea">
        <img src="" alt="我們的理念標題招牌圖片" />
        <p class="shelter-idea-title">我們的理念</p>
        <img src="" alt="腳印icon" />
      </div>

      <div class="shelter-idea-dog">
        <img src="" alt="我們的理念狗狗大圖" />
        <p class="shelter-idea-dog-word">
          流浪的貓狗日趨增多，<br />
          野良希望能為流浪貓狗盡一份心力！<br />
          所以我們致力於創造一個安全、舒適的環境，<br />
          為無家可歸的貓狗們提供食物、醫療和愛心。
        </p>
      </div>

      <div class="shelter-idea-cat">
        <img src="" alt="我們的理念貓咪大圖" />
        <p class="shelter-idea-cat-word">
          讓這裡不僅是暫時的棲身之所，<br />
          更是個能夠啟發貓狗活力和希望的場所，<br />
          並努力宣導以領養代替購買的理念，<br />
          讓流浪的貓狗們可以找到永久的愛和幸福溫暖的家。
        </p>
      </div>
    </div>

    <!-- 跑馬燈 -->
    <div class="shelter-marquee-second">
      <img src="" alt="腳印icon" />
      <p class="shelter-marquee-dtl">Joyful Tails, Caring Hearts.</p>
      <img src="" alt="愛心icon" />
      <img src="" alt="腳印icon" />
    </div>

    <div class="shelter-adopt-bg">
      <div class="shelter-adopt">
        <img src="" alt="黑貓icon" />
        <img src="" alt="領養流程標題招牌圖片" />
        <p class="shelter-adopt-title">領養流程</p>
      </div>
      <div class="adopt-cloud-dog">
        <div class="adopt-cloud">
          <p class="adopt-cloud-words">謝謝你，選擇了我。</p>
          <img src="" alt="舉手狗狗圖片" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

@import url(/src/assets/sass/page/shelter.scss);

</style>
