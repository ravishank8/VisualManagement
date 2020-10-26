async function getUATData() {
    const openDefectsData = await fetch("assets/openDefects.txt");
    const fixedYesterdayDefectsData = await fetch("assets/fixedYesterdayDefects.txt");
    const raisedYesterdayDefectsData = await fetch("assets/raisedYesterdayDefects.txt");
    const reopenedYesterdayDefectsData = await fetch("assets/reopenedYesterdayDefects.txt");
    const todayTargetDefectsData = await fetch("assets/defectsTarget.txt");

    const openDefectsDataJson = await openDefectsData.json();
    const fixedYesterdayDefectsDataJson = await fixedYesterdayDefectsData.json();
    const raisedYesterdayDefectsDataJson = await raisedYesterdayDefectsData.json();
    const reopenedYesterdayDefectsDataJson = await reopenedYesterdayDefectsData.json();
    const todayTargetDefectsDataJson = await todayTargetDefectsData.json();

    console.log(openDefectsDataJson);
    console.log(fixedYesterdayDefectsDataJson);
    console.log(raisedYesterdayDefectsDataJson);
    console.log(reopenedYesterdayDefectsDataJson);
    console.log(todayTargetDefectsDataJson);

    openDefectsDataJson.forEach((element) => {
        if ((element[0].indexOf("Account")) !== -1) {
           document.getElementById("accountDefectData").getElementsByClassName("currentDefects")[0].getElementsByClassName("ownDefects")[0].innerHTML = element[1]; 
           //document.getElementById("accountDefectData").getElementsByClassName("currentDefects")[0].getElementsByClassName("thirdPartyDefects")[0].innerHTML = "..".concat(element[2]).concat(".."); 
        } else if ((element[0].indexOf("Cart")) !== -1) {
            document.getElementById("cartDefectData").getElementsByClassName("currentDefects")[0].getElementsByClassName("ownDefects")[0].innerHTML = element[1]; 
           // document.getElementById("cartDefectData").getElementsByClassName("currentDefects")[0].getElementsByClassName("thirdPartyDefects")[0].innerHTML = "..".concat(element[2]).concat(".."); 
        } else if ((element[0].indexOf("Home")) !== -1) {
            document.getElementById("homeDefectData").getElementsByClassName("currentDefects")[0].getElementsByClassName("ownDefects")[0].innerHTML = element[1]; 
           // document.getElementById("homeDefectData").getElementsByClassName("currentDefects")[0].getElementsByClassName("thirdPartyDefects")[0].innerHTML = "..".concat(element[2]).concat(".."); 
        } else if ((element[0].indexOf("PLP")) !== -1) {
            document.getElementById("plpDefectData").getElementsByClassName("currentDefects")[0].getElementsByClassName("ownDefects")[0].innerHTML = element[1]; 
           // document.getElementById("plpDefectData").getElementsByClassName("currentDefects")[0].getElementsByClassName("thirdPartyDefects")[0].innerHTML = "..".concat(element[2]).concat(".."); 
        } else if ((element[0].indexOf("Gymboree")) !== -1) {
            document.getElementById("gymboreeDefectData").getElementsByClassName("currentDefects")[0].getElementsByClassName("ownDefects")[0].innerHTML = element[1]; 
           // document.getElementById("gymboreeDefectData").getElementsByClassName("currentDefects")[0].getElementsByClassName("thirdPartyDefects")[0].innerHTML ="..".concat(element[2]).concat(".."); 
        } else if ((element[0].indexOf("Framework")) !== -1) {
            document.getElementById("nfrDefectData").getElementsByClassName("currentDefects")[0].getElementsByClassName("ownDefects")[0].innerHTML = element[1]; 
           // document.getElementById("nfrDefectData").getElementsByClassName("currentDefects")[0].getElementsByClassName("thirdPartyDefects")[0].innerHTML = "..".concat(element[2]).concat(".."); 
        }
    });

    let currentDate = new Date();

    todayTargetDefectsDataJson.forEach((element) => {
        if(new Date(element[0]).getDate() === currentDate.getDate()){
            document.getElementById("accountDefectData").getElementsByClassName("currentDefects")[0].getElementsByClassName("targetToday")[0].innerHTML = "..".concat(element[1]);  
            document.getElementById("cartDefectData").getElementsByClassName("currentDefects")[0].getElementsByClassName("targetToday")[0].innerHTML = "..".concat(element[2]);
            document.getElementById("homeDefectData").getElementsByClassName("currentDefects")[0].getElementsByClassName("targetToday")[0].innerHTML = "..".concat(element[3]);
            document.getElementById("plpDefectData").getElementsByClassName("currentDefects")[0].getElementsByClassName("targetToday")[0].innerHTML = "..".concat(element[4]);
            document.getElementById("gymboreeDefectData").getElementsByClassName("currentDefects")[0].getElementsByClassName("targetToday")[0].innerHTML ="..".concat(element[5]);  
            document.getElementById("nfrDefectData").getElementsByClassName("currentDefects")[0].getElementsByClassName("targetToday")[0].innerHTML = "..".concat(element[6]); 
        }
    });

    fixedYesterdayDefectsDataJson.forEach((element) => {
        if ((element[0].indexOf("Account")) !== -1) {
           document.getElementById("accountDefectData").getElementsByClassName("fixedYesterday")[0].innerHTML = element[1];
           console.log(element[1]); 
        } else if ((element[0].indexOf("Cart")) !== -1) {
            document.getElementById("cartDefectData").getElementsByClassName("fixedYesterday")[0].innerHTML = element[1];
        } else if ((element[0].indexOf("Home")) !== -1) {
            document.getElementById("homeDefectData").getElementsByClassName("fixedYesterday")[0].innerHTML = element[1];
        } else if ((element[0].indexOf("PLP")) !== -1) {
            document.getElementById("plpDefectData").getElementsByClassName("fixedYesterday")[0].innerHTML = element[1];
        } else if ((element[0].indexOf("Gymboree")) !== -1) {
            document.getElementById("gymboreeDefectData").getElementsByClassName("fixedYesterday")[0].innerHTML = element[1];
        } else if ((element[0].indexOf("Framework")) !== -1) {
            document.getElementById("nfrDefectData").getElementsByClassName("fixedYesterday")[0].innerHTML = element[1];
        }
    });

    raisedYesterdayDefectsDataJson.forEach((element) => {
        if ((element[0].indexOf("Account")) !== -1) {
           document.getElementById("accountDefectData").getElementsByClassName("raisedYesterday")[0].innerHTML = element[1];
           console.log(element[1]); 
        } else if ((element[0].indexOf("Cart")) !== -1) {
            document.getElementById("cartDefectData").getElementsByClassName("raisedYesterday")[0].innerHTML = element[1];
        } else if ((element[0].indexOf("Home")) !== -1) {
            document.getElementById("homeDefectData").getElementsByClassName("raisedYesterday")[0].innerHTML = element[1];
        } else if ((element[0].indexOf("PLP")) !== -1) {
            document.getElementById("plpDefectData").getElementsByClassName("raisedYesterday")[0].innerHTML = element[1];
        } else if ((element[0].indexOf("Gymboree")) !== -1) {
            document.getElementById("gymboreeDefectData").getElementsByClassName("raisedYesterday")[0].innerHTML = element[1];
        } else if ((element[0].indexOf("Framework")) !== -1) {
            document.getElementById("nfrDefectData").getElementsByClassName("raisedYesterday")[0].innerHTML = element[1];
        }
    });

    reopenedYesterdayDefectsDataJson.forEach((element) => {
        if ((element[0].indexOf("Account")) !== -1) {
           document.getElementById("accountDefectData").getElementsByClassName("reOpenYesterday")[0].innerHTML = element[1];
           console.log(element[1]); 
        } else if ((element[0].indexOf("Cart")) !== -1) {
            document.getElementById("cartDefectData").getElementsByClassName("reOpenYesterday")[0].innerHTML = element[1];
        } else if ((element[0].indexOf("Home")) !== -1) {
            document.getElementById("homeDefectData").getElementsByClassName("reOpenYesterday")[0].innerHTML = element[1];
        } else if ((element[0].indexOf("PLP")) !== -1) {
            document.getElementById("plpDefectData").getElementsByClassName("reOpenYesterday")[0].innerHTML = element[1];
        } else if ((element[0].indexOf("Gymboree")) !== -1) {
            document.getElementById("gymboreeDefectData").getElementsByClassName("reOpenYesterday")[0].innerHTML = element[1];
        } else if ((element[0].indexOf("Framework")) !== -1) {
            document.getElementById("nfrDefectData").getElementsByClassName("reOpenYesterday")[0].innerHTML = element[1];
        }
    });
}
getUATData();
