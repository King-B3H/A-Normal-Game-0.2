var player = {
    ["Currencies"]:{
        ["Hooman"]: 0,
        ["TotalHooman"]: 0,
        ["Potato"]: 0,
        ["Butter"]: 0,
        ["Fish Tacos"]: 0,
    },
    ["Stats"]:{
        keybinds:[],
    },
    ["Time"]:{
        seconds:0,
        minutes:0,
        hours:0,
        days:0,
    }
}
var saveTimeout = 0;
var fishTacoBonus = 2 ** player.Currencies["Fish Tacos"];
var gameTabs = { //List for the tabs in the game
    ["Home"]:{name: "Home", active:true, id:1, keybind: "1", focused: true},
    ["Upgrades"]:{name: "Upgrades", active:true, id:2, keybind: "2", focused: false},
    ["Butter"]:{name: "Butter", active:false, id:3, keybind: "3", focused: false},
    ["Settings"]:{name: "Settings", active:true, id:4, keybind: "4", focused: false},
    ["Endgame"]:{name: "Endgame", active:false, id:5, keybind: "5", focused: false},
}

let changingKeybinds = false;
let clickDebounce = false;

var butterMilestones = {
    ["1"]:{
        requirement:300,
        name: "slick",
        description:`giaosudpf, you actually got here? unlock next building and x2 hooman per milestone. `,
        acquired: false,
    },
    ["2"]:{
        requirement:3500,
        name: "gaussian distribution",
        description:`lay off the butter. unlock 2 more upgrades and passive generation is x3 as powerful`,
        acquired: false,
    },
    ["3"]:{
        requirement:15000,
        name: "margerine",
        description:`cholesterol high = fun. unlock next building, butter gain is based off total Hoomans now, additional 3x hooman, 2 new upgrades, `,
        acquired: false,
    },
    ["4"]:{
        requirement:2e6,
        name: "penguin",
        description:`cholesterol high = fun. unlock final building, what even is the point of this game anyways??? prepare for the home stretch, 5x hooman`,
        acquired: false,
    },
}

var buildings = {
    ["fish"]:{
        name:"Fish",
        description: `idc about designing this lmao`,
        effect:`fish give x2 hooman on purchase`,
        cost:10000,
        image:'goofy-ahh-fish.gif',
        obtained:false,
    },
    ["corn"]:{
        name: "Corn",
        description: `who even is this guy lmao`,
        effect:`corn give x5 hooman on purchase and x3 butter gain`,
        cost:1000000,
        image:'CornGuy.png',
        obtained: false,
    },
    ["lime"]:{
        name: "Lime",
        description: `TLUT moment no cap. acidic`,
        effect:`lime give x10 hooman on purchase and x5 butter gain`,
        cost:5e9,
        image:'Lime.jpeg',
        obtained: false,
    },
    ["salsa"]:{
        name: "Salsa",
        description: `spicy`,
        effect:`salsa give x10 hooman on purchase and x5 butter gain, final upgrade`,
        cost:5e12,
        image:'Salsa.png',
        obtained: false,
    }
}

for(building in buildings){
    let temp = `
    <div id="${building}Building" class="building" style="display:none;">
                        <img src="Images/Goofy Images/${buildings[building].image}" style="height:100px"/>
                        <br>
                        <h1>${buildings[building].name}</h1>                
                        <p>${buildings[building].description}</p>
                        <p>${buildings[building].effect}</p>
                        <h3>precio: ${format(buildings[building].cost)} Hooman</h3>       
                        <span id="${building}Display"></span> 
                    </div>
    `;
    document.getElementById("buildingContainer").innerHTML += temp;
}
document.getElementById(`fishBuilding`).addEventListener("click",function(){buyBuilding('fish')})
document.getElementById(`cornBuilding`).addEventListener("click",function(){buyBuilding('corn')})
document.getElementById(`limeBuilding`).addEventListener("click",function(){buyBuilding('lime')})
document.getElementById(`salsaBuilding`).addEventListener("click",function(){buyBuilding('salsa')})

function buyBuilding(building){
    if(player.Currencies.Hooman >= buildings[building].cost && !buildings[building].obtained){
        buildings[building].obtained = true;
        player.Currencies.Hooman -= buildings[building].cost;
        document.getElementById(`${building}Building`).style.backgroundColor = "green";
    }
}
function renderBuilding(){
    for(building in buildings){
        if(buildings[building].obtained){
            document.getElementById(`${building}Building`).style.backgroundColor = "green";
            document.getElementById(`${building}Building`).style.display = "flex";
        }
    }
}

