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
      <img
        src="/src/assets/image/campGuide/flag_m_left2.png"
        alt="立體地圖區塊左側旗子"
      />
      <img
        src="/src/assets/image/campGuide/flag_m_right2.png"
        alt="立體地圖區塊右側旗子"
      />
    </div>

    <!-- 導覽卡片區塊 -->
    <div class="guide-card">
      <!-- 狗區導覽卡片 -->
      <div class="area-card">
        <img src="" alt="狗區導覽圖一" />
        <img src="" alt="狗區導覽圖二" />
        <p class="area-title">狗區</p>
        <p class="area-dtl">
          舒適寬敞的大空間，<br />讓毛孩能自在跑跑跳跳！<br />跟主人一起創造美好又快樂的回憶！<br />
        </p>
        <p class="area-dtl">
          本區配有安全圍欄，<br />確保寵物在視線範圍內自由玩耍，<br />同時區內設有專門的寵物廢物處理站，以保持環境衛生。
        </p>
        <p class="area-list-title">營地類型：</p>
        <ul class="area-list">
          <li>草地區：15個營位，有足夠空間讓狗狗活動。</li>
          <li>雨棚區：10個營位，為愛犬和主人提供額外遮蔽空間。</li>
          <li>棧板區：10個營位，保持乾燥，適合帶狗露營者。</li>
        </ul>
        <button class="reserve-btn">我要預約</button>
      </div>

      <!-- 貓區導覽卡片 -->
      <div class="area-card">
        <img src="" alt="貓區導覽圖一" />
        <img src="" alt="貓區導覽圖二" />
        <p class="area-title">貓區</p>
        <p class="area-dtl">
          安靜又舒適的環境，<br />讓貓咪和貓奴們可以享受寧靜的露營體驗。
        </p>
        <p class="area-dtl">
          專為喜歡安靜休息的露營者及其貓咪同伴而設。<br />
          本區提供良好遮蔽，並有貓爬架和多個休憩處，<br />讓貓咪能在自然環境中探索，而不會遠離主人的視線。
        </p>
        <p class="area-list-title">營地類型：</p>
        <ul class="area-list">
          <li>草地區：10個營位</li>
          <li>雨棚區：5個營位，提供給需要額外遮蔽的露營者。</li>
          <li>棧板區：5個營位，適合全天候使用。</li>
        </ul>
        <button class="reserve-btn">我要預約</button>
      </div>
    </div>

    <!-- 中途之家區塊 -->
    <div class="guide-shelter">
      <img src="" alt="中途之家區塊大圖" />
      <img src="" alt="中途之家愛心圖形" />
      <p class="shelter-title">中途之家</p>
      <p class="shelter-dtl">
        小小安置流浪貓狗的臨時住所，<br />
        若喜歡貓貓狗狗的你，<br />
        這裡的小動物都在等待他們的家，<br />
        歡迎在旅途中來看看牠們！<br />
        給彼此一個互相認識的機會！
      </p>
      <button class="shelter-btn">更多中途之家介紹</button>
    </div>

    <!-- 辦公區區塊 -->
    <div class="guide-office">
      <img src="" alt="" />
      <div class="area-office">
        <p class="office-title">辦公區</p>
        <p>位於營地入口處，包含</p>
        <ul>
          <li>裝備租借區</li>
          <li>小型倉庫可存放裝備</li>
          <li>男、女廁及無障礙廁所各一間</li>
          <li>緊急醫療站</li>
          <li>販賣機一部、冰箱一台</li>
        </ul>
      </div>
    </div>

    <!-- 跑馬燈 -->
    <div class="guide-marquee">
      <p class="guide-marquee-dtl">WELCOME TO NORA CAMP !</p>
      <p class="guide-marquee-dtl">LET’S GO CAMPING !</p>
    </div>

    <!-- 營地資訊區塊 -->
    <div class="guide-camp-info-bg">
      <div class="guide-camp-info-title">
        <img src="" alt="營地資訊標題掛旗" />
        <p class="camp-info-title">營地資訊</p>
      </div>
      <div class="camp-cloud">
        <img src="" alt="營地資訊裝飾大雲朵" />
        <p class="camp-cloud-words">遠離塵囂！<br />放鬆身心靈！</p>
        <img src="" alt="營地資訊裝飾小雲朵" />
      </div>
      <div class="guide-camp-info">
        <img src="" alt="營地資訊帳篷圖形" />
        <ul class="camp-info">
          <li>地址：南投縣仙山鄉翠湖路1號</li>
          <li>電話：0988-123-456</li>
          <li>Email：info@noracamp.com</li>
          <li>@NORACampOfficial</li>
          <li>@noracamp_adventures</li>
          <li>@NORACamp</li>
        </ul>
      </div>
    </div>

    <!-- 設施介紹區塊 -->
    <div class="guide-facility-intro-bg">
      <img src="" alt="設施介紹區塊三角旗" />
      <div class="guide-facility-intro-title">
        <img src="" alt="設施介紹標題掛旗" />
        <p class="facility-intro-title">設施介紹</p>
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
        <p class="rules-title">營區規範</p>
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
.guide-banner {
  height: 200px;
  width: 100%;
  background-color: $blue-1;
  color: $blue-4;
  text-align: center;
}
.guide-map {
  width: 100%;
  background: linear-gradient(
    to bottom,
    rgba(139, 252, 239, 0.7),
    rgba(139, 252, 239, 0)
  );
}

.guide-flags {
  display: flex;
  justify-content: space-between;
}

@keyframes flagWaveLeft {
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

@keyframes flagWaveRight {
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
.guide-flag-left {
  animation: flagWaveLeft 0.8s infinite alternate;
}
.guide-flag-right {
  animation: flagWaveRight 0.8s infinite alternate;
}

.guide-map img {
  width: 100%;
}
</style>
