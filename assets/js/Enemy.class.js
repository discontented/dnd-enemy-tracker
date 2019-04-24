function Enemy(HP, AC) {
    //constructors
    this.HP = HP;
    this.AC = AC;
    this.name = "";
    this.spellCasterLvl = undefined;

    this.legendaryActions = undefined;
    this.lairActions = undefined;

    this.setSpellCaster = function(lvl) {
        this.spellCasterLvl = lvl;
        this.spellSlots = SpellLevel[this.spellCasterLvl]
    }
}