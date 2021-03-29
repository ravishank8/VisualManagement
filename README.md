# VisualManagement
It is a tool to create VisualManagement Dashboards

There are essentially three dashboards - 

-- Velocity and Defects chart
-- Defects Progress chart
-- UAT sign-off/go-live readiness board

The URLs for this screen can we seen as Express routes in app.js.

There are some things to configure to use this tool end to end - 

1- Google credentials need to be added in credentials.json and token.json. A placeholder file has been put for each

2- You will also need you JIRA creds and JQLs for corresponding scripts in  - readTodayDefects.js, readJIRADefects.js and readTodayDefects.js

3- You will need to have Plotly creds for createGraphs.js, which is used to create the velocity charts. You are independent to choose any other technology of your choice.

Currently the way the code essentially works is as follows - 

1- At Node startup there is an initial data set gets pulled from the data sources and relevant jsons and graphs are made. Once the app is running, it periodically pulls data and creates the necessary data files and graphs. If there are any errors in pulling data, the same gets logged, and the screens keep showing older data. 

2- The clients-side code feeds of the data created, and gets refreshed periodically too.

Will definitely want to see how we can use more push based architecture here, as opposed to pull based. Maybe in the next version, along with using the right reactive components' framework too.

//Further enhancements to be planned
