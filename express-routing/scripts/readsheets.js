const fs = require('fs');
const readline = require('readline');
const {
    google
} = require('googleapis');
const jsonfile = require('jsonfile');

let createGraphs = require('./createGraphs');
let readJIRADefects = require('./readJIRADefects');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

//velocity data file
const velocityFile = 'public/assets/data.txt';

//defects data file
const defectsFile = 'public/assets/defectsTarget.txt';

var velocityData = [];

// Load client secrets from a local file.
function readInputFiles() {
    fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Sheets API.
        console.log("About to read file");
        //authorize(JSON.parse(content), getVelocityData);
        authorize(JSON.parse(content), getDefectsData);
        // Commenting this code to get real-time data from JIRA for defects
        // authorize(JSON.parse(content), getDefectsData);

        // Commenting createGraphs: It is an expensive call
        // createGraphs.createVelocityCharts();

        // Get Real-time defects data from JIRA
        // readJIRADefects.getDefectsData();

        console.log("Read file");
    });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const {
        client_secret,
        client_id,
        redirect_uris
    } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error while trying to retrieve access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function getVelocityData(auth) {
    const sheets = google.sheets({
        version: 'v4',
        auth
    });
    sheets.spreadsheets.values.get({
        spreadsheetId: '<Your spreadsheet ID>',
        range: 'Pod Status!A1:I7',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const rows = res.data.values;
        if (rows.length) {
            jsonfile.writeFile(velocityFile, rows, function (err) {
                if (err) console.error(err);
            console.log("Writing velocity data into: " + velocityFile);
            });
        } else {
            console.log('No data found.');
        }
    });
}

function getDefectsData(auth) {
    const sheets = google.sheets({
        version: 'v4',
        auth
    });
    sheets.spreadsheets.values.get({
        spreadsheetId: '1iVZDTc5WFAJHGcPs6-eoLvBwuQQTWmwqPHxXByjsSlo',
        range: 'DefectsTarget!A1:G6',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const rows = res.data.values;
        if (rows.length) {
            jsonfile.writeFile(defectsFile, rows, function (err) {
                if (err) console.error(err);
                console.log("Writing defects data into: " + defectsFile);
            });
        } else {
            console.log('No data found.');
        }
    });
}

// exports the variables and functions above so that other modules can use them
module.exports.readInputFiles = readInputFiles;