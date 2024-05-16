import pool from "./pgConfig";

// Filter Orders
async function filterOutOrders(items: any[]): Promise<any[]> {
    let data = items.filter((el: any) => {
        let flag = false
        for (let i = 0; i < el.OrderBlocks.length; i++) {
            if (Array.isArray(el.OrderBlocks[i].lineNo)) {
                flag = el.OrderBlocks[i].lineNo.some((sl: number) => {
                    return sl % 3 == 0

                })
            } else {
                flag = el.OrderBlocks[i].lineNo % 3 == 0 ? true : false
            }
        }
        return flag
    })
    console.log(data);
    const query = `insert into orders(orderid) values($1)`
    data.map(order => {
        pool.query(query, [order.orderID])
    })
    return data;

}

// Filter Passed Students
async function getPassedStudents(students: any[]): Promise<any[]> {
    const passedStudents = students.filter((stu) => {
        return stu.grade >= 50
    })
    return passedStudents;
}
// Fetch Students Name
async function getStudentNames(students: any[]): Promise<any[]> {
    const studentNames = students.map((stu) => {
        return stu.name
    })
    return studentNames;
}
// Sort Students By Grades
async function sortStudentsByGrades(students: any[]): Promise<any[]> {
    const sortedData = students.sort((a, b) => {
        return a.grade - b.grade
    })
    return sortedData;
}
// Get Average Age
async function findAverageAge(students: any[]): Promise<number> {
    let avg = 0;
    for (let i = 0; i < students.length; i++) {
        avg += students[i].age;
    }
    return avg / students.length
}

async function arrayExcercise(arr: any[]) {
    const concatArray: number[] = arr.concat([6, 7, 8]);
    console.log("Array Concat:", concatArray);

    // Find Last Index Of 4
    const arrayLastIndex: number = arr.lastIndexOf(4);
    console.log("Array Last Index:", arrayLastIndex);

    // Push new element to Array
    arr.push(2);
    console.log("Push new Element:", arr);

    // Splice Array
    const newArray: number[] = arr.splice(1, 2);
    console.log("Splice:", newArray);

    // Pop from Array
    const poppedItem: number | undefined = arr.pop();
    console.log("Poped Item:", poppedItem);

    // Array.Slice
    const newSlicedArray: number[] = arr.slice(1, 3);
    console.log("Slice:", newSlicedArray);

    // Iterate using map
    const newArray2: number[] = arr.map((item) => item * 2);
    console.log("Map:", newArray2);

    // Iterate using ForEach Loop
    arr.forEach((item) => console.log("ForEach:", item));

    // Array.Shift
    const shiftedItem: number | undefined = arr.shift();
    console.log("Shifted Item:", shiftedItem);
    // Array.Unshift
    arr.unshift(0);
    console.log("Unshift:", arr);

    // Filter a Array
    const newFilteredArr: number[] = arr.filter((item) => item > 2);
    console.log("Filter:", newFilteredArr);

    // Find element
    const foundItem: number | undefined = arr.find((item) => item === 2);
    console.log("Find:", foundItem);
    
    // IndexOf
    const indexOfItem: number = arr.indexOf(2);
    console.log("Find Index of Element:", indexOfItem);

    // Check array is Includes that element or not true/false
    const includesResult: boolean = arr.includes(3);
    console.log("Includes ", includesResult);

    // Join Array into String
    const newJoinedArray: string = arr.join("-");
    console.log("Join:", newJoinedArray);

    // Find Index of matched element
    const indexOfElement: number = arr.findIndex((item) => item === 4);
    console.log("FindIndex:", indexOfElement);

    
    // Array.Some return boolean true if any of the element satisfy the condition
    const someResult: boolean = arr.some((item) => item > 3);
    console.log("Some:", someResult);
    
    // Array.Every return boolean true if all of the element satisfy the condition
    const everyResult: boolean = arr.every((item) => item > 0);
    console.log("Every:", everyResult);
    
    // Array to String
    const newArray3: string = arr.toString();
    console.log("ToString:", newArray3);
    
}


async function checkTableExists(tableName:string): Promise<boolean> {
    try {
      await pool.query(`SELECT * FROM ${tableName}`);
      return true;
    } catch (error:any) {
        // console.log(error)
        console.log(error.code)
      if (error.code === '42P01') {
        return false;
      } else {
        throw error;
      }
    }
}

async function insertData(tableName:string):Promise<any>{
    const tableExist = await checkTableExists(tableName);
    try {
        if(!tableExist){
            await pool.query(`CREATE TABLE ${tableName} (id SERIAL PRIMARY KEY, name VARCHAR(50))`);
            return "Table not exist new table Created"
        }else{
            await pool.query(`INSERT INTO ${tableName} (name) VALUES ('Rahul')`);
            return "Table exist data inserted"
        }
        await pool
    } catch (error) {
        
    }
}
// // Update User
// async function updateUser(id: number, name: string, email: string): Promise<any>{
//     const query = `update users set name = $1, email = $2 where id = $3`;
//     await pool.query(query,[name,email,id])
// }

// // Delete User
// async function deleteUser(id: number): Promise<any>{
//     const query = `delete from users where id = $1`;
//     await pool.query(query,[id]);
// }

export { filterOutOrders, getPassedStudents, getStudentNames, sortStudentsByGrades, findAverageAge, arrayExcercise, insertData };