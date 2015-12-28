var fs = require('fs'),
	replace = require("replace");

module.exports.initReadme = function (responsibleUername, responsibleFullName, projectName, projectDescription) {

	var readme = 'README.md';
	fs.readFile(readme, 'utf8', function (err, data) {

		if (err) {
			return console.log(err);
		}

		var index;
		var result = data.replace(/Sebastian Balay/g, responsibleFullName)
			.replace(/sbalay/g, responsibleUername);

		result = result.toString();
		result = result.split('\n');
		
		result[0] = projectName;
		result[3] = projectDescription;

		index = result.indexOf('## Contributing');
		result.splice(index, 8);

		index = result.indexOf('## License');
		result = result.splice(0, index - 1)

		result = result.join('\n');
		
		fs.writeFile(readme, result, 'utf8', function (err) {
			if (err) return console.log(err);
		});
	});

}

module.exports.initPackageBower = function (responsibleFullName, projectName, projectDescription) {

	var packagejson = 'package.json';
	fs.readFile(packagejson, 'utf8', function (err, data) {

		if (err) {
			return console.log(err);
		}

		var result = JSON.parse(data);
		result['name'] = projectName;
		result['description'] = projectDescription
		result['author'] = responsibleFullName;
		result['repository']['url'] = 'https://github.com/Wolox/' + projectName + '.git'
		result['repository']['url'] = 'https://github.com/Wolox/' + projectName + '/issues';
		result = JSON.stringify(result, null, '  ') + '\n';

		fs.writeFile(packagejson, result, 'utf8', function (err) {
			if (err) return console.log(err);
		});

	});

	var bowerjson = 'bower.json';
	fs.readFile(bowerjson, 'utf8', function (err, data) {

		if (err) {
			return console.log(err);
		}

		var result = JSON.parse(data);
		result['name'] = projectName;
		result['description'] = projectDescription
		result['authors'] = [ responsibleFullName ];
		result['homepage'] = 'https://github.com/Wolox/' + projectName;
		result = JSON.stringify(result, null, '  ') + '\n';

		fs.writeFile(bowerjson, result, 'utf8', function (err) {
			if (err) return console.log(err);
		});

	});

}

module.exports.initAngularModule = function (projectName) {
	var toReplace = "'app'";
	var replacement ="'" + projectName + "'";

	replace({
		regex: toReplace,
		replacement: replacement,
		paths: ['./src/app'],
		include: '*.js',
		recursive: true,
		silent: true
	});
}