function hasMilestone(id){
    if(butterMilestones[`${id}`].acquired){
        return true;
    }else{
        return false;
    }
}

function createMilestones(){
    for(i=1;i<=Object.keys(butterMilestones).length;i++){
        let div  = document.createElement("div");
        let container = document.getElementById("milestoneDisplay");
        let name = document.createElement("h1");
        name.innerHTML = butterMilestones[`${i}`].name;
        div.append(name);
        div.id = `milestone${i}`;

        let description = document.createElement("p");
        description.innerHTML = butterMilestones[`${i}`].description;
        div.append(description);

        div.classList.add("milestone");

        container.append(div);
        if(div.id == "penguinMilestone") return;
        let spacer = document.createElement("div");
        spacer.classList.add("milestoneSpacer");
        spacer.id = "milestoneSpacer" + i;
        container.append(spacer);
    }
}

function renderMilestones(){
    for(i=1;i<=Object.keys(butterMilestones).length;i++){
        if(player.Currencies.Butter >= butterMilestones[`${i}`].requirement) butterMilestones[`${i}`].acquired = true;
        if(butterMilestones[`${i}`].acquired) document.getElementById("milestone" + i).style.display = "block";
        if(!butterMilestones[`${i}`].acquired) document.getElementById("milestone" + i).style.display = "none";
    }
}

document.getElementById("wigglyBoi").addEventListener("click", function(){
    if(clickDebounce == true){
        return;
    }else{
        clickDebounce = true;
        player.Currencies.Hooman += getHoomanGain();
        player.Currencies.TotalHooman += getHoomanGain();
        updateText();
        setTimeout(resetDebounce, 125);
    }
})

function resetDebounce(){
    clickDebounce = false;
}

function updateText(){
    document.getElementById("playerDisplay").innerHTML = format(player.Currencies.Hooman) + " Hooman";
    document.getElementById("potatoDisplay").innerHTML = player.Currencies.Potato > 0 ? format(player.Currencies.Potato) + " Potato" : "";
    document.getElementById("fishDisplay").innerHTML = buildings["fish"].obtained ? `you have ze fish` : `no have ze fish`;
    document.getElementById("cornDisplay").innerHTML = buildings["corn"].obtained ? `you have ze corn` : `no have ze corn`;
    document.getElementById("butterDisplay").innerHTML = `You have churned ${format(player.Currencies.Butter)} butter.`
}

function getHoomanGain(type = null){
    let gain = 1 * getUpgradeEffect("main", 1) * getUpgradeEffect("main", 2) * getUpgradeEffect("main", 6) * fishTacoBonus;
    if(buildings["fish"].obtained){ gain *= 2}
    if(buildings["fish"].obtained && hasUpgrade("main", 8)){ gain *= 4}
    if(buildings["corn"].obtained){ gain *= 5}
    if(buildings["lime"].obtained){ gain *= 10}
    if(buildings["salsa"].obtained){ gain *= 20}
    let milestonesAcquired = 0;
    for(milestone in butterMilestones){
        if(butterMilestones[milestone].acquired) milestonesAcquired++;
    }
    if(type == "passive" && hasMilestone(2)){gain *= 3;}
    if(hasMilestone(4)){gain *= 5;}
    if(hasMilestone(3)){gain *= 3;}
    gain *= 2 ** milestonesAcquired;
    return gain;
}

