<script setup>
const emits = defineEmits([
    'changeToMain'
]);
// 狗頭位置 中42.5 L=9 R=76
function goBack(){
    emits('changeToMain');
}
</script>

<template>

    <div class="text-wrap">
        <p class="tinyp">表單通常在1~3個工作日內回覆，</p>
        <p class="tinyp">請留意您的電子郵件。</p>
        <p class="tinyp">如遇國定假日則順延，造成不便敬請見諒。</p>
        <p><br></p>

        <p class="tinyp">市話：(049) 2222106－81</p>
        <p class="tinyp">手機：0988-345-678</p>
        <p><br></p>

        <p class="tinyp">連絡電話服務時段：10:30~19:30</p>
    </div>
    <div class="checkPoints">
        <div class="check A">1</div>
        <div class="check B">2</div>
        <div class="check C">3</div>
        <div class="dogLink"></div>
        <img src="../../assets/image/FAQView/dog.png" alt="狗頭" class="dog">
    </div>
    <form action="">
        <div class="step">
            詢問問題
        </div>
        <div class="ask">
            <p class="tinyp">問題內容*</p>
            <textarea name="ques" id="ques"  placeholder="請輸入您的問題"></textarea>
        </div>
        <!-- contact info -->
        <div class="step">
            填寫聯絡資料
        </div>
        <div class="contactInfo">
            <div class="info">
                <p class="tinyp">稱呼*</p>
                <input type="text" placeholder="請輸入姓名或暱稱">
            </div>
            <div class="info">
                <p class="tinyp">電子郵件*</p>
                <input type="email" placeholder="請輸入您的電子郵件">
            </div>
            <div class="info">
                <p class="tinyp">連絡電話</p>
                <input type="tel" placeholder="請輸入您的連絡電話">
            </div>
            <!-- ------------ -->
        </div>
        <div class="checkBox">
            <input type="checkbox">
            <p class="tinyp">我同意本網站的隱私權政策*</p>
        </div>
        <div class="btns">
            <button type="button" class="submit" @click="goBack">返回前頁</button>
            <button type="submit" class="submit">填寫完成</button>
        </div>
    </form>
</template>

<style lang="scss" scoped>
/*開頭*/
.text-wrap{
    width: 80%;
    margin: 30px auto 10px;
    display: block;
}
/*狗頭*/
.checkPoints{
    display: flex;
    justify-content: space-around;
    position: relative;
    margin: 40px auto 50px;
    .check{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 15%;
        aspect-ratio: 1/1;
        border-radius: 50%;
        background-color: $yellow-2;
        font-size: 24px;
    }
    .dogLink{
        position: absolute;
        width: 60%;
        height: 15px;
        z-index: -1;
        top: calc(50% - 7.5px);
        background-color: $yellow-2;
    }
    .dog{
        position: absolute;
        width: 15%;
        top: -20%;
        left: 76%;
    }
} 
/*表單內容*/

.step{
    width: 80%;
    max-width: 490px;
    margin: 30px auto;
    border-bottom: 1px solid $dark;
}
.ask{
    width: 100%;
    display: flex;
    margin: 0 10px;
    p{
        display: block;
        margin-right: 10px;
        text-align: end;
        width: 30%;
    }
    textarea{
        // flex-shrink: 0;
        width: 50%;
        height: 8rem;
        border: none;
        background-color: $yellow-2;
        border-radius: 10px;
        padding: 10px;
        resize: none;
        &::placeholder{
            color: $white01;
        }
    }
}
.contactInfo{
    .info{
        width: 100%;
        margin: 10px;
        display: flex;
        p{
            display: block;
            margin-right: 10px;
            text-align: end;
            width: 30%;
        }
        input{
            flex-shrink: 0;
            width: 50%;
            border: 0;
            background-color: $yellow-2;
            border-radius: 10px;
            padding: 10px;
    
            &::placeholder{
                color: $white01;
            }
        }
    }
}
.checkBox{
    margin: 20px auto 30px;
    display: flex;
    justify-content: center;
    width: 100%;
}
.btns{
    display: flex;
    justify-content: space-evenly;
    .submit{
        display: block;
        width: 100px;
        height: 30px;
        border: none;
        background-color: $blue-2;
        margin: 10px 0 50px;
        border-radius: 30px;
        font-size: 16px;
        &:hover{
            background-color: $blue-3;
            color: $white01;
        }
        &:nth-child(2){
            background-color: $blue-3;
            font-weight: 600;
            &:hover{
                background-color: $blue-2;
            }
        }
    }
}
</style>