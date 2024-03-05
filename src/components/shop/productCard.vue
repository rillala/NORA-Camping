<template>
	<div class="shop-all-card">
		<router-link style="text-decoration: none;" :to="{
			name: 'shopItem',
			params: { id: item.product_id }
		}">

			<div class="ribbon"><span>熱銷商品</span></div>
			<div class="shop-card-img">
				<img :src="getDBImage(item.images[0])" :alt="item.title" />
			</div>
			<article class="shop-card-content">
				<p class="shop-card-title">{{ item.title }}</p>
				<p class="shop-card-price">${{ item.price }}</p>
				<!-- <span v-for="num in parseInt(item.rating.rate)">★</span> -->
			</article>
			<img class="catdogHover" src="/src/assets/image/shop/貓狗hover.svg" alt="">
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
		getDBImage(images) {
			return getDBImage(images)
		}
	},
	props: ['item']
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/page/shopView.scss';

.ribbon {
	position: absolute;
	right: -5px;
	top: -5px;
	z-index: 1;
	overflow: hidden;
	width: 75px;
	height: 75px;
	text-align: right;
}

.ribbon span {
	font-size: 10px;
	font-weight: bold;
	color: #FFF;
	text-transform: uppercase;
	text-align: center;
	line-height: 20px;
	transform: rotate(45deg);
	-webkit-transform: rotate(45deg);
	width: 100px;
	display: block;
	background: #79A70A;
	background: linear-gradient(#f11313c7 0%, #8F0808 100%);
	box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
	position: absolute;
	top: 19px;
	right: -21px;
}

.ribbon span::before {
	content: "";
	position: absolute;
	left: 0px;
	top: 100%;
	z-index: -1;
	border-left: 3px solid #8F0808;
	border-right: 3px solid transparent;
	border-bottom: 3px solid transparent;
	border-top: 3px solid #8F0808;
}

.ribbon span::after {
	content: "";
	position: absolute;
	right: 0px;
	top: 100%;
	z-index: -1;
	border-left: 3px solid transparent;
	border-right: 3px solid #8F0808;
	border-bottom: 3px solid transparent;
	border-top: 3px solid #8F0808;
}</style>