//GameTabs
function createMessage(message, color){
    let x = document.getElementById("gameNotificationDisplay")
    x.innerHTML = message
    x.style.backgroundColor = color
    x.style.animation = "messageSlideIn 0.8s" 
    x.style.opacity = 1
    if (saveTimeout == 0) {
        saveTimeout = 1
        setTimeout(fadeText, 2000);
      }
}
function fadeText(){
    x = document.getElementById("gameNotificationDisplay")
    x.style.animation = "messageAlert 0.6s"
    x.style.opacity = 0
    saveTimeout = 0
}
function updateKeybinds(){//Update the player keybinds for tabs
    for(data in gameTabs){
        player.Stats.keybinds[Object.keys(gameTabs).indexOf(data)] = gameTabs[data].keybind;
    }
}
for(data in gameTabs){ //Loop through the tabs list and create a new button
    let nav = document.getElementById("navBarText");
    const display = document.createElement("h2");
    display.style = 'font-family: Impact, Haettenschweiler, "Franklin Gothic Bold", Charcoal, "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Black", "sans serif"';
    nav.append(display);

    display.id = gameTabs[data].name + "TabTrigger";
    const spacer = document.createElement("p");
    spacer.innerHTML = "_";
    spacer.style.fontSize = `8vw`;
    spacer.style.visibility = "hidden";
    spacer.id = "navBarContentSpacer" + gameTabs[data].id;
    //Made the following so that the text is evenly spaced
    if(Object.keys(gameTabs).indexOf(data) != Object.keys(gameTabs).length-1) nav.append(spacer);

    if(!gameTabs[data].active){
        display.style.display = "none";
        gameTabs[data].id = 0; //sets the id to 0 if the tab is hidden
        spacer.style.display = "none";
    }

    //Check if the previous id before is irregular
    
    display.innerHTML = `${gameTabs[data].name}`;
    
    display.addEventListener("click", function(){
        switchTabs(display.innerHTML);
    })
}

window.addEventListener("keydown", function(key){//Controls when keys are pressed and what they do
    if(player.Stats.keybinds.includes(key.key)){
        switchTabs(gameTabs[Object.keys(gameTabs)[player.Stats.keybinds.indexOf(key.key)]].name);
        return;
    }
    if(key.key == "s"){
        saveGame();
    }

    //Saves the current tab the user is on for arrow navigation
    let currentTab = "";
    for(data in gameTabs){
        if(gameTabs[data].focused){
            currentTab = gameTabs[data].name;
        }
    }

    if(key.code == "ArrowLeft"){ //Add direction change by keys
        for(i = Object.keys(gameTabs).indexOf(currentTab);i>=0;i--){
            if(evalTabChange(i)) return;
        }
        return;
    }
    if(key.code == "ArrowRight"){ //Add direction change by keys
        for(i = Object.keys(gameTabs).indexOf(currentTab)+1;i<Object.keys(gameTabs).length;i++){
            if(evalTabChange(i)) return;
        }
        return;
    }
})

function evalTabChange(i){
    if(!gameTabs[Object.keys(gameTabs)[i]].focused && gameTabs[Object.keys(gameTabs)[i]].active){
        switchTabs(gameTabs[Object.keys(gameTabs)[i]].name);
        return true;
    }
}
function switchTabs(tabName){ //It will switch the tab to the current tab when clicked
    if(!gameTabs[tabName].active || changingKeybinds) return; //Makes it so the user cannot be changing keybinds in the settings tab
    gameTabs[tabName].focused = true;
    for(data in gameTabs){ //Loop through the tabs
        //Checks every tab, if its not the desired one it is hidden
        let page = document.getElementById(gameTabs[data].name.toLowerCase() + "Tab");
        if(gameTabs[data].name != tabName){
            page.style.visibility = "hidden";
            gameTabs[data].focused = false;
        }else{
            page.style.visibility = "visible";
        }
    }
}
function timeTick() {
  player.Time.seconds += 1;

  if (player.Time.seconds >= 60) {
    player.Time.seconds -= 60;
    player.Time.minutes += 1;
  }
  if (player.Time.minutes >= 60) {
    player.Time.minutes -= 60;
    player.Time.hours += 1;
  }
  if (player.Time.hours >= 24) {
    player.Time.hours -= 24;
    player.Time.days += 1;
  }
    document.getElementById("secondDisplay").innerHTML = player.Time.seconds > 0 ? `${player.Time.seconds} Seconds` : "";
    document.getElementById("minuteDisplay").innerHTML = player.Time.minutes > 0 ? `${player.Time.minutes} Minutes` : "";
    document.getElementById("hourDisplay").innerHTML = player.Time.hours > 0 ? `${player.Time.hours} Hours` : "";
    document.getElementById("dayDisplay").innerHTML = player.Time.days > 0 ? `${player.Time.days} Days` : "";
}

