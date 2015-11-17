import $ from 'jQuery'
import Backbone  from 'Backbone'
import itemView  from './item-view.js'

var SithCollectionView = Backbone.View.extend({
	initialize: function() {
		this._sithViews = [];
		this.max = 5;

		this.listenTo(this.collection, "all", this.preRender);
		this.listenTo(this.collection, "add", this.add);

		this.preRender();
	},

	add: function () {
		this.collection.sort();
	},

	preRender: function () {
		this._sithViews = [];

		this.collection.each((model, iterator) => {
			this._sithViews.push(new itemView({ model: model }));
		});

		this.render();
	},

	render: function() {
		// Clear out this element.
		$(this.el).empty();

		// Render each sub-view and append it to the parent view's element.
		this._sithViews.forEach((dv) => {
			$(this.el).append(dv.render());
		});
	}
});


export default SithCollectionView
