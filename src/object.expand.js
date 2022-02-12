/* istanbul ignore else */
if (!Array.prototype.expand) {
	/**
	 * Allows us to expand a flat array structure back to an object.
	 * @method
	 * @param {string} values - IF provided, data will be included in returned object.
	 */
	Object.defineProperty(Array.prototype, "expand", {
		value: function (values) {
			const obj = {};
			this.forEach((key, index) => {
				let objRef = obj,
					keys = key.split(".");

				while (keys.length > 1) {
					let property = keys.splice(0, 1);
					if (!objRef[property]) {
						objRef[property] = {};
					}
					objRef = objRef[property];
				}
				objRef[keys[0]] = (values && values[index]) ? values[index] : null;
			});

			return obj;
		},
		configurable: true,
		writable: true
	});
}