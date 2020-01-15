const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');


const parseFile = (fullPath, { type, folderName }) => {
	const filename = path.basename(fullPath, '.js');
	const { prefix, scope, body, description } = require(fullPath);
	
	const generatorPath = `./generators/${type}`;
	const Generator = require(generatorPath);	
	const generator = new Generator({
		params: {prefix: prefix || filename, scope, body, description},
		env: {
			cwd : path.join(process.cwd(), path.dirname(fullPath))
		},
		resolved: require.resolve(generatorPath),
	});
	return generator.run(() => {

	})
	  
}

const readFile = (folderName, { type }) => {
	const readDir = (dir) => {
		const files = fs.readdirSync(dir);
		files.forEach(function(filename) {
			const fullPath = path.join(dir, filename);
			const stat = fs.statSync(fullPath);
			if (stat.isDirectory()) {      
				readDir(fullPath);
	        }
	        if (stat.isFile()) {
				parseFile(fullPath, { type, folderName });
	        	return;
	        }
		})
	}
	readDir(path.resolve(folderName));
}

const run = () => {
    return inquirer.prompt([
		{
			type: 'list',
			name: 'type',
			message: 'Select the tool type',
			choices: [
				{name: 'Sublime', value: 'sublime'},
				{name: 'Vscode', value: 'vscode'}
			],
		},
		{
			type: 'input',
			name: 'folderName',
			message: '请输入存放代码片段文件的文件夹名',
			default: 'snippent',
		},
	]).then(answers => {
		const { type, folderName } = answers;
		readFile(folderName, { type });
  	}).catch(e => {
	    console.error(chalk.red(`> Generate failed`), e);
	    process.exit(1);
  	})
}

module.exports = run;