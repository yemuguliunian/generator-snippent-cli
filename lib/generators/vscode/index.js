const BasicGenerator = require('../../BasicGenerator.js');

class Generator extends BasicGenerator {
    writing() {
        const { params } = this.opts;
        const newBody = params.body.replace(/\"/g, '\\"').split('\n');
        this.writeFiles({
            context: { ...params, body: newBody },
            filterFiles: f => {
                return true;
            },
        });
    }
}

module.exports = Generator;
