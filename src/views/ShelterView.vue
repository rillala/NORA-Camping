<script>
// 引入函式庫
import axios from 'axios';

export default {
  data() {
    return {
      bannerImages: [ //Banner輪播
        '/src/assets/image/shelter/shelter_bg_m_2.png',
        '/src/assets/image/shelter/shelter_bg_m_1.png',
        '/src/assets/image/shelter/shelter_bg_m_3.png',
      ],
      currentIndex: 0, //當前圖片
      autoPlayInterval: null, // 新增屬性來儲存自動播放定時器

      animalImages: [ //貓狗圓形圖片
        { src: 'src/assets/image/shelter/round_cat_m1.png' },
        { src: 'src/assets/image/shelter/round_dogs_m1.png' },
        { src: 'src/assets/image/shelter/round_dog_m1.png' }
      ],
      activeIndex: 0,

    }
  },
  computed: {
    currentImage() {
      return this.bannerImages[this.currentIndex];
    },
  },

  mounted() {
    this.startAutoPlay(); //自動播放

    setInterval(() => { //設置時間
      this.nextImage();
    }, 3000); // 切換圖片時間間隔3秒

  },
  methods: {
    prevSlide() { //按鈕上一張
      this.currentIndex = (this.currentIndex - 1 + this.bannerImages.length) % this.bannerImages.length;
    },
    nextSlide() { //按鈕下一張
      this.currentIndex = (this.currentIndex + 1) % this.bannerImages.length;
    },
    startAutoPlay() { //開始自動播放，隔一段時間切換到下一張
      this.autoPlayInterval = setInterval(() => {
        this.nextSlide();
      }, 3000); // 設定間隔時間每3秒切換一次
    },
    stopAutoPlay() { // 停止自動播放
      clearInterval(this.autoPlayInterval);
    },

    nextImage() {
      this.activeIndex = (this.activeIndex + 1) % this.animalImages.length;
    },
  },
};
</script>

