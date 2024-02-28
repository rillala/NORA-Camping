<script>
import { useProductStore } from '@/stores/productStore'; // 導入 Pinia Store
import productCard from '@/components/shop/productCard.vue';
import viewMoreBtn from '../button/viewMoreBtn.vue';
import { getDBImage } from '@/assets/js/common';


export default {
	components: {
		productCard,
		viewMoreBtn
	},

	data() {
		return {
			curIndex: 0,
			slideWidth: 300,
		}
	},
	methods: {
		moveLeft() {
			this.curIndex--;
			console.log(this.curIndex);
		},
		moveRight() {
			this.curIndex++;
			console.log(this.curIndex);
		},
		getDBImage(images) {
			return getDBImage(images)
		}
	},
	computed: {
		displayData() {
			const productStore = useProductStore();
			return productStore.displayData;
		},
		wrapLeft() {
			return `-${this.curIndex * this.slideWidth}px`;
		},
		filteredData() {
			return this.displayData.filter(item => item.state === 1).slice(0, 16);
		}
	}
}
</script>

<template>
	<!-- <div class="Prod-wapper" :style="{ left: wrapLeft }">
		<div class=" New-prod" v-for="product in displayData" :key="product.id">
			<productCard :item="product"></productCard>
		</div>
	</div>
 -->
	<section class="New-products bg-brown-2">
		<h2>野良選物X最新商品</h2>
		<!-- 桌機板左右按鈕 -->
		<div class="New-prod-btn">
			<button id="left" @click="moveLeft" :disabled="curIndex <= 0">
				<img src="@/assets/image/universe/left-arrow-btn.svg" alt="左按鈕">
			</button>
			<button id="right" @click="moveRight" :disabled="curIndex >= 14">
				<img src="@/assets/image/universe/right-arrow-btn.svg" alt="右按鈕">
			</button>
		</div>

		<div class="Prod-wapper" :style="{ left: wrapLeft }">
			<div v-for="item in filteredData" :key="item.id">
				<router-link class=" New-prod" style="text-decoration: none;" :to="{
					name: 'shopItem',
					params: { id: item.product_id }
				}">
					<div class="New-prod-image">
						<img :src="getDBImage(item.images[0])" :alt="item.title" />
					</div>
					<h4>{{ item.title }}</h4>
					<p>${{ item.price }}</p>
				</router-link>
			</div>
		</div>



		<router-link to="/shop">
			<viewMoreBtn class="See-more-prod" :content="'逛逛其他好物'" />
		</router-link>
	</section>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/page/homeView.scss';
</style>

