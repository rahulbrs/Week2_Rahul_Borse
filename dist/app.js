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
const express_1 = __importDefault(require("express"));
const service_1 = require("./service");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 8000;
// Question 1
// const items=  [
//     {
//         "orderID": "0000001211",
//         "orderInvoiceNo": "1234567",
//         "OrderBlocks": [
//             {
//                 "lineNo": [1,4,6,8,9,1,4],
//                 "ProductCode": "#31451"
//             },
//             {
//                 "lineNo": 2,
//                 "ProductCode": "#64311"
//             },
//             {
//                 "lineNo": 3,
//                 "ProductCode": "#85959"
//             }
//         ]
//     },
//     {
//         "orderID": "0000001212",
//         "orderInvoiceNo": "1234568",
//         "OrderBlocks": [
//             {
//                 "lineNo": 7,
//                 "ProductCode": "#86869"
//             },
//             {
//                 "lineNo": [6,7,4,8,4,2],
//                 "ProductCode": "#10384"
//             },
//             {
//                 "lineNo": 12,
//                 "ProductCode": "#00873"
//             }
//         ]
//     },
//     {
//         "orderID": "0000001213",
//         "orderInvoiceNo": "1234569",
//         "OrderBlocks": [
//             {
//                 "lineNo": 76,
//                 "ProductCode": "#22291"
//             }
//         ]
//     }
// ]
// Fetch filtered Orders
app.post('/fetch-orders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { items } = req.body;
    const data = yield (0, service_1.filterOutOrders)(items);
    res.send(data);
}));
// Question 2
app.get('/array', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { arr } = req.body;
    (0, service_1.arrayExcercise)(arr);
    res.json("Results Consoled");
}));
// Question 4
const students = [
    { name: "Alice", age: 20, grade: 75 },
    { name: "Bob", age: 22, grade: 85 },
    { name: "Charlie", age: 21, grade: 60 },
    { name: "David", age: 19, grade: 45 },
    { name: "Eve", age: 20, grade: 90 }
];
// Question 4-1
// Get Passed Students
app.get('/passed-students', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const {students} = req.body
    const passedStudents = yield (0, service_1.getPassedStudents)(students);
    res.json(passedStudents);
}));
// Question 4-2
// Get Students Name
app.get('/get-students-name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const {students} = req.body
    const studentNames = yield (0, service_1.getStudentNames)(students);
    res.json(studentNames);
}));
// Question 4-3
// Sort Students By Grade
app.get('/get-sorted-students', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const {students} = req.body
    const sortedStudents = yield (0, service_1.sortStudentsByGrades)(students);
    res.json(sortedStudents);
}));
// Question 4-4
// Find Average Age
app.get('/get-average-age', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const {students} = req.body
    const avgAge = yield (0, service_1.findAverageAge)(students);
    res.json({ avgAge: avgAge });
}));
// Question 5
app.post('/check-table-existance', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, service_1.insertData)("employees");
    res.json(result);
}));
// Server
app.listen(port, () => {
    console.log(` Hi we are comfortable in NodeJS, Server is Running on Port - ${port}`);
});
//# sourceMappingURL=app.js.map