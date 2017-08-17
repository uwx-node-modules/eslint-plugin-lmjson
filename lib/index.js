"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var yaml = require("yaml-lint");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

var fileContents = {};

function onPreprocess(text, fileName) {
    fileContents[fileName] = text;
    return [text];
}

function onPostprocess(messages, fileName) {
    // Get document, or throw exception on error
    try {
        yaml.safeLoad(fileContents[fileName], {
            filename: fileName,
            json: false
        });
    } catch (e) {
        return [{
            ruleId: "invalid-yaml-" + e.message.replace(/\s+/g, '-').replace(/[^a-z]/g, ''),
            severity: 2,
            message: e.message,
            source: e.mark.buffer,
            line: e.mark.line,
            column: e.mark.column
        }];
    }
}

// import processors
module.exports.processors = {
    // add your processors here
    ".yml": {
        preprocess: onPreprocess,
        postprocess: onPostprocess
    },
    ".yaml": {
        preprocess: onPreprocess,
        postprocess: onPostprocess
    }
};
