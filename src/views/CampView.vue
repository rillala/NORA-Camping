<script>
// 引入函式庫
import axios from 'axios';

export default {
  data () {
    return {
      images: [ //設施介紹環境圖輪播
        '/src/assets/image/campGuide/bathroom_m_1.png',
        '/src/assets/image/campGuide/bathroom_m_2.png',
        '/src/assets/image/campGuide/bathroom_m_3.png',
      ],
      currentIndex: 0,
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex];
    },
  },
  methods: {
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
  },
};
</script>

<template>
  <div class="guide-wrap">
    <!-- Banner區塊 -->
    <div class="guide-banner">
      <h1 class="guide-title">營地導覽</h1>
      <h2 class="guide-subtitle">我們一起看看營區的美！</h2>
    </div>

    <!-- 立體地圖區塊 -->
    <div class="guide-map">
      <img
        src="/src/assets/image/campGuide/map_m_ex.png"
        alt="立體地圖示意圖"
      />
    </div>

    <!-- 立體地圖下方旗子區塊 -->
    <div class="guide-flags">
      <div class="guide-flag-left">
        <img
          src="/src/assets/image/campGuide/left-flag-m.svg"
          alt="立體地圖區塊左側旗子"
        />
      </div>
      <div class="guide-flag-right">
        <img
          src="/src/assets/image/campGuide/right-flag-m.svg"
          alt="立體地圖區塊右側旗子"
        />
      </div>
    </div>

    <!-- 導覽卡片區塊 -->
    <div class="guide-card">

      <img class="paw1" src="/src/assets/image/campGuide/paw.svg" alt="腳印">
      <img class="paw2" src="/src/assets/image/campGuide/paw2.svg" alt="腳印">
      <img class="paw3" src="/src/assets/image/campGuide/paw.svg" alt="腳印">
      <img class="paw4" src="/src/assets/image/campGuide/paw2.svg" alt="腳印">
      <img class="paw5" src="/src/assets/image/campGuide/paw.svg" alt="腳印">
      <img class="paw6" src="/src/assets/image/campGuide/paw2.svg" alt="腳印">
      <img class="paw7" src="/src/assets/image/campGuide/paw.svg" alt="腳印">
      <img class="paw8" src="/src/assets/image/campGuide/paw.svg" alt="腳印">
      <img class="paw9" src="/src/assets/image/campGuide/paw.svg" alt="腳印">
      <img class="paw10" src="/src/assets/image/campGuide/paw2.svg" alt="腳印">
      <img class="dog-icon" src="/src/assets/image/campGuide/dog_card_icon.svg" alt="狗狗icon">

      <!-- 狗區導覽卡片 -->
      <div class="area-card area-dog-card">
        <img src="/src/assets/image/campGuide/campsite-dog-grass-3.png" alt="狗區導覽圖一" />
        <img src="/src/assets/image/campGuide/campsite-dog-pallet-4.png" alt="狗區導覽圖二" />
        <div class="dog-card-dtl card-dtl">
          <h4 class="area-title">狗區</h4>
          <p class="area-dtl text">
            舒適寬敞的大空間，<br>
            讓毛孩能自在跑跑跳跳！<br>
            跟主人一起創造美好又快樂的回憶！
          </p>

          <p class="area-dtl text">
            本區配有安全圍欄，<br>
            確保寵物在視線範圍內自由玩耍，<br>
            區內設有專門寵物排泄物處理站，以保持環境衛生。
          </p>

          <p class="area-list-title">營地類型：</p>
          <ul class="area-list list">
            <li>草地區：有足夠空間讓狗狗活動。</li>
            <li>雨棚區：為愛犬和主人提供額外遮蔽空間。</li>
            <li>棧板區：保持乾燥，適合帶狗露營者。</li>
          </ul>
        </div>
        <button class="reserve-btn">我要預約</button>
      </div>

      <!-- 貓區導覽卡片 -->
      <img class="cat-icon" src="/src/assets/image/campGuide/cat_card_icon.svg" alt="貓咪icon">
      <div class="area-card area-cat-card">
        <img src="/src/assets/image/campGuide/campsite-cat-pallet-3.png" alt="貓區導覽圖一" />
        <img src="/src/assets/image/campGuide/campsite-cat-pallet-4.png" alt="貓區導覽圖二" />
        <div class="cat-card-dtl card-dtl">
          <h4 class="area-title">貓區</h4>
          <p class="area-dtl text">
            安靜又舒適的環境，<br>
            讓貓咪和貓奴們可以享受寧靜的露營體驗。
          </p>
          <p class="area-dtl text">
            專為喜歡安靜的露營者及貓咪同伴而設，<br>
            提供良好遮蔽及貓爬架和多個休憩處，<br>
            讓貓咪能在自然環境中探索，<br>
            不會遠離主人的視線。
          </p>
          <p class="area-list-title">營地類型：</p>
          <ul class="area-list list">
            <li>草地區：適合貓咪與主人一起悠哉躺平！</li>
            <li>雨棚區：提供給需要額外遮蔽的露營者。</li>
            <li>棧板區：適合全天候使用。</li>
          </ul>
        </div>
        <button class="reserve-btn">我要預約</button>
      </div>

      <!-- 草跟貓咪的圖區塊 -->
      <div class="cat-area-grass-img">
        <img src="/src/assets/image/campGuide/grass_icon.svg" alt="草的圖片">
        <img src="/src/assets/image/campGuide/gray_cat_icon.svg" alt="灰色貓咪圖片">
        <img src="/src/assets/image/campGuide/grass_icon.svg" alt="草的圖片">
      </div>
    </div>

    <div class="shelter-office-bg">
      <!-- 中途之家區塊 -->
      <div class="guide-shelter">
        <img src="/src/assets/image/campGuide/shelter_big_img.jpg" alt="中途之家區塊大圖" />
        <div class="guide-shelter-info">
          <h4 class="guide-shelter-title">中途之家</h4>
          <p class="guide-shelter-dtl text">
            小小安置流浪貓狗的臨時住所，<br />
            若喜歡貓貓狗狗的你，<br />
            這裡的小動物都在等待他們的家，<br />
            歡迎在旅途中來看看牠們！<br />
            給彼此一個互相認識的機會！
          </p>
          <button class="guide-shelter-btn">更多中途之家介紹</button>
        </div>
      </div>

    <!-- 辦公區區塊 -->
      <div class="guide-office">
        <img src="/src/assets/image/campGuide/office_m.jpg" alt="辦公區域圖片" />
        <div class="area-office">
          <h4 class="office-title">辦公區</h4>
          <p class="office-text text">位於營地入口處，包含</p>
          <ul class="office-list list">
            <li>裝備租借區</li>
            <li>小型倉庫可存放裝備</li>
            <li>男、女廁及無障礙廁所各一間</li>
            <li>緊急醫療站</li>
            <li>販賣機一部、冰箱一台</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 跑馬燈 -->
    <div class="guide-marquee">
      <img src="/src/assets/image/campGuide/marquee.svg" alt="跑馬燈">
    </div>

    <!-- 營地資訊區塊 -->
    <div class="guide-camp-info-bg">
      <div class="guide-camp-info-title">
        <img src="/src/assets/image/campGuide/signboard_m.svg" alt="營地資訊標題掛旗" />
        <h4 class="camp-info-title">營地資訊</h4>
      </div>
      <div class="camp-cloud">
        <img src="/src/assets/image/campGuide/cloud_m_large.svg" alt="營地資訊裝飾大雲朵" />
        <img src="/src/assets/image/campGuide/cloud_m_small.svg" alt="營地資訊裝飾小雲朵" />
        <p class="camp-cloud-words">遠離塵囂！<br />放鬆身心靈！</p>
      </div>
      <div class="guide-camp-info">
        <img class="bigtent" src="/src/assets/image/campGuide/guide_info_bigtent.svg" 
        alt="營地資訊帳篷圖形" />
        <ul class="camp-info p">
          <li>地址：南投縣仙山鄉翠湖路1號</li>
          <li>電話：0988-123-456</li>
          <li>Email：info@noracamp.com</li>
        </ul>
      </div>
      <div class="camp-info-social">
        <div class="fb">
          <img src="/src/assets/image/campGuide/fb_icon.svg" alt="Facebook icon">
          <p>@NORACampOfficial</p>
        </div>
        <div class="ig">
          <img src="/src/assets/image/campGuide/ig_icon.svg" alt="Instagram icon">
          <p>@noracamp_adventures</p>
        </div>
        <div class="line">
          <img src="/src/assets/image/campGuide/line_icon.svg" alt="Line icon">
          <p>@NORACamp</p>
        </div>
      </div>
      <div class="camp-info-map">
        <img src="" alt="手繪地圖">
      </div>
    </div>

    <!-- 設施介紹區塊 -->
    <div class="guide-facility-intro-bg">

      <img class="colorful-flags" src="/src/assets/image/campGuide/colorfulflags3.svg" 
      alt="設施介紹區塊三角旗" />

      <div class="guide-facility-intro-title">
        <img src="/src/assets/image/campGuide/signboard_m.svg" alt="設施介紹標題掛旗" />
        <h4 class="facility-intro-title">設施介紹</h4>
      </div>

      <div class="facility-cloud">
        <img src="/src/assets/image/campGuide/cloud_m_blue_large.svg" alt="設施介紹裝飾大雲朵" />
        <img src="/src/assets/image/campGuide/cloud_m_blue_small.svg" alt="設施介紹裝飾小雲朵" />
        <p class="facility-cloud-words">完善的設施！<br />露營起來更舒適！</p>
      </div>

      <div class="facility-intro">
        <img class="facility_intro_img" src="/src/assets/image/campGuide/facility_intro_img_3.png" 
        alt="設施介紹底圖" />

        <div class="facility-slider-btn">
          <button class="facility-btn" @click="prevSlide">＜</button>
          <button class="facility-btn" @click="nextSlide">＞</button>
        </div>

        <div class="facility-slider-container">
          <transition name="fade" mode="out-in">
            <img :src="currentImage" :key="currentImage" class="slider-image" />
          </transition>
        </div>

        <div class="facility-txt">
          <p class="facility-top">
            各營位有一個插頭、一組水槽、一盞路燈<br>
            各區域有男性和女性衛浴設施、冷凍庫和冷藏冰箱</p>

          <p class="female-wc-title">女性衛浴設施</p>
          <ul class="female-wc-list p">
            <li>廁所：多間分隔單位，有環保節水馬桶</li>
            <li>淋浴間：獨立淋浴空間，提供熱水和隱私空間</li>
            <li>洗手台：配備肥皂、烘手機及鏡子</li>
          </ul>

          <p class="male-wc-title">男性衛浴設施</p>
          <ul class="male-wc-list p">
            <li>廁所：多間分隔單位，內有環保節水馬桶</li>
            <li>淋浴間：獨立淋浴空間，提供熱水</li>
            <li>洗手台：配備肥皂、烘手機及鏡子</li>
          </ul>

          <!-- <div class="facility_trees">
            <img class="facility_tree_icon" src="/src/assets/image/campGuide/facility_tree_icon.svg" 
            alt="棕梠樹圖一" />
            <img class="facility_tree_icon" src="/src/assets/image/campGuide/facility_tree_icon.svg" 
            alt="棕梠樹圖二" />
          </div> -->
        </div>

      </div>
    </div>

    <!-- 營區規範區塊 -->
    <div class="guide-rules-bg">
      <img class="colorful-flags" src="/src/assets/image/campGuide/colorfulflags3.svg" 
      alt="營區規範區塊三角旗" />

      <div class="guide-rules-title">
        <img src="/src/assets/image/campGuide/signboard_m.svg" alt="營區規範標題掛旗" />
        <h4 class="rules-title">營區規範</h4>
      </div>

      <div class="rules-cloud">
        <img src="/src/assets/image/campGuide/cloud_m_large.svg" alt="營區規範裝飾大雲朵" />
        <p class="rules-cloud-words">一起愛護環境！<br />開開心心露營！</p>
        <img src="/src/assets/image/campGuide/cloud_m_small.svg" alt="營區規範裝飾小雲朵" />
      </div>

      <div class="rule-icons">
          <img src="/src/assets/image/campGuide/rule_dog_icon.svg" alt="營區規範狗icon" />
          <img src="/src/assets/image/campGuide/rule_cat_icon.svg" alt="營區規範貓icon" />
      </div>

      <div class="guide-rules">
        <img src="/src/assets/image/campGuide/attention.svg" alt="!圖片">
        <ol class="guide-rules-list p">
          <li>落實垃圾分類並放於指定區，保持營區清潔。</li>
          <li>夜間十點後降低音量，尊重其他露營者休息。</li>
          <li>使用水源請節約用水，保持營區水資源充足。</li>
          <li>嚴禁在非指定區域焚火，以確保安全。</li>
          <li>若攜帶寵物，請確認是否需牽繩及糞便清理。</li>
          <li>禁止破壞營區植被，保護自然環境。</li>
          <li>使用共用設施請保持清潔，以便他人使用。</li>
          <li>請遵從營區人員指引及規定，維護營區秩序。</li>
          <li>禁止打擾營區附近的野生動植物。</li>
          <li>請知悉營區緊急應變程序，以確保安全。</li>
        </ol>

        <p class="guide-rules-end">
          以上規範旨在維護營區秩序和保護自然環境，希望所有露營者都能共同遵守。
        </p>
      </div>

      <div class="rule-trees">
        <img src="/src/assets/image/campGuide/tree_icon_1.svg" alt="樹圖片">
        <img src="/src/assets/image/campGuide/tree_icon_2.svg" alt="樹圖片">
      </div>

    </div>

  </div>
</template>

<style lang="scss" scoped>

@import url(/src/assets/sass/page/campGuide.scss);

</style>