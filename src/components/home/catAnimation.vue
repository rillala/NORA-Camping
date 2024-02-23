<script>
export default {
    name: "catAnimation",
};
</script>

<template>
    <div class="Cat-animation">
        <img class="catBody" src="@/assets/image/homeView/animation/CAT/catBody.png" draggable="false">
        <img class="catLeg1" src="@/assets/image/homeView/animation/CAT/catLeg1.png" draggable="false">
        <img class="catLeg2" src="@/assets/image/homeView/animation/CAT/catLeg2.png" draggable="false">
        <img class="catLeg3" src="@/assets/image/homeView/animation/CAT/catLeg3.png" draggable="false">
        <img class="catLeg4" src="@/assets/image/homeView/animation/CAT/catLeg4.png" draggable="false">
        <img class="catTail" src="@/assets/image/homeView/animation/CAT/catTail.png" draggable="false">

    </div>
</template>

<style lang="scss" scoped>
.Cat-animation {
    position: relative;
    z-index: 2;
}

.catBody {
    position: absolute;
    z-index: 2;
}

.catLeg1 {
    position: absolute;
    z-index: 3;
    left: 100px;
    top: 110px;
    transform-origin: top;
    animation: legMove1 2s infinite;
}

.catLeg2 {
    position: absolute;
    z-index: 1;
    left: 80px;
    top: 85px;
    transform-origin: top;
    animation: legMove2 2s infinite;
}

.catLeg3 {
    position: absolute;
    z-index: 3;
    left: 245px;
    top: 93px;
    transform-origin: top;
    animation: legMove3 2s infinite;

}

.catLeg4 {
    position: absolute;
    z-index: 1;
    left: 240px;
    top: 91px;
    transform-origin: top;
    animation: legMove4 2s infinite;

}

.catTail {
    position: absolute;
    z-index: 2;
    left: 280px;
    top: -23px
}

@keyframes legMove1 {
    50% {
        transform: rotate(30deg);
    }
}

@keyframes legMove2 {
    50% {
        transform: rotate(-15deg);
    }
}

@keyframes legMove3 {
    50% {
        transform: rotate(-25deg);
    }
}

@keyframes legMove4 {
    50% {
        transform: rotate(25deg);
    }
}
</style>