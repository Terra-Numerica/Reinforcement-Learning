
# Apprentissage renforcé

## ====================
Authors: Éric, Milena K., Héba Bouzidi

## About the web version

### Tools

- HTML/CSS/JS
- [Bootstrap](http://getbootstrap.com/)
- [jQuery](https://jquery.com/)

#### DISCLAIMER

- In Javascript a global variable can be used in *all* the JS files that are declared in the main HTML file. Beware of using names already used by other files in critical functions.

- 

### Usage
All you need to do is to open MainPage.html in your browser. No download is needed since all the libraries are hosted on the web. Also, there was no server used in it (but it will mos tlikely be necessary for the nonstop mode of the Adaptation part)

#### About the translations

The translations are done in the `languages.js` file. The structure is as follows:

```javascript
var texts = {
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

### Features "tried"
- Game.js
It is a copy/paste of Game.java with some modifications to make it work in JS but unfortunately there was not enough time to handle it correctly. It is possible that this file has to be redone from naught.



### Features not done at all

### Potential enhancements possible