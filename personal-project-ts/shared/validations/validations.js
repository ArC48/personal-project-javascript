"use strict";
exports.__esModule = true;
exports.validate = void 0;
function validate(step) {
    if (!step.index) {
        throw new Error("Index property is missing on scenario");
    }
    else if (!step.meta) {
        throw new Error("Meta property is missing on scenario " + step.index);
    }
    else if (!step.meta.title) {
        throw new Error("Title property is missing on scenario " + step.index);
    }
    else if (!step.meta.description) {
        throw new Error("Description property is missing on scenario " + step.index);
    }
    else if (!step.call) {
        throw new Error("Callback is missing on scenario " + step.index);
    }
}
exports.validate = validate;
