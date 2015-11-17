import Backbone from 'Backbone'

let itemView = Backbone.View.extend({
	initialize: function () {
		this.listenTo(this.model, "change", this.render);
		this.render();
	},

	render: function () {
		let html;
		let model = this.model.toJSON();

		if (model.name && model.planet) {
			html = `<li class="css-slot">
				<h3>${model.name}, ${model.id}</h3>
				<h6>Homeworld: ${model.planet}, ${model.masterId}</h6>
			</li>`;
		} else {
			html = `<li class="css-slot">
				<h3></h3>
				<h6></h6>
			</li>`;
		}

		return html;
	}

});

export default itemView
