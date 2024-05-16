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
exports.insertData = exports.arrayExcercise = exports.findAverageAge = exports.sortStudentsByGrades = exports.getStudentNames = exports.getPassedStudents = exports.filterOutOrders = void 0;
const pgConfig_1 = __importDefault(require("./pgConfig"));
// Filter Orders
function filterOutOrders(items) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = items.filter((el) => {
            let flag = false;
            for (let i = 0; i < el.OrderBlocks.length; i++) {
                if (Array.isArray(el.OrderBlocks[i].lineNo)) {
                    flag = el.OrderBlocks[i].lineNo.some((sl) => {
                        return sl % 3 == 0;
                    });
                }
                else {
                    flag = el.OrderBlocks[i].lineNo % 3 == 0 ? true : false;
                }
            }
            return flag;
        });
        console.log(data);
        const query = `insert into orders(orderid) values($1)`;
        data.map(order => {
            pgConfig_1.default.query(query, [order.orderID]);
        });
        return data;
    });
}
exports.filterOutOrders = filterOutOrders;
// Filter Passed Students
function getPassedStudents(students) {
    return __awaiter(this, void 0, void 0, function* () {
        const passedStudents = students.filter((stu) => {
            return stu.grade >= 50;
        });
        return passedStudents;
    });
}
exports.getPassedStudents = getPassedStudents;
// Fetch Students Name
function getStudentNames(students) {
    return __awaiter(this, void 0, void 0, function* () {
        const studentNames = students.map((stu) => {
            return stu.name;
        });
        return studentNames;
    });
}
exports.getStudentNames = getStudentNames;
// Sort Students By Grades
function sortStudentsByGrades(students) {
    return __awaiter(this, void 0, void 0, function* () {
        const sortedData = students.sort((a, b) => {
            return a.grade - b.grade;
        });
        return sortedData;
    });
}
exports.sortStudentsByGrades = sortStudentsByGrades;
// Get Average Age
function findAverageAge(students) {
    return __awaiter(this, void 0, void 0, function* () {
        let avg = 0;
        for (let i = 0; i < students.length; i++) {
            avg += students[i].age;
        }
        return avg / students.length;
    });
}
exports.findAverageAge = findAverageAge;
function arrayExcercise(arr) {
    return __awaiter(this, void 0, void 0, function* () {
        const concatArray = arr.concat([6, 7, 8]);
        console.log("Array Concat:", concatArray);
        // Find Last Index Of 4
        const arrayLastIndex = arr.lastIndexOf(4);
        console.log("Array Last Index:", arrayLastIndex);
        // Push new element to Array
        arr.push(2);
        console.log("Push new Element:", arr);
        // Splice Array
        const newArray = arr.splice(1, 2);
        console.log("Splice:", newArray);
        // Pop from Array
        const poppedItem = arr.pop();
        console.log("Poped Item:", poppedItem);
        // Array.Slice
        const newSlicedArray = arr.slice(1, 3);
        console.log("Slice:", newSlicedArray);
        // Iterate using map
        const newArray2 = arr.map((item) => item * 2);
        console.log("Map:", newArray2);
        // Iterate using ForEach Loop
        arr.forEach((item) => console.log("ForEach:", item));
        // Array.Shift
        const shiftedItem = arr.shift();
        console.log("Shifted Item:", shiftedItem);
        // Array.Unshift
        arr.unshift(0);
        console.log("Unshift:", arr);
        // Filter a Array
        const newFilteredArr = arr.filter((item) => item > 2);
        console.log("Filter:", newFilteredArr);
        // Find element
        const foundItem = arr.find((item) => item === 2);
        console.log("Find:", foundItem);
        // IndexOf
        const indexOfItem = arr.indexOf(2);
        console.log("Find Index of Element:", indexOfItem);
        // Check array is Includes that element or not true/false
        const includesResult = arr.includes(3);
        console.log("Includes ", includesResult);
        // Join Array into String
        const newJoinedArray = arr.join("-");
        console.log("Join:", newJoinedArray);
        // Find Index of matched element
        const indexOfElement = arr.findIndex((item) => item === 4);
        console.log("FindIndex:", indexOfElement);
        // Array.Some return boolean true if any of the element satisfy the condition
        const someResult = arr.some((item) => item > 3);
        console.log("Some:", someResult);
        // Array.Every return boolean true if all of the element satisfy the condition
        const everyResult = arr.every((item) => item > 0);
        console.log("Every:", everyResult);
        // Array to String
        const newArray3 = arr.toString();
        console.log("ToString:", newArray3);
    });
}
exports.arrayExcercise = arrayExcercise;
function checkTableExists(tableName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield pgConfig_1.default.query(`SELECT * FROM ${tableName}`);
            return true;
        }
        catch (error) {
            // console.log(error)
            console.log(error.code);
            if (error.code === '42P01') {
                return false;
            }
            else {
                throw error;
            }
        }
    });
}
function insertData(tableName) {
    return __awaiter(this, void 0, void 0, function* () {
        const tableExist = yield checkTableExists(tableName);
        try {
            if (!tableExist) {
                yield pgConfig_1.default.query(`CREATE TABLE ${tableName} (id SERIAL PRIMARY KEY, name VARCHAR(50))`);
                return "Table not exist new table Created";
            }
            else {
                yield pgConfig_1.default.query(`INSERT INTO ${tableName} (name) VALUES ('Rahul')`);
                return "Table exist data inserted";
            }
            yield pgConfig_1.default;
        }
        catch (error) {
        }
    });
}
exports.insertData = insertData;
//# sourceMappingURL=service.js.map