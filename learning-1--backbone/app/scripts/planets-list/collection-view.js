import $ from 'jQuery'
import Backbone  from 'Backbone'
import itemView  from './item-view.js'

var SithCollectionView = Backbone.View.extend({
	initialize: function() {
		this._sithViews = [];
		this.max = 5;

		this.listenTo(this.collection, "change add remove reset", this.preRender);
		this.render();
	},

	preRender: function () {
		this._sithViews = [];
		this.collection.each((model, iterator) => {
			if (iterator < 5) {
				this._sithViews.push(new itemView({ model: model }));
			}
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
