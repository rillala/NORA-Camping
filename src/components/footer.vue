<script>
import { RouterLink, RouterView } from 'vue-router';
import jelloBtn from '@/components/button/dyyBtn.vue';

export default {
  components: {
    jelloBtn,
  },
  data() {
    return {
      inputEmail: '',
      mediaLink: [
        {
          mediaType: 'facebook',
          imgPath: 'headerFooter/facebook.png',
          link: '',
        },
        {
          mediaType: 'instgram',
          imgPath: 'headerFooter/instagram.png',
          link: '',
        },
        {
          mediaType: 'line',
          imgPath: 'headerFooter/line.png',
          link: '',
        },
      ],
      siteMap: [
        {
          title: '關於野良',
          routerLink: '/about',
          sublist: [
            {
              linkName: '創辦故事',
              hash: '#nora-story',
            },
            {
              linkName: '品牌理念',
              hash: '#nora-concept',
            },
            {
              linkName: '營業資訊',
              hash: '#nora-intro',
            },
            {
              linkName: '最新消息',
              routerLink: '/',
              hash: '#nora-news',
            },
          ],
        },
        {
          title: '營地導覽',
          routerLink: '/camp',
          sublist: [
            {
              linkName: '營區地圖',
              hash: '#nora-zone',
            },
            {
              linkName: '營區地點',
              hash: '#nora-position',
            },
            {
              linkName: '設施介紹',
              hash: '#nora-facility',
            },
            {
              linkName: '營區規範',
              hash: '#nora-rule',
            },
          ],
        },
        {
          title: '常見問題',
          routerLink: '/faq',
          sublist: [
            {
              linkName: '問題解惑',
              hash: '#nora-faq',
            },
            {
              linkName: '聯絡我們',
              hash: '#nora-contact',
            },
          ],
        },
        {
          title: '野良之家',
          routerLink: '/shelter',
          sublist: [
            {
              linkName: '認識中途',
              hash: '#nora-shelter',
            },
            {
              linkName: '志工活動',
              hash: '#nora-volunteer',
            },
            {
              linkName: '領養流程',
              hash: '#nora-adopt',
            },
          ],
        },
      ],
      reserveBtn: {
        name: '線上預約',
        path: '/reserve',
      },
      shopBtn: {
        name: '野良選物',
        path: '/shop',
      },
    };
  },
  methods: {
    emailSubmit() {},
    getImageUrl(paths) {
      return new URL(`../assets/image/${paths}`, import.meta.url).href;
    },
  },
};
</script>

<template>
  <footer class="bg-light-gray">
    <div class="sitemap dark">
      <ul class="site-link">
        <li v-for="item in siteMap" :key="item.title">
          <p class="dark title">{{ item.title }}</p>
          <ul v-if="item.sublist">
            <li v-for="subItem in item.sublist" :key="subItem.linkName">
              <router-link
                :to="{
                  path: subItem.routerLink || item.routerLink,
                  hash: subItem.hash,
                }"
                class="dark sub-link"
                >{{ subItem.linkName }}</router-link
              >
            </li>
          </ul>
        </li>
      </ul>

      <ul class="btn-area">
        <li>
          <RouterLink :to="reserveBtn.path" id="reserve-btn-footer">
            <img
              :src="getImageUrl('headerFooter/reservation-footer.png')"
              :alt="reserveBtn"
            />
            <p class="dark">{{ reserveBtn.name }}</p>
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="shopBtn.path" id="shop-btn-footer"
            ><img
              :src="getImageUrl('headerFooter/shop-footer.png')"
              :alt="shopBtn"
            />
            <p class="dark">{{ shopBtn.name }}</p>
          </RouterLink>
        </li>
      </ul>
    </div>

    <div class="bg-blue-3 container">
      <div class="subscribe">
        <p class="white01">
          訂閱 NORA Camp
          <br class="br-mobile" />電子報，<br />與我們一同分享露營<br
            class="br-mobile"
          />和貓狗的美好時光！
        </p>
        <div class="box">
          <input
            type="email"
            name="email"
            id="email-input"
            placeholder="請輸入您的電子郵件"
            v-model="inputEmail"
          />
          <jelloBtn
            :content="'送出'"
            id="email-submit"
            class="tinyp"
            @click="emailSubmit"
          />
        </div>
      </div>

      <div class="information">
        <div class="logo">
          <img
            :src="getImageUrl('headerFooter/logo-mobile-light.png')"
            alt="logo-image"
          />
        </div>
        <p class="title white01">聯絡我們</p>
        <p class="info white01">地址：南投縣仙山鄉翠湖路1號</p>
        <p class="info white01">電話：0988-123-456</p>
        <p class="info white01">Email：info@noracamp.com</p>
        <div class="social-media">
          <a
            v-for="media in mediaLink"
            :href="media.link"
            :key="media.mediaType"
          >
            <img :src="getImageUrl(media.imgPath)" :alt="media.mediaType" />
          </a>
        </div>
      </div>
    </div>

    <div class="tinyp">
      本網站為緯育TibaMe_前端設計工程師班第88期學員專題成果作品，本平台僅供學習、展示之用。若有抵觸有關著作權，或有第三人主張侵害智慧財產權等情事，均由學員負法律上責任，緯育公司概不負責。若有侵權疑慮，您可以私訊［緯育TibaMe］，後續會由專人協助處理。
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/page/footer.scss';
</style>
