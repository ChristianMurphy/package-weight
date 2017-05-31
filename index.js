#!/usr/bin/env node

'use strict'

const path = require('path')
const axios = require('axios')
const fileSize = require('filesize')

const packageJson = require(path.resolve('package.json'))
const packageList = Object.keys(packageJson.dependencies)

console.log(packageList)

const promiseArray = packageList.map(dependency => axios.get('https://cost-of-modules.herokuapp.com/package?name=' + dependency))

Promise.all(promiseArray)
  .then((results) => {
    const totalSize = results
      .map(r => r.data.size)
      .reduce((a, b) => a + b)

    console.log('Your total size of all your packages minified is: ' + fileSize(totalSize))
  })
  .catch(console.error)
