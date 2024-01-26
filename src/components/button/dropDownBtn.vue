<template>
	<select class="dropdown-btn" v-model="selectedValue">
		<option v-for="option in options" :key="option.value" :value="option.value">
			<p>{{ option.label }}▼</p>
		</option>
	</select>
</template>

<script>
export default {
	props: {
		options: {
			type: Array,
			required: true,
		},
		value: {
			type: [String, Number],
			default: '',
		},
		defaultValue: {
			type: [String, Number],
			default: '',
		},
	},
	data() {
		return {
			selectedValue: this.defaultValue,
		};
	},
	watch: {
		selectedValue(newVal) {
			this.$emit('update:modelValue', newVal);
		},
	},
};
</script>

<!-- <style lang="scss" scoped>
.dropdown-btn {
	appearance: none;
	-moz-appearance: none;
	-webkit-appearance: none;
	background-color: $yellow-2;
	padding: 4px;
	border-radius: 4px;
	border: none;
	text-align: center;

	option {
		width: 100%;
	}
}
</style> -->