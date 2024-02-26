<script>
// 引入函式庫
import axios from 'axios';
import apiInstance from '@/plugins/auth';

import { RouterLink, RouterView } from 'vue-router';
import progressBar from '@/components/reserve/bannerStep.vue';
import nextPageBtn from '@/components/reserve/nextPageBtn.vue';

import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import { useScreens } from 'vue-screen-utils';

export default {
  components: {
    progressBar,
    nextPageBtn,
    DatePicker,
  },
  data() {
    return {
      // 頁面基本資訊
      timeRules: [
        {
          title: '一般平日、假日',
          line1: '入場時間：10:00',
          line2: '退場時間：14:00',
        },
        {
          title: '連續假期第一天',
          line1: '入場時間：10:00',
          line2: '退場時間：12:00',
        },
        {
          title: '連續假期第二天',
          line1: '入場時間：14:00',
          line2: '退場時間：12:00',
        },
        {
          title: '夜衝',
          line1: '入場時間：',
          line2: '16:00-20:00',
        },
      ],
      leftPosition: 0, // 追蹤.time-container的left值
      selectedSpan: 1, // 追蹤哪個span被選中
      selectSiteList: [],
      chosenZone: 'cat',
      hasDiscount: false,
      catSiteList: [
        {
          id: 1,
          name: '草地區',
          price: 0,
          icon: 'grass.svg',
          picList: [
            'campsite-cat-grass-1.png',
            'campsite-cat-grass-2.png',
            'campsite-cat-grass-3.png',
          ],
          picShow: 0,
          intro:
            '貓區的草地區提供了一片親近自然的環境，讓貓咪能在柔軟的草地上悠閒地曬太陽或玩耍。這個開放區域適合帶來野餐墊和帳篷，享受戶外的寧靜時光。',
          warning: [
            '保持草地清潔：請勿亂丟垃圾，使用專門的垃圾回收設施。',
            '寵物監控：確保您的貓咪在草地區不會遠離您的視線範圍，並避免打擾其他露營者。',
            '自然保護：請勿採集或損壞周圍的植物和自然環境。',
          ],
          public: [
            '草地區提供柔軟的草地供貓咪在自然環境中遊戲。',
            '設有適合貓咪的遊樂設施，包括攀爬架和隱蔽處。',
            '草地區設有專用的貓咪用品清潔站。',
          ],

          isWarningOpen: false,
          count: 0,
        },
        {
          id: 2,
          name: '棧板區',
          price: 0,
          icon: 'pallet.svg',
          picList: [
            'campsite-cat-pallet-1.png',
            'campsite-cat-pallet-2.png',
            'campsite-cat-pallet-3.png',
          ],
          picShow: 0,
          intro:
            '棧板區為愛貓的露營者提供了一個堅固的基座，適合設置帳篷和露營家具。這個地面硬化的區域適合在天氣多變的季節使用，確保露營裝備乾燥和舒適。',
          warning: [
            '帳篷安裝：請按照指示正確地在棧板上安裝帳篷，避免損壞棧板結構。',
            '清潔維護：保持棧板區域乾淨，使用後清理任何垃圾或雜物。',
            '貓咪警覺：在棧板區域內，特別注意您的貓咪不要爬上不安全的高處，以免跌落或受傷。',
          ],
          public: [
            '每個營位配備專為貓咪設計的安全設施，包括攀爬架和休息區。',
            '靠近主要步道，方便貓主人帶著貓咪散步。',
            '設有專門的貓砂處理區，保持環境清潔。',
          ],

          isWarningOpen: false,
          count: 0,
        },
        {
          id: 3,
          name: '雨棚區',
          price: 0,
          icon: 'shed.svg',
          picList: [
            'campsite-cat-shed-1.png',
            'campsite-cat-shed-2.png',
            'campsite-cat-shed-3.png',
          ],
          picShow: 0,
          intro:
            '設有半遮蔽的雨棚，為貓咪和主人提供了一個避雨的安樂窩。這裡的環境更加安靜，適合閱讀或進行靜態活動，同時也保護了貓咪免受強烈日照和雨水的直接影響。',
          warning: [
            '噪音控制：由於雨棚區較為密閉，請控制音量，以免影響他人休息。',
            '設備安置：請確保所有露營裝備、包括帳篷，都安置在指定的區域內。',
            '貓咪安全：確保您的貓咪在雨棚下安全，避免任何可能的意外或走失。',
          ],
          public: [
            '雨棚區提供安靜舒適的休息空間，適合貓咪避暑和避雨。',
            '設有專為貓咪設計的休憩和娛樂區域。',
            '雨棚區鄰近貓咪專用的衛生設施，包括貓砂盒和清潔用品。',
          ],
          isWarningOpen: false,
          count: 0,
        },
      ],
      dogSiteList: [
        {
          id: 4,
          name: '草地區',
          price: 0,
          icon: 'grass.svg',
          picList: [
            'campsite-dog-grass-1.png',
            'campsite-dog-grass-2.png',
            'campsite-dog-grass-3.png',
          ],
          picShow: 0,
          intro:
            '狗區的草地區是為活潑的狗狗量身打造的，提供了充裕的跑跳空間。這裡的草地適合玩耍和運動，並且足夠的開放空間讓狗狗能自由奔跑，是遊戲和社交的理想場所。',
          warning: [
            '維持清潔： 請確保草地區域保持清潔，及時清理您的狗狗排泄物，並使用指定的垃圾回收設施。',
            '寵物看管： 確保您的狗狗在草地區不會遠離您的視線範圍，並防止其進入禁止區域或打擾其他露營者。',
            '遵守規則： 請遵循營地內關於寵物的所有規定，包括繫繩要求或特定活動時間。',
          ],
          public: [
            '設有寬敞的草地供狗狗奔跑和遊戲，並設有座椅供主人休息。',
            '草地區設有定期清理的寵物排泄物專用垃圾桶。',
            '配備夜間照明設施，確保夜晚活動的安全。',
          ],

          isWarningOpen: false,
          count: 0,
        },
        {
          id: 5,
          price: 0,
          name: '棧板區',
          icon: 'pallet.svg',
          picList: [
            'campsite-dog-pallet-1.png',
            'campsite-dog-pallet-2.png',
            'campsite-dog-pallet-3.png',
          ],
          picShow: 0,
          intro:
            '棧板區給予露營者一個結實的地面，防止雨後泥濘的不便。該區域不僅保證了帳篷和裝備的穩定性，也為帶著狗狗的露營者提供了清潔和容易維護的環境。',
          warning: [
            '帳篷安裝： 在棧板上安裝帳篷時，請遵循正確的指引，以保持棧板的完整性和安全性。',
            '整潔責任： 使用後，請清理您的區域，包括任何寵物排泄物或垃圾，以保持營地的清潔。',
            '狗狗監管： 特別留意您的狗狗在棧板區的行為，避免其咬傷或損壞棧板設施。',
          ],
          public: [
            '每個營位配備電源插座和水槽，方便狗主人為寵物準備食物和水。',
            '靠近停車場，便於攜帶露營設備和寵物用品。',
            '提供專門的寵物清潔區，包括淋浴設施和專用的寵物用垃圾桶。',
          ],

          isWarningOpen: false,
          count: 0,
        },
        {
          id: 6,
          price: 0,
          name: '雨棚區',
          icon: 'shed.svg',
          picList: [
            'campsite-dog-shed-1.png',
            'campsite-dog-shed-2.png',
            'campsite-dog-shed-3.png',
          ],
          picShow: 0,
          intro:
            '雨棚區提供額外的遮蔽，適合狗狗和露營者在陰涼處休息。這裡的環境適合狗狗在熱日或小雨中保持涼爽，也為主人提供了一個舒適的社交和烹飪空間。',
          warning: [
            '噪音管理： 雨棚區可能會集中較多人和狗狗，請控制噪音，特別是在夜間，以免影響他人休息。',
            '狗狗安全： 在雨棚下，確保您的狗狗受到妥善的看護，避免它們走失或製造混亂。',
            '設備放置： 請確保所有露營裝備和帳篷都在您的指定區域內，以維持雨棚區的整潔和有序。',
          ],
          public: [
            '雨棚區提供額外的遮蔽，適合在炎熱或雨天休息。',
            '設有寵物用飲水區和小型休憩區域。',
            '雨棚區靠近公共衛浴設施，方便主人使用。',
          ],

          isWarningOpen: false,
          count: 0,
        },
      ],

      // 保留兩個變數用來擷取入住和退房日期
      startDate: '',
      endDate: '',

      // VCalender 變數
      screen: null,
      range: {
        start: '',
        end: '',
      },
      calendarAttributes: [],
      disabledDates: [],

      // 資料庫資料
      remainList: [],
      siteTypeList: [],

      // 房間剩餘數量
      minRemains: {},
    };
  },
  created() {
    // 初始化 useScreens
    const { mapCurrent } = useScreens({
      xs: '0px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
    });
    this.screen = mapCurrent({ lg: 2 }, 1);

    // 資料庫:生成及抓取剩餘數量
    this.generateRemainDb();
    // 抓原始資料
    this.getSiteType();
  },
  mounted() {
    // 如果有儲存過選擇的日期和夜衝, 則讀取值
    this.startDate = sessionStorage.getItem('startDate') || '';
    this.endDate = sessionStorage.getItem('endDate') || '';

    if (this.startDate && this.endDate) {
      const storedStart = this.startDate.split('-').map(Number);
      const storedEnd = this.endDate.split('-').map(Number);

      this.range = {
        start: new Date(storedStart[0], storedStart[1] - 1, storedStart[2]),
        end: new Date(storedEnd[0], storedEnd[1] - 1, storedEnd[2]),
      };
    }

    this.hasDiscount = sessionStorage.getItem('hasDiscount') || false;

    // 如果有儲存過選擇的營區和數量, 則讀取值
    let StoredZone = sessionStorage.getItem('chosenZone');
    if (StoredZone == 'cat') {
      this.choseCatZone();
    } else {
      this.choseDogZone();
    }

    let storedDataString = sessionStorage.getItem('selectedSites');
    let siteDataArray = [];

    if (storedDataString) {
      siteDataArray = storedDataString.split(',').map(item => {
        let [id, count] = item.split(':').map(Number);
        return { id, count };
      });
    }

    siteDataArray.forEach(itemStored => {
      let matchedItem = this.selectSiteList.find(
        itemPage => itemPage.id === itemStored.id,
      );
      if (matchedItem) {
        matchedItem.count = itemStored.count;
      }
    });

    // 輪播動畫自動播放的部分
    this.checkAutoScroll();
    window.addEventListener('resize', this.checkAutoScroll);
  },
  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    window.removeEventListener('resize', this.checkAutoScroll);
  },
  computed: {
    siteSum() {
      return this.selectSiteList.reduce((acc, cur) => acc + cur.count, 0);
    },
    stayDuration() {
      if (this.startDate && this.endDate) {
        // 將日期字符串轉換為 Date 物件
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);

        // 計算兩個日期之間的差異（以毫秒為單位）
        const diff = end.getTime() - start.getTime();

        // 將毫秒轉換為天數
        return diff / (1000 * 3600 * 24);
      }
      return 0; // 如果日期未設定，則返回 0
    },
    columns() {
      // 根據當前屏幕尺寸返回列數
      return this.screen;
    },
  },
  watch: {
    isWarningOpen(newVal, oldVal) {
      imageSrc = newVal ? '關閉icon' : '打開icon';
    },
    stayDuration(newValue) {
      // 住宿天數改變時，更新 sessionStorage
      sessionStorage.setItem('stayDuration', newValue.toString());
    },
    // 日期改變時，更新 sessionStorage
    startDate(newVal) {
      sessionStorage.setItem('startDate', newVal);
      this.updateDuration();
    },
    endDate(newVal) {
      sessionStorage.setItem('endDate', newVal);
      this.updateDuration();
      this.getSelectedSitesRemain();
    },
    hasDiscount(newVal) {
      sessionStorage.setItem('hasDiscount', newVal);
    },
    range(newVal) {
      if (newVal.start) {
        this.startDate = this.formatDate(newVal.start);
      }
      if (newVal.end) {
        this.endDate = this.formatDate(newVal.end);
      }
    },
  },
  methods: {
    // 頁面基本 func--------------------
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份從0開始，所以加1
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    updateDuration() {
      if (this.stayDuration > 0) {
        sessionStorage.setItem('stayDuration', this.stayDuration.toString());
      }
    },
    formatPrice(price) {
      return price.toLocaleString('en-US');
    },
    getImageUrl(paths) {
      return new URL(`../assets/image/reserve/camp/${paths}`, import.meta.url)
        .href;
    },
    getIcon(paths) {
      return new URL(`../assets/image/universe/${paths}`, import.meta.url).href;
    },
    goToNextStep(nextPath) {
      if (this.siteSum == 0 || this.stayDuration == 0) {
        this.$router.push('/reserve');
        alert('請先選擇住宿日期及營位數量。');
      } else {
        // 1.確認這個步驟是否重複過了, 有的話就: 更新日期和挑選營位資訊 + 跳轉
        if (sessionStorage.getItem('isStep1Clicked')) {
          this.updateSiteChose();
          return;
        } else {
          // 1. 更新日期和挑選營位資訊
          this.updateSiteChose();
          // 2. 建立此步驟已被選擇過的 isStep1Clicked = true
          sessionStorage.setItem('isStep1Clicked', 'true');
          // 3. 建立記錄步驟數的 currentStep
          let currentStep = parseInt(
            sessionStorage.getItem('currentStep') || '1',
          );
          currentStep++;
          sessionStorage.setItem('currentStep', currentStep.toString());
          if (nextPath) {
            this.$router.push(nextPath);
          }
        }
      }
    },

    // 時間規則的動畫和點擊--------------------
    updatePosition(index) {
      // 根據點擊的span調整left值
      this.leftPosition = index * -300;
      this.selectedSpan = index + 1;
    },
    startAutoScroll() {
      const spanCount = 4; // 假设有 4 个 span
      this.intervalId = setInterval(() => {
        const nextIndex = this.selectedSpan % spanCount;
        this.updatePosition(nextIndex);
      }, 1000);
    },
    checkAutoScroll() {
      if (window.innerWidth < 480 && !this.intervalId) {
        this.startAutoScroll();
      } else if (window.innerWidth >= 480 && this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },

    // 營區種類圖片左右動作
    changePicShowMinus(index) {
      if (this.selectSiteList[index].picShow === 0) {
        this.selectSiteList[index].picShow =
          this.selectSiteList[index].picList.length - 1;
      } else {
        this.selectSiteList[index].picShow--;
      }
    },
    changePicShowPlus(index) {
      const finalShowIndex = this.selectSiteList[index].picList.length - 1;
      if (this.selectSiteList[index].picShow === finalShowIndex) {
        this.selectSiteList[index].picShow = 0;
      } else {
        this.selectSiteList[index].picShow++;
      }
    },

    // 營區選擇相關--------------------
    updateSiteChose() {
      // 更新或建立 siteChoseList 和 chosenZone
      let updatedSiteChoseString = this.selectSiteList
        .filter(item => item.count !== 0)
        .map(item => item.id + ':' + item.count)
        .join(',');
      sessionStorage.setItem('selectedSites', updatedSiteChoseString);

      sessionStorage.setItem('chosenZone', this.chosenZone);
    },
    updateChosenzone(zone) {
      const catButton = document.getElementById('cat-zone-btn');
      const dogButton = document.getElementById('dog-zone-btn');
      if (zone == 'cat') {
        dogButton.classList.remove('chosen-zone');
        catButton.classList.add('chosen-zone');
      } else {
        catButton.classList.remove('chosen-zone');
        dogButton.classList.add('chosen-zone');
      }
    },
    choseCatZone() {
      this.selectSiteList = this.catSiteList;
      this.updateChosenzone('cat');
      this.chosenZone = 'cat';
      this.changeToCalendarAttr(this.remainList);
    },
    choseDogZone() {
      this.selectSiteList = this.dogSiteList;
      this.updateChosenzone('dog');
      this.chosenZone = 'dog';
      this.changeToCalendarAttr(this.remainList);
    },

    // 營位數量增減按鈕相關--------------------
    minus(siteName) {
      const siteType = this.selectSiteList.find(p => p.name === siteName);
      if (siteType.count > 0) {
        siteType.count--;
      }
    },
    plus(siteName) {
      const siteType = this.selectSiteList.find(p => p.name === siteName);
      if (siteType.count < siteType.remain) {
        siteType.count++;
      } else {
        alert('抱歉，剩餘營位數量不足！');
      }
    },

    // 串 PHP --------------------
    generateRemainDb() {
      //去資料庫更新1.剩餘數量表 2.營位種類表,並抓取 剩餘數量表資訊
      apiInstance
        .get('generateRemainSite.php')
        .then(response => {
          // console.log(response.data.all);
          this.remainList = response.data.all;
          if (this.startDate) {
            this.getSelectedSitesRemain();
          }
          this.changeToCalendarAttr(this.remainList);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    getSiteType() {
      apiInstance
        .get('getSiteType.php')
        .then(response => {
          this.siteTypeList = response.data.all;
          this.getTypePrice(this.catSiteList);
          this.getTypePrice(this.dogSiteList);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    getTypePrice(list) {
      list.forEach(catSiteItem => {
        const matchingSiteTypeItem = this.siteTypeList.find(
          siteTypeItem => siteTypeItem.type_id == catSiteItem.id,
        );

        if (matchingSiteTypeItem) {
          catSiteItem.price = matchingSiteTypeItem.price;
        }
      });
    },

    // VCalender 相關 --------------------
    changeToCalendarAttr(remainData) {
      // 計算每個日期的房間總數
      const roomCounts = remainData.map(item => {
        const date = item.date;
        // 根据 chosenZone 计算当日所有房型的剩余总数
        const rooms = Object.keys(item).reduce((sum, key) => {
          if (key === 'date') {
            return sum; // 如果是日期键，跳过
          }
          const keyAsNumber = parseInt(key, 10); // 将键转换为数字
          // 根据 chosenZone 添加条件判断
          if (this.chosenZone == 'cat') {
            return keyAsNumber < 4 ? sum + item[key] : sum;
          } else {
            return keyAsNumber > 3 ? sum + item[key] : sum;
          }
        }, 0);
        return { date, rooms };
      });
      // console.log(roomCounts);

      // 禁用的日期
      this.disabledDates = roomCounts
        .filter(item => item.rooms == 0)
        .map(item => item.date);

      // red dot 的顯示日期-->剩餘數量為 0-------------這裡邏輯怪怪的, 應該是顯示<3的之類
      const emptySiteDays = roomCounts
        .filter(item => item.rooms == 0)
        .map(item => ({
          key: 'emptySiteDay',
          dot: 'red',
          dates: item.date,
        }));
      console.log('這是沒房間的');
      console.log(emptySiteDays);

      // green dot 的顯示日期-->剩餘數量> 10
      const lotSitesDays = roomCounts
        .filter(item => item.rooms > 10)
        .map(item => ({
          key: 'lotSitesDay',
          dot: 'green',
          dates: item.date,
        }));
      console.log('這是很多房間的');
      console.log(lotSitesDays);

      this.calendarAttributes = [...emptySiteDays, ...lotSitesDays];
    },

    // 剩餘數量 --------------------
    getSelectedSitesRemain() {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      end.setDate(end.getDate() - 1);

      const filteredRemains = this.remainList.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= start && itemDate <= end;
      });

      // console.log(filteredRemains);

      this.minRemains = this.getmin(filteredRemains);
      // console.log(this.minRemains);

      this.updateSiteListRemains();
    },

    getmin(array) {
      return array.reduce((minValues, currentItem) => {
        Object.keys(currentItem).forEach(key => {
          // 忽略 'date' 鍵，只處理數字鍵
          if (key !== 'date') {
            const value = currentItem[key];
            // 如果當前鍵在 minValues 中尚未設置，或當前項目的值小於 minValues 中的值，則更新
            if (!minValues[key] || value < minValues[key]) {
              minValues[key] = value;
            }
          }
        });
        return minValues;
      }, {}); // 初始化 minValues 為空物件
    },

    updateSiteListRemains() {
      this.selectSiteList.forEach(item => {
        const itemId = item.id.toString(); // 確保id是字符串格式，以匹配minRemains的鍵
        if (this.minRemains.hasOwnProperty(itemId)) {
          // 如果minRemains中有匹配的鍵，則新增remain鍵到item物件中
          item.remain = this.minRemains[itemId];
        }
      });
    },
  },
};
</script>

<template>
  <section class="equipment">
    <progressBar :activeDiv="1" />

    <!--營區切換按鈕-->
    <div id="switch-btn" class="bg-blue-3">
      <button id="cat-zone-btn" @click="choseCatZone()" class="chosen-zone">
        <img :src="getImageUrl(`zonetype-cat.svg`)" alt="cat" /><span
          >貓區</span
        >
      </button>
      <button id="dog-zone-btn" @click="choseDogZone()">
        <img :src="getImageUrl(`zonetype-dog.svg`)" alt="dog" /><span
          >狗區</span
        >
      </button>
    </div>

    <!--預約時間日曆-->
    <div class="calendar">
      <DatePicker
        id="v-calendar"
        v-model.range="range"
        mode="date"
        is-required
        color="nora-calendar"
        borderless
        expanded
        :min-date="new Date()"
        :columns="columns"
        :attributes="calendarAttributes"
        :disabled-dates="disabledDates"
      />
      <div class="notes">
        <div class="green dot"></div>
        <div class="tinyp">剩餘營位數量 > 10</div>
        <div class="red dot"></div>
        <div class="tinyp">剩餘營位數量 = 0</div>
      </div>
    </div>

    <!--營區時間規定-->
    <div id="time-rule">
      <h3 class="dark">營區時間規定</h3>
      <div class="time-scroll">
        <div class="time-container" :style="{ left: leftPosition + 'px' }">
          <div class="box" v-for="rule in timeRules">
            <div class="title white01 bg-blue-3">{{ rule.title }}</div>
            <p class="time1 dark">{{ rule.line1 }}</p>
            <p class="time2 dark">{{ rule.line2 }}</p>
          </div>
        </div>
        <div class="scroll-chose">
          <span
            v-for="index in 4"
            :key="index"
            @click="updatePosition(index - 1)"
            :class="{ 'chose-span': selectedSpan === index }"
          ></span>
        </div>
      </div>
    </div>

    <!--夜衝勾選-->
    <div id="isnight">
      <div class="box dark">
        <img :src="getImageUrl('moon.svg')" alt="night" />
        <h4><span>第一天是否為</span>夜衝：</h4>
        <input type="checkbox" v-model="hasDiscount" /><span class="p">是</span>
        <p>
          注意事項：夜衝可能會因天氣惡劣（如暴雨、強風等）而受限制。夜衝方案為每帳第一日優惠500元。
        </p>
      </div>
    </div>

    <!--營位挑選-->
    <div class="site-list dark" v-for="(site, index) in selectSiteList">
      <div class="site">
        <img :src="getImageUrl(site.icon)" :alt="site.name" />
        <h4>{{ site.name }}</h4>
        <div class="line"></div>
      </div>
      <div class="info">
        <div class="img">
          <button class="left" @click="changePicShowMinus(index)">
            <img :src="getIcon('left-arrow-btn.svg')" alt="向左箭頭" />
          </button>
          <div class="show bg-blue-3">
            <img
              :src="getImageUrl(site.picList[site.picShow])"
              :alt="site.name"
            />
          </div>
          <button class="right" @click="changePicShowPlus(index)">
            <img :src="getIcon('right-arrow-btn.svg')" alt="向右箭頭" />
          </button>
        </div>
        <div class="text">
          <p class="describe">{{ site.intro }}</p>
          <div class="box">
            <p class="price">${{ formatPrice(site.price) }} /帳</p>
            <p class="remain red01">營位剩餘數量：{{ site.remain }}帳</p>
          </div>

          <!--數量增減按鈕-->
          <div class="num-btn">
            <button class="minus-btn" @click="minus(site.name)">
              <div class="minus-icon bg-dark"></div>
            </button>
            <input
              class="dark"
              type="number"
              min="0"
              readonly
              v-model="site.count"
            />
            <button class="plus-btn" @click="plus(site.name)">
              <div class="minus-icon bg-dark"></div>
              <div class="add-icon bg-dark"></div>
            </button>
          </div>
        </div>
      </div>

      <!--注意事項區塊-->
      <div class="notice bg-blue-1 dark">
        <div class="warning" v-if="site.isWarningOpen === true">
          <ul>
            <p class="title dark">注意事項：</p>
            <li class="content tinyp" v-for="content in site.warning">
              {{ content }}
            </li>
          </ul>
          <ul>
            <p class="title dark">公共設備：</p>
            <li class="content tinyp" v-for="content in site.public">
              {{ content }}
            </li>
          </ul>
        </div>

        <button @click="site.isWarningOpen = !site.isWarningOpen">
          <!--注意事項關閉的時候-->
          <div class="btn-icon" v-if="site.isWarningOpen === false">
            <img :src="getImageUrl('open-icon.svg')" alt="open-icon" />
            <p class="word">注意事項</p>
          </div>
          <!--注意事項開啟的時候-->
          <div class="btn-icon" v-else>
            <img :src="getImageUrl('close-icon.svg')" alt="close-icon" />
            <p class="word">關閉</p>
          </div>
        </button>
      </div>
    </div>

    <div class="alert">
      <div class="red01 tinyp" v-if="stayDuration == 0">
        -您目前沒有選擇露營日期-
      </div>
      <div class="red01 tinyp" v-if="siteSum == 0">
        -您目前沒有選擇任何營位-
      </div>
    </div>

    <!--下個步驟的按鈕-->
    <nextPageBtn
      @click="goToNextStep('/equipment')"
      :text="`裝備租借`"
      :path="`/equipment`"
    />
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/page/reserveFirst.scss';
</style>
