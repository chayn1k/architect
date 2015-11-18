import Backbone from 'Backbone'

let PlanetView = Backbone.View.extend({

	initialize() {
		this.listenTo(this.model, "change", this.render);
		this.render();
	},

	render() {
		let model = this.model.attributes
		this.$el.html(model.name);
	}

});

export default PlanetView
