const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { SUFFIX } = require('./internal');

const parseFile = (fullPath, { type, toDir }) => {
    const filename = `${path.basename(fullPath, '.js')}${SUFFIX[type]}`;
    const { prefix, scope, body, description } = require(fullPath);

    const generatorPath = `./generators/${type}`;
    const Generator = require(generatorPath);
    const generator = new Generator({
        filename,
        params: { prefix: prefix || filename, scope, body, description },
        env: {
            cwd: toDir,
        },
        resolved: require.resolve(generatorPath),
    });
    return generator.run(() => {});
};

const readFile = (folderName, { type }) => {
    const readDir = (fromDir, toDir) => {
        const files = fs.readdirSync(fromDir);
        files.forEach(function(filename) {
            const fullPath = path.join(fromDir, filename);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                const toFullPath = path.join(toDir, filename);
                readDir(fullPath, toFullPath);
            }
            if (stat.isFile()) {
                parseFile(fullPath, { type, toDir });
                return;
            }
        });
    };
    const fromDir = path.resolve(folderName);
    const toDir = path.resolve(path.resolve(`snippent-${type}-dits`));
    readDir(fromDir, toDir);
};

const run = () => {
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'type',
                message: 'Select the tool type',
                choices: [
                    { name: 'Sublime', value: 'sublime' },
                    { name: 'Vscode', value: 'vscode' },
                ],
            },
            {
                type: 'input',
                name: 'folderName',
                message: '请输入存放代码片段文件的文件夹名',
                default: 'snippent',
            },
        ])
        .then(answers => {
            const { type, folderName } = answers;
            readFile(folderName, { type });
        })
        .catch(e => {
            console.error(chalk.red(`> Generate failed`), e);
            process.exit(1);
        });
};

module.exports = run;
