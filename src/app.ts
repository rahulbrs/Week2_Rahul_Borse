import express, {Request , Response} from 'express';
import {arrayExcercise, filterOutOrders, findAverageAge, getPassedStudents, getStudentNames, insertData, sortStudentsByGrades} from './service';
const app = express();
app.use(express.json());
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
app.post('/fetch-orders', async (req:Request,res:Response)=>{
    const {items} = req.body;
    const data = await filterOutOrders(items)
    res.send(data);
});

// Question 2
app.get('/array',async(req:Request, res:Response)=>{
    const {arr} = req.body;
    arrayExcercise(arr)
    res.json("Results Consoled")
})


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
app.get('/passed-students', async (req: Request, res: Response)=>{
    // const {students} = req.body
    const passedStudents = await getPassedStudents(students)
    res.json(passedStudents);
});

// Question 4-2
// Get Students Name
app.get('/get-students-name', async (req: Request, res: Response)=>{
    // const {students} = req.body
    const studentNames = await getStudentNames(students)
    res.json(studentNames);
});

// Question 4-3
// Sort Students By Grade
app.get('/get-sorted-students', async (req: Request, res: Response)=>{
    // const {students} = req.body
    const sortedStudents = await sortStudentsByGrades(students)
    res.json(sortedStudents);
});

// Question 4-4
// Find Average Age
app.get('/get-average-age', async (req: Request, res: Response)=>{
    // const {students} = req.body
    const avgAge = await findAverageAge(students)
    res.json({avgAge:avgAge});
});

// Question 5
app.post('/check-table-existance', async(req:Request, res:Response)=>{
    const result = await insertData("employees")
    res.json(result)
})

// Server
app.listen(port, ()=> {
    console.log(` Hi we are comfortable in NodeJS, Server is Running on Port - ${port}`);
})