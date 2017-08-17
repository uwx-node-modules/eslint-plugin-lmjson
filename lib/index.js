"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var lmjsonParse = require("lmjson");

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
        lmjsonParse(fileContents[fileName]);
        return [];
    } catch (e) {
        return [{
            ruleId: "invalid-yaml-" + e.uwxDetail.message
                .replace(/ in \".*/g, '')
                .replace(/\ba\b/g, '')
                .replace(/[^a-z ]/g, '')
                .trim()
                .replace(/\s+/g, '-'),
            severity: 2,
            message: e.uwxDetail.message,
            source: e.uwxDetail.text.split('\n')[e.uwxDetail.line - 1],
            line: e.uwxDetail.line,
            column: e.uwxDetail.col,
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
    ".lmjson": prepro,
};
