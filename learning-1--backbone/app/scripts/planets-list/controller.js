import $ from 'jQuery'
import Backbone from 'Backbone'

import View  from './view.js'
import Model from './model.js'
import jedi  from './request.js'

let listModel = new Model();
let listView = new View({
	model: listModel,
	el: '.js-planets-list'
});

jedi.request('', function (data) {

	console.log('data', data.apprentice.id);

	let _list = listModel.get('list').slice();
	_list.push({
		name: data.name,
		planet: data.homeworld.name
	});

	listModel.set({'list': _list});

});
