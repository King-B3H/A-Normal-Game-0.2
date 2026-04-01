class Upgrade{
    constructor(name, desc, cost, currency, amount, cap, id, base, currType, scaling, scaleType){ //Creates the new upgrade object
        this.name = name;
        this.desc = desc;
        this.cost = cost;
        this.currency = currency;
        this.amount = amount;
        this.cap = cap;
        this.id = id;
        this.base = base;
        this.currType = currType;
        this.scaling = scaling;
        this.scaleType = scaleType;
    }

    createUpgrade(row){//Creates a button for the physical representation of the upgrade
        const tr = document.getElementById(`upgradeRow${row}`)
        const td = tr.insertCell()
        const upgrade = document.createElement("button");
        upgrade.id = "Upgrade" + this.id;
        upgrade.classList.add("upgrade");
        upgrade.style.width = "200px";
        upgrade.style.height = "200px";
        upgrade.style.display = "block";
        upgrade.innerHTML += this.updateText();
        td.appendChild(upgrade);
        this.disappear();
    }

    buyUpgrade(){ //Purchases the upgrade based on the currrency, cost, amount, and cap
        if(player[this.currType][this.currency] >= this.cost &&  this.amount < this.cap){
            player[this.currType][this.currency] -= this.cost;
            this.amount++;
            if(this.scaleType == "linear"){
                this.cost = this.base * this.scaling * this.amount;
            }else if(this.scaleType == "exponential"){
                this.cost = this.base * (this.scaling ** this.amount);
            }
            document.getElementById("Upgrade"+this.id).innerHTML = this.updateText();
            updateText();
            
        }
    }

    appear(){
        document.getElementById(`Upgrade${this.id}`).style.display = "";
    }

    disappear(){
        document.getElementById(`Upgrade${this.id}`).style.display = "none";
    }

    updateText(){//Updates the text of the physical upgrade button
        let text = `<div style="position:relative;top:0%;width:100%;left:0px;line-height:15px;height:30%;"><h2 style="font-size:1.5rem;">${this.name}<p style="font-size:1rem;">Level ${this.amount}/${this.cap}</p></h2></div><div style="position:relative;top:0%;width:100%;align-content:center;height:60%;left:0px;line-height:20px;font-size:1.15rem;"><p style="position:relative;top:0%;font-weight:normal;">${this.desc}</p>`;
        text += this.amount == this.cap ? `Maxed` :`<p>Costs: ${format(this.cost)} ${this.currency}</p></div>`;
        return text;
    }

    getName(){//Returns name
        return this.name;
    }

    getDesc(){//Returns Description
        return this.desc;
    }

    getAmount(){//Returns Amount
        return this.amount;
    }

}
var upgrades = { //Create a table for the actual upgrades to be stored, object references
    ["main"]:{},
}

var upgradeEffects = { //Function that returns the values of the upgrades' effects.
    ["main"] : {
        ["1"] : function(amount){ //Eg. you can set your own effects here in a formula.
            let x = 2 ** amount;
            return x;
        },
        ["2"] : function(amount){
            let x = 3 ** amount;
            return x;
        },
        ["3"]: function(amount){
            return amount > 0;
        },
        ["4"]: function(amount){
            return amount > 0;
        },
        ["6"] : function(amount){
            let x = 3 ** amount;
            return x;
        },
        ["7"] : function(amount){
            let x = 2 ** amount;
            return x;
        },
        ["8"] : function(amount){
            let x = 4 ** amount;
            return x;
        },
        ["9"] : function(amount){
            let x = 9 ** amount;
            return x;
        },
    }
}

function getUpgradeEffect(tab, upgrade){//Just an easier way to reference upgradeEffects()
    return upgradeEffects[tab][upgrade](getUpgradeAmount(tab, upgrade));
}

function getUpgradeAmount(tab, upgrade){//Easy way to get the upgrade amount
    return upgrades[tab][`${upgrade}`].getAmount();
}

function hasUpgrade(tab, upgrade){
    if(upgrades[tab][`${upgrade}`].getAmount() > 0){
        return true;
    }else{
        return false;
    }
}

var upgradeTabs = [//Stores the names of the upgrade tabs to loop through
    "main",
]
