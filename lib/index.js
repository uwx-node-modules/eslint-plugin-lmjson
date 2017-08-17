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
        var msg = e.message.replace(/ in \".*/g, '');
        return [{
            ruleId: "invalid-yaml-" + msg
                .replace(/\ba\b/g, '')
                .replace(/[^a-z ]/g, '')
                .trim()
                .replace(/\s+/g, '-'),
            severity: 2,
            message: msg,
            source: e.mark.buffer,
            line: e.mark.line+1,
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
