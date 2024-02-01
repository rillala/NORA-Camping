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
        <div class="leftPart">
            <h3>歡迎聯絡我們！</h3>
            <p class="tinyp">表單通常在1~3個工作日內回覆，</p>
            <p class="tinyp">請留意您的電子郵件。</p>
            <p class="tinyp">如遇國定假日則順延，造成不便敬請見諒。</p>
            <p><br></p>
        </div>

        <div class="rightPart">
            <p class="tinyp">市話：(049) 2222106－81</p>
            <p class="tinyp">手機：0988-345-678</p>
            <p class="tinyp">連絡電話服務時段：10:30~19:30</p>
        </div>
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
            <input type="checkbox" id="agree">
            <label class="agreed" for="agree">我同意本網站的隱私權政策*</label>
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
    @include desktop{
        display: flex;
    }
    h3{
        display: none;
        @include desktop{
        display: block;
        font-weight: bold;
        font-size: 40px;
        margin-bottom: 30px;
        }
    }
    p{
        @include desktop{
            font-size: 24px;
        }
    }
    .leftPart{
        @include desktop{
            margin: auto ;
        }
    }
    .rightPart{
        @include desktop{
            height: 10%;
            margin: auto ;
            padding-left: 1rem;
            border-left: 1px solid $dark;
        }
    }
}
/*狗頭*/
.checkPoints{
    display: flex;
    justify-content: space-around;
    position: relative;
    margin: 40px auto 50px;
    @include desktop{
        width: 50%;
        margin: auto;
    }
    .check{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 15%;
        aspect-ratio: 1/1;
        border-radius: 50%;
        background-color: $yellow-2;
        font-size: 24px;
        @include desktop{
            font-size: 40px;
        }
    }
    .dogLink{
        position: absolute;
        width: 60%;
        height: 15px;
        z-index: -1;
        top: calc(50% - 7.5px);
        background-color: $yellow-2;
        @include desktop{
            height: 30px;
        }
    }
    .dog{
        position: absolute;
        width: 15%;
        top: -20%;
        left: 76%;
        @include desktop{
            min-width: 20px;
        }
    }
} 
/*表單內容*/
form{
    @include desktop{
        width: 100%;
    }
}
.step{
    width: 80%;
    max-width: 490px;
    margin: 30px auto;
    border-bottom: 1px solid $dark;
    @include desktop{
        margin: 5vw 20%;
        font-size: 24px;
        padding-bottom: 1em;
    }
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
        @include desktop{
        font-size: 20px;
        text-align: start;
    }
    }
    textarea{
        width: 50%;
        height: 8rem;
        border: none;
        background-color: $yellow-2;
        border-radius: 10px;
        padding: 10px;
        resize: none;
        @include desktop{
            font-size: 20px;
            height: 15rem;
            width: 60%;
            border-radius: 30px;
            padding: 1.5rem;
        }
        &::placeholder{
            color: $white01;
        }
    }
    @include desktop{
        width: 70%;
        margin: 0 0 0 20vw;
    }
}
.contactInfo{
    width: 100%;
    .info{
        width: 100%;
        margin: 10px;
        display: flex;
        @include desktop{
            margin:  10vw;
            align-items: center;
            width: 70%;
            margin: 5vw 0 0 20vw;

        }

        p{
            display: block;
            margin-right: 10px;
            text-align: end;
            width: 30%;
            @include desktop{
                font-size: 20px;
                text-align: start;
                margin: 0;
            }
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
            @include desktop{
                font-size: 20px;
                width: 60%;
                height: 5rem;
                border-radius: 30px;
                padding: 1.5rem;
            }
        }

    }
}
.checkBox{
    margin: 20px auto 30px;
    display: flex;
    justify-content: center;
    width: 100%;
    @include desktop{
        margin: 10vw auto;
        transform: scale(1.5);
        width: 50%;
    }
    .agreed{
        @include desktop{
            user-select:none;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;

        }
    }
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
        @include desktop{
            width: 200px;
            height: 3rem;
        }
        &:nth-child(1){
            &:hover{
                background-color: $blue-3;
                color: $white01;
            }
            @include desktop{
                display: none;
            }
        }
        &:nth-child(2){
            background-color: $blue-3;
            font-weight: 600;
            &:hover{
                background-color: $blue-4;
            }
            @include desktop{
                margin: 5vw auto;
                width: 20vw;
                font-size: 24px;
            }
        }
    }
}
</style>