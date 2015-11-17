import jedi from './jedi.js'

function colInfo(col) {
	let filledItems = col.filter((item) => {
		return item.attributes.id !== '';
	});

	let first = filledItems[0];
	let firstIndex = col.indexOf(first);
	let last = filledItems[filledItems.length - 1];
	let lastIndex = col.indexOf(last);

	return [first, firstIndex, last, lastIndex]
}

export default {
	col: null,
	init: function (col) {
		this.col = col;
		return this;
	},
	state: function () {
		if (this.col.where({id: ''}).length == 5) return 'none';
		if (this.col.where({id: ''}).length == 0) return 'full';

		let tmp = ''
		if (this.col.at(0).attributes.id === '') tmp += 'top'
		if (this.col.at(4).attributes.id === '') tmp += 'bot'
		return tmp == 'topbot' ? 'both' : tmp;
	},
	make: function () {
		let dir = this.state();
		if (dir == 'full') return;

		if (dir == 'none') this.loadFirst();
		if (dir == 'both') this.loadBoth();

		if (dir == 'top') this.loadTop();
		if (dir == 'bot') this.loadBot();
	},

	loadFirst: function () {
		let req = jedi.request('3616');

		req.then((data) => {
			this.col.shift();
			this.col.add([ jedi.toJSON(data) ], {at: 2});

			this.make();
		});
	},

	loadBoth: function () {
		Promise.all([
			this.loadTop(true),
			this.loadBot(true)
		]).then(results => {
			this.make();
		});
	},

	loadTop: function (wait = false) {
		let [ first, firstIndex, last, lastIndex ] = colInfo( this.col )
		if (first.attributes.masterId == null) return;

		let firstReq = jedi.requestMaster(first.attributes);

		return firstReq.then((data) => {
			this.col.shift();
			this.col.add([ jedi.toJSON(data) ], {at: firstIndex - 1});

			if (!wait) this.make();
		});
	},

	loadBot: function (wait = false) {
		let [ first, firstIndex, last, lastIndex ] = colInfo( this.col )
		if (last.attributes.apprenticeId == null) return;

		let lastReq = jedi.requestApprentice(last.attributes);

		return lastReq.then((data) => {
			this.col.pop();
			this.col.add([ jedi.toJSON(data) ], {at: lastIndex + 1});

			if (!wait) this.make();
		});
	},

	stop: function () {
		jedi.cancelAll();
	}
};
