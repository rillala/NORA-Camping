<script setup>
import { ref,onMounted,onBeforeUnmount } from 'vue';
import FAQtype from '../FAQ/FAQtype.vue';
import Questions from './Questions.vue';
import apiInstance from '@/plugins/auth';

const DESKTOP = 1024;
const emits = defineEmits([
    'changeToForm',
]);

const toForm= ()=> {
    emits('changeToForm');
};

//獲取視窗寬度
const nowWindow = ref(window.innerWidth);
//將當前視窗寬度更新到nowWindow
function updataWindow(){
    nowWindow.value = window.innerWidth;
}
onMounted(()=>{
    getFaqList();
    updataWindow();
    window.addEventListener('resize',updataWindow);
})

onBeforeUnmount(()=>{
    window.removeEventListener('resize',updataWindow);
})
const faqList = ref([]);
const targetData = ref([]);
const touched = ref(1);

const reserve = ref([]);
const equipment = ref([]);
const sheleter = ref([]);
const onlineShop = ref([]);
function getFaqList() {
    apiInstance
    .get("./getFaqForFrontend.php")
    .then((response) => {
        faqList.value = response.data;
        faqList.value.forEach(qa => {
            if(qa.faq_type === '營地預約'){
                reserve.value.push(qa);
            }else if(qa.faq_type === '中途之家'){
                sheleter.value.push(qa);
            }else if(qa.faq_type === '裝備租借'){
                equipment.value.push(qa);
            }else{
                onlineShop.value.push(qa);
            }
        });

        if (reserve.value.length > 0) {
            targetData.value = reserve.value;
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}

function changeData(qa,t){
    touched.value = t;
    targetData.value = qa;
}
</script>

<template>
    <div class="typeWrap">
        <div class="otherquestion">
            <img src="../../assets/image/FAQView/faqBox.png" alt="問號箱箱">
            <button @click="toForm"
            class="p">我有其他問題！</button>
        </div>
            <!-- 分隔線 -->
        <div class="FAQtype" v-if="nowWindow<DESKTOP">
            <FAQtype title="營地預約" :QAs="reserve"  />
            <FAQtype title="野良之家" :QAs="sheleter" />
            <FAQtype title="裝備租借" :QAs="equipment"  />
            <FAQtype title="商品購物" :QAs="onlineShop" />
        </div>
        <div class="FAQtype" v-else>
            <button @click="changeData(reserve,1)" :class="{active:touched==1}"><h4>營地預約</h4></button>
            <button :class="{active:touched==2}" @click="changeData(sheleter,2)"><h4>野良之家</h4></button>
            <button :class="{active:touched==3}" @click="changeData(equipment,3)"><h4>裝備租借</h4></button>
            <button :class="{active:touched==4}" @click="changeData(onlineShop,4)"><h4>商品購物</h4></button>
        </div>
    </div>
    <div v-if="nowWindow >= DESKTOP" class="qaArr">
        <Questions v-for="(data,index) in targetData" :key="index" :title="data.question" :ans="data.answer"/>
    </div>
</template>

<style lang="scss" scoped>
.typeWrap{
    @include desktop{
        display: flex;
        align-items: baseline;
    }
}
.otherquestion {
    max-width: 340px;
    img{
        width: 50%;
        @include desktop{
            width: 80%;
            vertical-align: bottom;
            translate: 150px 20px;
        }
    }
    button{
        transform: translate(-30%,-10%);
        border: none;
        background: none;
        &:hover{
            cursor: pointer;
        }

        @include desktop{
            display: none;
        }
    }
    @include desktop{
        width:30%;
        margin: 0 5vw;
    }
}
/*------------------*/
.FAQtype{
    width:100%;
    @include desktop{
        width: 50%;
        display: flex;  
    }

    button{
        display:block;
        width: 80vw;
        height: 20vw;
        border: none;
        border-radius: 10px;
        background-color: $blue-2;
        margin: 10px auto;

        @include desktop{
            width: 15vw;
            height: 3rem;
            margin:  5% 1%;
            border-radius: 30px;
        }
            h4{
                font-weight: bold;
            }
        }
        .active{
            background-color: $blue-3;
            color: $white01;
        }
}
.qaArr{
    margin: auto;
    width: 80%;
    @include desktop{
        width: 95%;
    }
}
</style>