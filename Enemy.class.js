class Enemy {
    constructor(name, HP, AC) {
        this.name = name;
        this.HP = HP;
        this.AC = AC;
    }

    set spellCasterLvl(level) {
        this.spellCasterLvl = level;
    }

    set legendaryActions(actions) {
        this.legendaryActions = actions;
    }

    set lairActions(actions) {
        this.lairActions = actions;
    }
}