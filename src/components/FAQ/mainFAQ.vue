<script setup>
import { ref,onMounted,onBeforeUnmount } from 'vue';
import FAQtype from '../FAQ/FAQtype.vue';
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
    updataWindow();
    window.addEventListener('resize',updataWindow);
})

onBeforeUnmount(()=>{
    window.removeEventListener('resize',updataWindow);
})


const qaData = ref([
    {//營地預約
        title:'我如何在線上預約營位？',
        ans:'您可以通過我們的官網訪問營地預約系統，選擇理想的日期和營位類型，然後按照指示完成預約過程。',
    },
    {
        title:'是否可以選擇特定的營位？',
        ans:'是的，您可以根據營地地圖選擇特定的營位，視當日可用情況而定。',
    },
    {
        title:'預約需要支付押金嗎？',
        ans:'是的，預約時需要支付一定數額的押金來確保預訂，押金將在您入住時返還。',
    },
    {
        title:'如果我需要取消預約，應該怎麼做？',
        ans:'您可以登入您的會員賬號並訪問訂單管理頁面來取消預約。請注意查看我們的取消政策以瞭解可能的費用。',
    },
    {
        title:'取消預約是否有退款？',
        ans:'是的，取消預約通常會有退款，但具體取決於您取消的時間和我們的退款政策。',
    },
    {
        title:'遇到惡劣天氣，營地預約是否可以更改日期？',
        ans:'在惡劣天氣情況下，我們提供更改預約日期的選項。請聯繫我們的客服以獲得協助。',
    },
    {
        title:'是否有為家庭或大型團體提供特別的營地區域？',
        ans:'是的，我們為大型團體和家庭提供特殊的營地區域。建議提前預約以確保空間。',
    },
    {
        title:'入住和退房時間是什麼時候？',
        ans:'入住時間通常是下午2點，退房時間是上午11點。如有特殊需求，請提前通知我們。',
    },
    {//中途
        title:'如何參與動物的領養程序？',
        ans:'您可以訪問我們的官方網站上的中途之家部分，選擇您想要領養的動物，並按照領養指南的步驟進行。',
    },
    {
        title:'中途之家的動物可以直接在營地見面嗎？',
        ans:'是的，您可以在我們營地的中途之家與動物見面，我們鼓勵預約訪問以確保有足夠的時間與動物互動。',
    },
    {
        title:'是否可以在營地暫時照顧動物？',
        ans:'我們提供短期照顧計劃，讓您在營地期間體驗照顧動物。詳情請咨詢中途之家。',
    },
    {
        title:'領養後有哪些支持和指導？',
        ans:'我們提供領養後的支持和指導，包括照顧方法、健康護理和行為培訓。',
    },
    {
        title:'如果無法繼續照顧領養的動物，該怎麼辦？',
        ans:'請聯繫我們。我們將提供協助，包括尋找新家或重新安置。',
    },
    {
        title:'中途之家接受捐款或物資捐贈嗎？',
        ans:'是的，我們非常感謝任何形式的捐款或物資捐贈。詳情請訪問我們的網站。',
    },
    {
        title:'參觀中途之家需要預約嗎？',
        ans:'預約不是必須的，但為了確保有充足的時間和資源提供給訪客，我們建議提前預約。',
    },
    {
        title:'中途之家的開放時間是什麼？',
        ans:'我們的中途之家每天開放，開放時間是上午9點至下午5點。',
    },//租借
    {
        title:'如何租借露營裝備？',
        ans:'您可以在預約營位時選擇租借裝備，或者直接在營地的租借中心選擇所需裝備。',
    },
    {
        title:'租借裝備的價格是怎樣的？',
        ans:'租借價格根據裝備類型和租借時長而有所不同。具體價目表請查看我們的網站或租借中心。',
    },
    {
        title:'是否有裝備損壞的賠償規定？',
        ans:'是的，如果租借的裝備在使用期間損壞，可能需要根據損壞程度支付賠償費用。',
    },
    {
        title:'租借的裝備可以帶離營地嗎？',
        ans:'通常租借的裝備僅限於在營地內使用。如需帶離營地使用，請事先與我們協商。',
    },
    {
        title:'如何退還租借的裝備？',
        ans:'請在退房時將裝備歸還至租借中心或前台。',
    },
    {
        title:'租借裝備需要提前預約嗎？',
        ans:'鑑於裝備數量有限，建議您在預約營位時同時預約所需裝備。但您也可以在到達營地後根據當時的可用情況租借。',
    },
    {
        title:'裝備租借是否有數量限制？',
        ans:'根據營地的裝備庫存，可能會對單一預約的租借數量有所限制。詳情請咨詢營地接待處。',
    },
    {//shop
        title:'我如何在線上購買露營用品？',
        ans:'您可以訪問我們的網站，瀏覽商品分類，選擇所需商品並添加至購物車，然後按照結帳流程完成購買。',
    },
    {
        title:'我可以在線上追蹤我的訂單狀態嗎？',
        ans:'是的，訂單完成後，您將收到一個追蹤號碼，可用於在我們網站上追蹤訂單的配送狀態。',
    },
    {
        title:'如果我收到的商品有損壞或錯誤怎麼辦？',
        ans:'若商品在到達時存在損壞或錯誤，請立即與我們聯絡並提供相關信息和照片，我們將提供退換貨服務。',
    },
    {
        title:'購買後多久可以收到商品？',
        ans:'一般情況下，訂單將在3至5個工作日內發貨。具體配送時間取決於您的所在地區。',
    },
    {
        title:'是否可以在購買後取消或更改訂單？',
        ans:'若訂單尚未發貨，您可以聯絡我們進行取消或更改。但一旦訂單發貨，將無法取消或更改。',
    },
    {
        title:'商品退貨政策是怎樣的？',
        ans:'如需退貨，請在收貨後7天內聯絡我們。商品必須保持原狀且包裝完整。',
    },
    {
        title:'購買的商品是否有保修期？',
        ans:'大多數商品提供生產商的標準保修期。具體保修條款請參閱商品描述或聯絡我們獲取更多信息。',
    },
])
</script>

<template>
    <div class="otherquestion">
        <img src="../../assets/image/FAQView/faqBox.png" alt="問號箱箱">
        <button @click="toForm"
        class="p" v-if="nowWindow<1023">我有其他問題！</button>
    </div>
        <!-- 分隔線 -->
    <div class="FAQtype">
        <FAQtype title="營地預約" :QAs="qaData"/>
        <FAQtype title="裝備租借" :QAs="qaData"/>
        <FAQtype title="野良之家" :QAs="qaData"/>
        <FAQtype title="商品購物" :QAs="qaData"/>
    </div>
</template>

<style lang="scss" scoped>
.otherquestion {
    img{
    width: 50%;
    max-width: 340px;
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

    @include desktop{
        
    }
}
</style>