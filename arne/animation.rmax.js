/* $Id$
 * encoding utf-8
 * 
 * Randmaximi-Animation ③+④ (Visualisierung der Bildung eines einzelnen Randmaximi)
 * Visualisierung der Divide-and-Conquer–Lösung des Maximum–Sub-Array–Problems
 * Skriptsprachen / Objektorientierte Programmierung WS 2009/10, Gruppe 5
 * 
 * Copyright (c) 2009 Arne Johannessen
 * All rights reserved.
 */


// make sure our namespace exists
if (! window.msa) { window.msa = {}; }


// Randmaximum-Animation „Blöcke fliegen runter“ [A], Teil von [3+4]

msa.RandmaximumAnimation = function (options) {
	
	
	var x0, y0;
	var x1;
	var containerNode;
	var barNode;
	var numberNode;
	var numberMaxNode;
	
	var startFromIndex;
	var columnCount;
	
	var currentValue = 0;
	var currentMaxValue = 0;
	
	var cloneBlocksColumns = [];
	
	
	function init (options) {
		startFromIndex = options.startFromIndex;
		columnCount = options.columnCount;
		x0 = options.x;  // :TODO: figure this one out in a way that makes sense
		y0 = 50;  // :TODO: figure this one out in a way that makes sense
		x1 = x0;
		
		containerNode = document.createElement('DIV');
		containerNode.className = 'randmaximum-container';
		msa.ui.dom.zahlenleiste.appendChild(containerNode);
		
		barNode = document.createElement('DIV');
		barNode.className = 'balken-temperaturstreifen';
		barNode.style.top = y0 + 'px';
		barNode.style.left = x0 + 'px';
		barNode.style.height = '30px';
		barNode.style.width = 0;
		containerNode.appendChild(barNode);
		
		numberNode = document.createElement('DIV');
		numberNode.className = 'balken-summe';
		numberNode.style.top = (y0 + 35) + 'px';
		numberNode.style.left = (x0 + 1) + 'px';
		containerNode.appendChild(numberNode);
		
		numberMaxNode = document.createElement('DIV');
		numberMaxNode.className = 'balken-summe maximum';
		numberMaxNode.style.top = (y0 + 35) + 'px';
		numberMaxNode.style.left = (x0 + 1) + 'px';
		containerNode.appendChild(numberMaxNode);
		
		var zahlen = msa.ui.dom.zahlenleiste.getElementsByClassName('zahlenblock');
		for (var i = 0; i < options.columnCount; i++) {
			cloneColumn(zahlen[options.startFromIndex + i]);
		}
	}
	
	
	function cloneColumn (columnNode) {
		var cloneBlocks = [];
		for (var i = 0; i < columnNode.childNodes.length; i++) {
			var blockOriginal = columnNode.childNodes[i];
			var blockClone = blockOriginal.cloneNode(false);  // false: don't clone any child nodes
			blockClone.style.top = (columnNode.offsetTop + i * 30) + 'px';
			blockClone.style.left = columnNode.offsetLeft + 'px';
			blockClone.style.visibility = 'hidden';
			containerNode.appendChild(blockClone);
			cloneBlocks[cloneBlocks.length] = blockClone;
		}
		cloneBlocksColumns[cloneBlocksColumns.length] = cloneBlocks;
	}
	
	
	this.flush = function () {
		containerNode.parentNode.removeChild(containerNode);
	}
	
	
	this.moveDownColumn = function (options) {
		
		// show maximum (bar and number)
		var arrayItemValue = msa.theArray[startFromIndex + options.columnIndexOffset];
		currentValue += arrayItemValue;
		if (currentValue > currentMaxValue) {
			currentMaxValue = currentValue;
			var barCss = 'width:' + (currentMaxValue * 30) + 'px';
			emile(barNode, barCss, { duration: 160 * arrayItemValue - 160 + 450 });
			setTimeout(function () {
				numberMaxNode.innerHTML = currentMaxValue;
				numberMaxNode.style.left = (x0 + currentMaxValue * 30 + 1) + 'px';
			}, 160 * arrayItemValue - 160 + 450);  // :FIXME:
		}
		
		// show current (animate blocks and update number)
		var blocks = cloneBlocksColumns[options.columnIndexOffset];
		function moveDownBlocks (i) {
			if (i < 0) { return; }
			
			// calculate new position
			if (arrayItemValue < 0) {
				x1 -= 30;
			}
			var left = (x1) + 'px';
			if (arrayItemValue > 0) {
				x1 += 30;
			}
			var top = (y0) + 'px';
			
			// animate block movement down to the horizontal bar
			var block = blocks[i];
			block.style.visibility = 'visible';
			var blockCss = 'left:' + left + ';top:' + top;
			emile(block, blockCss, { duration: 450, after: function () {
				if (arrayItemValue < 0) {
					new msa.RandmaximumExplosion(block);
				}
			} });
			
			// show calculated current value and animate its movement along the bar
			var numberCss = 'left:' + (x1 + 1) + 'px';
			emile(numberNode, numberCss, { duration: 450, after: function () {
				numberNode.innerHTML = Number(numberNode.innerHTML) + ((arrayItemValue > 0) ? 1 : -1);
			} });
			
			// delay recursion so that all blocks don't move at once
			setTimeout(function () {
				moveDownBlocks(i - 1);
			}, 160);  // :BUG: there is an initial delay before this animation starts of exactly this duration; is that a problem?
		}
		moveDownBlocks(blocks.length - 1);
	}
	
	
	init(options);
	
}





