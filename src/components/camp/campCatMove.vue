<script>

export default {
    name:"campCatMove",
};
</script>

<template>
        <div class="cat-move">
            <img class="cat-body" src="@/assets/image/campGuide/catbody.svg" alt="貓咪身體" >
            <img class="cat-leg1" src="@/assets/image/campGuide/catleg1.svg" alt="貓腿1">
            <img class="cat-leg2" src="@/assets/image/campGuide/catleg2.svg" alt="貓腿2">
            <img class="cat-leg3" src="@/assets/image/campGuide/catleg3.svg" alt="貓腿3">
            <img class="cat-leg4" src="@/assets/image/campGuide/catleg4.svg" alt="貓腿4">
            <img class="cat-tail" src="@/assets/image/campGuide/cattail.svg" alt="貓尾"> 
        </div>
</template>

<style lang="scss" scoped>

.cat-move {
    width: 100%;
    position: relative;
    z-index: 0;
}

.cat-body {
    position: absolute;
    z-index: 2;
}

.cat-leg1 {
    position: absolute;
    z-index: 3;
    left: 220px;
    top: 160px;
    transform-origin: top;
    animation: legMove1 1.5s infinite;
}

.cat-leg2 {
    position: absolute;
    z-index: 1;
    left: 180px;
    top: 180px;
    transform-origin: top;
    animation: legMove2 1.5s infinite;
}

.cat-leg3 {
    position: absolute;
    z-index: 3;
    left: 30px;
    top: 165px;
    transform-origin: top;
    animation: legMove3 1.5s infinite;

}

.cat-leg4 {
    position: absolute;
    z-index: 1;
    left: -20px;
    top: 160px;
    transform-origin: top;
    animation: legMove4 1.5s infinite;

}

.cat-tail {
    position: absolute;
    z-index: 2;
    left: -160px;
    top: 123px;
    transform-origin: top;
    animation: tailShake 1.5s infinite;
}

@keyframes legMove1 {
    50% {
        // transform: rotate(20deg);
        transform: rotate(8deg);
    }
}

@keyframes legMove2 {
    50% {
        // transform: rotate(-15deg);
        transform: rotate(-5deg);
    }
}

@keyframes legMove3 {
    50% {
        // transform: rotate(-10deg);
        transform: rotate(-8deg);
    }
}

@keyframes legMove4 {
    50% {
        // transform: rotate(15deg);
        transform: rotate(5deg);
    }
}

@keyframes tailShake {
    50% {
        transform: rotate(1deg);
    }
}

</style>