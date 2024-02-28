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
    position: relative;
}

.camp-grass {
    position: absolute;
    left: 0;
    top: 48%;
    z-index: 1;
}

</style>