// Randmaximum-Animation „positive und negative Blöcke annihilieren sich gegenseitig“ [B], Teil von [3+4]

msa.RandmaximumExplosion = function (block) {
	
	// set up initial state of explosion's animation
	var imageNode = document.createElement('DIV');
	imageNode.className = 'explosion';
	imageNode.style.top = (block.offsetTop - 1) + 'px';
	imageNode.style.left = (block.offsetLeft - 1) + 'px';
	block.parentNode.appendChild(imageNode);
	
	function explosion (step) {
		setTimeout(function () {
			if (step > 4) {
				imageNode.parentNode.removeChild(imageNode);  // get rid of this animation's remains
				block.parentNode.removeChild(block);  // get rid of the clone's remains
				return;
			}
			if (step == 1) {  // :KLUDGE:
				// get rid of the original (positive) block
				for (var i = 0; i < block.parentNode.childNodes.length; i++) {
					if (block.parentNode.childNodes[i].className == 'Einheit') {
						block.parentNode.removeChild(block.parentNode.childNodes[i]);
						break;
					}
				}
			}
			
			block.style.visibility = 'hidden';
			var heightOfImagePerStep = imageNode.offsetWidth;
			var backgroundPositionTop = heightOfImagePerStep * step * -1;
			imageNode.style.backgroundPosition = '0 ' + backgroundPositionTop + 'px';
			explosion(step + 1);
			
		}, 100);
	}
	
	explosion(1);
}





// :DEBUG: driver for live debugging without clients
msa.schaltstelle.addDomLoadedMessage(function () {
	var widgetNode = document.createElement('DIV');
	widgetNode.innerHTML = '<INPUT TYPE="button" VALUE="Randmaximum-Animation testen" ONCLICK="testRandmaximumAnimation()">';
	document.body.appendChild(widgetNode);
});
function testRandmaximumAnimation () {
	// :DEBUG: clean up testing space
	if (msa.randmaximumAnimation) { msa.randmaximumAnimation.flush(); }
	
	// :DEBUG: hard-code input values
	var theStart = 6;
	var theLength = 2;
	
	// ===> init animation
	var ani = new msa.RandmaximumAnimation({
		startFromIndex: theStart,
		columnCount: theLength,
		x: 405,  // :TODO: maybe a ref to the divider element would be ideal?
	});
	
	// :DEBUG: simulate rmax loop
	for (var i = 0; i < theLength; i++) {
		(function () {
			setTimeout(function (i) {
				
				// ===> call single animation step
				ani.moveDownColumn({
					columnIndexOffset: i,
				});
				
				// :DEBUG: end of rmax loop
			}, i * 2000 + 1, i);
		})(i);
	}
	
	// :DEBUG: define testing space
	msa.randmaximumAnimation = ani;
}
