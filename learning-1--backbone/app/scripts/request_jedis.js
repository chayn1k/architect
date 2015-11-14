import $ from '../node_modules/jquery/dist/jquery'

var requests = [];

export default {
	request: function (id, cb) {
		let _get = $.get('http://jedi.smartjs.academy/dark-jedis/' + id, function (data) {
			cb(data);
		});

		requests.push(_get);
	},
	cancelAll: function () {
		let _get = requests.shift();
		_get.abort();
	}
}
