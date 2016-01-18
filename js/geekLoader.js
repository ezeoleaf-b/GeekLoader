var dDL = document;

function GeekLoader(){
	this.type = 'life';
	this.setSize();
	this.positionsLife = [];
	this.generate();
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
	return ['life','ant','tardis'];
};

GeekLoader.prototype.checkType = function(){
	if(!~this.getTypesAvailable().indexOf(this.type))
		this.type = 'life';
};

GeekLoader.prototype.checkSize = function(){
	if(this.type=='tardis')
	{
		if(this.rows < 14) this.rows = 14;
		if(this.columns < 9) this.columns = 9;
	}
	else
	{
		if(this.rows < 4) this.rows = 4;
		if(this.columns < 4) this.columns = 4;
	}
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

		}while(cantGenerated < limit)
	}
	else if(this.type == 'tardis')
	{
		this.positionsLife = this.getTardisPositions();
	}
};

GeekLoader.prototype.getTardisData = function(){
	var tData = {}

	if(this.columns < 6)
	{
		tData.start = 1;
		tData.end = this.columns;
		tData.bottom = this.rows;
		tData.top = 3;
	}
	else
	{
		tData.start = 2;
		tData.end = this.columns - 1;
		tData.bottom = this.rows - 1;
		tData.top = 5;
	}

	return tData;
};

GeekLoader.prototype.getTardisPositions = function(){
	var posTardis = [];

	var data = this.getTardisData();
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
			especificBrick += `<div class="brickW" id="brick${i.toString()}-${j.toString()}-${this.contain}" style="left: ${posBrick_x}px; top: ${posBrick_y}px;${this.styleLoaded.brickW}"></div>`;
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
	cssStyle = {
		brickW:`${s1}${cW}${s2}${cBr}${s3}`,
		brickB:`${s1}${cB}${s2}${cBr}${s3}`,
		brickR:`${sr}${cA}${s2}${cBr}${s3}`
	}
	return cssStyle;
};

GeekLoader.prototype.setFigure = function(){
	switch(this.type){
		case 'life':
		case 'tardis':
			var vFigure = this.positionsLife;
			for(var i = 0; i < vFigure.length; i++)
			{
				var brickName= `brick${vFigure[i]}-${this.contain}`;
				var bDiv = dDL.getElementById(brickName);
				bDiv.className = 'brickB';
				var style = `left:${bDiv.style.left};top:${bDiv.style.top};${this.styleLoaded.brickB}`;
				bDiv.setAttribute('style',style);
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
	this.loadBrick();
	this.setFigure();
	var that = this;
	this.timer = setInterval(function(){that.move()},this.time);
};

GeekLoader.prototype.move = function(){
	if(this.type == 'life')
		this.moveCellG();
	else if(this.type == 'ant')
		this.moveCellA();
	else if(this.type == 'tardis')
		this.moveCellT();
};

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
				bDiv.className = 'brickW';
				var style = `left:${bDiv.style.left};top:${bDiv.style.top};${this.styleLoaded.brickW}`;
				bDiv.setAttribute('style',style);
		}
		else if(bDiv.className == 'brickW' && (~this.positionsLife.indexOf(posName)))
		{
				bDiv.className = 'brickB';
				var style = `left:${bDiv.style.left};top:${bDiv.style.top};${this.styleLoaded.brickB}`;
				bDiv.setAttribute('style',style);
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
					bDiv.className = 'brickW';
					var style = `left:${bDiv.style.left};top:${bDiv.style.top};${this.styleLoaded.brickW}`;
					bDiv.setAttribute('style',style);
					move = true;
			}
			else if(bDiv.className == 'brickW' && (cantOfLivingCells == 3))
			{
					bDiv.className = 'brickB';
					var style = `left:${bDiv.style.left};top:${bDiv.style.top};${this.styleLoaded.brickB}`;
					bDiv.setAttribute('style',style);
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

	if(aDiv.className == 'brickW')
	{
		className = 'brickB';
		classS = `left:${aDiv.style.left};top:${aDiv.style.top};${this.styleLoaded.brickB}`;
		switch(this.degree)
		{
			case 0:			
				if((parseInt(vAntName[0]) - 1) > 0)
					newName = (parseInt(vAntName[0]) - 1) + '-' + vAntName[1];
					
				this.degree = 90;
				break;
			case 90:
				if((parseInt(vAntName[1]) + 1) <= this.columns)
					newName = vAntName[0]+ '-' + (parseInt(vAntName[1]) + 1);
					
				this.degree = 180;
				break;
			case 180:
				if((parseInt(vAntName[0]) + 1) <= this.rows)
					newName = (parseInt(vAntName[0]) + 1) + '-' + vAntName[1];

				this.degree = 270;
				break;
			case 270:
				if((parseInt(vAntName[1]) - 1) > 0)
					newName = vAntName[0]+ '-' + (parseInt(vAntName[1]) - 1);

				this.degree = 0;
				break;
		}
	}
	else
	{
		className = 'brickW';
		classS = `left:${aDiv.style.left};top:${aDiv.style.top};${this.styleLoaded.brickW}`;
		switch(this.degree)
		{
			case 0:
				if((parseInt(vAntName[0]) + 1) <= this.rows)
					newName = (parseInt(vAntName[0]) + 1) + '-' + vAntName[1];
					
				this.degree = 270;
				break;
			case 90:
				if((parseInt(vAntName[1]) - 1) > 0)
					newName = vAntName[0]+ '-' + (parseInt(vAntName[1]) - 1);
					
				this.degree = 0;
				break;
			case 180:
				if((parseInt(vAntName[0]) - 1) > 0)
					newName = (parseInt(vAntName[0]) - 1) + '-' + vAntName[1];
					
				this.degree = 90;
				break;
			case 270:
				if((parseInt(vAntName[1]) + 1) <= this.columns)
					newName = vAntName[0]+ '-' + (parseInt(vAntName[1]) + 1);
					
				this.degree = 180;
				break;
		}
	}
	if(newName!=undefined)
	{
		this.antPos = newName;
		aDiv.innerHTML = '';
		aDiv.className = className;
		aDiv.setAttribute('style',classS);
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