<script>
export default {
  props: {
    // 指定哪一個 div 應該添加類別
    activeDiv: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      stepList: [
        { step: '營位預約', path: '/reserve' },
        { step: '裝備租借', path: '/equipment' },
        { step: '確認預定', path: '/reserveconfirm' },
        { step: '前往付款', path: '/reservepayment' },
      ],
    };
  },
  methods: {
    // 檢查是否應該為給定的 div 添加 activeClass
    isActive(index) {
      return this.activeDiv === index;
    },
    handleStepClick(stepNumber, path) {
      const currentStep = parseInt(
        sessionStorage.getItem('currentStep') || '1',
      );
      let passPath = '';
      //這邊判斷完之後再給予 passPath 的值, 用 temp 來執行 router.push 動作
      if (stepNumber <= currentStep) {
        passPath = path;
      } else {
        passPath = this.stepList[currentStep - 1].path;
        alert('您尚未完成上一步驟！');
      }
      this.temp(passPath); //上面判斷完之後, 這邊才做動作
    },
    temp(path) {
      this.$router.push(path);
    },
  },
};
</script>

<template>
  <div class="banner bg-blue-1">
    <div class="banner-top">
      <h1 class="blue-4">立即預約</h1>
      <p class="blue-4">開啟你的野良計畫！</p>
    </div>

    <div class="bar">
      <div v-for="(step, index) in stepList" :key="index" class="dash-box">
        <!-- 這邊不要使用RouterLink，每一個步驟的input包在div中，根據步驟選擇開啟隱藏步驟，不然會很難做 -->
        <RouterLink
          :to="step.path"
          class="each-step"
          @click="handleStepClick(index + 1, step.path, $event)"
        >
          <div :class="{ box: true, currentStep: isActive(index + 1) }">
            <span>STEP</span>{{ index + 1 }}
          </div>
          <p class="dark">{{ step.step }}</p>
        </RouterLink>

        <!-- 在每個 Router-link 之間插入一個分隔符，除了最後一個 -->
        <div v-if="index < stepList.length - 1" class="separator bg-dark"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 200px;
  padding: 20px 0;

  @include tablet {
    height: 300px;
  }

  @include desktop {
    height: 400px;
    padding: 120px 0 0;
  }

  h1 {
    text-align: center;
  }

  p.blue-4 {
    text-align: center;
    @include font-style(24px, 900, 10%, 120%);

    @include tablet {
      @include font-style(40px, 900, 10%, 120%);
      margin-top: 5px;
    }

    @include desktop {
      margin: 0 0 10px 10px;
    }
  }
}

.banner-top {
  @include desktop {
    width: 1200px;
    display: flex;
    align-items: end;
    justify-content: center;
    margin: 0 auto;
  }
}

.bar {
  width: 250px;
  margin: 20px auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @include tablet {
    width: 600px;
    margin: 30px auto 0;
  }
  @include tablet {
    width: 80%;
    max-width: 1000px;
    // margin: 30px auto 0;
  }

  p {
    display: none;
    @include desktop {
      display: block;
      margin-top: 10px;
      text-align: center;
      @include font-style(24px, 700, 10%, auto);
    }
  }

  .separator {
    width: 10px;
    height: 3px;

    @include tablet {
      width: 20px;
    }
    @include desktop {
      width: 90px;
      flex-shrink: 1;
      margin: 0 20px 30px;
    }
  }
}

.dash-box {
  display: contents;
}

.each-step {
  text-decoration: none;
  .box {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    background: $white01;
    border-radius: 50%;
    color: $dark-gray;
    @include font-style(24px, 700, 10%, auto);

    @include tablet {
      width: 80px;
      height: 80px;
      @include font-style(64px, 700, 10%, auto);
    }

    @include desktop {
      width: 150px;
      height: 85px;
      border-radius: 50px;
      @include font-style(24px, 500, 100%, auto);
      color: $dark;
    }

    span {
      display: none;
      @include desktop {
        display: inline;
      }
    }
  }
}

// 使用元件的時候會用到, 讓指定的步驟變色
.each-step .currentStep {
  background: $blue-3;
  color: $white01;
}
</style>
