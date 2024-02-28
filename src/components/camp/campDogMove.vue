<script>

export default {
    name:"campDogMove",
};
</script>

<template>
        <div class="dog-move">
            <img class="dog-body" src="@/assets/image/campGuide/dogbody.svg" alt="狗狗身體" >
            <img class="dog-leg1" src="@/assets/image/campGuide/dogleg1.svg" alt="狗腳1">
            <img class="dog-leg2" src="@/assets/image/campGuide/dogleg2.svg" alt="狗腳2">
            <img class="dog-leg3" src="@/assets/image/campGuide/dogleg3.svg" alt="狗腳3">
            <img class="dog-leg4" src="@/assets/image/campGuide/dogleg4.svg" alt="狗腳4">
            <img class="dog-tail" src="@/assets/image/campGuide/dogtail.svg" alt="狗尾"> 
        </div>
</template>

<style lang="scss" scoped>

.dog-move {
    width: 100%;
    position: relative;
    z-index: 0;
}

.dog-body {
    position: absolute;
    z-index: 2;
}

.dog-leg1 {
    position: absolute;
    z-index: 3;
    left: 75px;
    top: 260px;
    transform-origin: top;
    animation: legMove1 1.2s infinite;
}

.dog-leg2 {
    position: absolute;
    z-index: 1;
    left: 190px;
    top: 270px;
    transform-origin: top;
    animation: legMove2 1.5s infinite;
}

.dog-leg3 {
    position: absolute;
    z-index: 3;
    left: 320px;
    top: 270px;
    transform-origin: top;
    animation: legMove3 1.5s infinite;

}

.dog-leg4 {
    position: absolute;
    z-index: 1;
    left: 450px;
    top: 250px;
    transform-origin: top;
    animation: legMove4 1.5s infinite;

}

.dog-tail {
    position: absolute;
    z-index: 2;
    left: 490px;
    top: 135px;
    transform-origin: top;
    animation: tailShake 1.5s infinite;
}

@keyframes legMove1 {
    50% {
        // transform: rotate(20deg);
        transform: rotate(-5deg);
    }
}

@keyframes legMove2 {
    50% {
        // transform: rotate(-15deg);
        transform: rotate(8deg);
    }
}

@keyframes legMove3 {
    50% {
        // transform: rotate(-10deg);
        transform: rotate(10deg);
    }
}

@keyframes legMove4 {
    50% {
        // transform: rotate(15deg);
        transform: rotate(-8deg);
    }
}

@keyframes tailShake {
    50% {
        transform: rotate(3deg);
    }
}


</style>