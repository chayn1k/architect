import Backbone from 'Backbone'
import View from './view.js'
import Model from './model.js'

import ev from '../utils/events.js'

let planetModel = new Model();
let planetView = new View({
	model: planetModel,
	el: '.js-current-planet'
});

let socket = new WebSocket('ws://jedi.smartjs.academy');
socket.onmessage = function(event) {
	let name = JSON.parse(event.data).name;
	ev.trigger("change-planet", name);
	planetModel.set({ name: name });
};
