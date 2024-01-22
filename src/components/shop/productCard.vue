<template>
    <div class="shop-all-card">
        <router-link style="text-decoration: none;" :to="{
            name: 'shopItem',
            params: { id: item.id }
        }">
            <div class="shop-card-img">
                <img :src="item.images" :alt="item.title" />
            </div>
            <article class="shop-card-content">
                <p class="shop-card-title">{{ item.title }}</p>
                <p class="shop-card-price">${{ item.price }}</p>
                <!-- <span v-for="num in parseInt(item.rating.rate)">★</span> -->
            </article>
        </router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            num: ''
        }
    },
    props: ['item']
}
</script>

<style lang="scss" scoped>
    @import '@/assets/sass/page/shopView.scss';
</style>