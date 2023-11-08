"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePagination = void 0;
const calculatePagination = (page, limit, sortBy = "createdAt", sortOrder = "desc") => {
    page = page ? page : 1;
    limit = limit ? limit : 10;
    const skip = (page - 1) * limit;
    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder,
    };
};
exports.calculatePagination = calculatePagination;
