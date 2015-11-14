import Backbone from 'Backbone'

let PlanetView = Backbone.View.extend({

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
		this.render();
	},

	render: function() {
		let model = this.model.attributes
		console.log('this.model', model);

		this.$el.html(model.name);
	}

});

export default PlanetView
