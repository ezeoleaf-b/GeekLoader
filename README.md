# GeekLoader
GeekLoader is a loader made with Javascript and CSS so you can replace the boring loaders with [John Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) or with [Langton's ant](https://en.wikipedia.org/wiki/Langton%27s_ant)

## How to use it
First add geekLoader.js to your file.
```
<script src="js/geekLoader.js"></script>
```

Then just create an object of GeekLoader

```javascript
loader = new GeekLoader();
```

### Options
You can configure the loader with these options
- type --This is the type of loader
- rows --Quantity of rows
- columns --Quantity of columns
- size --The size of each cell
- time --The time between each move(milliseconds)
- contain --The id of the div that contains the loader
- border --If every cell has border or not
- style --Use bootstrap styles to give every cell colors

### Available Options
Options | Values | Default Value
------- | ------ | -------------
type | "life","ant","tardis" | "life"
rows | > 4 | 12
columns | > 4 | 12
size | > 2 | 5
time | > 200 | 500
border | true or false | true
contain | Any div's ID | "loader"
style | "primary", "not-primary" | "default"
" |    "success", "not-success"
" | "info", "not-info"
" | "warning", "not-warning"
" | "danger", "not-danger"
" | "default"


### How to configure it
```javascript
loader.type = 'life';
loader.setSize(rows,columns) or loader.rows=10;loader.columns=10;
loader.time = 500;
loader.destiny = 'divLoader';
loader.border = true;
loader.style = 'primary'; loader.style = 'danger'; loader.style = 'not-danger';
```

### Actions
```javascript
loader.setSize(rows,columns); //Set the rows and columns
loader.generate(); //It's executed with the constructor, but you can call it anytime. It generates the board
loader.start(); //Starts the movement of the loader
loader.stop(); //Stop the loader and hides it
```

## License

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)

This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).
