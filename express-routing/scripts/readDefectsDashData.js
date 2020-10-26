// This code sample uses the 'request' library:
// https://www.npmjs.com/package/request
const request = require('request-promise');
const syncRequest = require('sync-request');
const fs = require('fs');
const readsheets = require('./readsheets');

const maxResults = 50;

let openDefectsOptions = {
    method: 'GET',
    baseUrl: '<your JIRA search URL along with search query>',
    fields: '<fields to be accessed from JIRA>',
    maxResults: '&maxResults='.concat(maxResults),
    headers: {
        'Authorization': 'Basic <access token>',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

let raisedTodayDefectsOptions = {
    method: 'GET',
    baseUrl: '<your JIRA search URL along with search query>',
	    fields: '<fields to be accessed from JIRA>',
	    maxResults: '&maxResults='.concat(maxResults),
	    headers: {
	        'Authorization': 'Basic <access token>',
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
    }
}

let fixedTodayDefectsOptions = {
    method: 'GET',
    baseUrl: '<your JIRA search URL along with search query>',
	    fields: '<fields to be accessed from JIRA>',
	    maxResults: '&maxResults='.concat(maxResults),
	    headers: {
	        'Authorization': 'Basic <access token>',
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
    }
}

let reopenTodayDefectsOptions = {
    method: 'GET',
    baseUrl: '<your JIRA search URL along with search query>',
	    fields: '<fields to be accessed from JIRA>',
	    maxResults: '&maxResults='.concat(maxResults),
	    headers: {
	        'Authorization': 'Basic <access token>',
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
    }
}

function getDefectsData(options, filePath) {

    let url = (options.baseUrl).concat(options.fields).concat(options.maxResults);

    let resultsDump = [];
    let promisesDump = [];
    let totalDefects;
    let paginations;

    let res = syncRequest('GET', url, {
        headers: options.headers
    });

    var data = JSON.parse(res.getBody('utf8'));
    //maxResults = data.maxResults;
    totalDefects = data.total;
    console.log(totalDefects);
    paginations = Math.ceil(totalDefects / maxResults);


    for (let i = 0; i < paginations; i++) {
        let startIndex = 1 + (i * maxResults);
        tempUrl = (options.baseUrl).concat(options.fields).concat("&startAt=").concat(startIndex).concat(options.maxResults);
        promisesDump.push(request({ method: 'GET', url: tempUrl, headers: options.headers }));
    }

    //console.log("Second");

    let defectsArray = []; //[["Account and Loyalty Total","","0"],["Cart and Checkout Total","","0"],["Framework Total","","0"],["Gymboree Backend Total","","0"],["Homepage and Global Components Total","","0"],["PLP , PDP and Outfit Total","","0"]];

    let defectsObject = {
        account: {
            count: 0,
            tpCount: 0,
            name: "Account and Loyalty"
        },
        cart: {
            count: 0,
            tpCount: 0,
            name: "Cart and Checkout"
        },
        framework: {
            count: 0,
            tpCount: 0,
            name: "Framework"
        },
        gymboree: {
            count: 0,
            tpCount: 0,
            name: "Gymboree"
        },
        homepage: {
            count: 0,
            tpCount: 0,
            name: "Homepage and Global Components"
        },
        plp: {
            count: 0,
            tpCount: 0,
            name: "PLP,PDP and Outfit"
        }
    }

    Promise.all(promisesDump).then(values => {
        console.log("all the promises were resolved!");
        for (let val of values) {
            let issues = JSON.parse(val).issues;
            // console.log(issues);
            for (let count = 0; count < issues.length; count++) {
                //console.log("issue is" + issue);
                resultsDump.push(issues[count]);

            }
            console.log(resultsDump.length);
        }
        // Handle the data processing
        for (let counter = 0; counter < resultsDump.length; counter++) {
            // console.log(result);
            try {
                if ((resultsDump[counter].fields.customfield_12296.value).indexOf("Cart") !== -1) {
                    defectsObject.cart.count++;
                    if (((resultsDump[counter].fields.customfield_12306.value).indexOf("Third Party") !== -1)||
                        ((resultsDump[counter].fields.customfield_12306.value).indexOf("Content") !== -1)) {
                        defectsObject.cart.tpCount++;
                        defectsObject.cart.count--;

                    }
                } else if ((resultsDump[counter].fields.customfield_12296.value).indexOf("Account") !== -1) {
                    defectsObject.account.count++;
                    if  (((resultsDump[counter].fields.customfield_12306.value).indexOf("Third Party") !== -1)||
                         ((resultsDump[counter].fields.customfield_12306.value).indexOf("Content") !== -1)) {
                        defectsObject.account.tpCount++;
                        defectsObject.account.count--;
                    }
                } else if ((resultsDump[counter].fields.customfield_12296.value).indexOf("Home") !== -1) {
                    defectsObject.homepage.count++;
                    if (((resultsDump[counter].fields.customfield_12306.value).indexOf("Third Party") !== -1)||
                        ((resultsDump[counter].fields.customfield_12306.value).indexOf("Content") !== -1)) {
                        defectsObject.homepage.tpCount++;
                        defectsObject.homepage.count--;
                    }
                } else if ((resultsDump[counter].fields.customfield_12296.value).indexOf("PLP") !== -1) {
                    defectsObject.plp.count++;
                    if (((resultsDump[counter].fields.customfield_12306.value).indexOf("Third Party") !== -1)||
                    ((resultsDump[counter].fields.customfield_12306.value).indexOf("Content") !== -1)) {
                        defectsObject.plp.tpCount++;
                        defectsObject.plp.count--;
                    }
                } else if ((resultsDump[counter].fields.customfield_12296.value).indexOf("Gymboree") !== -1) {
                    defectsObject.gymboree.count++;
                    if (((resultsDump[counter].fields.customfield_12306.value).indexOf("Third Party") !== -1)||
                    ((resultsDump[counter].fields.customfield_12306.value).indexOf("Content") !== -1)) {
                        defectsObject.gymboree.tpCount++;
                        defectsObject.gymboree.count--;
                    }
                } else {
                    defectsObject.framework.count++;
                    if (((resultsDump[counter].fields.customfield_12306.value).indexOf("Third Party") !== -1)||
                    ((resultsDump[counter].fields.customfield_12306.value).indexOf("Content") !== -1)) {
                        defectsObject.framework.tpCount++;
                        defectsObject.framework.count--;
                    }
                }
            } catch (err) {
                console.log(err);
                continue;
            }
        }

        //Add object to Array
        defectsArray[0] = [defectsObject.account.name, defectsObject.account.count, defectsObject.account.tpCount];
        defectsArray[1] = [defectsObject.cart.name, defectsObject.cart.count, defectsObject.cart.tpCount];
        defectsArray[2] = [defectsObject.homepage.name, defectsObject.homepage.count, defectsObject.homepage.tpCount];
        defectsArray[3] = [defectsObject.plp.name, defectsObject.plp.count, defectsObject.plp.tpCount];
        defectsArray[4] = [defectsObject.gymboree.name, defectsObject.gymboree.count, defectsObject.gymboree.tpCount];
        defectsArray[5] = [defectsObject.framework.name, defectsObject.framework.count, defectsObject.framework.tpCount];

        //Write Array to file
        fs.writeFile(
            filePath,
            JSON.stringify(defectsArray),
            function (err) {
                if (err) {
                    console.error('Crap happens');
                }
            }
        );
    })
        .catch(e => {
            console.log("error: ", e);
        });
}

function getDefectDumps() {
    readsheets.readInputFiles();
    getDefectsData(openDefectsOptions, "public/assets/openDefects.txt");
    getDefectsData(raisedTodayDefectsOptions, "public/assets/raisedYesterdayDefects.txt");
    getDefectsData(fixedTodayDefectsOptions, "public/assets/fixedYesterdayDefects.txt");
    getDefectsData(reopenTodayDefectsOptions, "public/assets/reopenedYesterdayDefects.txt");
}

module.exports.getDefectsData = getDefectsData;
module.exports.getDefectDumps = getDefectDumps;

getDefectDumps();