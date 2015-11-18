import jedi from './jedi.js'
import utils from '../utils/utils.js'
import ev from './../utils/events.js'


export default {
	col: null,
	init: function (col) {
		this.col = col;
		this.eventsSubscribe();
		return this;
	},
	eventsSubscribe: function () {
		let fn = () => {
			this.stop();
			this.make();
		}

		ev.on('step:make', this.make.bind(this));
		ev.on('step:stop', this.stop.bind(this));

		ev.on('arrow:up', fn);
		ev.on('arrow:down', fn);
	},
	state: function () {
		if (this.col.where({id: null}).length == 5) return 'none';
		if (this.col.where({id: null}).length == 0) return 'full';

		let tmp = ''
		if (this.col.at(0).attributes.id === null) tmp += 'top'
		if (this.col.at(4).attributes.id === null) tmp += 'bot'

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
			this.col.add([ data ], {at: 2});

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
		let [ first, firstIndex, last, lastIndex ] = utils.collectionInfo( this.col )
		if (first.attributes.master.id == null) return;

		let firstReq = jedi.requestMaster(first.attributes);

		return firstReq.then((data) => {
			this.col.shift();
			this.col.add([ data ], {at: firstIndex - 1});

			if (!wait) this.make();
		});
	},

	loadBot: function (wait = false) {
		let [ first, firstIndex, last, lastIndex ] = utils.collectionInfo( this.col )
		if (last.attributes.apprentice.id == null) return;

		let lastReq = jedi.requestApprentice(last.attributes);

		return lastReq.then((data) => {
			this.col.pop();
			this.col.add([ data ], {at: lastIndex + 1});

			if (!wait) this.make();
		});
	},

	stop: function () {
		jedi.cancelAll();
	}
};
