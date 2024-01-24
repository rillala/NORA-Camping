<script>
// 引入函式庫
import axios from 'axios';

export default {};
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
        <img class="bigtent" src="/src/assets/image/campGuide/guide_info_bigtent.svg" alt="營地資訊帳篷圖形" />
        <ul class="camp-info">
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
      <img src="" alt="設施介紹區塊三角旗" />
      <div class="guide-facility-intro-title">
        <img src="" alt="設施介紹標題掛旗" />
        <h4 class="facility-intro-title">設施介紹</h4>
      </div>
      <div class="facility-cloud">
        <img src="" alt="設施介紹裝飾大雲朵" />
        <p class="facility-cloud-words">完善的設施！<br />露營起來更舒適！</p>
        <img src="" alt="設施介紹裝飾小雲朵" />
      </div>
      <div class="facility-intro">
        <img src="" alt="設施介紹icon" />
        <ul>
          <li>各營位有一個插頭、一組水槽、一盞路燈</li>
          <li>各區域有男性和女性衛浴設施、冷凍庫和冷藏冰箱各一</li>
        </ul>
        <img src="" alt="設施介紹圖片一" />
        <img src="" alt="設施介紹圖片二" />
        <img src="" alt="設施介紹圖片三" />
        <p class="female-wc-title">女性衛浴設施</p>
        <ul class="female-wc-list">
          <li>廁所：多間分隔單位，有環保節水馬桶</li>
          <li>淋浴間：獨立淋浴空間，提供熱水和隱私空間</li>
          <li>洗手台：配備肥皂、烘手機及鏡子</li>
        </ul>
        <p class="male-wc-title">男性衛浴設施</p>
        <ul class="male-wc-list">
          <li>廁所：多間分隔單位，內有環保節水馬桶</li>
          <li>淋浴間：獨立淋浴空間，提供熱水</li>
          <li>洗手台：配備肥皂、烘手機及鏡子</li>
        </ul>
      </div>
    </div>

    <!-- 營區規範區塊 -->
    <div class="guide-rules-bg">
      <img src="" alt="營區規範區塊三角旗" />
      <div class="guide-rules-title">
        <img src="" alt="營區規範標題掛旗" />
        <h4 class="rules-title">營區規範</h4>
      </div>
      <div class="rules-cloud">
        <img src="" alt="營區規範裝飾大雲朵" />
        <p class="rules-cloud-words">一起愛護環境！<br />開開心心露營！</p>
        <img src="" alt="營區規範裝飾小雲朵" />
      </div>
      <div class="guide-rules">
        <img src="" alt="營區規範icon" />
        <ol class="guide-rules-list">
          <li>垃圾分類： 請確實做好垃圾分類並放置於指定區域，保持營區清潔。</li>
          <li>夜間安靜： 夜間10點後請保持安靜，尊重其他露營者的休息。</li>
          <li>節約用水： 使用水源時請節約用水，保持營區水資源充足。</li>
          <li>禁火區域： 嚴禁在非指定區域焚火，以確保安全。</li>
          <li>
            寵物： 若攜帶寵物，請確認寵物是否需要牽繩，並留意寵物糞便的清理。
          </li>
          <li>禁止破壞植被： 請勿破壞營區植物，保護自然環境。</li>
          <li>共用設施清潔： 使用設施請保持共用設施清潔，以便他人使用。</li>
          <li>遵守營區指引： 遵從營區工作人員的指引和規定，維護營區秩序。</li>
          <li>禁止煩擾野生動物： 請不要騷擾或攪擾營區附近的野生動植物。</li>
          <li>緊急應變： 知悉營區緊急應變程序，確保安全。</li>
        </ol>
        <p class="guide-rules-end">
          以上規範旨在維護營區秩序和保護自然環境，希望所有露營者都能共同遵守。
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.guide-banner { //Banner區塊
  height: 200px;
  width: 100%;
  background-color: $blue-1;
  color: $blue-4;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.guide-map { //立體地圖區塊
  width: 100%;
  background: linear-gradient(
    to bottom,
    rgba(139, 252, 239, 0.7),
    rgba(139, 252, 239, 0.5),
    rgba(139, 252, 239, 0)
  );
}

.guide-flags { //旗子區塊
  display: flex;
  justify-content: space-between;
  overflow-x: hidden;
  overflow-y: hidden;
}

@keyframes flagWaveLeft { //左旗動畫
  0% {
    transform: rotateZ(10deg);
  }
  25% {
    transform: rotateZ(15deg);
  }
  50% {
    transform: rotateZ(20deg);
  }
  75% {
    transform: rotateZ(25deg);
  }
  100% {
    transform: rotateZ(20deg);
  }
}

@keyframes flagWaveRight { //右旗動畫
  0% {
    transform: rotateZ(-10deg);
  }
  25% {
    transform: rotateZ(-15deg);
  }
  50% {
    transform: rotateZ(-20deg);
  }
  75% {
    transform: rotateZ(-25deg);
  }
  100% {
    transform: rotateZ(-20deg);
  }
}
.guide-flag-left { //左旗動畫
  animation: flagWaveLeft 0.8s infinite alternate;
}
.guide-flag-right { //右旗動畫
  animation: flagWaveRight 0.8s infinite alternate;
}

.guide-map img { //立體地圖
  width: 100%;
}

.guide-card { //導覽卡片最外層
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background: linear-gradient(
    to bottom,
    rgba(226, 219, 62, 0.7),
    rgba(226, 219, 62, 0.5),
    rgba(226, 219, 62, 0.3),
  );
  position: relative;
}

.paw1 { //腳印
  position: absolute;
  right: 0;
}
.paw2 { //腳印
  position: absolute;
  left: 0;
  top: 3%;
}

.paw3 { //腳印
  position: absolute;
  left: 0;
  top: 15%;
}

.paw4 { //腳印
  position: absolute;
  right: 0;
  top: 12%;
}

.paw5 { //腳印
  position: absolute;
  right: 0;
  top: 23%;
}

.paw6 { //腳印
  position: absolute;
  left: 0;
  top: 38%;
}
.paw7 { //腳印
  position: absolute;
  right: 0;
  top: 35%;
}

.paw8 { //腳印
  position: absolute;
  left: 0;
  top: 55%;
}

.paw9 { //腳印
  position: absolute;
  right: 0;
  top: 62%;
}

.paw10 { //腳印
  position: absolute;
  right: 0;
  top: 42%;
}

.cat-area-grass-img { //草跟貓的圖
  display: flex;
  align-items: last baseline;
}

h4 {
  text-align: center;
}

.area-card { //導覽卡片內層
  padding: 30px;
  display: flex;
  flex-direction: column;
  border-radius: $radius;
  background-color: $blue-3;
  color: $white01;
}

.area-card img { //導覽卡片內層圖片
  padding-bottom: 10px;
  width: 100%;
  border-radius: $radius;
}

.card-dtl { //狗區貓區的卡片內容
  padding: 10px 0px;
}

.area-dtl { //狗區貓區的卡片內容p
  padding: 10px 0px;
}

.list { //狗區貓區的清單
  list-style-type: disc;
}

.shelter-office-bg {
  background: linear-gradient(
    to bottom,
    rgba(226, 219, 62, 0.3),
    rgba(226, 219, 62, 0)
  );
}

.guide-shelter { //中途之家大區塊
  position: relative;
}

.guide-shelter img { //中途之家的圖片
  width: 100%;
  vertical-align: bottom;
}

.guide-shelter-info { //中途之家的資訊
  position: absolute;
  top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  color: $white01;
  padding: 20px 0px;
}

.guide-shelter-dtl {
  padding: 20px 0px;
}

.guide-office { 
  position: relative;
}

.guide-office img { //辦公區圖片
  width: 100%;
  vertical-align: bottom;
}

.area-office {
  position: absolute;
  top: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  color: $dark;
  padding: 20px 0px;
}

.office-text {
  padding-top: 10px;
}

.office-list {
  padding: 10px 0px;
}

.guide-marquee { //跑馬燈
  padding: 20px 0px;
  color: $white01;
  background-color: $blue-3;
  white-space: nowrap; //內容保持在同一行
  overflow: hidden; //超出的先隱藏
}

.guide-marquee img { //跑馬燈圖片設置動畫
  animation: marquee 12s linear infinite;
}

@keyframes marquee { //跑馬燈動畫
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
}

.guide-camp-info-bg { //營地資訊背景
  background: linear-gradient(
    to bottom,
    rgba(213, 250, 255, 1),
    rgba(213, 250, 255, 0.8),
    rgba(213, 250, 255, 1)
  );
}
.guide-camp-info-title { //營地資訊
  position: relative;
}
.guide-camp-info-title img { //營地資訊招牌
  width: 100%;
  padding-top: 50px;
}

.guide-camp-info-title h4 { //營地資訊標題
  position: absolute;
  right: 19%;
  top: 48%;
  color: $white01 ;
}
.camp-cloud { //營地資訊雲朵一
  position: relative;
}

.camp-cloud :nth-child(2){ //營地資訊雲朵二
  padding-left: 50%;
}

.camp-cloud-words { //營地資訊雲朵文字
  position: absolute;
  top: 20%;
  left: 25%;
  color: $yellow-3;
}

.guide-camp-info { //營地資訊帳篷區塊
  position: relative;
  color: $white01;
  display: flex;
}

.guide-camp-info .bigtent { //營地資訊帳篷的圖片
  width: 100%;
}

.camp-info { //營地資訊帳篷文字
  position: absolute;
  top: 36%;
  left: 25%;
}

.camp-info li {
  padding-top: 5px;
}

.camp-info-social { //營地資訊帳篷社群媒體區塊
  display: flex;
  flex-direction: column;
  color: $white01;
}

.fb ,
.ig ,
.line { //營地資訊帳篷社群媒體文字
  display: flex;
  align-items: center;
  padding-top: 5px;
}

.fb p ,
.ig p ,
.line p {
  padding-left: 5px;
}

</style>
