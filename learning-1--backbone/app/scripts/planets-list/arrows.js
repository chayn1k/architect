import $ from 'jQuery'

export default {
	init: function (col, make, stop) {
		this.col = col;
		this.make = make;
		this.stop = stop;

		$('.js-up').on('click', this.up.bind(this));
		$('.js-down').on('click', this.down.bind(this));

		this.col.on("add", this.checkButtons.bind(this));
	},
	up: function () {
		this.col.pop();
		this.col.pop();
		this.col.add([ {}, {} ], {at: 0});

		this.stop();
		this.make();
	},
	down: function () {
		this.col.shift();
		this.col.shift();
		this.col.add([ {}, {} ]);

		this.stop();
		this.make();
	},
	checkButtons: function () {
		let filledItems = this.col.filter((item) => {
			return (item.attributes && item.attributes.id !== '');
		});

		if (filledItems.length <= 1) {
			this.disable('none');
			return;
		}

		let first = filledItems[0];
		let last = filledItems[filledItems.length - 1];

		if (first.attributes.masterId === null &&
			last.attributes.apprenticeId === null) this.disable('all');
		else if (first.attributes.masterId === null) this.disable('top');
		else if (last.attributes.apprenticeId === null) this.disable('bot');
		else this.disable('none');

	},
	disable: function (what) {
		switch (what) {
			case 'top':
				$('.js-up').prop( 'disabled', true );
				break;
			case 'bot':
				$('.js-down').prop( 'disabled', true );
				break;
			case 'all':
				$('.js-up').prop( 'disabled', true );
				$('.js-down').prop( 'disabled', true );
				break;
			default:
				$('.js-up').prop( 'disabled', false );
				$('.js-down').prop( 'disabled', false );
		}
	}
}
