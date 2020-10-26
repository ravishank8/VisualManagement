async function getSprintData() {
    const defectsData = await fetch("http://localhost:3000/assets/defects.txt");
    const velocityData = await fetch("http://localhost:3000/assets/data.txt");
    const defectsJson = await defectsData.json();
    const velocityJson = await velocityData.json();
    console.log(defectsJson);
    console.log(velocityJson);

    defectsJson.forEach((element) => {

        if ((element[0].indexOf("Account")) !== -1) {
            document.getElementById("accountDefectData").innerHTML = element[2];
        } else if ((element[0].indexOf("Cart")) !== -1) {
            document.getElementById("cartDefectData").innerHTML = element[2];
        } else if ((element[0].indexOf("Home")) !== -1) {
            document.getElementById("homeDefectData").innerHTML = element[2];
        } else if ((element[0].indexOf("PLP")) !== -1) {
            document.getElementById("plpDefectData").innerHTML = element[2];
        } else if ((element[0].indexOf("Gymboree")) !== -1) {
            document.getElementById("gymboreeDefectData").innerHTML = element[2];
        } else if ((element[0].indexOf("Framework")) !== -1) {
            document.getElementById("frameworkDefectData").innerHTML = element[2];
        }
    });

    populateAccountStatus(velocityJson,defectsJson);
}

function populateAccountStatus(velocityJson, defectsJson){
    populateStatus(velocityJson, defectsJson,'Account','accountStatus');
    populateStatus(velocityJson, defectsJson,'Cart','cartStatus');
    populateStatus(velocityJson, defectsJson,'Homepage','homeStatus');
    populateStatus(velocityJson, defectsJson,'PLP','plpStatus');
    populateStatus(velocityJson, defectsJson,'Gymboree','gymboreeStatus');
    populateStatus(velocityJson, defectsJson,'Framework','frameworkStatus');
}

var accountIdentifier = "Account"

function populateStatus(velocityJson, defectsJson,podIdentifier,domIdentifier){
    var velocityStatusElement = null;
    var defectsStatusElement = null;
    velocityStatusElement = velocityJson.find((element, index, array)=>{
        return element[0].indexOf(podIdentifier) !== -1;
        
    });
    defectsStatusElement = defectsJson.find((element, index, array)=>{
        return element[0].indexOf(podIdentifier) !== -1;
        
    });
   
    var statusString = "Status: ";
       
    // Get Velocity Status
    if(((velocityStatusElement[3]/velocityStatusElement[2]) > 0.85)){
        statusString = statusString.concat("green");
    } else if(((velocityStatusElement[3]/velocityStatusElement[2]) > 0.75) &&
            ((velocityStatusElement[3]/velocityStatusElement[2]) < 0.85)){
        statusString = statusString.concat("yellow");        
    } else{
        statusString = statusString.concat("red");
    }

    // Get Defects Status
    if(defectsStatusElement[2] < 50){
        statusString = statusString.concat("green");
    } else if((defectsStatusElement[2] > 50) &&
             (defectsStatusElement[2] < 65)){
        statusString = statusString.concat("yellow");        
    } else{
        statusString = statusString.concat("red");
    }

    // Populate the status now
    if(statusString.indexOf("red") !== -1){
        document.getElementById(domIdentifier).classList.add("red");    
    } else if(statusString.indexOf("yellow") !== -1){
        document.getElementById(domIdentifier).classList.add("yellow");    
    } else{
        document.getElementById(domIdentifier).classList.add("green"); 
    }
    console.log("VelocityStatus: " + velocityStatusElement);
    console.log("DefectsStatus:" + defectsStatusElement);
    console.log("status: " + statusString);
}

getSprintData();