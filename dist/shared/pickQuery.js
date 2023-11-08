"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pickQuery = (query, fields) => {
    const queryObj = {};
    for (let field of fields) {
        if (query && query.hasOwnProperty.call(query, field)) {
            queryObj[field] = query[field];
        }
    }
    return queryObj;
};
exports.default = pickQuery;
