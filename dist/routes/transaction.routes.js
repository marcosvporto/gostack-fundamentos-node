"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CreateTransactionService_1 = __importDefault(require("../services/CreateTransactionService"));
var TransactionsRepository_1 = __importDefault(require("../repositories/TransactionsRepository"));
// import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';
var transactionRouter = express_1.Router();
// const transactionsRepository = new TransactionsRepository();
transactionRouter.get('/', function (request, response) {
    try {
        // TODO
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
transactionRouter.post('/', function (request, response) {
    try {
        // TODO
        var _a = request.body, title = _a.title, value = _a.value, type = _a.type;
        var transactionsRepository = new TransactionsRepository_1.default();
        var createTransaction = new CreateTransactionService_1.default(transactionsRepository);
        var transaction = createTransaction.execute({ title: title, type: type, value: value });
        return response.json(transaction);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
exports.default = transactionRouter;
