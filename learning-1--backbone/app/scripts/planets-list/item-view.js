import Backbone from 'Backbone'

let itemView = Backbone.View.extend({
	initialize: function () {
		this.listenTo(this.model, "change", this.render);
		this.render();
	},

	render: function () {
		let model = this.model.attributes;

		let html = `<li class="css-slot">
			<h3>${model.name}</h3>
			<h6>Homeworld: ${model.planet}</h6>
		</li>`;

		return html;
	}

});

export default itemView
