<template>
	<div>
		<input
			@change="onchange"
			:type={defaultType}
			v-model=value
		/>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	name: 'a-input',
	component: {
	},
	data(){
		return {
			defaultType: 'text',
			defaultValue: ''
		}
	},
	props: [
		'text',
		'value',
	],
	created(){
	},
	methods: {
		...mapActions([]),
		onchange($e){
			console.log($e.target.value);
			this.$emit("setVal", $e.target.value);
		}
	},
	computed: {
		...mapState([]),
	},
	watch: {
	},
}
</script>

<style>
#form{
	
}
</style>