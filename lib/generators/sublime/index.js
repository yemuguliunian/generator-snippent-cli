const BasicGenerator = require('../../BasicGenerator.js');

class Generator extends BasicGenerator {
    writing() {
        const { params } = this.opts;

        this.writeFiles({
            context: params,
            filterFiles: f => {
                return true;
            }
        })
    }
}

module.exports = Generator;