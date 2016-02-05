function GeekLoader(){
	var dL = document,
		positionsLife=[],
		positionsExtra = [],
		styleLoaded={},
		degree=0,
		timer,antPos,lastRowT,pos,length,
		borderRSize = 1,
		borderCSize = 1;

	this.type = 'life';
	this.contain = 'loader';
	this.size = 5;
	this.rows = 12;
	this.columns = 12;
	this.border = true;
	this.style = 'default';
	this.time = 500;
	this.background = true;
	
	this.randomType = function(){
		var types = this.getTypesAvailable();
		var index = Math.floor(Math.random() * types.length);
		this.type = types[index];
	};

	this.getTypesAvailable = function(){
		return ['life','ant','tardis','invaders','pacman','ghost','heart'];
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
				row = 18;
				column = 11;
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
			case 'life':
				positionsLife = getLifePositions(t);
				break;
			case 'tardis':
				positionsLife = getTardisPositions(t);
				break;
			case 'invaders':
				positionsLife = getSpaceInvadersPositions(t);
				break;
			case 'pacman':
				positionsLife = getPacmanPositions(t);
				break;
			case 'ghost':
				positionsLife = getGhostPositions(t);
				break;
			case 'heart':
				positionsLife = getHeartPositions(t);
				break;
		}
	};

	var getHeartPositions = function(t){
		var heartPos = [];
		var posNoBordes = ['2-3-4','2-6-7','3-2-8','4-2-8','5-3-7','6-4-6','7-5-5'];
		var posExtra = ['1-3-4','1-6-7','8-5-5'];

		lastRowT = 1;

		for(var i = 1; i <= 2; i++)
		{
			var vPos = (i==1) ? posNoBordes : posExtra;
			var sum = (i==1) ? 1 : 0;
			length = vPos.length;
			for(var j = 0; j < length;j++)
			{
				var vItem = vPos[j].split('-');
				var row = parseInt(vItem[0]);
				var start = parseInt(vItem[1]);
				var end = parseInt(vItem[2]);
				for(var k = start - sum; k <= end + sum;k++)
				{
					pos = `${(row+borderRSize)}-${k+borderCSize}`;
					if(i == 2 || k == (start - 1) || k == (end + 1))
					{
						positionsExtra.push(pos);
					}
					else
					{
						heartPos.push(pos);
					}
				}
			}
		}

		return heartPos;
	};

	var getGhostPositions = function(t){
		var ghostPos = [];

		var posNoBordes = ['1-6-9','2-4-11','3-3-12','4-2-4','4-7-10','4-13-13','5-2-3','5-8-9','6-2-3','6-8-9','7-1-3','7-8-9','7-14-14','8-1-4','8-7-10','8-13-14','9-1-14','10-1-14','11-1-14','12-1-14','13-1-2','13-4-6','13-9-11','13-13-14','14-1-1','14-5-6','14-9-10','14-14-14'];
		var posEyes = ['6-6-7','6-12-13','7-6-7','7-12-13'];

		for(var i = 1; i <= 2; i++)
		{
			var vPos = (i==1) ? posNoBordes : posEyes;
			length = vPos.length;
			for(var j = 0; j < length;j++)
			{
				var vItem = vPos[j].split('-');
				var row = parseInt(vItem[0]);
				var start = parseInt(vItem[1]);
				var end = parseInt(vItem[2]);
				for(var k = start - 1; k < end;k++)
				{
					pos = `${(row+borderRSize)}-${k+borderCSize}`;
					if(i == 1)
						ghostPos.push(pos);
					else
						positionsExtra.push(pos);
				}
			}
		}

		return ghostPos;
	};

	var getPacmanPositions = function(t){
		var pacmanPos = [];

		var posNoBordes = ['6-11','4-13','3-14','2-15','2-15','1-13','1-10','1-7','1-10','1-13','2-15','2-15','3-14','4-13','6-11'];
		length = posNoBordes.length;
		for(var i = 0; i < length;i++)
		{
			var vItem = posNoBordes[i].split('-');
			var row = i + 1;
			var start = parseInt(vItem[0]);
			var end = parseInt(vItem[1]);
			for(var j = start; j <= end;j++)
			{
				pos = `${(row+borderRSize)}-${j+borderCSize}`;	
				pacmanPos.push(pos);
			}
		}

		return pacmanPos;
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

	var getSpaceInvadersPositions = function(t){
		var spaceInvadersPos = [];
		var posNoBordes = ['1-3-3','1-9-9','2-4-4','2-8-8','3-3-9','4-2-3','4-5-7','4-9-10','5-1-11','6-1-1','6-3-9','6-11-11','7-1-1','7-3-3','7-9-9','7-11-11','8-4-5','8-7-8'];
		length = posNoBordes.length;
		for(var i = 0; i < length;i++)
		{
			var vItem = posNoBordes[i].split('-');
			var row = parseInt(vItem[0]);
			var start = parseInt(vItem[1]);
			var end = parseInt(vItem[2]);
			for(var j = start; j <= end; j++)
			{
				var pos = `${(row+borderRSize)}-${j+borderCSize}`;
				spaceInvadersPos.push(pos);
			}
		}

		return spaceInvadersPos;
	};

	var getTardisPositions = function(t){
		var posTardis = [];
		var data = {
			start:2,
			end:t.columns-1,
			bottom:t.rows-1,
			top:5
		};

		lastRowT = t.rows;
		
		for(var i = data.start; i <= data.end; i++)
		{
			if(i>data.start && i < data.end)
			{
				pos = `${(data.top -1)}-${i}`;
				posTardis.push(pos);
			}

			pos = `${data.bottom}-${i}`;
			posTardis.push(pos);
			pos = `${data.top}-${i}`;
			posTardis.push(pos);
		}
		

		for(var i = data.top; i <= data.bottom; i++)
		{
			pos = `${i}-${data.start}`;
			posTardis.push(pos);
			pos = `${i}-${data.end}`;
			posTardis.push(pos);
		}

		for(var i = (data.top + 3);i < (data.bottom - 1);i=i+3)
		{
			for(var j = data.start; j <= data.end; j++)
			{
				pos = `${i}-${j}`;
				posTardis.push(pos);
			}		
		}

		getTopTardis(t);
		
		for(var i = data.top; i < data.bottom;i++)
		{
			for(var j = data.start; j < data.end; j++)
			{
				pos = `${i}-${j}`;
				if(!~posTardis.indexOf(pos))
				{
					positionsExtra.push(pos);
				}
			}
		}

		return posTardis.filter(function(elem, index) {
			return posTardis.indexOf(elem) == index;
		});

		function getTopTardis(t)
		{
			var middle = [];
			var from = 2;
			var midP = parseInt((t.columns) / 2);
			middle = (t.columns % 2 == 0) ? [midP,(midP+1)] : middle = [midP+1];
			for(var i = from; i < (data.bottom);i++)
			{
				for(var j = 0; j < middle.length;j++)
				{
					pos = `${i}-${middle[j]}`;
					posTardis.push(pos);
				}
			}
		}
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
		}
	};

	var moveCellH = function(t)
	{
		var brickName,posName;
		lastRowT = ((lastRowT + 1) == (t.rows - 1)) ? 2 : lastRowT + 1;
		
		for(var i = 1; i <= t.columns; i++)
		{
			posName = `${lastRowT}-${i}`;
			brickName = `brick${lastRowT}-${i}-${t.contain}`;
			var bDiv = dL.getElementById(brickName);
			if(bDiv.className == 'brickB')
			{
				setStyle(bDiv,'brickW',styleLoaded.brickW,t);
			}
			else if(bDiv.className == 'brickW' && (~positionsLife.indexOf(posName)))
			{
				setStyle(bDiv,'brickB',styleLoaded.brickB,t);
			}
		}
	};

	var moveCellG = function(t)
	{
		var posToCheck = ['6-5','4-4','6-3','7-4'];
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
		var posToCheck = ['6-14-16','7-11-16','8-8-16','9-11-16','10-14-16'];
		length = posToCheck.length;
		for(var i = 0; i < length;i++)
		{
			var posData = posToCheck[i].split('-');
			var rowCheck = parseInt(posData[0]);
			var startCheck = parseInt(posData[1]);
			var endCheck = parseInt(posData[2]);
			for(var j = startCheck; j <= endCheck; j++)
			{
				var brickName = `brick${rowCheck+borderRSize}-${j+borderCSize}-${t.contain}`;
				var bDiv = dL.getElementById(brickName);
				if(bDiv.className == 'brickB')
				{
					setStyle(bDiv,'brickW',styleLoaded.brickW,t);
				}
				else if(bDiv.className == 'brickW')
				{
					setStyle(bDiv,'brickB',styleLoaded.brickB,t);
				}
			}
		}
	};

	var moveCellI = function(t)
	{
		var posToCheck = ['3-1','3-11','4-1','4-11','6-1','6-2','6-10','6-11','7-1','7-11','8-2','8-4','8-5','8-7','8-8','8-10'];
		for(var i = 1; i < t.rows; i++)
		{
			for(var j = 1; j < t.columns;j++)
			{
				var posCheck = `${i}-${j}`;
				if(~posToCheck.indexOf(posCheck))
				{
					var brickName = `brick${i+borderRSize}-${j+borderCSize}-${t.contain}`;
					var bDiv = dL.getElementById(brickName);
					if(bDiv.className == 'brickB')
					{
						setStyle(bDiv,'brickW',styleLoaded.brickW,t);
					}
					else if(bDiv.className == 'brickW')
					{
						setStyle(bDiv,'brickB',styleLoaded.brickB,t);
					}
				}
			}
		}
	}

	var moveCellT = function(t)
	{
		var brickName,posName;
		lastRowT = ((lastRowT - 1) == 1) ? t.rows : lastRowT - 1;
		
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

};