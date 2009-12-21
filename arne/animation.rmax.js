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
	
	var cloneBlocksColumns = [];
	
	
	function init (options) {
		containerNode = document.createElement('DIV');
		containerNode.className = 'randmaximum-container';
		msa.ui.dom.zahlenleiste.appendChild(containerNode);
		
		var zahlen = msa.ui.dom.zahlenleiste.getElementsByClassName('zahlenblock');
		for (var i = 0; i < options.columnCount; i++) {
			cloneColumn(zahlen[options.startFromIndex + i]);
		}
		
		x0 = options.x;  // :TODO: figure this one out in a way that makes sense
		y0 = 50;  // :TODO: figure this one out in a way that makes sense
		x1 = x0;
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
		var blocks = cloneBlocksColumns[options.columnIndexOffset];
		
		function moveDownBlocks (i) {
			if (i < 0) { return; }
			var block = blocks[i];
			var left = (x1) + 'px';
			x1 += 30;
			var top = (y0) + 'px';
			var css = 'left:' + left + ';top:' + top;
			block.style.visibility = 'visible';
			setTimeout(function () {
				emile(block, css, { duration: 450, after: moveDownBlocks(i - 1) });
			}, 160);  // :BUG: there is an initial delay before this animation starts of exactly this duration; is that a problem?
		}
		moveDownBlocks(blocks.length - 1);
	}
	
	
	init(options);
	
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





// Randmaximum-Animation „positive und negative Blöcke annihilieren sich gegenseitig“ [B], Teil von [3+4]

msa.RandmaximumExplosion = function () {
	// :TODO:
	throw 'not yet implemented';
}
