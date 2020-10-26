// This code sample uses the 'request' library:
// https://www.npmjs.com/package/request
const request = require('request-promise');
const syncRequest = require('sync-request');
const fs = require('fs');

var maxResults = 50;

var options = {
    method: 'GET',
    url: '<JIRA JQL URL with maxResults',

    headers: {
        'Authorization': 'Basic <Access Token>',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

function determineRanking(defectResult){
    var rank_1_text = "RANK_1";
    var rank_2_text = "RANK_2";
    var upperCaseLabels = defectResult.fields.labels.map(entry => entry.toUpperCase());

    if((upperCaseLabels.indexOf(rank_1_text) !== -1) ||
    (upperCaseLabels.indexOf(rank_2_text) !== -1)){
        return true;
    }
    return false;
}

function getDefectsTodayData() {

    var baseURL = '<JIRA JQL URL>';
    var fields = '<fields to be queried>';
    var resultsCount = '&maxResults='.concat(maxResults);

    options.url = baseURL.concat(fields).concat(resultsCount);

    var resultsDump = [];
    var promisesDump = [];
    var totalDefects;
    var paginations;

    var res = syncRequest('GET', options.url, {
        headers: {
            'Authorization': 'Basic <Access Token>',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    var data = JSON.parse(res.getBody('utf8'));
    maxResults = data.maxResults;
    totalDefects = data.total;
    console.log(totalDefects);
    paginations = Math.ceil(totalDefects / maxResults);


    for (var i = 0; i < paginations; i++) {
        var startIndex = 1 + (i * maxResults);
        var url = baseURL.concat(fields).concat("&startAt=").concat(startIndex).concat(resultsCount);
        //  console.log(url);
        options.url = url;
        promisesDump.push(request(options));
    }

    //console.log("Second");

    var defectsArray = [];

    var defectsObject = {
        account: {
            count: 0,
            defects: []
        },
        cart: {
            count: 0,
            defects: []
        },
        framework: {
            count: 0,
            defects: []
        },
        gymboree: {
            count: 0,
            defects: []
        },
        homepage: {
            count: 0,
            defects: []
        },
        plp: {
            count: 0,
            defects: []
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
                try {
                    // console.log(result);
                    var isRanked = determineRanking(resultsDump[counter]);
                    if ((resultsDump[counter].fields.customfield_12296.value).indexOf("Cart") !== -1) {
                        defectsObject.cart.count++;
                        defectsObject.cart.defects.push([resultsDump[counter].key, resultsDump[counter].fields.priority.name, resultsDump[counter].fields.assignee.displayName, resultsDump[counter].fields.status.name, isRanked]);
                    } else if ((resultsDump[counter].fields.customfield_12296.value).indexOf("Account") !== -1) {
                        defectsObject.account.count++;
                        defectsObject.account.defects.push([resultsDump[counter].key, resultsDump[counter].fields.priority.name, resultsDump[counter].fields.assignee.displayName, resultsDump[counter].fields.status.name, isRanked]);
                    } else if ((resultsDump[counter].fields.customfield_12296.value).indexOf("Home") !== -1) {
                        defectsObject.homepage.count++;
                        defectsObject.homepage.defects.push([resultsDump[counter].key, resultsDump[counter].fields.priority.name, resultsDump[counter].fields.assignee.displayName, resultsDump[counter].fields.status.name, isRanked]);
                    } else if ((resultsDump[counter].fields.customfield_12296.value).indexOf("PLP") !== -1) {
                        defectsObject.plp.count++;
                        defectsObject.plp.defects.push([resultsDump[counter].key, resultsDump[counter].fields.priority.name, resultsDump[counter].fields.assignee.displayName, resultsDump[counter].fields.status.name, isRanked]);
                    } else if ((resultsDump[counter].fields.customfield_12296.value).indexOf("Gymboree") !== -1) {
                        defectsObject.gymboree.count++;
                        defectsObject.gymboree.defects.push([resultsDump[counter].key, resultsDump[counter].fields.priority.name, resultsDump[counter].fields.assignee.displayName, resultsDump[counter].fields.status.name, isRanked]);
                    } else {
                        defectsObject.framework.count++;
                        defectsObject.framework.defects.push([resultsDump[counter].key, resultsDump[counter].fields.priority.name, resultsDump[counter].fields.assignee.displayName, resultsDump[counter].fields.status.name, isRanked]);
                    }
                } catch (err) {
                    console.log("There is issue with JIRA data:" + err);
                    continue;
                }
            }

            //Write Array to file
            fs.writeFile(
                'public/assets/defectsToday.txt',
                JSON.stringify(defectsObject),
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

module.exports.getDefectsTodayData = getDefectsTodayData;

getDefectsTodayData();