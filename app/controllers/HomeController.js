const Chart = require("../models/Chart");
const ChartElement = require("../models/ChartElement");
const ElementRelation = require("../models/ElementRelation");
const { ReE, ReS, to } = require("../../constants/utils");
var DecisionTree = require("../../constants/dt");

exports.homePage = (req, res) => {
    res.send("Welcome");
};

exports.add = async (req, res) => {
    let chart = new Chart({
        title: req.body.title,
        stepList: req.body.stepList,
    });
    [err, chart] = await to(chart.save());
    if (err) return ReE(res, err, 400);

    var idMatches = {};
    for (let index = 0; index < req.body.elements.length; index++) {
        const element = req.body.elements[index];

        let chartElement = new ChartElement({
            text: element.text,
            type: element.type,
            chartId: chart.id,
        });

        [err, chartElement] = await to(chartElement.save());
        if (err) return ReE(res, err, 400);

        idMatches[element.id] = await chartElement;
    }

    for (let index = 0; index < req.body.lines.length; index++) {
        const element = req.body.lines[index];
        let relation = new ElementRelation({
            inputElementId: idMatches[element.input.elementId].id,
            outputElementId: idMatches[element.output.elementId].id,
            inputElementType: idMatches[element.input.elementId].type,
            outputElementType: idMatches[element.output.elementId].type,
        });

        [err, relation] = await to(relation.save());
        if (err) return ReE(res, err, 400);
    }
    res.send(idMatches);
};

exports.GetRecommend = async (req, res) => {
    let [_err, charts] = await to(Chart.findAll());
    if (_err) return ReE(res, err, 404);

    var predictData = {};
    for (let index = 0; index < req.body.stepList.length; index++) {
        predictData["step" + index] = req.body.stepList[index];
    }

    var class_name = "step" + req.body.stepList.length.toString();
    var features = [];

    var iterator = req.body.stepList.keys();

    // printing index array using the iterator
    for (let key of iterator) {
        features.push("step" + key.toString());
    }

    var dt = new DecisionTree(class_name, features);
    var trainData = charts.map((x) => {
        var result = {};
        for (let index = 0; index < x.stepList.length; index++) {
            result["step" + index] = x.stepList[index];
        }
        return result;
    });

    trainData = trainData.filter((x) => x[class_name] !== undefined);
    console.log(" ");
    console.log("Class name: " + class_name);
    console.log("Features: " + features);
    console.log("Train Data: " + JSON.stringify(trainData, null, 4));
    console.log("Predict Data: " + JSON.stringify(predictData, null, 4));
    console.log(" ");

    dt.train(trainData);
    var predicted_class = dt.predict(predictData);
    var treeJson = dt.toJSON();
    console.log(treeJson.model);
    console.log(predicted_class);

    res.send(predicted_class);
};
