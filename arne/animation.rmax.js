/* $Id$
 * encoding utf-8
 * 
 * Randmaximum-Animation „Blöcke fliegen runter“ [A], Teil von ③+④ (Visualisierung der Bildung eines einzelnen Randmaximi)
 * Visualisierung der Divide-and-Conquer–Lösung des Maximum–Sub-Array–Problems
 * Skriptsprachen / Objektorientierte Programmierung WS 2009/10, Gruppe 5
 * 
 * Copyright (c) 2009-2010 Arne Johannessen
 * All rights reserved.
 */


// make sure our namespace exists
if (! window.msa) { window.msa = {}; }


/**
 * 
 */
msa.RandmaximumAnimation = function (options) {
	
	
	var x0, y0;
	var x1;
	var containerNode;
	var stackNode;
	var stackedBlocksContainerNode;
	var numberNode;
	var numberMaxNode;
	
	var startFromIndex;
	var columnCount;
	var direction;
	
	var currentValue = 0;
	var currentMaxValue = 0;
	
	var cloneBlocksColumns = [];
	
	var columnIndexOffset;
	var animationDone;
	
	
	/**
	 * 
	 */
	function init () {
		startFromIndex = options.startFromIndex;
		columnCount = options.columnCount;
		direction = columnCount / Math.abs(columnCount);
		animationDone = options.after || function () {};
		
		// determine initial x and y coordinates
		if (options.divider) {
			x0 = options.divider.offsetLeft + 2 * options.divider.offsetWidth * direction;
		}
		else {  // :KILLME:
			x0 = options.x;
		}
		x1 = 0;
		var maxNegative = 0;
		for (var i = 0; Math.abs(columnCount - i) > 0; i += direction) {  // bi-directional for loop
			maxNegative = Math.min(maxNegative, msa.theArray[startFromIndex + i]);
		}
		y0 = maxNegative * -30 + 30;
		
		containerNode = document.createElement('DIV');
		containerNode.className = 'randmaximum-container';
		msa.ui.dom.zahlenleiste.appendChild(containerNode);
		
		stackedBlocksContainerNode = document.createElement('DIV');
		stackedBlocksContainerNode.className = 'stapel-blocks-container';
		containerNode.appendChild(stackedBlocksContainerNode);
		
		stackNode = document.createElement('DIV');
		stackNode.className = 'stapel-temperaturstreifen ' + (direction > 0 ? 'rechts' :'links');
		stackNode.style.top = y0 + 'px';
		stackNode.style.left = x0 + 'px';
		stackNode.style.marginLeft = 0;
		stackNode.style.height = '30px';
		stackNode.style.width = 0;
		containerNode.appendChild(stackNode);
		
		numberNode = document.createElement('DIV');
		numberNode.className = 'stapel-summe';
		numberNode.style.top = (y0 + 35) + 'px';
		numberNode.style.left = (x0 + 1) + 'px';
		containerNode.appendChild(numberNode);
		
		numberMaxNode = document.createElement('DIV');
		numberMaxNode.className = 'stapel-summe maximum';
		numberMaxNode.style.top = (y0 + 35) + 'px';
		numberMaxNode.style.left = (x0 + 1) + 'px';
		numberMaxNode.innerHTML = "0";
		containerNode.appendChild(numberMaxNode);
		
		var zahlen = msa.ui.dom.zahlenleiste.getElementsByClassName('zahlenblock');
		for (var i = 0; Math.abs(columnCount - i) > 0; i += direction) {  // bi-directional for loop
			cloneColumn(zahlen[options.startFromIndex + i]);
		}
		columnIndexOffset = 0;
	}
	
	
	/**
	 * 
	 */
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
	
	
	/**
	 * 
	 */
	this.flush = function () {
		if (! containerNode || ! containerNode.parentNode) { return; }
		containerNode.parentNode.removeChild(containerNode);
	}
	
	
	/**
	 * 
	 */
	function moveDone () {
		if (columnIndexOffset * direction >= cloneBlocksColumns.length) {
			animationDone();
		}
	}
	
	
	/**
	 * 
	 */
	this.moveDownColumn = function (options) {
		
		var moveDoneCallback = options ? options.after || function () {} : function () {};
		var currentSubtotalValue = currentValue;
		var arrayItemValue = msa.theArray[startFromIndex + columnIndexOffset];
		
		// show maximum (stack and number)
		currentValue += arrayItemValue;
		if (currentValue > currentMaxValue) {
			currentMaxValue = currentValue;
			var stackCss = 'width:' + (currentMaxValue * 30) + 'px';
			if (direction < 0) {
				stackCss += ';margin-left:' + (currentMaxValue * -30) + 'px';
			}
			emile(stackNode, stackCss, { duration: 160 * arrayItemValue - 160 + 450 });
			setTimeout(function () {
				numberMaxNode.innerHTML = currentMaxValue;
				numberMaxNode.style.left = (x0 + direction * (currentMaxValue * 30 + 1)) + 'px';
			}, 160 * arrayItemValue - 160 + 450);  // :FIXME:
		}
		
		// show current (animate blocks and update number)
		var blocks = cloneBlocksColumns[Math.abs(columnIndexOffset)];
		function moveDownBlocks (i) {
			if (i < 0) {
				setTimeout(function (i) {
					moveDoneCallback();
					moveDone();
				}, 450);
				return;  // end recursion
			}
			
			// calculate new subtotal value
			var stackGetsLarger = currentSubtotalValue >= 0 && arrayItemValue > 0 || currentSubtotalValue <= 0 && arrayItemValue < 0;
			currentSubtotalValue += (arrayItemValue > 0 ? 1 : -1);
			
			// calculate new x positions
			// NB: we can't cross the vertical divider line; negative and positive blocks must be on the same side of it
			var x = Math.abs(currentSubtotalValue) * 30 * direction;
			var stackOverflow = currentSubtotalValue < 0 && Math.abs(currentSubtotalValue) > currentMaxValue;
			if ( (direction > 0) == stackOverflow ) {
				x += 3;  // account for the maximum mark's width
			}
			var xLeft = x;
			if ( (direction > 0) == stackGetsLarger ) {
				xLeft -= 30;  // // adjust for position root being on the left edge whenever the direction of move is towards the left
			}
			var left = (x0 + xLeft) + 'px';
			var top = (y0) + 'px';
			
			// animate block movement down to the horizontal stack
			var block = blocks[i];
			block.style.visibility = 'visible';
			var blockCss = 'left:' + left + ';top:' + top;
			emile(block, blockCss, { duration: 450, after: function () {
				if (stackGetsLarger) {
					block.parentNode.removeChild(block);
					stackedBlocksContainerNode.appendChild(block);
				}
				else {
					var existingBlock = stackedBlocksContainerNode.childNodes[stackedBlocksContainerNode.childNodes.length - 1];
					var explosion = new msa.BlockExplosion(block, existingBlock);
					explosion.run();
				}
			} });
			
			// show calculated current value and animate its movement along the stack
			var numberCss = 'left:' + (x0 + x) + 'px';
			emile(numberNode, numberCss, { duration: 450, after: function () {
				numberNode.innerHTML = Number(numberNode.innerHTML) + (arrayItemValue > 0 ? 1 : -1);
			} });
			
			// delay recursion so that all blocks don't move at once
			setTimeout(function () {
				moveDownBlocks(i - 1);
			}, 160);
		}
		moveDownBlocks(blocks.length - 1);
		
		columnIndexOffset += direction;
	}
	
	
	/**
	 * 
	 */
	this.containerNode = function () {
		return containerNode;
	}
	
	
	/**
	 * 
	 */
	this.randmaximumNode = function () {
		return numberMaxNode;
	}
	
	
	/**
	 * 
	 */
	this.run = function () {
		var moveDownColumn = this.moveDownColumn;
		function moveColumn (i) {
			if (i < 0) {
				return;
			}
			moveDownColumn({ after: function () {
				setTimeout(function () {
					moveColumn(i - 1);
				}, 600);
			} });
		}
		moveColumn(Math.abs(columnCount) - 1);
	}
	
	
	/**
	 * 
	 */
	this.fadeOut = function () {
		containerNode.style.opacity = 1;
		var flush = this.flush;
		emile(containerNode, 'opacity:0', { duration: 600, after: function () {
			flush();
		} });
	}
	
	
	init();
	
}





