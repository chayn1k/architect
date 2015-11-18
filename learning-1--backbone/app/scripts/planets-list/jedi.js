import $ from 'jQuery'
import arrows from './arrows.js'

var requests = [];

export default {
	request: function (id) {
		let _get = $.get('http://jedi.smartjs.academy/dark-jedis/' + id, (data) => {
			requests.shift();
			return data;
		});
		requests.push(_get);
		return _get;
	},
	requestMaster: function (model) {
		return this.request(model.master.id);
	},
	requestApprentice: function (model) {
		return this.request(model.apprentice.id);
	},
	cancelAll: function () {
		requests.forEach((item) => {
			item.abort();
		});
		requests = [];
	}
}
