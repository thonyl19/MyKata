"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTemplate = exports.CancelError = void 0;
const Path = require("path");
const ejs = require("ejs");
const yaml_1 = require("./yaml");
const block_1 = require("./block");
const {ext_ut} = require("./ext_ut");
const _ = require("lodash");
var iconv = require('iconv-lite');
const fs_1 = require("fs");
class CancelError extends Error {
}
exports.CancelError = CancelError; 
const saveFileSplitter = `<SAVE-FILE-a43c7503-5de4-40a3-901a-a2d4c221efb2>`;
console.log('initialized ejs-yaml');
console.log(ext_ut);
class Generator {
    constructor(options) {
        this._ = _;
        this.ext_ut = ext_ut;
        this.blocks = {};
        this.canceled = false;
        this.skipped = false;
        this.capitalize = (text) => text[0].toUpperCase() + text.substr(1);
        this.uncapitalize = (text) => text[0].toLowerCase() + text.substr(1);
        this.fromYaml = yaml_1.loadYaml;
        this.fromYamls = yaml_1.loadYamls;
        this.toYaml = yaml_1.dumpYaml;
        this.toYamls = yaml_1.dumpYamls;
        this.dirname = Path.dirname;
        this.basename = Path.basename;
        this.extname = Path.extname;
        this.fileop = options.fileop;
        this.input = options.input;
        this.output = options.output || options.input.split('.').slice(0, -1).join('.');
        this.cwd = options.cwd || Path.dirname(options.input);
        this.data = options.data;
        this.template = options.template;
        this.lastOutput = options.lastOutput || null;
        this.name = options.name || Path.basename(this.output).split('.')[0];
        this.isNew = options.created || false;
        this.markers = [
            block_1.createMarker({ begin: '// {{{ @name', end: '// }}}' }),
            block_1.createMarker({ begin: '/* {{{ @name', end: '   }}} */' }),
        ];
        this.isBig5 = options.isBig5;
        this.writeFile=ext_ut.writeFile;
        this.view=function(code){
            if (Array.isArray(code)){
                return code.join('\r\n');
            }else if(typeof(code) === "string"){
                return code;
            }
            return JSON.stringify(code,null,4);
        };
        this.relateRoot=function(file){
            let {input} = this;
            var [Root=""] = input.match(/(.)+tpl_ejsyaml(\\|\/)/gi)||[]
            return `${Root}${file}`;
        };
        this.$init();
    }
    // block APIs
    marker(markers) {
        this.$setMarker(markers instanceof Array ? markers : [markers]);
        this.blocks = block_1.extractBlocks(this.lastOutput || '', this.markers);
    }
    rawBlock(name) {
        var _a;
        return ((_a = this.blocks[name]) === null || _a === void 0 ? void 0 : _a.content) || '';
    }
    dataBlock(name, defaults, markerIndex) {
        const block = this.rawBlock(name);
        const data = this.fromYaml(block) || defaults;
        this.setBlock(name, this.toYaml(data), markerIndex);
        return data;
    }
    modifyBlock(name, cb, markerIndex) {
        const content = this.rawBlock(name);
        const modified = cb(content);
        this.setBlock(name, modified, markerIndex);
        return modified;
    }
    setBlock(name, content, markerIndex) {
        if (this.blocks[name]) {
            this.blocks[name].content = content;
        }
        else {
            this.blocks[name] = {
                name: name,
                beginMarker: this.markers[markerIndex || 0].begin.replace('@name', name),
                content: content,
                endMarker: this.markers[markerIndex || 0].end.replace('@name', name),
                markerIndex: 0,
            };
        }
    }
    block(name, defaultContent, markerIndex) {
        var _a, _b;
        const block = this.blocks[name];
        if (block) {
            return `${block.beginMarker}\n${block.content}\n${block.endMarker}`;
        }
        const beginMarker = (_a = this.markers[markerIndex || 0].begin) === null || _a === void 0 ? void 0 : _a.replace('@name', name);
        const endMarker = (_b = this.markers[markerIndex || 0].end) === null || _b === void 0 ? void 0 : _b.replace('@name', name);
        return `${beginMarker}\n${defaultContent || ''}\n${endMarker}`;
    }
    render(inputPath, outputPath, data , isBig5=false) {
        const input = this.resolvePath(inputPath);
        const output = this.resolvePath(outputPath);
        const template = this.fileop.readFile(input);
        if (template === null) {
            throw new Error(`ejs file '${input}' not found.`);
        }
        data = data !== undefined ? data : this.data;
        const ctx = new Generator({
            fileop: this.fileop,
            input: input,
            output: output,
            cwd: Path.dirname(output),
            data,
            created: false,
            isBig5
        });
        ctx.execute(template);
    }
    outfile(path) {
        console.log({path});
        this.output = this.resolvePath(path);
        this.lastOutput = null;
        this.$init();
        return `${saveFileSplitter}${this.output}${saveFileSplitter}`;
    }
    cancel() {
        throw new CancelError();
    }
    skip() {
        this.skipped = true;
    }
    // utility functions
    read(path) {
        const file = Path.resolve(Path.dirname(this.input), path);
        return this.fileop.readFile(file);
    }
    // entry point
    execute(template) {
        const result = ejs.render(template, { ...this.data, $: this }, { filename: this.input, context: this });
        if (this.skipped) {
            return;
        }
        const sections = result.split(saveFileSplitter);
        //console.log({sections});
        if (sections.length > 1) {
            sections.shift();
            while (sections.length > 1) {
                const outpath = sections.shift();
                var text = sections.shift();
                this.writeFile(outpath, text);
            }
        }
        else {
            var text = sections[0];
            this.writeFile(this.output,text);
        }
    }
    
    async generate() {
        if (this.template === undefined) {
            const yaml = this.fileop.readFile(this.input);
            if (yaml === null) {
                throw new Error(`'ejsyaml file '${this.input} not found`);
            }
            const [data, template] = await yaml_1.evaluate(yaml_1.loadYamls(yaml), Path.dirname(this.input));
            if (template === undefined) {
                throw new Error('.ejsyaml file should have at least 2 documents.');
            }
            if (this.data === undefined) {
                this.data = data;
            }
            this.template = template;
        }
        this.execute(this.template);
    }
    // internal implementation
    $setMarker(markers) {
        this.markers = markers.map(m => {
            if (m.begin.indexOf('@name') < 0) {
                throw new Error("begin marker must have '@name' mark.");
            }
            return block_1.createMarker(m);
        });
    }
    $init() {
        this.lastOutput = this.fileop.readFile(this.output);
        this.blocks = block_1.extractBlocks(this.lastOutput || '', this.markers);
    }
    resolvePath(path) {
        return Path.isAbsolute(path)
            ? path
            : Path.resolve(this.cwd, path);
    }
}
exports.generateTemplate = async (options) => {
    await new Generator(options).generate();
    return await options.fileop.commit();
};
//# sourceMappingURL=generator.js.map