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
	toJSON: function (model) {
		return {
			name: model.name,
			planet: model.homeworld.name,
			id: model.id,
			masterId: model.master.id,
			apprenticeId: model.apprentice.id
		}
	},
	requestMaster: function (model) {
		return this.request(model.masterId || (model.master && model.master.id));
	},
	requestApprentice: function (model) {
		return this.request(model.apprenticeId || (model.apprentice && model.apprentice.id));
	},
	cancelAll: function () {
		requests.forEach((item) => {
			item.abort();
		});
		requests = [];
	}
}
