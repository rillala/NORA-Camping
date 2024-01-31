<template>
  <section class=" shop-orderSucess-wrap">
    <div class="step3">
      <div class="title">
        <h2>謝謝</h2>
        <h2>我們已收到您的訂單</h2>
      </div>
      <div class="buy-content">
        <div class="content-title">
          <h3>訂單詳細資料</h3>
        </div>
        <div class="between number">
          <h4>訂單編號</h4>
          <span>12345678</span>
        </div>
        <div class="buy-information">
          <div class="between buy-list">
            <h4>肉狗 x6</h4>
            <span>NT$2,000</span>
          </div>
          <div class="between buy-total">
            <h4>合計</h4>
            <span>NT$3,000</span>
          </div>
          <div class="between buy-migrate">
            <h4>付費方式</h4>
            <span>信用卡</span>
          </div>
          <div class="between buy-way">
            <h4>運送方式</h4>
            <span>超商取貨:NT$100</span>
          </div>
          <div class="between buy-result">
            <h4>總計:</h4>
            <span>NT$3,1000</span>
          </div>
          <div class="locate-title">
            <h4>帳單地址</h4>
            <input type="text" value="123">
            <h4>運送地址</h4>
            <input type="text" value="456">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.shop-orderSucess-wrap {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
  .between {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #000;
    margin-bottom: 20px;
}
.step3 {
  max-width: 1200px;
    background-color: $blue-1;
    width: 100%;
    margin: auto;
    padding: 24px 35px;
}

.step3 .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 25px;
}

.step3 .title h2 {
    font-weight: bold;
}

.buy-content {
    padding: 20px 50px;
    background-color: $blue-1;
    border-radius: 18px;
}

.content-title {
    font-weight: bold;
    margin-bottom: 20px;
    h3{
      font-weight: bold;
    }
}

.buy-result {
    font-size: 20px;
}

.locate-title h4 {
    font-weight: bold;
    margin-block: 16px;
}

.locate-title input {
    color: $light-gray;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #000;
    width: 100%;
}
</style>