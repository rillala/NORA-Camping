<script>

export default {
    name:"campBannerWord",
};
</script>

<template>
        <div class="words">
            <p class="welcome">歡 迎 來 到 <br> 野 良 露 營 區</p>
        </div>
</template>

<style lang="scss" scoped>

.words {
    width: 100%;
    position: absolute;
    left: 0;
    z-index: 1;
}

.welcome {
    font-size: 32px;
    color: $brown-3;

    @include desktop {
        font-size: 42px;
    }
}

</style>