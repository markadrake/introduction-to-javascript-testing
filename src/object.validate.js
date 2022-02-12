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