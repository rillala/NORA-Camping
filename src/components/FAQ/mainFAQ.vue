<script setup>
import { ref } from 'vue';
import FAQtype from '../FAQ/FAQtype.vue';
const emits = defineEmits([
    'changeToForm',
]);
const toForm= ()=> {
    emits('changeToForm');
};
const qaData = ref([
    {
        title:'我如何在線上預約營位？',
        ans:'您可以通過我們的官網訪問營地預約系統，選擇理想的日期和營位類型，然後按照指示完成預約過程。',
    },
    {
        title:'我如何在線上預約營位？',
        ans:'您可以通過我們的官網訪問營地預約系統，選擇理想的日期和營位類型，然後按照指示完成預約過程。',
    },
    {
        title:'我如何在線上預約營位？',
        ans:'您可以通過我們的官網訪問營地預約系統，選擇理想的日期和營位類型，然後按照指示完成預約過程。',
    },
])
</script>

<template>
    <div class="otherquestion">
        <img src="../../assets/image/FAQView/faqBox.png" alt="問號箱箱">
        <button @click="toForm"
        class="p">我有其他問題</button>
    </div>
        <!-- 分隔線 -->
    <div class="FAQtype">
        <FAQtype title="營地預約" :QAs="qaData"/>
        <FAQtype title="裝備租借" :QAs="qaData"/>
        <FAQtype title="野良之家" :QAs="qaData"/>
        <FAQtype title="商品購物" :QAs="qaData"/>
        <!-- <div id="reservation">
            <button><h4>營地預約</h4></button>
        </div>
        <div id="rental">
            <button><h4>裝備租借</h4></button>
        </div>
        <div id="shelter">
            <button><h4>野良之家</h4></button>
        </div>
        <div id="shopping">
            <button><h4>商品購物</h4></button>
        </div> -->
    </div>
</template>

<style lang="scss" scoped>
.otherquestion {
    img{
    width: 50%;
    }
    button{
        transform: translate(-30%,-10%);
        border: none;
        background: none;
        &:hover{
            cursor: pointer;
        }
    }
}
/*------------------*/
.FAQtype{
    width:100%;
    
    button{
        display:block;
        width: 80vw;
        height: 20vw;
        border: none;
        border-radius: 10px;
        background-color: $blue-2;
        margin: 10px auto;

        h4{
            font-weight: bold;
        }
        &:hover{
            background-color: $blue-3;
            color: $white01;
        }
    }
}
</style>