function increaseButter(){
    if(!hasUpgrade("main", 5)){ return;}
    let base = 0;
    if(buildings["fish"].obtained) base++;
    if(buildings["corn"].obtained) base++;
    if(buildings["lime"].obtained) base++;
    if(buildings["salsa"].obtained) base++;
    let uniqueBase = Math.max(1, 2 ** (base));
    let hoomanMulti = Math.max(0, Math.floor(Math.log10(player.Currencies.Hooman)-4));
    if(hasMilestone(3)){
        hoomanMulti = Math.max(0, Math.floor(Math.log10(player.Currencies.TotalHooman)-4));
    }
    let cornMulti = buildings["corn"].obtained ? 3 : 1;
    let limeMulti = buildings["lime"].obtained ? 5 : 1;
    let salsaMulti = buildings["salsa"].obtained ? 5 : 1;
    let gain = uniqueBase * hoomanMulti * cornMulti * getUpgradeEffect("main", 7) * limeMulti * getUpgradeEffect("main", 9) * salsaMulti * fishTacoBonus; 
    player.Currencies.Butter += gain;
    document.getElementById("butterGain").innerHTML = `${gain} Butter/s`
}

function checkForStuff(){
    if(player.Currencies.TotalHooman > 100) upgrades["main"][2].appear();
    if(player.Currencies.TotalHooman > 1000) upgrades["main"][3].appear();
    if(player.Currencies.TotalHooman > 1000) upgrades["main"][4].appear();
    if(player.Currencies.TotalHooman > 1000) upgrades["main"][5].appear();
    if(hasMilestone(2)) upgrades["main"][6].appear();
    if(hasMilestone(2)) upgrades["main"][7].appear();
    if(hasMilestone(3)) upgrades["main"][8].appear();
    if(hasMilestone(3)) upgrades["main"][9].appear();
    if(buildings["salsa"].obtained) upgrades["main"][10].appear();
    if(hasMilestone(1)){
        document.getElementById("cornBuilding").style.display = "flex";
    }
    if(hasMilestone(3)){
        document.getElementById("limeBuilding").style.display = "flex";
    }
    if(hasMilestone(4)){
        document.getElementById("salsaBuilding").style.display = "flex";
    }
    if(hasUpgrade("main", 5)){
        gameTabs["Butter"].active = true;
        document.getElementById("navBarContentSpacer3").style.display = "";
        document.getElementById("ButterTabTrigger").style.display = "";
    }
    if(hasUpgrade("main", 10)){
        gameTabs["Endgame"].active = true;
        document.getElementById("EndgameTabTrigger").style.display = "";
        document.getElementById("endgameTab").innerHTML = `            <h1>Endgame</h1>
            <div id="press">
                <h1 style="height:50px;position:relative;top:5%;left:40%;text-align: center;transform: translate(-50%, -50%);"><img src="Images/Goofy Images/FishTaco.png" style="height:100%;width:auto;z-index: 3;"/>FISH TACOS??<img src="Images/Goofy Images/FishTaco.png" style="height:100%;width:auto;z-index: 3;"/></h1>
                <p>Wow, you made it here. Thanks for playing the game. You use all your resources to construct the fish taco, and you press your corn into quesadilla. You reached the end of the game, now it is time to restart it over. Each Fish Taco reset multiplies most currencies by 2x. You have ${player.Currencies["Fish Tacos"]} Fish Tacos</p>
                <button id="fishTacoButton" onclick="fishTaco()">Construct the Taco</button>
                <br>
                <br>
                <img src="Images/Goofy Images/FishTaco.png" style="height:50px;width:auto;z-index: 3;"/>
            </div>`
    }
    if(hasUpgrade("main", 4)){
        document.getElementById("fishBuilding").style.display = "flex";
    }
}

function fishTaco(){
    player.Currencies["Fish Tacos"]++;
    resetGame("taco");
}

function saveGame() {
    var game = {
        plr: player,
        bld: buildings,
        upgs: upgrades,
    }
    createMessage("Game Saved", "green");
    var gameSave = (JSON.stringify(game))
  
  localStorage.setItem("ang0.2AF", JSON.stringify(gameSave));
}
let upgradeDataFetched = false;
function loadGame() {
  if(localStorage.getItem("ang0.2AF") !== null){
    var data = JSON.parse(localStorage.getItem("ang0.2AF"));
    if(data == "just reset"){
        return;
    };
    if(data.ftr == true){
        alert("you did a fish taco");
        let ft = JSON.parse((data.ft));
        player.Currencies["Fish Tacos"] = ft;
        fishTacoBonus = 2 ** player.Currencies["Fish Tacos"];
        player.Time = data.time;
        saveGame();
        return;
    }
    try{
    player = JSON.parse(data).plr;
    upgrades = JSON.parse(data).upgs;
    // alert(JSON.stringify(JSON.parse(data).upgs))
    upgradeDataFetched = true;
    buildings = JSON.parse(data).bld;}catch(e){alert(e)}

    // alert((JSON.parse(data).plr.Currencies.Hooman))
    // player = data.player;
    // alert(typeof(data.game.player))
    createMessage("Game Loaded", "blue")
    renderBuilding();
  }else{
    alert("New")
  }

}

