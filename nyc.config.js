module.exports = {
	checkCoverage: true,
	branches: 80,
	lines: 80,
	functions: 80,
	statements: 80,
	reporter: [
		"html",
		"json",
		"text"
	],
    reportDir: "./.nyc_output/report",
    tempDir: "./.nyc_output"
};