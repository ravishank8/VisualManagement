var counter = 0;

async function getTodayDefectData() {
    const defectsData = await fetch("http://localhost:3000/assets/defectsToday.txt");
    const defectsJson = await defectsData.json();

    // Account Defects
    let defectsToIterate = defectsJson.account.defects;
    for (var i = 0; i < defectsToIterate.length; i++) {
        var {
            node,
            textnode
        } = populateDefectStatus(defectsToIterate, i);
        document.getElementById("accountDefectData").appendChild(node);
    }

    // Cart Defects
    defectsToIterate = defectsJson.cart.defects;
    for (var i = 0; i < defectsToIterate.length; i++) {
        var {
            node,
            textnode
        } = populateDefectStatus(defectsToIterate, i);
        document.getElementById("cartDefectData").appendChild(node);
    }

    // Home Defects
    defectToIterate = defectsJson.homepage.defects;
    for (var i = 0; i < defectToIterate.length; i++) {
        var {
            node,
            textnode
        } = populateDefectStatus(defectToIterate, i);
        document.getElementById("homeDefectData").appendChild(node);
    }

    // PLP Defects
    defectsToIterate = defectsJson.plp.defects;
    for (var i = 0; i < defectsToIterate.length; i++) {
        var {
            node,
            textnode
        } = populateDefectStatus(defectsToIterate, i);
        document.getElementById("plpDefectData").appendChild(node);
    }

    // Gymboree Defects
    defectsToIterate = defectsJson.gymboree.defects;
    for (var i = 0; i < defectsToIterate.length; i++) {
        var {
            node,
            textnode
        } = populateDefectStatus(defectsToIterate, i);
        document.getElementById("gymboreeDefectData").appendChild(node);
    }

    // Framework Defects
    defectsToIterate = defectsJson.framework.defects;
    for (var i = 0; i < defectsToIterate.length; i++) {
        var {
            node,
            textnode
        } = populateDefectStatus(defectsToIterate, i);
        document.getElementById("frameworkDefectData").appendChild(node);
    }
    console.log(defectsJson);
}

function populateDefectStatus(defectsToIterate, i) {
    var node = document.createElement("div");
    var textnode = document.createTextNode(defectsToIterate[i][counter]);
    var redString = "IN DEV, OPEN, BLOCKED";

    var yellowString="DEV COMPLETE";
    
    var greenString="READY FOR TESTING, IN TEST, CLOSED";

    if (redString.indexOf(defectsToIterate[i][3].toUpperCase()) !== -1){
        if (defectsToIterate[i][4]){
            node.classList.add("redRanked");  
        } else{
            node.classList.add("red");  
        }
    } else if(yellowString.indexOf(defectsToIterate[i][3].toUpperCase()) !== -1){
        if (defectsToIterate[i][4]){
            node.classList.add("yellowRanked");  
        } else{
            node.classList.add("yellow");  
        } 
    } else if (greenString.indexOf(defectsToIterate[i][3].toUpperCase()) !== -1){
        if (defectsToIterate[i][4]){
            node.classList.add("greenRanked");  
        } else{
            node.classList.add("green");  
        }  
    }
    node.appendChild(textnode);
    
    return {
        node,
        textnode
    };
}

getTodayDefectData();

//setInterval(getTodayDefectData, 3000);