var dDL = document;

function GeekLoader(){
	this.type = 'life';
	this.setSize();
	this.positionsLife = [];
	this.generate();
	this.destiny = 'loader';
	this.size = 5;
	this.timer;
	this.border = true;
	this.antPos;
	this.degree = 0;
	this.time = 500;
};

GeekLoader.prototype.getTypesAvailable = function(){
	return ['life','ant']
}

GeekLoader.prototype.checkType = function(){
	if(this.getTypesAvailable().indexOf(this.type) == -1)
		this.type = 'life';
}

GeekLoader.prototype.checkSize = function(){
	if(this.sizeH < 4) this.sizeH = 4;
	if(this.sizeV < 4) this.sizeV = 4;
}

GeekLoader.prototype.generate = function(){
	this.checkType();
	this.checkSize();
	if(this.type == 'life')
	{
		this.positionsLife = [];
		var cantGenerated = 0;
		var limit = parseInt((this.sizeH * this.sizeV) * 0.2);
		do
		{
			var h = Math.floor(Math.random() * this.sizeH + 1);
			var v = Math.floor(Math.random() * this.sizeV + 1);
			var elementToAdd = `${h}-${v}`;
			if(this.positionsLife.indexOf(elementToAdd) == -1)
			{
				this.positionsLife.push(elementToAdd);
				cantGenerated++;
			}

		}while(cantGenerated < limit)
	}
};

GeekLoader.prototype.loadBrick = function(){
	var especificBrick = '';
	var classN;
	var loaderDiv = dDL.getElementById(this.destiny);
	var initialPos = loaderDiv.offsetLeft;
	var posBrick_x = initialPos;
	var posBrick_y = loaderDiv.offsetTop;

	if(this.border)
		classN='brickW';
	else
		classN='brickWNoB';

	for ( var i = 1; i <= this.sizeH; i++ ) 
	{
		for ( var j = 1; j <= this.sizeV; j++)
		{
			especificBrick += `<div class="${classN}" id="brick${i.toString()}-${j.toString()}" style="left: ${posBrick_x}px; top: ${posBrick_y}px;"></div>`;
			posBrick_x += this.size;
		}
		posBrick_x = initialPos;
		posBrick_y += this.size;
	}
	dDL.getElementById(this.destiny).innerHTML = especificBrick;
}

GeekLoader.prototype.setFigure = function(){
	switch(this.type){
		case 'life':
			var vFigure = this.positionsLife;
			for(var i = 0; i < vFigure.length; i++)
			{
				var brickName= `brick${vFigure[i]}`;
				dDL.getElementById(brickName).className = 'brickB';
			}
			break;
		case 'ant':
			this.antPos = Math.floor(this.sizeH / 2)+'-'+Math.floor(this.sizeV / 2);
			var brickName = `brick${this.antPos}`;
			var div = dDL.createElement('div');
			div.className = 'brickR';
			dDL.getElementById(brickName).appendChild(div);
			break;
	}
};

GeekLoader.prototype.setSize = function(h,v){
	this.sizeH = (h==undefined) ? 12 : h;
	this.sizeV = (v==undefined) ? 12 : v;
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
	else
		this.moveCellA();
};

GeekLoader.prototype.moveCellG = function()
{
	var move = false;
	var brickName,classN;

	if(this.border)
		classN='brickW';
	else
		classN='brickWNoB';

	for ( var i = 1; i <= this.sizeH; i++ ) 
	{
		for ( var j = 1; j <= this.sizeV; j++)
		{
			brickName = `brick${i}-${j}`;
			cantOfLivingCells = countCells(i,j);
			if(dDL.getElementById(brickName).className == 'brickB')
			{
				if((cantOfLivingCells < 2) || (cantOfLivingCells > 3))
				{
					dDL.getElementById(brickName).className = classN;
					move = true;
				}
			}
			else if(dDL.getElementById(brickName).className == classN)
			{
				if((cantOfLivingCells == 3))
				{
					dDL.getElementById(brickName).className = 'brickB';
					move = true;
				}
			}
		}
	}
	if(move == false)
	{
		this.generate();
		this.setFigure();
	}

	function countCells(x,y){
		var brickName;
		var livingCells = 0;
		for(var i = -1; i <= 1; i++)
		{
			for(var j = -1; j <= 1;j++)
			{
				if(i != 0 || j != 0)
				{
					brickName = `brick${x+i}-${y+j}`;
					if(dDL.getElementById(brickName) != null)
					{
						if(dDL.getElementById(brickName).className == 'brickB')
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
	var addAnt = '<div class="brickR"></div>';
	var nextPos;
	var antName = `brick${this.antPos}`;
	var vAntName = this.antPos.split('-');
	var newName,className,classN;
	var noMove = false;

	if(this.border)
		classN='brickW';
	else
		classN='brickWNoB';

	if(dDL.getElementById(antName).className == classN)
	{
		className = 'brickB';
		switch(this.degree)
		{
			case 0:			
				if((parseInt(vAntName[0]) - 1) > 0)
					newName = (parseInt(vAntName[0]) - 1) + '-' + vAntName[1];
					
				this.degree = 90;
				break;
			case 90:
				if((parseInt(vAntName[1]) + 1) <= this.sizeV)
					newName = vAntName[0]+ '-' + (parseInt(vAntName[1]) + 1);
					
				this.degree = 180;
				break;
			case 180:
				if((parseInt(vAntName[0]) + 1) <= this.sizeH)
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
		className = classN;
		switch(this.degree)
		{
			case 0:
				if((parseInt(vAntName[0]) + 1) <= this.sizeH)
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
				if((parseInt(vAntName[1]) + 1) <= this.sizeV)
					newName = vAntName[0]+ '-' + (parseInt(vAntName[1]) + 1);
					
				this.degree = 180;
				break;
		}
	}
	if(newName!=undefined)
	{
		this.antPos = newName;
		dDL.getElementById(antName).innerHTML = '';
		dDL.getElementById(antName).className = className;
		nextPos = `brick${this.antPos}`;
		dDL.getElementById(nextPos).innerHTML = addAnt;
	}
};

GeekLoader.prototype.stop = function(){
	clearInterval(this.timer);
	this.cleanDesk();
};

GeekLoader.prototype.cleanDesk = function(){
	dDL.getElementById(this.destiny).innerHTML = '';
};