// :DEBUG: driver for live debugging without clients
msa.schaltstelle.addDomLoadedMessage(function () {
	var widgetNode = document.createElement('DIV');
	widgetNode.innerHTML = '<INPUT TYPE="button" VALUE="Randmaximum-Animation testen" ONCLICK="testRandmaximumAnimation()">';
	document.body.appendChild(widgetNode);
});
function testRandmaximumAnimation () {
	// :DEBUG: hard-code input values
//	var theStart = 4;
//	var theLength = 3;
//	var theStart = 4;
//	var theLength = -3;
	var theStart = 6;
	var theLength = -3;
	
	// ===> init animation
	var ani = new msa.RandmaximumAnimation({
		startFromIndex: theStart,
		columnCount: theLength,
		divider: document.getElementsByClassName('trennstrich')[0],
		
		after: function () {
			document.documentElement.style.backgroundColor = '#eee';
			emile(document.documentElement, 'background-color:#090', { duration: 120, after: function () {
				emile(document.documentElement, 'background-color:#eee', { duration: 180, after: function () {
					ani.containerNode().style.opacity = 1;
					emile(ani.containerNode(), 'opacity:0', { duration: 1400, after: function () {
						ani.flush();
					} });
				} });
			} });
		},
		
	});
	
	ani.run();
}
