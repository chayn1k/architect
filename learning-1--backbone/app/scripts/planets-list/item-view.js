import Backbone from 'Backbone'

let itemView = Backbone.View.extend({
	tagName: "li",
	className: "css-slot",

	initialize: function () {
		this.listenTo(this.model, "change", this.render);
		this.render();
	},

	render: function () {
		let html;
		let model = this.model.toJSON();

		if (model.name && model.homeworld.name) {
			html = `<h3 class="${model.highlight ? 'red' : ''}">${model.name}, ${model.id}</h3>
			<h6 class="${model.highlight ? 'red' : ''}">Homeworld: ${model.homeworld.name}, ${model.master.id}</h6>`;
		} else {
			html = ``;
		}

		this.$el.html(html);
		return this;
	}

});

export default itemView
