<template>
	<div class="shop-all-card">
		<router-link style="text-decoration: none;" :to="{
			name: 'shopItem',
			params: { id: item.product_id }
		}">
			<div class="shop-card-img">
				<img :src="getDBImage(item.images[0])" :alt="item.title" />
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
import { getDBImage } from '@/assets/js/common';

export default {
	data() {
		return {
			num: ''
		}
	},
	methods: {
    getDBImage(images){
			return getDBImage(images)
		}
  },
	props: ['item']
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/page/shopView.scss';
</style>