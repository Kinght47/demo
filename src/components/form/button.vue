<template>
	<div class="a-button">
		<button
			@click={submit}>{{text||defaultText}}</button>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	name: 'a-button',
	component: {
	},
	data(){
		return {
			defaultText: '按钮',
			value: '',
		}
	},
	props: [
		'text',
		'disabled',
		'handle',

		'onClick',
	],
	created(){
	},
	mounted(){
	},
	methods: {
		...mapActions([]),
		submit($event){
			console.log("提交");
			// this.$emit("onClick", this.currentValue, $event)
		},
	},
	computed: {
		...mapState([]),
	},
	watch: {
	},
}
</script>

<style>
.a-button button{
	width: 200px;
	height: 30px;
	border-radius: 4px;
	border: 1px solid #e8e8e8;
	font-size: 16px;
	color: #fff;
	background: #d3d3d3;
	cursor: pointer;
}
.a-button button:hover{
	background: #c3c3c3;
}
</style>