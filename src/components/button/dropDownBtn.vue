<template>
	<div class="dropDown-div">
		<select class="dropDown-select" v-model="selectedOption" @change="handleSelection">
			<option class="dropDown-options" v-for="option in options" :key="option">{{ option }}</option>
		</select>
	</div>
</template>

<script>
export default {
	props: {
		options: Array,
		defaultValue: '',
	},
	data() {
		return {
			selectedOption: this.defaultValue
		};
	},
	methods: {
		handleSelection() {
			// 發出 @change 事件，通知父層有新的選擇
			this.$emit('change', this.selectedOption);
		}
	}
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
