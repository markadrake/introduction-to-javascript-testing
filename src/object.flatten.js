/* istanbul ignore else */
if (!Object.prototype.flatten) {
	/**
	 * Allows us to flatten objects to a flat array structure.
	 * @method
	 * @param {string} prefix - Helps with recursive function to build the flat array representation.
	 */
	Object.defineProperty(Object.prototype, "flatten", {
		value: function (prefix) {
			const properties = Object.getOwnPropertyNames(this);

			properties.forEach((prop, index) => {
				if (typeof this[prop] === typeof {}) {
					let childObject = this[prop];
					let childProperties = childObject.flatten(prop);
					properties.splice(index, 1, ...childProperties);
				}
			});

			if (prefix) {
				properties.forEach((prop, index) => {
					properties[index] = `${prefix}.${prop}`;
				});
			}

			return properties;
		},
		configurable: true,
		writable: true
	});
}