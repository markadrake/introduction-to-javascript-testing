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

/* istanbul ignore else */
if (!Object.prototype.validate) {
	/**
	 * Provides model validation against an object.
	 * @method
	 * @param {string} model - The model used for validation.
	 */
	Object.defineProperty(Object.prototype, "validate", {
		value: function (model) {
			const properties = Object.getOwnPropertyNames(this);
			properties.forEach((property, index) => {
				let isOfType = {}.toString.call(this[property]).split(' ')[1].slice(0, -1).toLowerCase();
				let shouldBeOfType = model.filter(x => x.key === property)[0].type;
				if (isOfType != shouldBeOfType) {
					throw TypeError(`"${property}" is of type ${isOfType} but should be ${shouldBeOfType}.`);
				}
			});
			return true;
		},
		configurable: true,
		writable: true
	});
}