<template>
	<main class="shop-item-wrap">
		<div class="shop-item-container">
			<div v-if="nodata">
				nodata
			</div>
			<div v-else class="shop-item-content">
				<h2> {{ responseData.title }} </h2>
				<h3>NT${{ responseData.price }}</h3>
				<div>
					<img :src="responseData.images" alt="responseData.title">
				</div>
				<p>{{ responseData.description }}</p>

				<DropDownBtn></DropDownBtn>
				<addMinusBtn></addMinusBtn>
				<ActionBtn :content='"加入購物車"'></ActionBtn>
				<ActionBtn :content='"直接購買"'></ActionBtn>
			</div>
		</div>
	</main>
</template>

<script>
import axios from 'axios';
import { mapState, mapActions } from 'pinia';
import productStore from '@/stores/productStore';
import addMinusBtn from '@/components/button/addMinusBtn.vue';
import ActionBtn from '@/components/button/actionBtn.vue';
import DropDownBtn from '@/components/button/dropDownBtn.vue';
export default {
	components: {
		addMinusBtn,
		ActionBtn,
		DropDownBtn
	},
	
	data() {
		return {
			responseData: {}
		}
	},
	created() {
		this.axiosGetDataId()
	},
	computed: {
		...mapState(productStore, ['responseData']),
		nodata() {
			return Object.keys(this.responseData).length === 0
		}
	},
	watch: {
		// 如果發現商品頁面沒有更動可以將這邊的註解打開
		// '$route.params.id': {
		//   handler(params) {
		//     this.axiosGetData()
		//   }
		// }
	},
	methods: {
		// ...mapActions(productStore,['axiosGetData']),
		axiosGetDataId() {
			const pageId = this.$route.params.id
			console.log(pageId);

			//使用axios將單一商品資訊取回，前提是後端要支援
			axios.get(`https://api.escuelajs.co/api/v1/products/${pageId}`)
				// axios.get(`https://api.escuelajs.co/api/v1/products/${pageId}`)
				.then(res => {
					if (res && res.data) {
						this.responseData = res.data
					}
				})

			// 	//如果後端不支援，需要把全部商品取回再find相同id(與URL參數相同)
			// 	// axios.get('https://tibamef2e.com/chd103/g2/api/getProducts.php')
			// 	//   .then(res => {
			// 	//     if (res && res.data) {
			// 	//       const allProduct = res.data
			// 	//       const result = allProduct.find((item) =>{
			// 	//         return item.prod_id == pageId
			// 	//       })
			// 	//       this.responseData = result
			// 	//     }
			// 	//   })
			// }
		}
	}
}
</script>

<style lang="scss" scoped>
.shop-item-wrap {
	width: 100%;
	height: 100%;
	background-color: $blue-1;

	.shop-item-container {
		width: 100%;
		height: 100%;
		margin: auto;
		padding: 20px;

		.shop-item-content {
			display: flex;
			flex-flow: column;
			align-items: center;
			gap: 20px;
		}
	}
}

img {
	width: 100px;
}
</style>