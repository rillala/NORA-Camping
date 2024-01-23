<script>
// 引入函式庫
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router';
import progressBar from '@/components/reserve/bannerStep.vue';

export default {
  components: {
    progressBar,
  },
  data() {
    return {
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
      isWarningOpen: true,
    };
  },
  watch: {
    isWarningOpen(newVal, oldVal) {
      imageSrc = newVal ? '關閉icon' : '打開icon';
    },
  },
  methods: {
    goToNextStep(nextPath) {
      if (sessionStorage.getItem('isStep1Clicked')) {
        return;
      } else {
        let currentStep = parseInt(
          sessionStorage.getItem('currentStep') || '1',
        );
        currentStep++;
        sessionStorage.setItem('currentStep', currentStep.toString());
        if (nextPath) {
          this.$router.push(nextPath);
        }
        sessionStorage.setItem('isStep1Clicked', 'true');
      }
    },
  },
};
</script>

<template>
  <section class="equipment">
    <progressBar :activeDiv="1" />

    <!--營區切換按鈕-->
    <div id="switch-btn">
      <button><img src="" alt="" /><span>貓區</span></button>
      <button><img src="" alt="" /><span>狗區</span></button>
    </div>

    <!--預約時間日曆-->

    <!--營區時間規定-->
    <div id="time-rule">
      <h3>營區時間規定</h3>
      <div class="time-container">
        <div class="box" v-for="rule in timeRules">
          <div class="title">{{ rule.title }}</div>
          <p class="time">{{ rule.line1 }}</p>
          <p class="time">{{ rule.line2 }}</p>
        </div>
      </div>
    </div>

    <!--夜衝勾選-->
    <div id="isnight">
      <div class="box">
        <img src="" alt="" />
        <h4>第一天是否為夜衝：</h4>
        <input type="checkbox" name="" id="" /><span>是</span>
      </div>
      <div class="tinyp">
        注意事項：夜衝可能會因天氣惡劣（如暴雨、強風等）而受限制。夜衝方案為每帳第一日優惠500元。
      </div>
      <div class="line"></div>
    </div>

    <!--營位挑選-->
    <div class="site-list" v-for="site in siteList">
      <div class="site">
        <img :src="site.icon" :alt="site.name" />
        <h4>{{ site.name }}</h4>
        <div class="line"></div>
      </div>
      <div class="info">
        <div class="img">
          <button class="left"><img src="" alt="向左箭頭" /></button>
          <div class="show">
            <img :src="site.picList[0]" :alt="site.name" />
          </div>
          <button class="right"><img src="" alt="向右箭頭" /></button>
        </div>
        <div class="text">
          <p class="describe">{{ site.intro }}</p>
          <p class="price">${{ site.price }}/帳</p>
          <div class="num-btn">
            <button class="minus-btn"></button>
            <input type="number" min="0" readonly v-model="site.count" />
            <button class="plus-btn"></button>
          </div>
        </div>
      </div>
      <div class="notice">
        <div class="warning" v-if="isWarningOpen">
          <ol>
            <p class="title">注意事項：</p>
            <li class="content" v-for="content in site.warning">
              {{ content }}
            </li>
          </ol>
          <ul>
            <p class="title">公共設備：</p>
            <li class="content" v-for="content in site.public">
              {{ content }}
            </li>
          </ul>
        </div>

        <button @click="isWarningOpen = !isWarningOpen">{{}}</button>
      </div>
    </div>

    <RouterLink to="/equipment" @click="goToNextStep"
      >要按過這個才可以進入下一步驟:2租借設備</RouterLink
    >
  </section>
</template>

<style lang="scss" scoped></style>
