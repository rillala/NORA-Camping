<template>
	<div class="dropDown-div">
	  <select class="dropDown-select" v-model="selectedOption" @change="handleSelection">
		<!-- 顯示一個不可選擇的預設選項 -->
		<option class="dropDown-options" disabled value="">{{ defaultValue }}</option>
		<option class="dropDown-options" v-for="option in options" :value="option" :key="option">
		  {{ option }}
		</option>
	  </select>
	</div>
</template>

<script>
export default {
	props: {
		options: Array,
		defaultValue: String,
	},
	data() {
		return {
			selectedOption: '',
		};
	},
	methods: {
		handleSelection() {
			this.$emit('change', this.selectedOption);
		}
	},
};
</script>

<style lang="scss" scoped>
.dropDown-div{
	cursor: pointer;
	display: inline;
}
.dropDown-select {
	// width: 100px;
	
	height: 100%;
	font-size: 12px;
	background-color: $yellow-2;
	border-radius: 20px;
	cursor: pointer;
	padding: 2px 4px;
	border: none;
	.dropDown-options{
		cursor: pointer;
	}
	@include desktop {
		font-size: 16px;
		padding: 4px 8px;
	}
}
</style>
