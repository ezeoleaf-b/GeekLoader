var dDL = document;

function GeekLoader(){
	this.type = 'life';
	this.setSize();
	this.positionsLife = [];
	this.contain = 'loader';
	this.size = 5;
	this.timer;
	this.border = true;
	this.style = 'default';
	this.antPos;
	this.degree = 0;
	this.time = 500;
	this.styleLoaded = {};
};

GeekLoader.prototype.getTypesAvailable = function(){
	return ['life','ant','tardis','invaders'];
};

GeekLoader.prototype.checkType = function(){
	if(!~this.getTypesAvailable().indexOf(this.type))
		this.type = 'life';
};

GeekLoader.prototype.checkSize = function(){
	var row,column;
	switch(this.type)
	{
		case 'tardis':
			row=(this.rows < 14) ? 14 : this.rows;
			column = (this.columns < 9) ? 9 : this.columns;
			break;
		case 'invaders':
			row=(this.rows < 10) ? 10 : this.rows;
			column=(this.columns < 13) ? 13 : this.columns;
			break;
		case 'ant':
		case 'life':
		default:
			row = (this.rows < 4) ? 4 : this.rows;
			column = (this.columns < 4) ? 4 : this.columns;
			break;
	}
	this.rows = row;
	this.columns = column;
};

GeekLoader.prototype.generate = function(){
	this.checkType();
	this.checkSize();
	if(this.type == 'life')
	{
		this.positionsLife = [];
		var cantGenerated = 0;
		var limit = parseInt((this.rows * this.columns) * 0.2);
		do
		{
			var h = Math.floor(Math.random() * this.rows + 1);
			var v = Math.floor(Math.random() * this.columns + 1);
			var elementToAdd = `${h}-${v}`;
			if(!~this.positionsLife.indexOf(elementToAdd))
			{
				this.positionsLife.push(elementToAdd);
				cantGenerated++;
			}

		}while(cantGenerated < limit);
	}
	else if(this.type == 'tardis')
	{
		this.positionsLife = this.getTardisPositions();
	}
	else if(this.type == 'invaders')
	{
		this.positionsLife = this.getSpaceInvadersPositions();
	}
};

