function GeekLoader(){
	var dL = document,
		positionsLife=[],
		positionsExtra = [],
		styleLoaded={},
		degree=0,
		timer,antPos,lastRowT,pos,length,
		borderRSize = 1,
		borderCSize = 1;

	this.contain = 'loader';
	this.size = 5;
	this.rows = 12;
	this.columns = 12;
	this.border = false;
	this.style = 'default';
	this.time = 500;
	this.background = false;
	
	this.randomType = function(){
		var types = this.getTypesAvailable();
		var index = Math.floor(Math.random() * types.length);
		this.type = types[index];
	};

	this.getTypesAvailable = function(){
		return ['life','ant','tardis','invaders','pacman','ghost','heart','batman','adipose','mushroom','t-rex','andy'];
	};

	var checkType = function(t){
		if(!~t.getTypesAvailable().indexOf(t.type))
			t.type = 'life';
	};

	var checkSize = function(t){
		var row,column;
		switch(t.type)
		{
			case 'tardis':
				row = 19;
				column = 13;
				break;
			case 'invaders':
				row = 10;
				column = 13;
				break;
			case 'ghost':
				row = 15;
				column = 16;
				break;
			case 'pacman':
				row = 17;
				column = 18;
				break;
			case 'lightsaber-vertical':
				row = 17;
				column = 4;
				break;
			case 'heart':
				row = 10;
				column = 11;
				break;
			case 'batman':
				row = 16;
				column = 37;
				break;
			case 'adipose':
				row = 16;
				column = 19;
				break;
			case 'mushroom':
				row = 18;
				column = 18;
				break;
			case 'andy':
				row = 41;
				column = 32;
				break;
			case 't-rex':
				row = 24;
				column = 22;
				break;
			case 'ant':
			case 'life':
			default:
				row = (t.rows < 4) ? 4 : t.rows;
				column = (t.columns < 4) ? 4 : t.columns;
				break;
		}
		t.rows = row;
		t.columns = column;
	};

	this.generate = function(){
		var t = this;
		checkType(t);
		checkSize(t);
		positionsExtra = [];
		switch(t.type)
		{
			case 'life': positionsLife = getLifePositions(t);break;
			case 'tardis': positionsLife = getTardisPositions();break;
			case 'invaders': positionsLife = getSpaceInvadersPositions();break;
			case 'pacman': positionsLife = getPacmanPositions();break;
			case 'ghost': positionsLife = getGhostPositions();break;
			case 'heart': positionsLife = getHeartPositions();break;
			case 'batman': positionsLife = getBatmanPositions();break;
			case 'adipose': positionsLife = getAdiposePositions();break;
			case 'mushroom': positionsLife = getMushroomPositions();break;
			case 'andy': positionsLife = getAndyPositions();break;
			case 't-rex': positionsLife = getTRexPositions();break;
		}
	};

	var generatePositions = function(original,extra,borders)
	{
		borders = (borders==undefined) ? false : borders;
		var count = (extra==undefined) ? 1 : 2;
		var genPos = [];
		for(var i = 1; i <= count; i++)
		{
			var vPos = (i==1) ? original : extra;
			length = vPos.length;
			for(var j = 0; j < length; j++)
			{
				var vItem = vPos[j].split('-');
				var row = parseInt(vItem[0]);
				var start = parseInt(vItem[1]);
				var end = parseInt(vItem[2]);
				for(var k = start; k <= end;k++)
				{
					pos = `${(row+borderRSize)}-${k+borderCSize}`;

					var condition = (borders) ? (k == start || k == end) : false;	

					if(i == 2 || condition)
					{
						positionsExtra.push(pos);
					}
					else
					{
						genPos.push(pos);
					}
				}
			}
		}
		return genPos;
	}

	var getTRexPositions = function(){
		var posNoBordes = ['1-12-19','2-11-20','3-11-12','3-14-20','4-11-20','5-11-20','6-11-20','7-11-15','8-11-18','9-1-1','9-10-14','10-1-1','10-9-14','11-1-2','11-7-16','12-1-3','12-6-14','12-16-16','13-1-14','14-1-14','15-2-14','16-3-13','17-4-12','18-5-11','19-6-8','19-10-12','20-6-7','21-6-6','22-6-7'];
		var extraPos = ['3-13-13'];
		return generatePositions(posNoBordes,extraPos);
	};

	var getAndyPositions = function(){
		var posNoBordes = ['2-8-10','2-21-23','3-9-11','3-13-18','3-20-22','4-10-21','5-9-22','6-8-23','7-7-11','7-12-19','7-20-24','8-7-11','8-12-19','8-20-24','9-6-25','10-6-25','11-6-25','13-2-5','13-6-25','13-26-29','14-1-6','14-6-25','14-25-30','15-1-6','15-6-25','15-25-30','16-1-6','16-6-25','16-25-30','17-1-6','17-6-25','17-25-30','18-1-6','18-6-25','18-25-30','19-1-6','19-6-25','19-25-30','20-1-6','20-6-25','20-25-30','21-1-6','21-6-25','21-25-30','22-1-6','22-6-25','22-25-30','23-1-6','23-6-25','23-25-30','24-1-6','24-6-25','24-25-30','25-2-5','25-6-25','25-26-29','26-6-25','27-6-25','28-6-25','29-6-25','30-6-25','31-7-24','32-9-14','32-17-22','33-9-14','33-17-22','34-9-14','34-17-22','35-9-14','35-17-22','36-9-14','36-17-22','37-9-14','37-17-22','38-10-13','38-18-21'];
		var extraPos = ['1-8-9','1-22-23','2-14-17','3-12-12','3-19-19','12-3-4','12-6-25','12-27-28','26-3-4','26-27-28','32-8-8','32-15-16','32-23-23','39-11-12','39-19-20'];
		lastRowT = 0;
		return generatePositions(posNoBordes,extraPos,true);
	};

	var getMushroomPositions = function(){
		var posNoBordes = ['1-6-11','2-4-6','2-11-13','3-3-4','3-13-14','4-2-3','4-14-15','5-2-2','5-15-15','6-1-2','6-15-16','7-1-1','7-16-16','8-1-1','8-16-16','9-1-1','9-16-16','10-1-1','10-16-16','11-1-1','11-4-13','11-16-16','12-1-4','12-7-7','12-10-10','12-13-16','13-2-3','13-7-7','13-10-10','13-14-15','14-3-3','14-14-14','15-3-4','15-13-14','16-4-13'];
		var extraPos = ['2-8-9','3-8-9','4-4-4','4-7-10','4-13-13','5-4-13','6-5-6','6-11-12','7-5-5','7-12-12','8-5-5','8-12-12','9-5-5','9-12-12','10-2-6','10-11-15','11-2-3','11-14-15'];
		return generatePositions(posNoBordes,extraPos);
	};

	var getAdiposePositions = function(){
		var posNoBordes = ['1-6-12','2-5-13','3-4-14','4-4-14','5-4-6','5-8-10','5-12-14','6-3-15','7-2-16','8-1-6','8-8-10','8-12-17','9-1-2','9-4-7','9-11-14','9-16-17','10-4-14','11-4-14','12-5-13','13-5-13','14-6-8','14-10-12'];
		var extraPos = ['5-7-7','5-11-11','8-7-7','8-11-11','9-8-10'];
		return generatePositions(posNoBordes,extraPos);
	};

	var getBatmanPositions = function(){
		var posNoBordes = ['2-2-12','2-24-34','3-4-13','3-23-32','4-5-14','4-22-31','5-6-30','6-6-30','7-6-30','8-5-31','9-4-32','10-10-26','11-14-22','12-16-20','13-17-19'];
		var extraPos = ['1-1-12','1-24-35','2-17-17','2-19-19','3-3-3','3-17-19','3-33-33','4-15-21','10-5-9','10-27-31','11-11-13','11-23-25','12-15-15','12-21-21','14-18-18'];
		lastRowT = 1;
		return generatePositions(posNoBordes,extraPos,true);
	};

	var getHeartPositions = function(){
		var posNoBordes = ['2-2-5','2-5-8','3-1-9','4-1-9','5-2-8','6-3-7','7-4-6'];
		var extraPos = ['1-3-4','1-6-7','8-5-5'];
		lastRowT = 1;
		return generatePositions(posNoBordes,extraPos,true);
	};

	var getGhostPositions = function(){
		var posNoBordes = ['1-6-9','2-4-11','3-3-12','4-2-4','4-7-10','4-13-13','5-2-3','5-8-9','6-2-3','6-8-9','7-1-3','7-8-9','7-14-14','8-1-4','8-7-10','8-13-14','9-1-14','10-1-14','11-1-14','12-1-14','13-1-2','13-4-6','13-9-11','13-13-14','14-1-1','14-5-6','14-9-10','14-14-14'];
		var extraPos = ['6-6-7','6-12-13','7-6-7','7-12-13'];
		return generatePositions(posNoBordes,extraPos);
	};

	var getPacmanPositions = function(){
		var posNoBordes = ['1-6-11','2-4-13','3-3-14','4-2-15','5-2-15','6-1-13','7-1-10','8-1-7','9-1-10','10-1-13','11-2-15','12-2-15','13-3-14','14-4-13','15-6-11'];
		return generatePositions(posNoBordes);
	};

	var getSpaceInvadersPositions = function(){
		var posNoBordes = ['1-3-3','1-9-9','2-4-4','2-8-8','3-3-9','4-2-3','4-5-7','4-9-10','5-1-11','6-1-1','6-3-9','6-11-11','7-1-1','7-3-3','7-9-9','7-11-11','8-4-5','8-7-8'];
		return generatePositions(posNoBordes);
	};

	var getTardisPositions = function(t){

		var posNoBordes = ['1-6-6','2-6-6','3-3-9','4-2-10','5-2-2','5-6-6','5-10-10','6-2-2','6-6-6','6-10-10','7-2-2','7-6-6','7-10-10','8-2-10','9-2-2','9-6-6','9-10-10','10-2-2','10-6-6','10-10-10','11-2-10','12-2-2','12-6-6','12-10-10','13-2-2','13-6-6','13-10-10','14-2-10','15-2-2','15-6-6','15-10-10','16-2-2','16-6-6','16-10-10','17-2-10'];
		var extraPos = ['5-3-5','5-7-9','6-3-5','6-7-9','7-3-5','7-7-9','9-3-5','9-7-9','10-3-5','10-7-9','12-3-5','12-7-9','13-3-5','13-7-9','15-3-5','15-7-9','16-3-5','16-7-9'];
		lastRowT = 0;
		return generatePositions(posNoBordes,extraPos);
	};

	var getLifePositions = function(t){
		var cantGenerated = 0;
		var lifePositions = [];
		var limit = parseInt((t.rows * t.columns) * 0.2);
		do
		{
			var h = Math.floor(Math.random() * t.rows + 1);
			var v = Math.floor(Math.random() * t.columns + 1);
			var elementToAdd = `${h}-${v}`;
			if(!~lifePositions.indexOf(elementToAdd))
			{
				lifePositions.push(elementToAdd);
				cantGenerated++;
			}

		}while(cantGenerated < limit);

		return lifePositions;
	};

	this.loadBrick = function(){
		var especificBrick = '';
		var classN,t;
		t = this;
		var loaderDiv = dL.getElementById(t.contain);
		var initialPos = loaderDiv.offsetLeft;
		var posBrick_x = initialPos;
		var posBrick_y = loaderDiv.offsetTop;
		styleLoaded = getCSS(t);
		for ( var i = 1; i <= t.rows; i++ ) 
		{
			for ( var j = 1; j <= t.columns; j++)
			{
				var s = styleLoaded.brickW;
				var styleToLoad = s;
				if(!t.background)
				{
					var indexBack =  s.indexOf('background-color');
					var nextComa = s.indexOf(';',indexBack) + 1;
					styleToLoad = s.slice(0,indexBack);
					styleToLoad += s.slice(nextComa);
				}
				especificBrick += `<div class="brickW" id="brick${i}-${j}-${t.contain}" style="left:${posBrick_x}px;top:${posBrick_y}px;${styleToLoad}"></div>`;
				posBrick_x += t.size;
			}
			posBrick_x = initialPos;
			posBrick_y += t.size;
		}
		loaderDiv.innerHTML = especificBrick;
	};

	var getCSS = function(t){
		var borderS = (t.border) ? 1 : 0;
		var s1 = `position:absolute;height:${t.size}px;width:${t.size}px;background-color:#`;
		var s2 = `;border: solid #`;
		var s3 = ` ${borderS}px;`;
		var sr = `top:0px;left:0px;height:${t.size}px;width:${t.size}px;background-color:#`;
		var cW,cBr,cB,cA;
		
		switch(t.style)
		{
			case 'primary': cW = `337ab7`;cBr = `2e6da4`;cB = `fff`;cA = `FF0303`;cE = `FF0303`; break;
			case 'not-primary':	cW = `fff`;cBr = `2e6da4`;cB = `337ab7`;cA = `FF0303`;cE = `FF0303`;break;
			case 'success': cW = `5cb85c`;cBr = `4cae4c`;cB = `fff`;cA = `FF0303`;cE = `FF0303`;break;
			case 'not-success': cW = `fff`;cBr = `4cae4c`;cB = `5cb85c`;cA = `FF0303`;cE = `FF0303`;break;
			case 'info': cW = `5bc0de`;cBr = `46b8da`;cB = `fff`;cA = `FF0303`;cE = `FF0303`;break;
			case 'not-info': cW = `fff`;cBr = `46b8da`;cB = `5bc0de`;cA = `FF0303`;cE = `FF0303`;break;
			case 'warning': cW = `f0ad4e`;cBr = `eea236`;cB = `fff`;cA = `000`;cE = `FF0303`;break;
			case 'not-warning': cW = `fff`;cBr = `eea236`;cB = `f0ad4e`;cA = `000`;cE = `FF0303`;break;
			case 'danger': cW = `d9534f`;cBr = `d43f3a`;cB = `fff`;cA = `000`;cE = `FF0303`;break;
			case 'not-danger': cW = `fff`;cBr = `d43f3a`;cB = `d9534f`;cA = `000`;cE = `FF0303`;break;
			case 'pacman': cW = `000`;cBr = `FFEE00`;cB = `FFEE00`;cA = `FF0303`;cE = `FF0303`;break;
			case 'not-pacman': cW = `000`;cBr = `FFEE00`;cB = `FFEE00`;cA = `FF0303`;cE = `FF0303`;break;
			case 'blinky': cW = `fff`;cBr = `E11E1C`;cB = `E11E1C`;cA = `525FBB`;cE = `525FBB`;break;
			case 'pinky': cW = `fff`;cBr = `E45593`;cB = `E45593`;cA = `525FBB`;cE = `525FBB`;break;
			case 'inky': cW = `fff`;cBr = `6CCAD6`;cB = `6CCAD6`;cA = `525FBB`;cE = `525FBB`;break;
			case 'clyde': cW = `fff`;cBr = `EF7E10`;cB = `EF7E10`;cA = `525FBB`;cE = `525FBB`;break;
			case 'tardis': cW = `fff`;cBr = `13335C`;cB = `13335C`;cA = `194A88`;cE = `163D6F`;break;
			case 'luke': cW = `fff`;cBr = `99D9EA`;cB = `99D9EA`;cA = `000`;cE = `000`;break;
			case 'batman' : cW = `fff`;cBr = `000`;cB = `000`;cA = `FFEF21`;cE = `FFEF21`;break;
			case 'adipose' : cW = `fff`;cBr = `F3F3F3`;cB = `F3F3F3`;cA = `000`;cE = `000`;break;
			case 'player1' : cW = `fff`;cBr = `000`;cB = `000`;cA = `CB0808`; cE = `CB0808`;break;
			case 'player2' : cW = `fff`;cBr = `000`;cB = `000`;cA = `00BA14`; cE = `00BA14`;break;
			case 'default': default: cW = `FFF`;cBr = `999`;cB = `000`;cA = `FF0303`;cE = `FF0303`;break;
		}
		return {
			brickW:`${s1}${cW}${s2}${cBr}${s3}`,
			brickB:`${s1}${cB}${s2}${cBr}${s3}`,
			brickR:`${sr}${cA}${s2}${cBr}${s3}`,
			brickE:`${s1}${cE}${s2}${cBr}${s3}`
		}
	};

	this.setFigure = function(){
		var t = this;
		if(t.type === 'ant')
		{
			antPos = Math.floor(t.rows / 2)+'-'+Math.floor(t.columns / 2);
			var brickName = `brick${antPos}-${t.contain}`;
			var bDiv = dL.getElementById(brickName);
			var div = dL.createElement('div');
			div.className = 'brickR';
			div.setAttribute('style',styleLoaded.brickR);
			bDiv.appendChild(div);
		}
		else
		{
			var vFigure = positionsLife;
			length = vFigure.length;
			for(var i = 0; i < length; i++)
			{
				var brickName= `brick${vFigure[i]}-${t.contain}`;
				var bDiv = dL.getElementById(brickName);
				setStyle(bDiv,'brickB',styleLoaded.brickB,t);
			}
			if(positionsExtra.length > 0)
			{
				var vFigure = positionsExtra;
				length = vFigure.length;
				for(var i = 0; i < length; i++)
				{
					var brickName= `brick${vFigure[i]}-${t.contain}`;
					var bDiv = dL.getElementById(brickName);
					setStyle(bDiv,'brickE',styleLoaded.brickE,t);
				}	
			}
		}
	};

	this.setSize = function(h,v){
		this.rows = (h==undefined) ? 12 : h;
		this.columns = (v==undefined) ? 12 : v;
	}

	this.start = function(){
		var t = this;
		t.generate();
		t.loadBrick();
		t.setFigure();
		timer = setInterval(function(){t.move()},t.time);
	};

	this.move = function(){
		var t = this;
		switch(this.type)
		{
			case 'life': moveCellL(t); break;
			case 'ant' : moveCellA(t); break;
			case 'tardis' : moveCellT(t); break;
			case 'invaders' : moveCellI(t); break;
			case 'pacman' : moveCellP(t); break;
			case 'ghost' : moveCellG(t); break;
			case 'heart' : moveCellH(t); break;
			case 'batman' : moveCellB(t); break;
			case 'adipose' : moveCellAd(t); break;
			case 'mushroom' : moveCellM(t); break;
			case 'andy' : moveCellAn(t); break;
			case 't-rex' : moveCellTr(t); break;
		}
	};

	var checkCells = function(positions,t,control)
	{
		control = (control==undefined) ? false : true;
		sum = (control) ? 0 : 1;
		var length = positions.length;
		for(var i = 0; i < length; i++)
		{
			var vPos = positions[i].split('-');
			var row = parseInt(vPos[0]);
			var col = parseInt(vPos[1]);
			var brickName = `brick${row+sum}-${col+sum}-${t.contain}`;
			var bDiv = dL.getElementById(brickName);
			var condition = (control) ? ((~positionsLife.indexOf((`${row}-${col}`)) == 0) ? false : true) : true;
			if(bDiv.className == 'brickB')
			{
				setStyle(bDiv,'brickW',styleLoaded.brickW,t);
			}
			else if(bDiv.className == 'brickW' && condition)
			{
				setStyle(bDiv,'brickB',styleLoaded.brickB,t);
			}
		}
	}

	var checkCellsRows = function(t){
		var posToCheck = [];
		lastRowT = ((lastRowT + 1) == (t.rows - 1)) ? 2 : lastRowT + 1;
		
		for(var i = 1; i <= t.columns; i++)
		{
			posName = `${lastRowT}-${i}`;
			posToCheck.push(posName);
		}
		checkCells(posToCheck,t,true);
	}

	var moveCellTr = function(t){
		var posToCheck = ['19-12','20-11','21-11','22-11','22-12','20-6','20-8','21-6','22-6','22-7'];
		checkCells(posToCheck,t);
	};

	var moveCellAn = function(t){
		checkCellsRows(t);
	};

	var moveCellM = function(t){
		var posToCheck = ['13-7','13-10','14-6','15-7','15-8','15-9','15-10','14-11'];
		checkCells(posToCheck,t);
	};

	var moveCellAd = function(t){
		var posToCheck = ['5-1','5-2','6-1','6-2','8-1','8-2','9-1','9-2'];
		checkCells(posToCheck,t);
	};

	var moveCellI = function(t)
	{
		var posToCheck = ['3-1','3-11','4-1','4-11','6-1','6-2','6-10','6-11','7-1','7-11','8-2','8-4','8-5','8-7','8-8','8-10'];
		checkCells(posToCheck,t);
	}

	var moveCellB = function(t)
	{
		checkCellsRows(t);
	};

	var moveCellH = function(t)
	{
		checkCellsRows(t);
	};

	var moveCellG = function(t)
	{
		var posToCheck = ['6-6','4-5','6-4','7-5'];
		var brickName,eyesIndex;
		var nextEyes = 0;

		length = posToCheck.length;
		for(var i = 0; i < length;i++)
		{
			var posData = posToCheck[i].split('-');
			var rowCheck = parseInt(posData[0]);
			var colCheck = parseInt(posData[1]);

			brickName = `brick${rowCheck+borderRSize}-${colCheck+borderCSize}-${t.contain}`;
			var bDiv = dL.getElementById(brickName);
			if(bDiv.className == 'brickE')
			{
				eyesIndex = i;
				break;
			}
		}
		
		nextEyes = (eyesIndex == (length - 1)) ? 0 : (eyesIndex + 1);

		moveBrick(eyesIndex,'remove');
		moveBrick(nextEyes,'add');

		function moveBrick(index,type)
		{
			var data = posToCheck[index].split('-');
			var row = parseInt(data[0]);
			var col = parseInt(data[1]);

			for(var i = 0; i <= 1 ;i++)
			{
				row += i;
				for(var k = 0; k <= 6; k=k+6)
				{
					for(var j = 0; j <= 1;j++)
					{
						col += j + k;
						pos = `${row+borderRSize}-${col+borderCSize}`;
						brickName = `brick${row+borderRSize}-${col+borderCSize}-${t.contain}`;
						var bDiv = dL.getElementById(brickName);

						if(type=='remove')
						{
							if(!~positionsLife.indexOf(pos))
							{
								setStyle(bDiv,'brickW',styleLoaded.brickW,t);
							}
							else if(bDiv.className == 'brickW')
							{
								setStyle(bDiv,'brickB',styleLoaded.brickB,t);
							}
						}
						else if(type=='add')
						{
							setStyle(bDiv, 'brickE',styleLoaded.brickE,t);
						}

						col = parseInt(data[1]);
					}
				}
			}
		}
	};

	var moveCellP = function(t)
	{
		var posToCheck = ['6-14','6-15','6-16','7-11','7-12','7-13','7-14','7-15','7-16','8-8','8-9','8-10','8-11','8-12','8-13','8-14','8-15','8-16','9-11','9-12','9-13','9-14','9-15','9-16','10-14','10-15','10-16'];
		checkCells(posToCheck,t);
	};

	var moveCellT = function(t)
	{
		var brickName,posName;
		lastRowT = ((lastRowT + 1) == t.rows) ? 1 : lastRowT + 1;
		
		for(var i = 1; i <= t.columns; i++)
		{
			posName = `${lastRowT}-${i}`;
			brickName = `brick${lastRowT}-${i}-${t.contain}`;
			var bDiv = dL.getElementById(brickName);
			if(bDiv.className == 'brickB' || bDiv.className == 'brickE')
			{
				setStyle(bDiv,'brickW',styleLoaded.brickW,t);
			}
			else if(bDiv.className == 'brickW' && (~positionsLife.indexOf(posName)))
			{
				setStyle(bDiv,'brickB',styleLoaded.brickB,t);
			}
			else if(bDiv.className == 'brickW' && (~positionsExtra.indexOf(posName)))
			{
				setStyle(bDiv,'brickE',styleLoaded.brickE,t);
			}
		}
	};

	var moveCellL = function(t)
	{
		var move = false;
		var brickName;

		for ( var i = 1; i <= t.rows; i++ ) 
		{
			for ( var j = 1; j <= t.columns; j++)
			{
				brickName = `brick${i}-${j}-${t.contain}`;
				var bDiv = dL.getElementById(brickName);
				cantOfLivingCells = countCells(i,j,t);
				if(bDiv.className == 'brickB' && ((cantOfLivingCells < 2) || (cantOfLivingCells > 3)))
				{
					setStyle(bDiv,'brickW',styleLoaded.brickW,t);
					move = true;
				}
				else if(bDiv.className == 'brickW' && (cantOfLivingCells == 3))
				{
					setStyle(bDiv,'brickB',styleLoaded.brickB,t);
					move = true;
				}
			}
		}
		if(!move)
		{
			t.generate();
			t.setFigure();
		}

		function countCells(x,y,t){
			var brickName;
			var livingCells = 0;
			for(var i = -1; i <= 1; i++)
			{
				for(var j = -1; j <= 1;j++)
				{
					if(i != 0 || j != 0)
					{
						brickName = `brick${x+i}-${y+j}-${t.contain}`;
						var bDiv = dL.getElementById(brickName);
						if(bDiv != null && bDiv.className == 'brickB')
						{
								livingCells++;	
						}
					}
				}
			}
			return livingCells;
		}
	};

	var moveCellA = function(t)
	{
		var addAnt = `<div class="brickR" style="${styleLoaded.brickR}"></div>`;
		var nextPos;
		var antName = `brick${antPos}-${t.contain}`;
		var vAntName = antPos.split('-');
		var newName,className,classS,vA0,vA1;
		aDiv = dL.getElementById(antName);

		vA0 = 0;
		vA1 = 0;

		if(aDiv.className == 'brickW')
		{
			className = 'brickB';
			classS = styleLoaded.brickB;
			switch(degree)
			{
				case 0:
					if((parseInt(vAntName[0]) - 1) > 0)
					{
						vA0 = -1;
					}
					break;
				case 90:
					if((parseInt(vAntName[1]) + 1) <= t.columns)
					{
						vA1 = 1;
					}
					break;
				case 180:
					if((parseInt(vAntName[0]) + 1) <= t.rows)
					{
						vA0 = 1;
					}
					break;
				case 270:
					if((parseInt(vAntName[1]) - 1) > 0)
					{
						vA1 = -1;
					}
					break;
			}
			degree += 90;
		}
		else
		{
			className = 'brickW';
			classS = styleLoaded.brickW;
			switch(degree)
			{
				case 0:
					if((parseInt(vAntName[0]) + 1) <= t.rows)
					{
						vA0 = 1;
					}
					break;
				case 90:
					if((parseInt(vAntName[1]) - 1) > 0)
					{
						vA1 = -1;
					}
					break;
				case 180:
					if((parseInt(vAntName[0]) - 1) > 0)
					{
						vA0 = -1;
					}
					break;
				case 270:
					if((parseInt(vAntName[1]) + 1) <= t.columns)
					{
						vA1 = 1;
					}
					break;
			}
			degree -= 90;
		}

		degree = (degree==360) ? 0 : ((degree == -90) ? 270 : degree);

		if(vA0 != 0 || vA1 != 0)
		{
			newName = (parseInt(vAntName[0]) + vA0) + '-' + (parseInt(vAntName[1]) + vA1);
			antPos = newName;
			aDiv.innerHTML = '';
			setStyle(aDiv,className,classS,t);
			nextPos = `brick${antPos}-${t.contain}`;
			dL.getElementById(nextPos).innerHTML = addAnt;
		}
	};

	var setStyle = function(div,cName,styleLoad,t)
	{
		div.className = cName;
		var styleToLoad = styleLoad;
		if(cName=='brickW' && !t.background)
		{
			var indexBack =  styleLoad.indexOf('background-color');
			var nextComa = styleLoad.indexOf(';',indexBack) + 1;
			styleToLoad = styleLoad.slice(0,indexBack);
			styleToLoad += styleLoad.slice(nextComa);
		}
		var style = `left:${div.style.left};top:${div.style.top};${styleToLoad}`;
		div.setAttribute('style',style);
	}

	this.stop = function(){
		clearInterval(timer);
		this.cleanDesk();
	};

	this.cleanDesk = function(){
		dL.getElementById(this.contain).innerHTML = '';
	};
	this.randomType();
};