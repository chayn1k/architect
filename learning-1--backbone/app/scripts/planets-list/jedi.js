import $ from 'jQuery'
import arrows from './arrows.js'

var requests = [];

export default {
	request(id) {
		let _get = $.get('http://jedi.smartjs.academy/dark-jedis/' + id, (data) => {
			requests.shift();
			return data;
		});
		requests.push(_get);
		return _get;
	},
	requestMaster(model) {
		return this.request(model.master.id);
	},
	requestApprentice(model) {
		return this.request(model.apprentice.id);
	},
	cancelAll() {
		requests.forEach((item) => {
			item.abort();
		});
		requests = [];
	}
}