GeekLoader.prototype.getSpaceInvadersPositions = function(){
	var borderRSize,borderCSize;
	var spaceInvadersPos = [];
	var posNoBordes = ['1-3','1-9','2-4','2-8','3-3','3-4','3-5','3-6','3-7','3-8','3-9','4-2','4-3','4-5','4-6','4-7','4-9','4-10','5-1','5-2','5-3','5-4','5-5','5-6','5-7','5-8','5-9','5-10','5-11','6-1','6-3','6-4','6-5','6-6','6-7','6-8','6-9','6-11','7-1','7-3','7-9','7-11','8-4','8-5','8-7','8-8'];
	if(((this.columns - 11) % 2 )!= 0)
	{
		this.columns++;
	}
	if(((this.rows - 8) % 2) != 0)
	{
		this.rows++;
	}

	borderRSize = (this.rows - 8) / 2;
	borderCSize = (this.columns - 11) / 2;

	for(var i = 1; i <= this.rows;i++)
	{
		for(var j = 1; j <= this.columns;j++)
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

GeekLoader.prototype.getTardisPositions = function(){
	var posTardis = [];

	var data = {
		start:2,
		end:this.columns-1,
		bottom:this.rows-1,
		top:5
	};

	this.lastRowT = this.rows;

	for(var i = data.start; i <= data.end; i++)
	{
		var pos = `${data.bottom}-${i}`;
		posTardis.push(pos);
		var pos2 = `${data.top}-${i}`;
		posTardis.push(pos2);
	}

	for(var i = data.top; i <= data.bottom; i++)
	{
		var pos = `${i}-${data.start}`;
		posTardis.push(pos);
		var pos2 = `${i}-${data.end}`;
		posTardis.push(pos2);
	}

	for(var i = (data.top + 2);i < (data.bottom - 1);i=i+2)
	{
		for(var j = data.start; j <= data.end; j++)
		{
			var pos = `${i}-${j}`;
			posTardis.push(pos);
		}		
	}

	for(var i = (data.start + 1); i <= (data.end - 1);i++)
	{
		var pos = `${(data.top -1)}-${i}`;
		posTardis.push(pos);
	}

	getTopTardis(this);
	
	return posTardis.filter(function(elem, pos) {
		return posTardis.indexOf(elem) == pos;
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
				var pos = `${i}-${middle[j]}`;
				posTardis.push(pos);
			}
		}
	}
};

GeekLoader.prototype.loadBrick = function(){
	var especificBrick = '';
	var classN;
	var loaderDiv = dDL.getElementById(this.contain);
	var initialPos = loaderDiv.offsetLeft;
	var posBrick_x = initialPos;
	var posBrick_y = loaderDiv.offsetTop;
	this.styleLoaded = this.getCSS();
	for ( var i = 1; i <= this.rows; i++ ) 
	{
		for ( var j = 1; j <= this.columns; j++)
		{
			especificBrick += `<div class="brickW" id="brick${i}-${j}-${this.contain}" style="left: ${posBrick_x}px; top: ${posBrick_y}px;${this.styleLoaded.brickW}"></div>`;
			posBrick_x += this.size;
		}
		posBrick_x = initialPos;
		posBrick_y += this.size;
	}
	loaderDiv.innerHTML = especificBrick;
};

GeekLoader.prototype.getCSS = function(){
	var borderS = (this.border) ? 1 : 0;
	var s1 = `position:absolute;height:${this.size}px;width:${this.size}px;background-color:#`;
	var s2 = `;border: solid #`;
	var s3 = ` ${borderS}px;`;
	var sr = `top: 0px;left:0px;height:${parseInt(this.size)}px;width:${parseInt(this.size)}px;background-color:#`;
	var cW,cBr,cB,cA;
	switch(this.style)
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

GeekLoader.prototype.setFigure = function(){
	switch(this.type){
		case 'life':
		case 'tardis':
		case 'invaders':
			var vFigure = this.positionsLife;
			for(var i = 0; i < vFigure.length; i++)
			{
				var brickName= `brick${vFigure[i]}-${this.contain}`;
				var bDiv = dDL.getElementById(brickName);
				this.setStyle(bDiv,'brickB',this.styleLoaded.brickB);
			}
			break;
		case 'ant':
			this.antPos = Math.floor(this.rows / 2)+'-'+Math.floor(this.columns / 2);
			var brickName = `brick${this.antPos}-${this.contain}`;
			var bDiv = dDL.getElementById(brickName);
			var div = dDL.createElement('div');
			div.className = 'brickR';
			div.setAttribute('style',this.styleLoaded.brickR);
			bDiv.appendChild(div);
			break;
	}
};

GeekLoader.prototype.setSize = function(h,v){
	this.rows = (h==undefined) ? 12 : h;
	this.columns = (v==undefined) ? 12 : v;
}

GeekLoader.prototype.start = function(){
	this.generate();
	this.loadBrick();
	this.setFigure();
	var that = this;
	this.timer = setInterval(function(){that.move()},this.time);
};

GeekLoader.prototype.move = function(){
	switch(this.type)
	{
		case 'life': this.moveCellG(); break;
		case 'ant' : this.moveCellA(); break;
		case 'tardis' : this.moveCellT(); break;
		case 'invaders' : this.moveCellI(); break;
	}
};

GeekLoader.prototype.moveCellI = function()
{
	var posToCheck = ['3-1','3-11','4-1','4-11','6-1','6-2','6-10','6-11','7-1','7-11','8-2','8-4','8-5','8-7','8-8','8-10'];
	var borderRSize = (this.rows - 8) / 2;
	var borderCSize = (this.columns - 11) / 2;
	var brickName,className,styleLoad,style;
	for(var i = 1; i < this.rows; i++)
	{
		for(var j = 1; j < this.columns;j++)
		{
			var posCheck = `${i}-${j}`;
			if(~posToCheck.indexOf(posCheck))
			{
				brickName = `brick${i+borderRSize}-${j+borderCSize}-${this.contain}`;
				var bDiv = dDL.getElementById(brickName);
				enter = false;
				if(bDiv.className == 'brickB')
				{
					this.setStyle(bDiv,'brickW',this.styleLoaded.brickW);
				}
				else if(bDiv.className == 'brickW')
				{
					this.setStyle(bDiv,'brickB',this.styleLoaded.brickB);
				}
			}
		}
	}
}

GeekLoader.prototype.setStyle = function(div,cName,styleLoad)
{
	div.className = cName;
	var style = `left:${div.style.left};top:${div.style.top};${styleLoad}`;
	div.setAttribute('style',style);
}

GeekLoader.prototype.moveCellT = function()
{
	var brickName,posName;
	if((this.lastRowT - 1 == 1))
		this.lastRowT = this.rows;
	else
		this.lastRowT--;
	
	for(var j = 1; j <= this.columns; j++)
	{
		posName = `${this.lastRowT}-${j}`;
		brickName = `brick${this.lastRowT}-${j}-${this.contain}`;
		var bDiv = dDL.getElementById(brickName);
		if(bDiv.className == 'brickB')
		{
			this.setStyle(bDiv,'brickW',this.styleLoaded.brickW);
		}
		else if(bDiv.className == 'brickW' && (~this.positionsLife.indexOf(posName)))
		{
			this.setStyle(bDiv,'brickB',this.styleLoaded.brickB);
		}
	}
};

GeekLoader.prototype.moveCellG = function()
{
	var move = false;
	var brickName;

	for ( var i = 1; i <= this.rows; i++ ) 
	{
		for ( var j = 1; j <= this.columns; j++)
		{
			brickName = `brick${i}-${j}-${this.contain}`;
			var bDiv = dDL.getElementById(brickName);
			cantOfLivingCells = countCells(i,j,this);
			if(bDiv.className == 'brickB' && ((cantOfLivingCells < 2) || (cantOfLivingCells > 3)))
			{
				this.setStyle(bDiv,'brickW',this.styleLoaded.brickW);
				move = true;
			}
			else if(bDiv.className == 'brickW' && (cantOfLivingCells == 3))
			{
				this.setStyle(bDiv,'brickB',this.styleLoaded.brickB);
				move = true;
			}
		}
	}
	if(!move)
	{
		this.generate();
		this.setFigure();
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
					var bDiv = dDL.getElementById(brickName);
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

GeekLoader.prototype.moveCellA = function()
{
	var addAnt = `<div class="brickR" style="${this.styleLoaded.brickR}"></div>`;
	var nextPos;
	var antName = `brick${this.antPos}-${this.contain}`;
	var vAntName = this.antPos.split('-');
	var newName,className,classS;
	var noMove = false;
	aDiv = dDL.getElementById(antName);

	vA0 = 0;
	vA1 = 0;

	if(aDiv.className == 'brickW')
	{
		className = 'brickB';
		classS = this.styleLoaded.brickB;
		switch(this.degree)
		{
			case 0:
				if((parseInt(vAntName[0]) - 1) > 0)
				{
					vA0 = -1;
				}
					
				this.degree = 90;
				break;
			case 90:
				if((parseInt(vAntName[1]) + 1) <= this.columns)
				{
					vA1 = 1;
				}
					
				this.degree = 180;
				break;
			case 180:
				if((parseInt(vAntName[0]) + 1) <= this.rows)
				{
					vA0 = 1;
				}

				this.degree = 270;
				break;
			case 270:
				if((parseInt(vAntName[1]) - 1) > 0)
				{
					vA1 = -1;
				}

				this.degree = 0;
				break;
		}
	}
	else
	{
		className = 'brickW';
		classS = this.styleLoaded.brickW;
		switch(this.degree)
		{
			case 0:
				if((parseInt(vAntName[0]) + 1) <= this.rows)
				{
					vA0 = 1;
				}
					
				this.degree = 270;
				break;
			case 90:
				if((parseInt(vAntName[1]) - 1) > 0)
				{
					vA1 = -1;
				}
					
				this.degree = 0;
				break;
			case 180:
				if((parseInt(vAntName[0]) - 1) > 0)
				{
					vA0 = -1;
				}
					
				this.degree = 90;
				break;
			case 270:
				if((parseInt(vAntName[1]) + 1) <= this.columns)
				{
					vA1 = 1;
				}
					
				this.degree = 180;
				break;
		}
	}

	if(vA0 != 0 || vA1 != 0)
	{
		newName = (parseInt(vAntName[0]) + vA0) + '-' + (parseInt(vAntName[1]) + vA1);
		this.antPos = newName;
		aDiv.innerHTML = '';
		this.setStyle(aDiv,className,classS);
		nextPos = `brick${this.antPos}-${this.contain}`;
		dDL.getElementById(nextPos).innerHTML = addAnt;
	}
};

GeekLoader.prototype.stop = function(){
	clearInterval(this.timer);
	this.cleanDesk();
};

GeekLoader.prototype.cleanDesk = function(){
	dDL.getElementById(this.contain).innerHTML = '';
};