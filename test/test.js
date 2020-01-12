/*
	Mocha is a JavaScript testing framework that runs in both Node.js and the browser.
	https://mochajs.org/
*/

// Assert is a JS module with a set of assertion functions we'll utilize in our testing.
const assert = require("assert");

// Chai is a JS library with a set of assertion functions for BDD / TDD.
const expect = require("chai").expect;

// Require one or multiple files from our repo that we wish to test:
require("../src/object.js");

// Now our tests:
describe("Object Extensions", function () {

	describe("flatten()", function () {

		it("Flatten object to array of key/value pairs.", function () {
			const obj = {
				"key1": "value1",
				"key2": {
					"key3": "value3",
					"key4": {
						"key5": "value5"
					}
				}
			};

			const array = [
				"key1",
				"key2.key3",
				"key2.key4.key5"
			];

			assert.deepEqual(obj.flatten(), array);
		});

	});

	describe("expand()", function () {

		it("Expand an array of string values into an object.", function () {
			const array = [
				"key1",
				"key2.key3",
				"key2.key4.key5"
			];

			const solution = {
				"key1": null,
				"key2": {
					"key3": null,
					"key4": {
						"key5": null
					}
				}
			};

			let obj = array.expand();
			assert.deepEqual(obj, solution);
		});

		it("Expands the array and fills values properly.", function () {
			const flattened = [
				"key1",
				"key2.key3",
				"key2.key4.key5"
			];

			const values = [
				"value1",
				"value3",
				"value5"
			];

			const solution = {
				"key1": "value1",
				"key2": {
					"key3": "value3",
					"key4": {
						"key5": "value5"
					}
				}
			};

			assert.deepEqual(flattened.expand(values), solution);
		});

	});

	describe("validate()", function () {

		it("Properly validate an object against an object model.", function () {
			var obj = {
				name: "Mark",
				age: 32,
				dob: new Date(1986, 03, 20),
				friends: ["Lori", "Nick"],
				alive: true,
				sayHello: () => console.log(`Hi, my name is Mark`),
				dod: null
			};

			var model = [
				{
					key: "name",
					type: "string"
				},
				{
					key: "age",
					type: "number"
				},
				{
					key: "dob",
					type: "date"
				},
				{
					key: "friends",
					type: "array"
				},
				{
					key: "alive",
					type: "boolean"
				},
				{
					key: "sayHello",
					type: "function"
				},
				{
					key: "dod",
					type: "null"
				}
			];

			obj.validate(model);
			assert(true);
		});

		it("Throw type error if property doesn't match model expectations.", function () {
			const obj = {
				name: null
			};

			const model = [
				{
					key: "name",
					type: "string"
				}
			]
			expect(function () {
				obj.validate(model);
			}).to.throw("\"name\" is of type null but should be string.")
		});

	});
});
