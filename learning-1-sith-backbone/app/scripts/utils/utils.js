export default {
	collectionInfo: function colInfo(col) {
		let filledItems = col.filter((item) => {
			return item.attributes.id !== null;
		});

		let first = filledItems[0];
		let firstIndex = col.indexOf(first);
		let last = filledItems[filledItems.length - 1];
		let lastIndex = col.indexOf(last);

		return [first, firstIndex, last, lastIndex]
	},

}