<template>
  <div class="shelter-wrap">

    <!-- Banner區塊 -->
    <div class="shelter-banner">
      <h1 class="shelter-title">野良之家</h1>
      <h2 class="shelter-subtitle">讓牠們不再流浪！</h2>
    </div>

    <!-- Banner輪播區塊 -->
    <div class="shelter-slider-container">
      <transition name="fade" mode="out-in">
        <img :src="currentImage" :key="currentImage" class="slider-image" />
      </transition>
    </div>

    <!-- Banner輪播按鈕 -->
    <div class="shelter-slider-btn">
      <button class="shelter-btn" @click="prevSlide">
        <img src="/src/assets/image/campGuide/left_button_m.svg" alt="左邊箭頭按鈕">
      </button>
      <button class="shelter-btn" @click="nextSlide">
        <img src="/src/assets/image/campGuide/right_button_m.svg" alt="右邊箭頭按鈕">
      </button>
    </div>

    <!-- 相愛相伴區塊 -->
    <div class="shelter-love-bg">
      <img class="slogan-img" src="/src/assets/image/shelter/shelter_slogan_m_1.svg" alt="相愛相伴布條圖片" />

      <div class="shelter-slogan">
        <p class="shelter-slogan-words">
          讓我們一起<br />尋找尾巴搖曳的快樂，<br />分享彼此擁抱的溫暖！
        </p>

        <img class="white-heart" src="/src/assets/image/shelter/white_heart.svg" alt="白色愛心圖片" />

        <div class="paws">
          <img class="paw1" src="/src/assets/image/shelter/paw1.svg" alt="腳印icon">
          <img class="paw2" src="/src/assets/image/shelter/paw1.svg" alt="腳印icon">
        </div>
      </div>

      <!-- 圓形翻轉圖片 -->
      <div class="shelter-round-imgs">

        <img class="red-heart" src="/src/assets/image/shelter/red_heart.svg" alt="紅色愛心icon" />

        <img class="yellow-heart" src="/src/assets/image/shelter/yellow_heart.svg" alt="黃色愛心icon" />

        <!-- <img class="line-1" src="/src/assets/image/shelter/line_1.svg" alt="線條一"> -->

        <div v-for="(item, index) in animalImages" :key="index" class="round"
          :class="{ 'active': index === activeIndex }">
          <img :src="item.src" alt="Round Image">
        </div>

        <!-- <img class="line-2" src="/src/assets/image/shelter/line_2.svg" alt="線條二" /> -->

      </div>

      <!-- 不再流浪區塊 -->

      <img class="slogan-img" src="/src/assets/image/shelter/shelter_slogan_m_2.svg" alt="不再流浪布條圖片" />
      <div class="home-cloud">
        <p class="home-cloud-words">我們都在期待…<br />擁有一個溫暖的家</p>
        <img class="blue-cloud" src="/src/assets/image/shelter/big_cloud.svg" alt="雲朵對話圖片">
      </div>

      <div class="dog-cat-home">
        <div class="walk-cat">
          <img src="/src/assets/image/shelter/walking_cat.svg" alt="走進來的貓咪icon" />
        </div>
        <div class="walk-dog">
          <img src="/src/assets/image/shelter/walking_dog.svg" alt="走進來的狗狗icon" />
        </div>
        <div class="shelter-home-icon">
          <img src="/src/assets/image/shelter/house.svg" alt="不再流浪房子圖片" />
        </div>
      </div>

      <div class="foot-print">
        <img src="/src/assets/image/shelter/big_paw.svg" alt="狗狗腳印" />
        <img src="/src/assets/image/shelter/medium_paw.svg" alt="狗狗腳印" />
      </div>
    </div>

    <!-- 跑馬燈 -->
    <div class="shelter-marquee-first">
      <img src="/src/assets/image/shelter/shelter_marquee.svg" alt="跑馬燈">
    </div>

    <!-- 我們的理念區塊 -->

    <div class="shelter-idea-bg">
      <div class="shelter-idea">
        <img class="sign_board" src="/src/assets/image/shelter/sign_board.svg" alt="我們的理念標題招牌圖片" />
        <img class="idea_paw" src="/src/assets/image/shelter/idea_paw.svg" alt="腳印icon" />
        <h4 class="shelter-idea-title">我們的理念</h4>
      </div>

      <div class="shelter-idea-dog">
        <img src="/src/assets/image/shelter/big_dog.png" alt="我們的理念狗狗大圖" />
        <p class="shelter-idea-dog-word">
          流浪的貓狗日趨增多，<br />
          野良希望能為流浪貓狗盡一份心力！<br />
          所以我們致力於創造一個安全、舒適的環境，<br />
          為無家可歸的貓狗們提供食物、醫療和愛心。
        </p>
      </div>

      <div class="shelter-idea-cat">
        <img src="/src/assets/image/shelter/big_cat.png" alt="我們的理念貓咪大圖" />
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
      <img src="/src/assets/image/shelter/shelter_marquee2.svg" alt="跑馬燈二">
    </div>

    <!-- 領養流程區塊 -->
    <div class="shelter-adopt-bg">

      <div class="shelter-adopt">
        <img class="black-cat" src="/src/assets/image/shelter/blackcat.svg" alt="黑貓icon" />
        <img class="sign_board" src="/src/assets/image/shelter/sign_board_r.svg" alt="領養流程標題招牌圖片" />
        <h4 class="shelter-adopt-title">領養流程</h4>
      </div>

      <div class="adopt-cloud-dog">
        <div class="adopt-cloud">
          <p class="adopt-cloud-words">謝謝你，選擇了我。</p>
          <img class="white_cloud" src="/src/assets/image/shelter/white_cloud.svg" alt="白色雲朵">
        </div>
          <img class="hand-dog" src="/src/assets/image/shelter/hand_dog.png" alt="舉手狗狗圖片" />
          <img class="line3" src="/src/assets/image/shelter/line3.svg" alt="線條三">
      </div>

      <!-- 領養步驟一到六 -->
      <div class="adopt-steps">

        <div class="adopt-step1">
          <img src="/src/assets/image/shelter/step_circle_s.svg" alt="領養步驟一">
          <p class="step1">STEP 1</p>
          <p class="step1-dtl">選擇想要領養的動物</p>
        </div>

        <div class="adopt-step2">
          <img src="/src/assets/image/shelter/step_circle_s.svg" alt="領養步驟二">
          <p class="step2">STEP 2</p>
          <div class="step2-dtls">
            <p class="step2-dtl">填寫領養申請表</p>
            <div class="step2-dtl-wrap">
              <p>確保領養者生活方式適合貓狗需求
              </p>
            </div>
          </div>
        </div>

        <div class="adopt-step3">
          <img src="/src/assets/image/shelter/step_circle_s.svg" alt="領養步驟三">
          <p class="step3">STEP 3</p>
          <div class="step3-dtls">
            <p class="step3-dtl">專屬互動時間</p>
            <div class="step3-dtl-wrap">
              <p>確認雙方是否適應彼此</p>
            </div>
          </div>
        </div>

        <div class="adopt-step4">
          <img src="/src/assets/image/shelter/step_circle_s.svg" alt="領養步驟四">
          <p class="step4">STEP 4</p>
          <div class="step4-dtls">
            <p class="step4-dtl">簽署領養合約</p>
            <div class="step4-dtl-wrap">
              <p>討論並簽署領養條件</p>
            </div>
          </div>
        </div>

        <div class="adopt-step5">
          <img src="/src/assets/image/shelter/step_circle_s.svg" alt="領養步驟五">
          <p class="step5">STEP 5</p>
          <div class="step5-dtls">
            <p class="step5-dtl">支付領養費用</p>
            <div class="step5-dtl-wrap">
              <p>支付相應費用以支持野良之家營運</p>
            </div>
          </div>
        </div>

        <div class="adopt-step6">
          <img src="/src/assets/image/shelter/step_circle_s.svg" alt="領養步驟六">
          <p class="step6">STEP 6</p>
          <div class="step6-dtls">
            <p class="step6-dtl">接回寵物至家庭</p>
          </div>
        </div>
      </div>

      <!-- 領養須知 -->
      <div class="adopt-attention">
        <img class="adopt-dog" src="/src/assets/image/shelter/adopt_dog.png" alt="領養須知狗狗大圖">
        <div class="attention-dtl">
          <div class="attention-title">
            <img src="/src/assets/image/shelter/attention_w.svg" alt="!圖片">
            <p>領養後須知</p>
          </div>
          <ol class="p">
            <!-- <li>適應期觀察：給予寵物適應新環境的時間，注意觀察行為變化。</li>
            <li>定期醫療照顧：定期帶寵物至獸醫院檢查、預防注射及處理寄生蟲。</li>
            <li>建立規律生活：規律飲食、遊戲和散步時間，確保穩定的生活節奏。</li>
            <li>社交化訓練：逐步引導寵物與其他寵物及人類建立良好社交關係。</li>
            <li>提供愛與關懷：給予寵物足夠關愛、陪伴和注意，建立牠們與家庭成員的情感連結。</li> -->
            <li>給予寵物適應新環境的時間，注意觀察行為變化。</li>
            <li>定期至獸醫院檢查、預防注射及處理寄生蟲。</li>
            <li>建立規律生活，確保穩定的生活節奏。</li>
            <li>引導寵物與動物及人類建立良好社交關係。</li>
            <li>提供愛與關懷，建立與家庭成員的情感連結。</li>
          </ol>
        </div>
      </div>
    </div>

    <!-- 跑馬燈 -->
    <div class="shelter-marquee-third">
      <img src="/src/assets/image/shelter/shelter_marquee3.svg" alt="跑馬燈三">
    </div>

    <!-- 志工活動 -->
    <div class="shelter-volunteer-bg">

      <div class="shelter-volunteer">
        <img class="black-cat" src="/src/assets/image/shelter/blackcat.svg" alt="黑貓icon" />
        <img class="sign_board" src="/src/assets/image/shelter/sign_board.svg" alt="志工活動標題招牌圖片" />
        <h4 class="shelter-volunteer-title">志工活動</h4>
      </div>

      <div class="volunteer-cloud">
        <p class="volunteer-txt">一起為浪浪盡點心力吧！</p>
        <img src="/src/assets/image/shelter/volunteer_cloud.svg" alt="志工活動雲朵圖片">
      </div>

      <!-- 志工活動介紹區塊 -->
      <div class="circle-imgs-wrap">

        <div class="circle-img-top">
          <img src="/src/assets/image/shelter/v_m_1.png" alt="圓形圖一">
          <img src="/src/assets/image/shelter/v_m_2.png" alt="圓形圖二">
        </div>

        <div class="volunteer-info">
          <div class="volunteer-dtls">
            <p class="volunteer-dtl">
              野良之家的日常工作：<br>
              如餵食、遛狗、環境清潔等。<br>
              參與志工活動的客人，營位費用享有優惠！<br>
              若有興趣參與，歡迎聯絡我們！</p>
            <button class="contact-btn">聯絡我們</button>
          </div>
          <img src="/src/assets/image/shelter/volunteer_shape.svg" alt="志工活動介紹多邊形">
        </div>

        <div class="circle-img-bottom">
          <img src="/src/assets/image/shelter/v_m_3.png" alt="圓形圖三">
          <img src="/src/assets/image/shelter/v_m_4.png" alt="圓形圖四">
        </div>

      </div>

    </div>

  </div>
</template>

<style lang="scss" scoped>
@import url(/src/assets/sass/page/shelter.scss);
</style>