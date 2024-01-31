<template>
	<div>
			<select v-model="selectedOption" @change="handleSelection">
					<option v-for="option in options" :key="option">{{ option }}</option>
			</select>
	</div>
</template>

<script>
export default {
	props: {
			options: Array,
			defaultValue:'',
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
