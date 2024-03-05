<template >
    <div class="container" v-if=" nowWindow >= DESKTOP ">
        <div class="cloud">
            <img src="@/assets/image/aboutView/cloud.png" alt="雲">
        </div>
        <div class="people">
            <img src="@/assets/image/aboutView/people.png" alt="人">
        </div>
        <div class="tent">
            <img src="@/assets/image/aboutView/tent.png" alt="帳篷">
        </div>
        <div class="fire">
            <img src="@/assets/image/aboutView/fire.png" alt="火">
        </div>
        <div class="wood">
            <img src="@/assets/image/aboutView/wood.png" alt="木頭">
        </div>
        <div class="marshmallow">
            <img src="@/assets/image/aboutView/marshmallow.png" alt="棉花糖">
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const nowWindow = ref(window.innerWidth);
const DESKTOP = 1024;
function updataWindow(){
    nowWindow.value = window.innerWidth;
}
onMounted(() => {
    updataWindow();
    console.log(nowWindow.value)
    window.addEventListener('resize',updataWindow);
});
onBeforeUnmount(()=>{
    window.removeEventListener('resize',updataWindow);
})
</script>

<style lang="scss" scoped>
.container {
    position: relative;
    width: 100%;
    height: 200px;
    img{
        width: 100%;
    }
}

.people, .cloud,.fire,.wood,.tent,.marshmallow {
    position: absolute;
    height: auto; 
}
.cloud{
    top:-20%;
    right: 10%;
    width: 30%;
    transform: rotate(5deg);
    animation: flyUp 3s linear infinite;
}
.people{
    right: 15%;
    top: -70%;
    width: 12%;
    transform: rotate(5deg);
    animation: flyUp 3s linear infinite;
}
.tent{
    left: 5%;
    top: -80%;
    width: 20%;
    animation: tent 5s infinite cubic-bezier(0.85, 0, 0.15, 1);
}
.wood{
    left: 30%;
    top: 50%;
    width: 13%;
    rotate: (5deg);
}
.fire{
    left: 32%;
    top: -60%;
    width: 9%;
    animation: fire 3s infinite;
}
.marshmallow{
    width: 10%;
    right: 45%;
    top: -20%;
    transform: rotateY(180deg);
    animation: marsh 3s infinite cubic-bezier(0.36, 0, 0.66, -0.56);

}
@keyframes flyUp {
    50% {
        translate: 0 30px;
    }
}
@keyframes tent {
    50% {
        rotate: (10deg);
    }
}
@keyframes fire{
    0%{
        translate: 0 30px;
        rotate: (10deg);
        opacity: 0.5;
    }
    50% {
        translate: 0 15px;
        rotate: (0deg);
        opacity: 1;
    }
    100% {
        translate: 0 30px;
        rotate: (10deg);
        opacity: 0.5;
    }
}
@keyframes marsh{
    0% {
        rotate: (0deg);
    }
    50% {
        translate: 0 30px;
        rotate: (-10deg);
    }
}
</style>
