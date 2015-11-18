import Backbone  from 'Backbone'
import itemView  from './item-view.js'
import ev from './../utils/events.js'

var SithCollectionView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, "add reset change", this.render);
		this.listenTo(this.collection, "add", this.collection.sort.bind(this.collection));

		this.render();
	},

	render: function() {
		// Clear out this element.
		this.$el.empty();

		this.collection.each(function(model) {
			var view = new itemView({model: model});
			this.$el.append(view.render().el);
		}, this);

		ev.trigger('update-jedi-list');
		return this;
	}
});


export default SithCollectionView
