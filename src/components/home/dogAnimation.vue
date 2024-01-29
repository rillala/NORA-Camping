<script>
export default {
    name: "dogAnimation",
    

};
</script>

<template>
    <div class="Dog-animation">
        <img class="dogBody" src="@/assets/image/homeView/animation/DOG/dogBody.png">
        <img class="dogLeg1" src="@/assets/image/homeView/animation/DOG/dogLeg1.png">
        <img class="dogLeg2" src="@/assets/image/homeView/animation/DOG/dogLeg2.png">
        <img class="dogLeg3" src="@/assets/image/homeView/animation/DOG/dogLeg3.png">
        <img class="dogLeg4" src="@/assets/image/homeView/animation/DOG/dogLeg4.png">
        <img class="dogTail" src="@/assets/image/homeView/animation/DOG/dogTail.png">
    </div>
</template>

<style lang="scss" scoped>
.Dog-animation {
    width: 100%;
    position: relative;
    z-index: 1;
}

.dogBody {
    position: absolute;
    z-index: 2;
}

.dogLeg1 {
    position: absolute;
    z-index: 3;
    left: 100px;
    top: 260px;
    // transform-origin: top;
    animation: legMove1 2s infinite;
}

.dogLeg2 {
    position: absolute;
    z-index: 1;
    left: 250px;
    top: 250px;
    transform-origin: top;
    animation: legMove2 2s infinite;
}

.dogLeg3 {
    position: absolute;
    z-index: 1;
    left: 450px;
    top: 190px;
    animation: legMove3 2s infinite;
}

.dogLeg4 {
    position: absolute;
    z-index: 3;
    left: 565px;
    top: 230px;
    transform-origin: top;
    animation: legMove4 2s infinite;

}

.dogTail {
    position: absolute;
    z-index: 2;
    left: 600px;
    transform-origin: left bottom;
    ;
    animation: tailMove 2s normal infinite;
}

@keyframes legMove1 {
    50% {
        transform: rotate(-25deg);
    }
}

@keyframes legMove2 {
    50% {
        transform: rotate(25deg);
    }
}

@keyframes legMove3 {
    50% {
        transform: rotate(-25deg);
    }
}

@keyframes legMove4 {
    50% {
        transform: rotate(20deg);
    }
}

@keyframes tailMove {
    50% {
        transform: rotate(30deg);
    }
}
</style>