let amountOfUpgrades = 0;
let upgradeRow = 0;
function createUpgrades(){
    for(j=0;j<upgradeTabs.length;j++){ //Makes sure to check each tab and initialize the upgrades
        for(i=1;i<Object.keys(upgradeValues[upgradeTabs[j]]).length+1;i++){
            let name;
            let desc;
            let currency;
            let amount;
            let cost;
            let base;
            let scaling;
            let scaleType;
            let tabRef = upgradeTabs[j]
            let id = i;
            let currType;
            if(upgradeDataFetched){
                name = upgrades[tabRef][`${id}`].name;
                desc = upgrades[tabRef][`${id}`].desc;
                cost = upgrades[tabRef][`${id}`].cost;
                currency = upgrades[tabRef][`${id}`].currency;
                amount = upgrades[tabRef][`${id}`].amount;
                cap = upgrades[tabRef][`${id}`].cap;
                base = upgrades[tabRef][`${id}`].base;
                scaling = upgrades[tabRef][`${id}`].scaling;
                scaleType = upgrades[tabRef][`${id}`].scaleType;
                    // upgrades["main"]["1"].createUpgrade(0);
                // for(i=1;i<=Object.keys(upgrades["main"]).length;i++){
                //     upgrades["main"][1].createUpgrade(0);
                // }
            }else{
                name = upgradeValues[tabRef][`${id}`].name;
                desc = upgradeValues[tabRef][`${id}`].desc;
                cost = upgradeValues[tabRef][`${id}`].cost;
                currency = upgradeValues[tabRef][`${id}`].currency;
                amount = upgradeValues[tabRef][`${id}`].amount;
                cap = upgradeValues[tabRef][`${id}`].cap;
                base = upgradeValues[tabRef][`${id}`].base;
                scaling = upgradeValues[tabRef][`${id}`].scaling;
                scaleType = upgradeValues[tabRef][`${id}`].scaleType;
            }

            //Just create the values for each upgrade referenced from upgradeValues
            if(upgradeValues[tabRef][`${id}`].currType == undefined){
                currType = "Currencies";
            }else{
                currType = upgradeValues[tabRef][`${id}`].currType;
            }
            upgrades[tabRef][id] = new Upgrade(name, desc, cost, currency, amount, cap, id, base, currType, scaling, scaleType);
            amountOfUpgrades++;
            if(amountOfUpgrades%6 == 0){
                let newRow = document.createElement("tr");
                upgradeRow++;
                newRow.classList.add("upgradeTableRow");
                newRow.id = "upgradeRow" + upgradeRow;
                document.getElementById("upgradesTable").append(newRow);
            }
            
            upgrades[tabRef][id].createUpgrade(upgradeRow);
            //Add functionality for when the button is clicked
            document.getElementById("Upgrade" + id).addEventListener("click", function(){
                upgrades[tabRef][id].buyUpgrade();
            })
        }   
    }
}
function resetGame(type) {
  if (confirm("Are you positive you wish to reset?")) {
    possibleReset = true
    let gameSave = "just reset";
    if(type == "taco"){gameSave = {time: player.Time, ft: player.Currencies["Fish Tacos"], ftr:true}}
    localStorage.setItem("ang0.2AF", JSON.stringify(gameSave))
    return location.reload();
  }
}
setInterval(() => {
    if(getUpgradeEffect("main", 3)){
        player.Currencies.Hooman += getHoomanGain('passive');
        player.Currencies.TotalHooman += getHoomanGain('passive');
    }
    timeTick();
    updateText();
    increaseButter();
    renderMilestones();
    checkForStuff();
}, 1000);


updateKeybinds();
createMilestones();
createKeybinds();
updateText();

window.onload = function(){
    loadGame();
    createUpgrades();
    upgrades["main"][1].appear();
    renderBuilding();
}
