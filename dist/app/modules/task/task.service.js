"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskService = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const prisma_1 = require("../../../shared/prisma");
const task_constant_1 = require("./task.constant");
const pagination_1 = require("../../../shared/pagination");
const createTask = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.task.create({
        data: payload,
        include: {
            user: {
                select: task_constant_1.userSelectFields,
            },
        },
    });
    if (!result) {
        throw new http_errors_1.default.BadRequest("failed to create task");
    }
    return result;
});
const getTasks = (userId, paginationOption, searchOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.calculatePagination)(Number(paginationOption.page), Number(paginationOption.limit), paginationOption.sortBy, paginationOption.sortOrder);
    const { searchTerm } = searchOption, filterData = __rest(searchOption, ["searchTerm"]);
    const conditions = [];
    // search task title, status, priority
    if (searchTerm) {
        conditions.push({
            OR: task_constant_1.taskSearchableFields.map((field) => {
                return {
                    [field]: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                };
            }),
        });
    }
    // filtering task
    if (Object.keys(filterData).length > 0) {
        conditions.push({
            AND: Object.entries(filterData).map(([field, value]) => {
                return {
                    [field]: {
                        equals: value,
                    },
                };
            }),
        });
    }
    const finalCondition = conditions.length > 0
        ? {
            AND: conditions,
            userId,
        }
        : { userId };
    const result = yield prisma_1.prisma.task.findMany({
        where: finalCondition,
        take: limit,
        skip,
        orderBy: {
            [sortBy]: sortOrder,
        },
        include: {
            user: {
                select: task_constant_1.userSelectFields,
            },
        },
    });
    const totalTask = yield prisma_1.prisma.task.count({
        where: finalCondition,
    });
    const totalPages = Math.ceil(totalTask / limit);
    const prevPage = page - 1 > 0 ? page - 1 : null;
    const nextpage = page + 1 <= totalPages ? page + 1 : null;
    return {
        meta: {
            page,
            limit,
            total: totalTask,
            totalPages,
            prevPage,
            nextpage,
        },
        data: result,
    };
});
const getSingleTask = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.task.findUnique({
        where: {
            id,
            userId,
        },
        include: {
            user: {
                select: task_constant_1.userSelectFields,
            },
        },
    });
    if (!result) {
        throw new http_errors_1.default.NotFound("task not found");
    }
    return result;
});
const updateTask = (id, userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistTask = yield prisma_1.prisma.task.findUnique({
        where: {
            id,
            userId: userId,
        },
    });
    if (!isExistTask) {
        throw new http_errors_1.default.NotFound("task not found");
    }
    const result = yield prisma_1.prisma.task.update({
        where: {
            id: id,
        },
        data: payload,
        include: {
            user: {
                select: task_constant_1.userSelectFields,
            },
        },
    });
    if (!result) {
        throw new http_errors_1.default.BadRequest("fail  to update task");
    }
    return result;
});
const deleteTask = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistTask = yield prisma_1.prisma.task.findUnique({
        where: {
            id: id,
            userId,
        },
    });
    if (!isExistTask) {
        throw new http_errors_1.default.NotFound("task not found");
    }
    const result = yield prisma_1.prisma.task.delete({
        where: {
            id: id,
            userId,
        },
    });
    if (!result) {
        throw new http_errors_1.default.BadRequest("failed to delete task");
    }
    return result;
});
exports.taskService = {
    createTask,
    updateTask,
    deleteTask,
    getTasks,
    getSingleTask,
};
