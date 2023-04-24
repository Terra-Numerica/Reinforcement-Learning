
# Apprentissage renforcé

## ====================
Authors: Éric, Milena K., Héba Bouzidi

## About the web version

### Tools

- HTML/CSS/JS
- [Bootstrap](http://getbootstrap.com/)
- [jQuery](https://jquery.com/)
- [draw.io](https://www.draw.io/)

#### DISCLAIMER

- In Javascript a global variable can be used in *all* the JS files that are declared in the main HTML file. Beware of using names already used by other files in critical functions.

- Thanks to Bootstrap, most of the styling is done through the use of classes, please check out the [documentation](http://getbootstrap.com/css/) to understand what has been done in this app.

### Usage
All you need to do is to open MainPage.html in your browser. No download is needed since all the libraries are hosted on the web. Also, there was no server used in it (but it will most likely be necessary for the nonstop mode of the Adaptation part)

#### About the translations

The translations are done in the `languages.js` file. The structure is as follows:

```javascript
let texts = {
    "key1": {
        "fr": "value",
        "en": "value2"
    },
    "key2": {
        "fr": "valeur",
        "en": "valeur2"
    }
}
```

The texts are then called in the HTML files using the following syntax:

```html
<p translate="key1"></p>
```

The `translate` attribute is used to specify the key of the text to be translated. The language is selected through the button in the left corner of the page.

### Features usable
- The documentation
It has been entirely redone in HTML/CSS/JS to enhance the design, but the content is the exact same as what my predecessors did.

- The Interaction tab
This part of the documentation should have been correctly reimpleted, but a double check on the algorithm could be useful.

- The translation
Everything is translatable and there is no bug known as of today.

- The Adaptation tab
Only the visualization of the parameters picked is possible.

### Features "tried"
- Game.js
It is a copy/paste of `Game.java` with some modifications to make it work in JS but unfortunately there was not enough time to handle it correctly. It is possible that this file has to be redone from naught.

- The AI Goal tab
A try at making the design look better (otherwise it would have been full of boring plain text) by using bubbles texts (they're in the `images` folder) but it was not enough to make it look good.

### Features not done at all
- Linking the Adaptation.js interface with the Game.js algorithm
It was techniclaly tried but if it can help it might be better to remove the actual "links" made to redo those better.

### Hotfixes necessary
- The responsiveness of the balls
It works perfectly well for a resize, but the event in which the Bootstrap navbar is toggled is not handled. It is possible to fix it by adding an event listener on the toggle button and then calling the function that handles the responsiveness of the balls.
Another possibility could be to not put the current listener on the resize of the window, but on the change of dimensions of the adapatation zone. This way, the responsiveness might cover any visual change of the page.
The whole thing is situated there: `web_version/Adaptation.js` in the function `updateCanvas`

- Updating the pictures illustrating the app in the doc
Pretty easy, just screenshotting how the Adaptation tab looks like now and replacing the old pictures with the new ones.

### Potential enhancements possible
- The Interacting tab looks kinda boring
The visuals are the exact same ones as the java version, but the attractiveness is still lacking : too much texts, not enough pictures... Maybe try animations?

- The People wants a chart
For the Adaptation part, it would be nice to have a chart that shows the evolution of the score over time. It's almost necessary for the "nonstop" mode, and the "one game" mode could display the moves done by the machine when it finishes.