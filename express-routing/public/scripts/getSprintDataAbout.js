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
    populateStatus(velocityJson, defectsJson,'Account','accountDefectStatus','accountStoryStatus');
    populateStatus(velocityJson, defectsJson,'Cart','cartDefectStatus','cartStoryStatus');
    populateStatus(velocityJson, defectsJson,'Homepage','homeDefectStatus','homeStoryStatus');
    populateStatus(velocityJson, defectsJson,'PLP','plpDefectStatus','plpStoryStatus');
    populateStatus(velocityJson, defectsJson,'Gymboree','gymboreeDefectStatus','gymboreeStoryStatus');
    populateStatus(velocityJson, defectsJson,'Framework','frameworkDefectStatus','frameworkStoryStatus');
}

var accountIdentifier = "Account"

function populateStatus(velocityJson, defectsJson,podIdentifier,defectStatusDomIdentifier, storyStatusDomIdentifier){
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
        document.getElementById(storyStatusDomIdentifier).classList.add("green");    
    } else if(((velocityStatusElement[3]/velocityStatusElement[2]) > 0.75) &&
            ((velocityStatusElement[3]/velocityStatusElement[2]) < 0.85)){
        document.getElementById(storyStatusDomIdentifier).classList.add("yellow");          
    } else{
        document.getElementById(storyStatusDomIdentifier).classList.add("red");   
    }

    // Get Defects Status
    if(defectsStatusElement[2] < 50){
        document.getElementById(defectStatusDomIdentifier).classList.add("green");    
    } else if((defectsStatusElement[2] > 50) &&
             (defectsStatusElement[2] < 65)){
        document.getElementById(defectStatusDomIdentifier).classList.add("yellow");          
    } else{
        document.getElementById(defectStatusDomIdentifier).classList.add("red");    
    }
}

getSprintData();