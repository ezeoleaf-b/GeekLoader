# GeekLoader
GeekLoader is a loader made with Javascript so you can replace the boring loaders with different types:
* [John Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
* [Langton's ant](https://en.wikipedia.org/wiki/Langton%27s_ant)
* SpaceInvaders Alien
* Pacman
* Ghost (From Pacman)
* Tardis
* Heart (From The legend of Zelda)
* Batman Logo
* Adipose (From Doctor Who)
* Mushroom (From Mario)
* T-Rex (Chrome)
* Andy (Android Mascot)

## Examples

Type | Ghost | Ghost | Invaders | Invaders | Pacman | Pacman | Tardis
---- | ----- | ----- | -------- | -------- | ------ | ------ | ------
     |![clyde](https://cloud.githubusercontent.com/assets/10358977/12769464/e8910d76-c9f6-11e5-94ea-3ff96aee1ee9.gif) | ![blinky](https://cloud.githubusercontent.com/assets/10358977/12769566/ba50f542-c9f7-11e5-819d-55a252d9a0cd.gif) | ![tardis](https://cloud.githubusercontent.com/assets/10358977/12769567/be5bdb3e-c9f7-11e5-9bdd-3dd7100c1100.gif) | ![not-danger](https://cloud.githubusercontent.com/assets/10358977/12769568/be843f16-c9f7-11e5-9b34-6d8442b81d5e.gif) | ![pacman](https://cloud.githubusercontent.com/assets/10358977/12769577/ccbe79a2-c9f7-11e5-8b19-0aeb2d22ea00.gif) | ![not-primary](https://cloud.githubusercontent.com/assets/10358977/12769578/ccc58512-c9f7-11e5-9b9d-547e2a3501aa.gif) | ![tardis](https://cloud.githubusercontent.com/assets/10358977/12769579/cccb434e-c9f7-11e5-8772-4a9a707dbf97.gif)

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
- background --Show or hide the background

### Available Options
Options | Values | Default Value
------- | ------ | -------------
type | life,ant,tardis,invaders,pacman,ghost,heart,batman,adipose,mushroom,t-rex,andy | life
rows | > 4 | 12
columns | > 4 | 12
size | > 2 | 5
time | > 200 | 500
border | true or false | false
background | true or false | false
contain | Any div's ID | loader
style | primary, not-primary, pacman, batman | default
      | success, not-success, blinky, player1
      | info, not-info, pinky, player2
      | warning, not-warning, inky
      | danger, not-danger, clyde
      | default, tardis, adipose


### How to configure it
```javascript
loader.type = 'life';
loader.setSize(rows,columns) or loader.rows=10;loader.columns=10; //Only for ant or life
loader.time = 500;
loader.contain = 'divLoader';
loader.border = false;
loader.background = false;
loader.style = 'primary'; loader.style = 'danger'; loader.style = 'not-danger';
```

### Actions
```javascript
loader.setSize(rows,columns); //Set the rows and columns (Just for John Conway's Game of Life and Langton's Ant)
loader.generate(); //It's executed with the constructor, but you can call it anytime. It generates the board (Only for John Conway's Game of Life)
loader.randomType() //Pick a random type of loader every time
loader.start(); //Starts the movement of the loader
loader.stop(); //Stop the loader and hides it
```

## License

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)

This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).
