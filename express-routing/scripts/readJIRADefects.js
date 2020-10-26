// This code sample uses the 'request' library:
// https://www.npmjs.com/package/request
const request = require('request-promise');
const syncRequest = require('sync-request');
const fs = require('fs');

var maxResults = 50;

var options = {
    method: 'GET',
    url: '<JIRA URL with search JQL>',
    headers: {
        'Authorization': 'Basic <access token>',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};


//console.log("Starting");

function getDefectsData() {

    var baseURL = '<JIRA URL with search JQL>';
    var fields = '<specific fields to be queried>';
    var resultsCount = '&maxResults='.concat(maxResults);

    options.url = baseURL.concat(fields).concat(resultsCount);

    var resultsDump = [];
    var promisesDump = [];
    var totalDefects;
    var paginations;

    var res = syncRequest('GET', options.url, {
        headers: {
            'Authorization': 'Basic <access token>',
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

    var defectsArray = []; //[["Account and Loyalty Total","","0"],["Cart and Checkout Total","","0"],["Framework Total","","0"],["Gymboree Backend Total","","0"],["Homepage and Global Components Total","","0"],["PLP , PDP and Outfit Total","","0"]];

    var defectsObject = {
        account: {
            count: 0,
            name: "Account and Loyalty"
        },
        cart: {
            count: 0,
            name: "Cart and Checkout"
        },
        framework: {
            count: 0,
            name: "Framework"
        },
        gymboree: {
            count: 0,
            name: "Gymboree"
        },
        homepage: {
            count: 0,
            name: "Homepage and Global Components"
        },
        plp: {
            count: 0,
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
                if ((resultsDump[counter].fields.customfield_12296.value).indexOf("Cart") !== -1) {
                    defectsObject.cart.count++;
                } else if ((resultsDump[counter].fields.customfield_12296.value).indexOf("Account") !== -1) {
                    defectsObject.account.count++;
                } else if ((resultsDump[counter].fields.customfield_12296.value).indexOf("Home") !== -1) {
                    defectsObject.homepage.count++;
                } else if ((resultsDump[counter].fields.customfield_12296.value).indexOf("PLP") !== -1) {
                    defectsObject.plp.count++;
                } else if ((resultsDump[counter].fields.customfield_12296.value).indexOf("Gymboree") !== -1) {
                    defectsObject.gymboree.count++;
                } else {
                    defectsObject.framework.count++;
                }
            }

            //Add object to Array
            defectsArray[0] = [defectsObject.account.name, "", defectsObject.account.count];
            defectsArray[1] = [defectsObject.cart.name, "", defectsObject.cart.count];
            defectsArray[2] = [defectsObject.homepage.name, "", defectsObject.homepage.count];
            defectsArray[3] = [defectsObject.plp.name, "", defectsObject.plp.count];
            defectsArray[4] = [defectsObject.gymboree.name, "", defectsObject.gymboree.count];
            defectsArray[5] = [defectsObject.framework.name, "", defectsObject.framework.count];

            //Write Array to file
            fs.writeFile(
                'public/assets/defects.txt',
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

module.exports.getDefectsData = getDefectsData;

getDefectsData();