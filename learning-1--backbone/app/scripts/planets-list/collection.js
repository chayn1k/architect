import Backbone  from 'Backbone'

import itemModel from './item-model.js'
import CollectionView from './collection-view.js'

let Collection = Backbone.Collection.extend({
	model: itemModel
});

let collection = new Collection();

let collectionView = new CollectionView({
	collection : collection,
	el : '.js-planets-list'
});


export {
	collection as col,
	collectionView as colView
}
