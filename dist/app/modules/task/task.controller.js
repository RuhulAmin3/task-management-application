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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = void 0;
const task_service_1 = require("./task.service");
const response_1 = __importDefault(require("../../../shared/response"));
const http_status_codes_1 = require("http-status-codes");
const pickQuery_1 = __importDefault(require("../../../shared/pickQuery"));
const task_constant_1 = require("./task.constant");
const createTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskData = req.body;
        const result = yield task_service_1.taskService.createTask(taskData);
        (0, response_1.default)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            message: "task created successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const paginationOptions = (0, pickQuery_1.default)(req.query, task_constant_1.paginationFields);
        const searchOptions = (0, pickQuery_1.default)(req.query, task_constant_1.taskQueryFields);
        const result = yield task_service_1.taskService.getTasks(id, paginationOptions, searchOptions);
        (0, response_1.default)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "all task retrieved successfully",
            data: result.data,
            meta: result.meta,
        });
    }
    catch (err) {
        next(err);
    }
});
const getSignleTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const result = yield task_service_1.taskService.getSingleTask(id, userId);
        (0, response_1.default)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "all task retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const userId = req.user.id;
        const result = yield task_service_1.taskService.updateTask(id, userId, data);
        (0, response_1.default)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "task updated successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const deleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const result = yield task_service_1.taskService.deleteTask(id, userId);
        (0, response_1.default)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "task deleted successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.taskController = {
    createTask,
    getTasks,
    updateTask,
    getSignleTasks,
    deleteTask,
};
