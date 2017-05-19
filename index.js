#!/usr/bin/env node
const path = require('path');
const axios = require('axios');

let packageJson = path.resolve("package.json");

packageJson = path.normalize(packageJson);
packageJson = require(packageJson);
packageList = [];
console.log("Gathering packages...")
for (package in packageJson.dependencies) {
  packageList.push(package);
}
console.log(packageList);
let promiseArray = packageList.map(package => axios.get("https://cost-of-modules.herokuapp.com/package?name="+package))
axios.all(promiseArray)
  .then((results) => {
    let temp = results.map(r => r.data.size);
    var output = temp.reduce((a,b) => {
      return a + b;
    });
    output = output/1000
    console.log("Your total size of all your packages is: "+output+"kb!");
  })
  .catch(err => console.log(err))
