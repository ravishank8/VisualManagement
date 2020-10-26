const express = require('express');
const cron = require("node-cron");
const app = express();
const path = require('path');
const router = express.Router();
const fs = require('fs');

const readSheets = require('./scripts/readsheets.js');
const createGraphs = require('./scripts/createGraphs.js');
const readTodayDefects = require('./scripts/readTodayDefects.js');
const readDefectsDashData = require('./scripts/readDefectsDashData.js');

cron.schedule('*/5 * * * *', () => {
  // console.log('running every 30 minutes for stories');
  // createGraphs.createVelocityCharts();
  // readDefectsDashData.getDefectDumps();
});

cron.schedule('*/5 * * * *', () => {
  // console.log('running every 5 minutes for defects');
  // createGraphs.createVelocityCharts();
  // readTodayDefects.getDefectsTodayData();
  // readSheets.readInputFiles();
});

app.use(express.static('public'));

//var velocityData = {};
//velocityData.data = JSON.parse(fs.readFileSync("public/assets/data.txt").toString('utf-8'));

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/pages/velocityAndDefects.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/pages/about.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/defectDash',function(req,res){
  res.sendFile(path.join(__dirname+'/pages/defectsDash.html'));
});

router.get('/defectsTargetToday',function(req,res){
  res.sendFile(path.join(__dirname+'/pages/defectsTargetToday.html'));
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

//This is the place to do calculations and derive results

console.log('Running at Port 3000');