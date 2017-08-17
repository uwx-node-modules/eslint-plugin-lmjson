"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var yaml = require("js-yaml");

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
        return [];
    } catch (e) {
        return [{
            ruleId: "invalid-yaml-" + e.message
                .replace(/ in \".*/g, '')
                .replace(/\ba\b/g, '')
                .trim()
                .replace(/\s+/g, '-')
                .replace(/[^a-z\-]/g, ''),
            severity: 2,
            message: e.message,
            source: e.mark.buffer,
            line: e.mark.line,
            column: e.mark.column
        }];
    }
}

var prepro = {
    preprocess: onPreprocess,
    postprocess: onPostprocess
};

// import processors
module.exports.processors = {
    // add your processors here
    ".yml": prepro,
    ".yaml": prepro,
    ".sublime-syntax": prepro,
};
