addLayer("e", {
    name: "exponent", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Exponents", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('e', 14)) mult = mult.times(1.5)
        if (hasUpgrade('e', 15)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "e: Reset for Exponents", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "More exponents",
            description: "Double your number gain im drooling",
            cost: new Decimal(1),
        },
        12: {
            title: "Understand exponents",
            description: "More numbers yummy! 1.5x numbers",
            cost: new Decimal(5),
        },
        13: {
            title: "Squares and even more.",
            description: "Why are there shapes now too much. 1.3x Numbers",
            cost: new Decimal(15),
        },
        14: {
            title: "Decimals",
            description: "Too much posibilities. 1.5x Exponents",
            cost: new Decimal(20),
        },
        15: {
            title: "Eat Number",
            description: "2x exponents",
            cost: new Decimal(45),
        },
        16: {
            title: "Uneat Number",
            description: "3x Numbers",
            cost: new Decimal(125),
        },
        17: {
            title: "Exponential Exponentiality",
            description: "Exponents and numbers are too confusing!",
            cost: new Decimal(250),
            effect() {
                return player[this.layer].points.add(1).pow(0.075)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
        },
    },
})
