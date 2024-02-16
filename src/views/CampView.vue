<script>
// 引入函式庫
import axios from 'axios';

export default {
  data() {
    return {
      images: [
        //設施介紹環境圖輪播
        'wc1.jpg',
        'wc2.jpg',
        'wc3.jpg',
      ],
      currentIndex: 0,
    };
  },

  methods: {
    prevSlide() {
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    getImageUrl(paths) {
      return new URL(
        `../assets/image/campGuide/wc${paths + 1}.jpg`,
        import.meta.url,
      ).href;
    },
    toReserve() {
      this.$router.push('/reserve');
    },
    toShelter() {
      this.$router.push('/shelter');
    },
  },
};
</script>

<template>
  <div class="guide-wrap">
    <!-- Banner區塊 -->
    <div class="guide-banner">
      <h2 class="guide-title">營地導覽</h2>
      <h4 class="guide-subtitle">一起看看營區的美！</h4>
    </div>

    <!-- 立體地圖區塊 -->
    <div id="nora-zone"></div>
    <div class="guide-map">
      <div class="camp-map" @mouseover="showInfo" @click="goToDetails">
        <img src="@/assets/image/campGuide/map2.png" alt="立體地圖示意圖" />
      </div>
    </div>

    <!-- 立體地圖下方旗子區塊 -->
    <div class="guide-flags">
      <div class="guide-flag-left">
        <img src="@/assets/image/campGuide/left-flag-m.svg" alt="立體地圖區塊左側旗子" />
      </div>
      <div class="guide-flag-right">
        <img src="@/assets/image/campGuide/right-flag-m.svg" alt="立體地圖區塊右側旗子" />
      </div>
    </div>

    <!-- 導覽卡片區塊 -->
    <div class="guide-card">
      <img class="paw1" src="@/assets/image/campGuide/paw.svg" alt="腳印" />
      <img class="paw2" src="@/assets/image/campGuide/paw2.svg" alt="腳印" />
      <img class="paw3" src="@/assets/image/campGuide/paw.svg" alt="腳印" />
      <img class="paw4" src="@/assets/image/campGuide/paw2.svg" alt="腳印" />
      <img class="paw5" src="@/assets/image/campGuide/paw.svg" alt="腳印" />
      <img class="paw6" src="@/assets/image/campGuide/paw2.svg" alt="腳印" />
      <img class="paw7" src="@/assets/image/campGuide/paw.svg" alt="腳印" />
      <img class="paw8" src="@/assets/image/campGuide/paw.svg" alt="腳印" />
      <img class="paw9" src="@/assets/image/campGuide/paw.svg" alt="腳印" />
      <img class="paw10" src="@/assets/image/campGuide/paw2.svg" alt="腳印" />
      <img class="dog-icon" src="@/assets/image/campGuide/dog_card_icon.svg" alt="狗狗icon" />

      <!-- 狗區導覽卡片 -->
      <div class="area-card area-dog-card">
        <div class="dog-card-img">
          <img src="@/assets/image/campGuide/campsite-dog-grass-3.png" alt="狗區導覽圖一" />
          <img src="@/assets/image/campGuide/campsite-dog-pallet-4.png" alt="狗區導覽圖二" />
        </div>

        <div class="dog-card-dtl card-dtl">
          <h4 class="area-title">狗區</h4>
          <p class="area-dtl text">
            舒適寬敞的大空間，讓毛孩自在跑跑跳跳！跟主人一起創造美好又快樂的回憶！
          </p>

          <p class="area-dtl text">
            本區設有安全圍欄，確保寵物在視線範圍內能自由玩耍，亦設有專門寵物排泄物處理站，以保持環境衛生。
          </p>

          <p class="area-list-title">營地類型：</p>
          <ul class="area-list list">
            <li>草地區：有足夠空間讓狗狗活動。</li>
            <li>雨棚區：為愛犬和主人提供額外遮蔽空間。</li>
            <li>棧板區：保持乾燥，適合帶狗露營者。</li>
          </ul>

          <button class="reserve-btn" @click="toReserve">我要預約</button>
        </div>
      </div>

      <!-- 貓區導覽卡片 -->
      <img class="cat-icon" src="@/assets/image/campGuide/cat_card_icon.svg" alt="貓咪icon" />

      <div class="area-card area-cat-card">
        <div class="cat-card-img">
          <img src="@/assets/image/campGuide/campsite-cat-pallet-3.png" alt="貓區導覽圖一" />
          <img src="@/assets/image/campGuide/campsite-cat-pallet-4.png" alt="貓區導覽圖二" />
        </div>

        <div class="cat-card-dtl card-dtl">
          <h4 class="area-title">貓區</h4>
          <p class="area-dtl text">
            安靜又舒適的環境，讓貓咪和貓奴們可以享受寧靜又愜意的露營體驗。
          </p>
          <p class="area-dtl text">
            本區提供良好的遮蔽及貓爬架和多個休憩處，讓貓咪能自在的在自然環境中探索，不會遠離主人的視線。
          </p>
          <p class="area-list-title">營地類型：</p>
          <ul class="area-list list">
            <li>草地區：適合貓咪與主人一起悠哉躺平！</li>
            <li>雨棚區：提供給需要額外遮蔽的露營者。</li>
            <li>棧板區：適合全天候使用。</li>
          </ul>

          <button class="reserve-btn" @click="toReserve">我要預約</button>
        </div>
      </div>
    </div>

    <div class="shelter-office-bg">
      <!-- 野良之家區塊 -->
      <div class="guide-shelter">
        <div class="guide-shelter-info">
          <img src="@/assets/image/campGuide/shelter_big_img_pc_cut.jpg" alt="野良之家圖片">
          <div class="shelter-dtl">
            <h4 class="guide-shelter-title">野良之家</h4>
            <p class="guide-shelter-dtl text">
              小小安置流浪貓狗的臨時住所，<br />
              這裡的小動物都在等待他們的家，<br />
              歡迎喜歡貓狗的你來看看牠們！<br />
              給彼此一個互相認識的機會！
            </p>
            <button class="guide-shelter-btn" @click="toShelter">更多野良之家介紹</button>
          </div>
        </div>
      </div>

      <!-- 辦公區區塊 -->
      <div class="guide-office">

        <div class="area-office">
          <img src="@/assets/image/campGuide/map2.png" alt="立體地圖示意圖">
          <div class="office-text-pc">
            <h4 class="office-title">辦公區</h4>
            <p class="office-text text">位於營地入口處，包含：</p>
            <ul class="office-list list">
              <li>裝備租借區，小型倉庫可存放裝備</li>
              <li>男、女廁及無障礙廁所各一間</li>
              <li>緊急醫療站</li>
              <li>販賣機一部、冰箱一台</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 跑馬燈 -->
    <div class="guide-marquee">
      <img src="@/assets/image/campGuide/marquee.svg" alt="跑馬燈" />
    </div>

    <!-- 營地資訊區塊 -->
    <div id="nora-position"></div>
    <div class="guide-camp-info-bg">
  
      <div class="camp-cloud">
        <img src="@/assets/image/campGuide/cloud_m_large.svg" alt="營地資訊裝飾大雲朵" />
        <img class="cloud-m-small" src="@/assets/image/campGuide/cloud_m_small.svg" alt="營地資訊裝飾小雲朵" />
      </div>

      <div class="guide-camp-info-title">
      </div>

      <div class="gc-wrap">
        <div class="guide-camp-info">
          <div class="camp-info-pc">
            <h4 class="camp-info-title">營地資訊</h4>
            <ul class="camp-info p">
              <li>地址：南投縣仙山鄉翠湖路1號</li>
              <li>電話：0988-123-456</li>
              <li>Email：info@noracamp.com</li>
            </ul>
          </div>
          <div class="camp-info-map">
            <div class="camp-info-social">
              <div class="fb">
                <img src="@/assets/image/campGuide/fb.svg" alt="Facebook icon">
              </div>
              <div class="ig">
                <img src="@/assets/image/campGuide/ig.svg" alt="Instagram icon">
              </div>
              <div class="line">
                <img src="@/assets/image/campGuide/line.svg" alt="Line icon">
              </div>
            </div>          
            <img class="roadmap" src="@/assets/image/campGuide/roadmap.png" alt="手繪地圖" />
          </div>
        </div>
      </div>
    </div>

    <!-- 設施介紹區塊 -->

    <div class="guide-facility-intro-bg">
      <img class="colorful-flags" src="@/assets/image/campGuide/colorfulflags3.svg" alt="設施介紹區塊三角旗" />
      <div id="nora-facility"></div>

      <div class="facility-pc">
        <div class="facility-intro">
          <div class="facility-slider-btn">
              <button class="facility-btn" @click="prevSlide">
                <img src="@/assets/image/campGuide/left_button_m.svg" alt="左邊箭頭按鈕" />
              </button>

              <div class="facility-slider-container">
                <transition name="fade" mode="out-in">
                  <img :src="getImageUrl(currentIndex)" :key="currentIndex" class="slider-image" />
                </transition>
              </div>

              <button class="facility-btn" @click="nextSlide">
                <img src="@/assets/image/campGuide/right_button_m.svg" alt="右邊箭頭按鈕" />
              </button>
          </div>
          <div class="txt-tree">
            <div class="facility-txt">
              <h4 class="facility-intro-title">設施介紹</h4>
              <p class="facility-top">
                各營位有一個插頭、一組水槽、一盞路燈<br />
                各區域有冷凍庫、冷藏冰箱及衛浴設施
              </p>
              <ul class="female-wc-list p">
                <li>衛浴設施：</li>
                <li>廁所：多間分隔單位，有環保節水馬桶</li>
                <li>獨立淋浴間：提供熱水和隱私空間</li>
                <li>洗手台：配備肥皂、烘手機及鏡子</li>
              </ul>
            </div>

            <div class="facility_trees">
              <img class="facility_tree_icon" src="@/assets/image/campGuide/facility_tree_icon.svg" alt="棕梠樹圖一" />
              <img class="facility_tree_icon" src="@/assets/image/campGuide/facility_tree_icon.svg" alt="棕梠樹圖二" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 營區規範區塊 -->
    <div id="nora-rule"></div>
    <div class="guide-rules-bg">
      <img class="colorful-flags" src="@/assets/image/campGuide/colorfulflags3.svg" alt="營區規範區塊三角旗" />

      <div class="rule-icons">
        <img src="@/assets/image/campGuide/rule_dog_icon.svg" alt="營區規範狗icon" />
        <img src="@/assets/image/campGuide/rule_cat_icon.svg" alt="營區規範貓icon" />
      </div>

      <div class="rules-pc">
        <div class="guide-rules">
          <h4 class="rules-title">營區規範</h4>
          <img src="@/assets/image/campGuide/attention.svg" alt="!圖片" />
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
      </div>

      <div class="rule-trees">
        <img src="@/assets/image/campGuide/tree_icon_2.svg" alt="樹圖片" />
        <img src="@/assets/image/campGuide/tree_icon_1.svg" alt="樹圖片" />
        <img src="@/assets/image/campGuide/tree_icon_2.svg" alt="樹圖片" />
        <img src="@/assets/image/campGuide/tree_icon_1.svg" alt="樹圖片" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url(/src/assets/sass/page/campGuide.scss);
</style>