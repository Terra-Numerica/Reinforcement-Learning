# Reinforcement Learning  

## ====================

Authors of the old version: Éric, Milena K.
Author of the current version: Héba Bouzidi

## About the web version

It has mainly been created by copying what was done in the old version (present in the folder `old`). This new version is objectively better in terms of UX/UI feeling, the only issue could be the performance for the simulation.

### Tools  
- HTML/CSS/JS
- [Bootstrap](http://getbootstrap.com/)
- [jQuery](https://jquery.com/)
- [draw.io](https://www.draw.io/)

#### DISCLAIMER

- In JS a global variable can be used in *all* the JS files that are referenced in the main HTML file. Beware of using names already used by other files in critical functions.

- Thanks to Bootstrap, most of the styling is done through the use of classes, please check out the [documentation](http://getbootstrap.com/css/) to understand what has been done in this app.

### Usage
All you need to do is to open index.html in your browser. No download is needed since all the libraries are hosted on the web.  

#### About the translations

The translations are done in the `languages.js` file. The structure is as follows:
```javascript
let  texts = {
	"key1": {
		"fr": "value",
		"en": "value2"
	},
	"key2": {
		"fr": "value",
		"en": "value2"
		}
	[...]
}
```
The texts are then called in the HTML files using the following syntax:
```html
<p translation="key1"></p>
```
The `translation` attribute is used to specify the key of the text to be translated. The language is selected through the button in the top-right corner of the page.
### Features
- The Machine VS Machine tab

A full simulation of games between two AIs with various parameters. The player's AI uses Reinforcement Learning, and its opponent can either do the same, either pick randomly its moves, either uses predetermined moves that should send it to the win.

- The Machine VS Human tab

In this version the user will be able to experiment a Nim game against a learning AI. The algorithm for this one is simpler.

- The documentation

It has been entirely redone in HTML/CSS/JS to enhance the design, and the content is a (mostly) new version of what the old version had. 

- The translation

Everything is translatable and there is no bug known as of today.    

### Potential enhancements possible

- The Interacting tab looks kind of boring

The visuals are the exact same ones as the old version, but the attractiveness is still lacking. Too much texts, not enough pictures... Maybe try animations?

- The People wants a chart

For the Adaptation part, it would be nice to have a chart that shows the evolution of the score over time. It's almost necessary for the "nonstop" mode, and the "one game" mode could display the moves done by the machine when it finishes.

- Monitoring the performance

Right now for the simulation the solution for demanding situations in terms of performance is pretty generic. It is possible to spend more time on finding a way to limit each problematic situation (like a basket that never settles to a single strategy and thus keeps adding up balls that make the website heavy).

- TODO marks across the code

Here and there, TODO directives have been left in the code. May any future developer check them.

- A global graphical charter for Terra Numerica

This is just a wish, but it could be great to have common aesthetics among the games.
