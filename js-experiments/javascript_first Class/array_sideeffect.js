var fruits = ["apple", "orange"];
function addToArray(collection, value) {
	collection.push(value);
	return collection;
}
var newFruits = addToArray(fruits, "grape");
console.log(fruits, newFruits);


//objects are passed by reference