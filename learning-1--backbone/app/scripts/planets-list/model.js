import Backbone from 'Backbone'

var listModel = Backbone.Model.extend({
	defaults: {
		list: []
	}
});

export default listModel
