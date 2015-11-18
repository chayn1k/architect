import Backbone from 'Backbone'

var itemModel = Backbone.Model.extend({
	defaults: {
		id: null,
		name: '',
		highlight: false,
		homeworld: {
			id: null,
			name: ''
		},
		master: {
			url: '',
			id: null
		},
		apprentice: {
			url: '',
			id: null
		}
	}
});

export default itemModel
