import $ from 'jQuery'
import Backbone from 'Backbone'

import {col, colView} from './collection.js'

col.add([
	{name: "Летучий Голландец"},
	{name: "Летучий Голландец1"},
	{name: "Летучий Голландец2"},
	{name: "Летучий Голландец3"},
	{name: "Летучий Голландец4"},
	{name: "Черная жемчужина"}
]);

// col.remove(col.at(1));
// col.remove(col.at(1));

// import jedi  from './request.js'
// jedi.request('', function (data) {
//
// 	console.log('data', data.apprentice.id);
//
// 	let _list = listModel.get('list').slice();
// 	_list.push({
// 		name: data.name,
// 		planet: data.homeworld.name
// 	});
//
// 	listModel.set({'list': _list});
//
// });
