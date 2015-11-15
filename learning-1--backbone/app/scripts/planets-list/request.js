import $ from 'jQuery'

var requests = [];

export default {
	request: function (id, cb) {
		let _get = $.get('http://jedi.smartjs.academy/dark-jedis/' + id, function (data) {
			cb(data);
		});

		requests.push(_get);
	},
	cancelLast: function () {
		let _get = requests.shift();
		_get.abort();
	},
	cancelAll: function () {
		requests.forEach((i) => {
			i.abort();
		});
		requests = [];
	}
}
