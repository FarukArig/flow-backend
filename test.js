var DecisionTree = require("./constants/dt");

var relations = [
    { step0: "process", step1: "startEnd" },
    { step0: "startEnd", step1: "process" },
    { step0: "startEnd", step1: "process" },
];

var class_name = "step1";
var features = ["step0"];
var dt = new DecisionTree(class_name, features);
dt.train(relations);
var predicted_class = dt.predict({
    step0: "startEnd",
});
var treeJson = dt.toJSON();
console.log(class_name);
console.log(features);
console.log(relations);
console.log({
    step0: "startEnd",
});

console.log(treeJson.model);
console.log(predicted_class);
