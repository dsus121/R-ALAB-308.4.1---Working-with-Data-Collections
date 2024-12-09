// R-ALAB 308.4.1: Data Collection Lab
//
// Part 1: Refactoring Old Code --> looked at Feeling Loopy
//
// Part 2: Expanding Functionality
// Declare a variable that stores the number of columns in 
// each row of data within the CSV.
//
// Instead of hard-coding four columns per row, expand your 
// code to accept any number of columns. This should be calculated 
// dynamically based on the first row of data.
//
// columnNum SHOULD = 4

// assign the string to constant named "csv"
const csv = "ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor\'s Assistant,26";

strToArray = csv.split("\n"); // converting the long string into an array w strings inside
// each element corresponds to a row
console.log(strToArray); // check? yes, it's an array now
console.log(strToArray[3]) // check? yes, index number corresponds to correct data


let veryFinePeople = []; // assign a new array "veryFinePeople"
for (i = 0; i < strToArray.length; i++) { // iterate through each row to split into columns
  let row = strToArray[i].split(","); // splitting string data by the comma
  veryFinePeople.push(row); // populates the new array
  console.log(row)  // prints the individual columns of each row as an array
}
console.log(veryFinePeople);  // prints as an array of arrays
const columnNum = veryFinePeople[0].length; // index 0 is the header, .length gives us the number of elements
console.log(columnNum); // we finally have the column count, and it's 4

// but if we use map(), we can compress this code dramatically // added another row to check
const csv2 = "ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor's Assistant,26\n300,Bilbo,Ringbearer,111";

// splits the CSV into rows, then maps over each row to split into columns
let morePeople = csv2.split("\n").map(row => row.split(","));
console.log(morePeople);  // prints the entire array of arrays
console.log(morePeople[5]);  // prints the newly added row 

// Store your results in a two-dimensional array. <-- veryFinePeople OR morePeople
// Each row should be its own array, with individual entries for each column. 
// Each row should be stored in a parent array, with the heading row located at index 0.
// Cache this two-dimensional array in a variable for later use.

// Part 3: Transforming Data
//
// For each row of data in the result array produced by your code above, create an object 
// where the key of each value is the heading for that value’s column.
// Convert these keys to all lowercase letters for consistency.

// obj = {propert: value,  // look at the header, which is index 0 or the first array, for the key
//         ID:             // the value will be the associated index in each of the following arrays
//         Name:
//         Occupation:
//         Age:
// }

const arrHeader = veryFinePeople[0]; // isolate header info, save into new variable
console.log(arrHeader);

const arrPeople = veryFinePeople.slice(1); // trim off the header, save into new variable
console.log(arrPeople);

const renameKeys = { // looked up how to rename the keys
  0: "id",
  1: "name",
  2: "occupation",
  3: "age",
};
// Renaming all keys
arrSorted = arrPeople.map(obj =>
  Object.entries(obj).reduce((newObj, [key, value]) => {
    newObj[renameKeys[key] || key] = value; // rename if found,
    return newObj;                          // otherwise keep the same
  }, {})
);

console.log(arrSorted);

const objSorted = arrSorted.reduce((acc, item, index) => { // reduce is like a loop
  acc[index] = item; // acc is the accumulator (stores the key-value pairs)
  return acc; // item is the current element in arrSorted that's being processed
}, {}); // converted array into object

console.log(objSorted); // check output ... yep

// objBetterPeople.keytest = "test_value";
// console.log(objBetterPeople); // check output ... yep

// Part 4: Sorting and Manipulating Data
// 1- Remove the last element from the sorted array.
// 2- Insert the following object at index 1:
// { id: "48", name: "Barry", occupation: "Runner", age: "25" }
// 3- Add the following object to the end of the array:
// { id: "7", name: "Bilbo", occupation: "None", age: "111" }

arrSorted.pop(); // removes the last element
console.log(arrSorted); // check ... yep

arrSorted.splice(1, 0, {id: "48", name: "Barry", occupation: "Runner", age: "25" });
console.log(arrSorted); 

arrSorted.push({ id: "7", name: "Bilbo", occupation: "None", age: "111" });
console.log(arrSorted); 

// Part 5: Full Circle
// As a final task, transform the final set of data back into CSV format.
// --------- need to pull out just the header arrary first
let csvNew = ""; // initialize the new string as empty
const strHeaderNew = Object.keys(objSorted[0]).join(",") + "\n"; // 
console.log(strHeaderNew) // check if it works ... yep

let strPeopleNew = ""; // initialize the new string as empty
for (value of arrSorted) {
  strPeopleNew += Object.values(value).join(",") + "\n"
}
csvNew = strHeaderNew + strPeopleNew;
console.log(csvNew)
