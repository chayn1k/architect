import Backbone from 'Backbone'

var itemModel = Backbone.Model.extend({
	defaults: {
		name: '',
		planet: '',
		id: '',
		masterId: '',
		apprenticeId: ''
	}
});

export default itemModel
