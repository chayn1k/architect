import $ from 'jQuery'
import ev from './../utils/events.js'
import utils from '../utils/utils.js'

export default {
	init: function (col) {
		this.col = col;

		this.$up = $('.js-up');
		this.$down = $('.js-down');

		this.$up.on('click', this.up.bind(this));
		this.$down.on('click', this.down.bind(this));

		this.col.on("add", this.checkButtons.bind(this));

		ev.on('arrows:check', this.checkButtons.bind(this));
	},
	up: function () {
		this.col.pop();
		this.col.pop();
		this.col.add([ {}, {} ], {at: 0});

		ev.trigger('arrow:up');
	},
	down: function () {
		this.col.shift();
		this.col.shift();
		this.col.add([ {}, {} ]);

		ev.trigger('arrow:down');
	},
	checkButtons: function () {
		let [ first, firstIndex, last, lastIndex ] = utils.collectionInfo( this.col )

		this.disable('none');

		if (!first || !last) return;

		if (first.attributes.master.id === null &&
			last.attributes.apprentice.id === null) this.disable('all');
		else if (this.col.where({ highlight: true }).length) this.disable('all');
		else if (first.attributes.master.id === null) this.disable('top');
		else if (last.attributes.apprentice.id === null) this.disable('bot');

	},
	disable: function (what) {
		switch (what) {
			case 'top':
				this.$up.prop( 'disabled', true );
				break;
			case 'bot':
				this.$down.prop( 'disabled', true );
				break;
			case 'all':
				this.$up.prop( 'disabled', true );
				this.$down.prop( 'disabled', true );
				break;
			default:
				this.$up.prop( 'disabled', false );
				this.$down.prop( 'disabled', false );
		}
	}
}
