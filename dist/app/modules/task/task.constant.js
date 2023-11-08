"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationFields = exports.taskSearchableFields = exports.taskQueryFields = exports.userSelectFields = void 0;
exports.userSelectFields = {
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    createdAt: true,
    updatedAt: true,
    password: false,
};
exports.taskQueryFields = ["searchTerm", "priority", "status"];
exports.taskSearchableFields = ["title"];
exports.paginationFields = ["page", "limit", "sortBy", "sortOrder"];
