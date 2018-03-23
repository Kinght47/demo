import http from 'axios'

const fetch = function({url, type, data}){
	return http({
		url,
		method: type || 'GET',
		data,
	})
	.then(res => {
		if(res.status === 200){
			return res.data;
		}
	})
}

export default fetch