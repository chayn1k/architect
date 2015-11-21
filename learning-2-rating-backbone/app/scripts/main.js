import $ from 'jQuery'
import Backbone from 'Backbone'

var UserModel = Backbone.Model.extend({
	defaults: {
		id: null,
		name: '...',
		points: 0
	}
});

let UserView = Backbone.View.extend({
	tagName: "tr",
	initialize() {
		this.listenTo(this.model, "add change", this.render);
		this.render();
	},
	render() {
		let model = this.model.toJSON();
		let html = `<td>${model.name}</td><td>${model.points}</td>`;

		this.$el.html(html);
		return this;
	}
});

let UserListView = Backbone.View.extend({
	initialize() {
		this.listenTo(this.collection, "add change", this.render);
		this.render();
	},

	render() {
		// Clear out this element.
		this.$el.empty();

		this.collection.each(function(model) {
			var view = new UserView({model: model});
			this.$el.append(view.render().el);
		}, this);

		return this;
	}
});

let UserList = Backbone.Collection.extend({ model: UserModel });
let userList = new UserList();

let userListView = new UserListView({
	collection: userList,
	el: '#users'
});

function initLoading() {
	console.log('initLoading');
	$.get('http://rating.smartjs.academy/rating').then((data) => {
		userList.add(data.records);
		console.log('init version — ', data.version);
	});
}

function socketInit() {
	let first = true;
	let socket = new WebSocket('ws://rating.smartjs.academy/rating');

	function updateView(updates) {
		updates.forEach(function (_upd) {
			let item = userList.findWhere({id: _upd.id})
			item.set({points: _upd.points});
		});
	}

	socket.onmessage = function(event) {
		let data = JSON.parse(event.data);
		console.log('socket — ', data);

		if (first) { initLoading(); first = false; }
		if (data.fromVersion) updateView(data.updates);
	};
}

socketInit();
