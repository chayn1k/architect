import ev from './../utils/events.js'

let lastPlanet = '';

export default {
	init(col) {
		this.col = col;
		this.subscribe();
		return this;
	},
	subscribe() {
		ev.on("change-planet update-jedi-list", this.updatePlanet.bind(this));
	},
	findCombination(name) {
		return this.col.filter((item) => {
			let cond = item.attributes.homeworld.name === name;
			return cond;
		});
	},

	updatePlanet(newPlanetName = lastPlanet) {
		lastPlanet = newPlanetName;

		let findedItems = this.findCombination(newPlanetName);

		if (findedItems.length) {
			ev.trigger('step:stop');
			ev.trigger('arrows:check');
			findedItems.forEach((item) => {
				item.set({highlight: true});
				return item;
			});
		} else {
			let highlightedItems = this.col.filter((item) => {
				return item.attributes.highlight == true;
			});
			if (!highlightedItems.length) return;

			highlightedItems.forEach((item) => {
				item.set({highlight: false});
				return item;
			});

			ev.trigger('step:make');
			ev.trigger('arrows:check');
		}
	}
}
