import Backbone from 'Backbone'

var itemModel = Backbone.Model.extend({
	defaults: {
		name: '...',
		planet: '...'
	}
});

export default itemModel
