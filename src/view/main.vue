<template>
	<div id="root">
		<p>{{name}}, welcome for my serve</p>
		<p>{{nowTime||time}}</p>

		<p>验证码: [{{code}}]</p>
		<input v-model="phone" />
		<button @click="sendmsg">发送短信</button>
		<AInput
			@change="setVal"
			:value="phone"></AInput>
		<AButton
			@click="sendmsg"
			:disabled="button.disabled"
			:text="button.text"></AButton>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AInput from '@/components/form/input'
import AButton from '@/components/form/button'

export default {
	name: 'root',
	components: {
		AInput,
		AButton,
	},
	data(){
		return {
			// name: '',
			time: '0000-00-00 00:00:00.000',
			date: 0,

			phone: '',

			button: {
				text: "测试",
				disabled: false,
			}
		}
	},
	created(){
		// GET
		this.getTest();
		// initTime
		this.time = this.createTime();
		this.date = Date.parse(new Date());
		this.updateUnix();
	},
	methods: {
		...mapActions([
			'getTest',
			'sendMessage',
		]),
		createTime(){
			let time = new Date();
			let _year = time.getFullYear();
			let _mon  = time.getMonth()+1;
			let _day  = time.getDate();
			let _hour = time.getHours();
			let _min  = time.getMinutes();
			let _sec  = time.getSeconds();
			_mon  = _mon<10?'0'+_mon:_mon;
			_day  = _day<10?'0'+_day:_day;
			_hour = _hour<10?'0'+_hour:_hour;
			_min  = _min<10?'0'+_min:_min;
			_sec  = _sec<10?'0'+_sec:_sec;
			let _time = `${_year}-${_mon}-${_day} ${_hour}:${_min}:${_sec}`;
			return _time;
		},
		updateUnix(){
			setTimeout(_ => {
				this.updateUnix();
				this.date += 1000;
			}, 1000);
		},
		// 发送短信
		sendmsg(){
			let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/g;
			if(reg.test(this.phone)){
				this.sendMessage(this.phone);
			}else{
				console.warn("手机号码不正确");
				console.warn(this.phone);
			}
		},
		setVal(v){
			this.phone = v;
		},
	},
	computed: {
		...mapState(['name', 'code']),
		nowTime(){
			if(this.date===0)return '';
			let time = new Date(this.date);
			let _year = time.getFullYear();
			let _mon  = time.getMonth()+1;
			let _day  = time.getDate();
			let _hour = time.getHours();
			let _min  = time.getMinutes();
			let _sec  = time.getSeconds();
			let _milli = time.getMilliseconds();
			_mon  = _mon<10?'0'+_mon:_mon;
			_day  = _day<10?'0'+_day:_day;
			_hour = _hour<10?'0'+_hour:_hour;
			_min  = _min<10?'0'+_min:_min;
			_sec  = _sec<10?'0'+_sec:_sec;
			_milli = _milli<10?'00'+_milli:_milli<100?'0'+_milli:_milli;
			let _time = `${_year}-${_mon}-${_day} ${_hour}:${_min}:${_sec}.${_milli}`;
			return _time;
		},
	},
	watch: {
		time(){

		}
	},
}
</script>

<style>
#root{
	
}
.btn{
	background: #fa6700;
}
</style>