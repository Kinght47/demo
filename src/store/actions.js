import fetch from '@/util/fetch'

const actions = {
	// test
	getTest({ commit }){
		fetch({
			url: '/api/test',
		})
		.then(json => {
			if(json.result===0){
				commit('UPDATE_NAME', 'alice47');
				commit('UPDATE_CODE', json.data.code);
			}else{

			}
		})
		.catch(err => {
			console.log(err);
		});
	},
	// sendmsg 
	sendMessage({ commit }, phone){
		fetch({
			url: '/api/entrance/sendmsg',
			type: 'POST',
			data: {
				phone,
			}
		})
		.then(json => {
			if(json.result===0){
				console.log(json.data);
			}else{

			}
		})
		.catch(err => {
			console.log(err);
		});
	},
}

export default actions;