# File Explanations

## `Enemy.class.js`
- Contains `Enemy` class

## `classImp.js`
- Implements the classes with a few predefined enemies.

## `spellSlots.js`
- Contains `SpellLevel` object which contains all 5e spell slots by spell level.

## `functions.js`
- Stores functions.
- Now deprecated as functions are implemented as methods in `Card.class.js`

## `script.js`
- Executes code

# `index.html`
- `#options`
  - Form for options to add a monster.

# Current Status
- `scripts.js` and `functions.js` are commented ot as these files have been replaced by `Card.class.js` and `classImp.js`

# Creating a Card
- A card can be created by passing in an existing `Enemy` class into `Card` and calling the method `Card.drawCard(<container>)`, where `<container>` must be an HTML object to append the card to.

```js
var Vhalak = new Enemy(52, 14);
Vhalak.name = "Vhalak";
var VhalakCard = new Card(Vhalak);
VhalakCard.drawCard(body);
```