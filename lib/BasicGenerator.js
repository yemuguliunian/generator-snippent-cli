const Generator = require('yeoman-generator');
const glob = require('glob');

const { statSync } = require('fs');
const { basename } = require('path');

function noop() {
    return true;
}

class BasicGenerator extends Generator {

    constructor(opts) {
        super(opts);
        this.opts = opts;
    }
  
    writeFiles({ context, filterFiles = noop }) {
        // console.log(this.templatePath())
        // glob.sync('**/*', {
        //     cwd: this.templatePath(),
        //     dot: true
        // })
        // .filter(filterFiles)
        // .forEach(file => {
        //     const filePath = this.templatePath(file);
        //     if (statSync(filePath).isFile()) {
        //         this.fs.copyTpl(
        //             this.templatePath(filePath),
        //             this.destinationPath(file.replace(/^_/, '.')),
        //             context
        //         );
        //     }
        // })
    }
}

module.exports = BasicGenerator;