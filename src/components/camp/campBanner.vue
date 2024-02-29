<script>

export default {
    name:"campBanner",
};
</script>

<template>
        <div class="tents">
            <img class="roundtent" src="@/assets/image/campGuide/roundtent.svg" alt="圓形帳篷" >
            <img class="tritent" src="@/assets/image/campGuide/tritent.svg" alt="三角形帳篷">
            <img class="camp-grass" src="@/assets/image/campGuide/grass.svg" alt="草">
        </div>
</template>

<style lang="scss" scoped>

.tents {
    width: 100%;
    height: auto;
    position: relative;
}

.camp-grass {
    position: absolute;
    width: 100%;
    top: 36%;
    left: 0;
    z-index: 1;

    @media (width >= 320px) {
        top:36.5%;
    }

    @media (width >= 425px) {
        top:36%;
    }

    @media (width >= 768px) {
        top:34%;
    }

    @media (width >= 1024px) {
        top:32%;
    }

    @media (width >= 1440px) {
        top:30%;
    }

    @media (width >= 1680px) {
        top:50%;
    }

    @media (width = 1920px) {
        top:48%;
    }
}

</style>