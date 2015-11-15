import Backbone from 'Backbone'

let listView = Backbone.View.extend({
	initialize: function () {
		this.listenTo(this.model, "change", this.render);
		this.render();
	},

	renderString: (name, planet) => {
		return `
			<li class="css-slot">
				<h3>${name}</h3>
				<h6>Homeworld: ${planet}</h6>
			</li>`;
	},

	render: function () {
		let model = this.model.attributes;
		let html = '';

		console.log('model.list', model.list);

		model.list.reduce((previous, current) => {
			html += this.renderString(current.name, current.planet);
		}, {});

		this.$el.html(html);
	}

});

export default listView
