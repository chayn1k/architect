import Backbone from 'Backbone'

import itemModel from './item-model.js'
import CollectionView from './collection-view.js'

let Collection = Backbone.Collection.extend({
	model: itemModel,

	comparator: function(itemA, itemB) {
		var a = itemA.get('id');
		var b = itemB.get('masterId');

		if (a == b) return -1;

		// if (a != '' && b == '') return 0;
		if (a == '' || b == '') return 0;

		return 1;
	},
});

let collection = new Collection([ {},{},{},{},{} ]);

let collectionView = new CollectionView({
	collection: collection,
	el: '.js-planets-list'
});

export {
	collection as col,
	collectionView as colView
}
