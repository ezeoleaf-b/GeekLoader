function GeekLoader(){
	var dL = document;
	var positionsLife=[];
	var styleLoaded={};
	var degree=0;
	var timer,antPos,lastRowT;

	this.type = 'life';
	this.contain = 'loader';
	this.size = 5;
	this.rows = 12;
	this.columns = 12;
	this.border = true;
	this.style = 'default';
	this.time = 500;
	
	this.getTypesAvailable = function(){
		return ['life','ant','tardis','invaders'];	
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
				row=(t.rows < 14) ? 14 : t.rows;
				column = (t.columns < 9) ? 9 : t.columns;
				break;
			case 'invaders':
				row=(t.rows < 10) ? 10 : t.rows;
				column=(t.columns < 13) ? 13 : t.columns;
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
		checkType(this);
		checkSize(this);
		switch(this.type)
		{
			case 'life':
				positionsLife = getLifePositions(this);
				break;
			case 'tardis':
				positionsLife = getTardisPositions(this);
				break;
			case 'invaders':
				positionsLife = getSpaceInvadersPositions(this);
				break;
		}
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
		var borderRSize,borderCSize;
		var spaceInvadersPos = [];
		var posNoBordes = ['1-3','1-9','2-4','2-8','3-3','3-4','3-5','3-6','3-7','3-8','3-9','4-2','4-3','4-5','4-6','4-7','4-9','4-10','5-1','5-2','5-3','5-4','5-5','5-6','5-7','5-8','5-9','5-10','5-11','6-1','6-3','6-4','6-5','6-6','6-7','6-8','6-9','6-11','7-1','7-3','7-9','7-11','8-4','8-5','8-7','8-8'];
		if(((t.columns - 11) % 2 )!= 0)
			t.columns++;

		if(((t.rows - 8) % 2) != 0)
			t.rows++;

		borderRSize = (t.rows - 8) / 2;
		borderCSize = (t.columns - 11) / 2;

		for(var i = 1; i <= t.rows;i++)
		{
			for(var j = 1; j <= t.columns;j++)
			{
				var posCheck = `${i}-${j}`;
				if(~posNoBordes.indexOf(posCheck))
				{
					var pos = `${i+borderRSize}-${j+borderCSize}`;
					spaceInvadersPos.push(pos);
				}
			}
		}

		return spaceInvadersPos;
	};

	var getTardisPositions = function(t){
		var posTardis = [];
		var pos;
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

		for(var i = (data.top + 2);i < (data.bottom - 1);i=i+2)
		{
			for(var j = data.start; j <= data.end; j++)
			{
				pos = `${i}-${j}`;
				posTardis.push(pos);
			}		
		}

		getTopTardis(t);
		
		return posTardis.filter(function(elem, index) {
			return posTardis.indexOf(elem) == index;
		});

		function getTopTardis(t)
		{
			var middle = [];
			var from = 2;
			var midP = parseInt((t.columns) / 2);
			if((t.columns % 2 == 0))
				middle = [midP,(midP+1)];
			else
				middle = [midP+1];

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
		var classN;
		var loaderDiv = dL.getElementById(this.contain);
		var initialPos = loaderDiv.offsetLeft;
		var posBrick_x = initialPos;
		var posBrick_y = loaderDiv.offsetTop;
		styleLoaded = getCSS(this);
		for ( var i = 1; i <= this.rows; i++ ) 
		{
			for ( var j = 1; j <= this.columns; j++)
			{
				especificBrick += `<div class="brickW" id="brick${i}-${j}-${this.contain}" style="left: ${posBrick_x}px; top: ${posBrick_y}px;${styleLoaded.brickW}"></div>`;
				posBrick_x += this.size;
			}
			posBrick_x = initialPos;
			posBrick_y += this.size;
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
			case 'primary':
				cW = `337ab7`;
				cBr = `2e6da4`;
				cB = `fff`;
				cA = `FF0303`;
				break;
			case 'not-primary':
				cW = `fff`;
				cBr = `2e6da4`;
				cB = `337ab7`;
				cA = `FF0303`;
				break;
			case 'success':
				cW = `5cb85c`;
				cBr = `4cae4c`;
				cB = `fff`;
				cA = `FF0303`;
				break;
			case 'not-success':
				cW = `fff`;
				cBr = `4cae4c`;
				cB = `5cb85c`;
				cA = `FF0303`;
				break;
			case 'info':
				cW = `5bc0de`;
				cBr = `46b8da`;
				cB = `fff`;
				cA = `FF0303`;
				break;
			case 'not-info':
				cW = `fff`;
				cBr = `46b8da`;
				cB = `5bc0de`;
				cA = `FF0303`;
				break;
			case 'warning':
				cW = `f0ad4e`;
				cBr = `eea236`;
				cB = `fff`;
				cA = `000`;
				break;
			case 'not-warning':
				cW = `fff`;
				cBr = `eea236`;
				cB = `f0ad4e`;
				cA = `000`;
				break;
			case 'danger':
				cW = `d9534f`;
				cBr = `d43f3a`;
				cB = `fff`;
				cA = `000`;
				break;
			case 'not-danger':
				cW = `fff`;
				cBr = `d43f3a`;
				cB = `d9534f`;
				cA = `000`;
				break;
			case 'default':
			default:
				cW = `FFF`;
				cBr = `999`;
				cB = `000`;
				cA = `FF0303`;
				break;
		}
		return {
			brickW:`${s1}${cW}${s2}${cBr}${s3}`,
			brickB:`${s1}${cB}${s2}${cBr}${s3}`,
			brickR:`${sr}${cA}${s2}${cBr}${s3}`
		}
	};

	this.setFigure = function(){
		switch(this.type){
			case 'life':
			case 'tardis':
			case 'invaders':
				var vFigure = positionsLife;
				for(var i = 0; i < vFigure.length; i++)
				{
					var brickName= `brick${vFigure[i]}-${this.contain}`;
					var bDiv = dL.getElementById(brickName);
					setStyle(bDiv,'brickB',styleLoaded.brickB);
				}
				break;
			case 'ant':
				antPos = Math.floor(this.rows / 2)+'-'+Math.floor(this.columns / 2);
				var brickName = `brick${antPos}-${this.contain}`;
				var bDiv = dL.getElementById(brickName);
				var div = dL.createElement('div');
				div.className = 'brickR';
				div.setAttribute('style',styleLoaded.brickR);
				bDiv.appendChild(div);
				break;
		}
	};

	this.setSize = function(h,v){
		this.rows = (h==undefined) ? 12 : h;
		this.columns = (v==undefined) ? 12 : v;
	}

	this.start = function(){
		this.generate();
		this.loadBrick();
		this.setFigure();
		var that = this;
		timer = setInterval(function(){that.move()},this.time);
	};

	this.move = function(){
		switch(this.type)
		{
			case 'life': moveCellG(this); break;
			case 'ant' : moveCellA(this); break;
			case 'tardis' : moveCellT(this); break;
			case 'invaders' : moveCellI(this); break;
		}
	};

	var moveCellI = function(t)
	{
		var posToCheck = ['3-1','3-11','4-1','4-11','6-1','6-2','6-10','6-11','7-1','7-11','8-2','8-4','8-5','8-7','8-8','8-10'];
		var borderRSize = (t.rows - 8) / 2;
		var borderCSize = (t.columns - 11) / 2;
		var brickName,className,styleLoad,style;
		for(var i = 1; i < t.rows; i++)
		{
			for(var j = 1; j < t.columns;j++)
			{
				var posCheck = `${i}-${j}`;
				if(~posToCheck.indexOf(posCheck))
				{
					brickName = `brick${i+borderRSize}-${j+borderCSize}-${t.contain}`;
					var bDiv = dL.getElementById(brickName);
					enter = false;
					if(bDiv.className == 'brickB')
					{
						setStyle(bDiv,'brickW',styleLoaded.brickW);
					}
					else if(bDiv.className == 'brickW')
					{
						setStyle(bDiv,'brickB',styleLoaded.brickB);
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
			if(bDiv.className == 'brickB')
			{
				setStyle(bDiv,'brickW',styleLoaded.brickW);
			}
			else if(bDiv.className == 'brickW' && (~positionsLife.indexOf(posName)))
			{
				setStyle(bDiv,'brickB',styleLoaded.brickB);
			}
		}
	};

	var moveCellG = function(t)
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
					setStyle(bDiv,'brickW',styleLoaded.brickW);
					move = true;
				}
				else if(bDiv.className == 'brickW' && (cantOfLivingCells == 3))
				{
					setStyle(bDiv,'brickB',styleLoaded.brickB);
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
		var newName,className,classS;
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
			setStyle(aDiv,className,classS);
			nextPos = `brick${antPos}-${t.contain}`;
			dL.getElementById(nextPos).innerHTML = addAnt;
		}
	};

	var setStyle = function(div,cName,styleLoad)
	{
		div.className = cName;
		var style = `left:${div.style.left};top:${div.style.top};${styleLoad}`;
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