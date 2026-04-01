const settingsTab = document.getElementById("settingsTab");

const helpMenuTexts = {
    "Default" : "Welcome to A Normal Game! Click around the help menu to see some extra information about a certain section of the game!",
    "Start" : "Why hello there and welcome! A nWelcome to A Normal Game (everything's normal trust me)! In this game you generate Hoomans and eventually condense them into all different things (physics and math don't apply!) and increase population capacity which limits how many Hoomans you can have at once. Start by exploring all the tabs and reading the rest of the helps that are available. More will appear as you go. I'll leave you with a goal, go for upgrade 2 for your next few helps. Z",
}

function openSettings(s){
    let setting = document.getElementById(`${s}SettingUI`);
    setting.style.visibility = "visible";
    changingKeybinds = true;
}

function closeSettings(s){
    let setting = document.getElementById(`${s}SettingUI`);
    setting.style.visibility = "hidden";
    changingKeybinds = false;
}

function createKeybinds(){
    const parent = document.getElementById("keybindsSettingUI");
    for(data in gameTabs){
        let container = document.createElement("div");
        {//Styling the container of the keybinds
        container.style.width = "95%";
        container.style.height = `${70/Object.keys(gameTabs).length}%`;
        container.style.backgroundColor = "darkblue";
        container.style.marginTop = "5px";
        container.style.marginBottom = "5px";
        container.style.border = "2.5px solid snow";
        container.style.position = "relative";
        container.style.left = "50%";
        container.style.borderRadius = "5px";
        container.style.transform = "translate(-50%)";
        container.style.top = "2.5%";
        container.style.display = "block";
        }
        container.innerHTML += `<h1 style="position:relative;top:translate(50%);left:translate(50%);color:white;font-size:1.5rem;">${gameTabs[data].name}</h1><div style="width:7.5%;height:80%;position:absolute;top:10%;left:2%"><button onclick="startKeybindChange(this.id)" id="keybindsSetting${Object.keys(gameTabs).indexOf(data)+1}" style="width:100%;font-size:1rem;height:100%;position:static;background-color:rgb(7, 21, 75);filter:brightness(200%);color:rgb(131, 131, 131);outline:none;">${gameTabs[data].keybind.toUpperCase()}</button></div>`
        container.innerHTML += ``

        parent.append(container);
    }
    let desc = document.createElement("h2");
    desc.innerHTML = "Click on a keybind to change it!";
    desc.style.color = "white";
    desc.style.position = "relative";
    desc.style.left = "translate(50%)";
    parent.style.textAlign = "center";
    parent.append(desc);
}



function startKeybindChange(elem){
    //The following code is made to make sure it only fires once
    //It detects the key input and passes the parent element and the key into the changeKeybind function all at once
    document.getElementById(elem).innerHTML = "";
    document.getElementById(elem).addEventListener("keydown", (key) => {changeKeybind(key, elem)}, {once: true});
}

function changeKeybind(key, elem){
    //Find the keybind id using the element's id 
    let kID = JSON.parse(elem.substring(elem.length-1,elem.length))-1;
    //Used to see if the keybind is used anywhere else
    for(data in gameTabs){
        if(gameTabs[data].keybind == key.key){//If the key is already used, stop the change
            //Restore it to what it previously was
            document.getElementById(elem).innerHTML = gameTabs[Object.keys(gameTabs)[kID]].keybind.toUpperCase();
            return;
        }
    }
    //If the key is not used update the game to use it
    gameTabs[Object.keys(gameTabs)[kID]].keybind = key.key;
    updateKeybinds();
    document.getElementById(elem).innerHTML = key.key.toUpperCase();
    return;
}