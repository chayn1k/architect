import Backbone from 'Backbone'
import View from './view.js'
import Model from './model.js'

let planetModel = new Model();
let planetView = new View({
	model: planetModel,
	el: '.js-current-planet'
});

let socket = new WebSocket('ws://jedi.smartjs.academy');
socket.onmessage = function(event) {
	planetModel.set({
		name: JSON.parse(event.data).name
	});
};
