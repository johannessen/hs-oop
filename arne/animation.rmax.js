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
	
//	var b1, b2;
//	this.b1 = function () { return b1; }
//	this.b2 = function () { return b2; }
	
	var columns = [];
	
	
	function init (options) {
//		startFromIndex: theStart,
//		length: theLength,
		
		containerNode = document.createElement('DIV');
		containerNode.className = 'randmaximum-container';
		msa.ui.dom.zahlenleiste.appendChild(containerNode);
		
		var zahlenleiste = msa.ui.dom.zahlenleiste;
		for (var i = 0; i < options.length; i++) {
			columns[columns.length] = zahlenleiste.childNodes[options.startFromIndex + i];
		}
		
		x0 = columns[0].offsetLeft;
		y0 = 50;  // :TODO: figure this one out in a way that makes sense
		x1 = x0;
		
/*
		// :TODO: fix this mess
		var allBlocks = document.getElementsByClassName('Einheit');
		var o1 = [
			allBlocks[allBlocks.length - 7],
			allBlocks[allBlocks.length - 6],
			allBlocks[allBlocks.length - 5],
			allBlocks[allBlocks.length - 4],
		];
		var o2 = [
			allBlocks[allBlocks.length - 3],
			allBlocks[allBlocks.length - 2],
			allBlocks[allBlocks.length - 1],
		];
		b1 = [
			blockNodeClone(o1[0]),
			blockNodeClone(o1[1]),
			blockNodeClone(o1[2]),
			blockNodeClone(o1[3]),
		];
		b2 = [
			blockNodeClone(o2[0]),
			blockNodeClone(o2[1]),
			blockNodeClone(o2[2]),
		];
*/
	}
	
	
	this.flush = function () {
		containerNode.parentNode.removeChild(containerNode);
	}
	
	
	function blockNodeList (columnNode) {
		return columnNode.childNodes;
	}
	
	
	function blockNodeClone (node) {
		var clone = node.cloneNode(false);  // false: don't clone child nodes
		containerNode.appendChild(clone);
		return clone;
	}
	
	
	this.moveDownColumn = function (options) {
//		var blocks = blockNodeList(options.column);
		
		var blocks = blockNodeList(columns[options.columnIndexOffset]);
		
		function moveDownBlocks (i) {
			if (i < 0) { return; }
			var block = blocks[i];
			var left = (x1) + 'px';
			x1 += 30;
			var top = (y0) + 'px';
			var css = 'left:' + left + ';top:' + top;
			block.style.left = block.offsetLeft + 'px';
			block.style.top = block.offsetTop + 'px';  // WebKit needs this, IE perhaps too
			block.style.bottom = 'auto';
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
		length: theLength,
//		x: 405,  // :TODO: maybe a ref to the divider element would be ideal?
	});
	
	// :DEBUG: simulate rmax loop
	for (var i = 0; i < theLength; i++) {
//		(function () {
//			setTimeout(function (i) {
				
				// ===> call single animation step
				ani.moveDownColumn({
					columnIndexOffset: i,
	//				blocks: ani.b2(),
				});
				
				// :DEBUG: end of rmax loop
//			}, i * 2000 + 1);
//		})(i);
	}
	
	// :DEBUG: define testing space
	msa.randmaximumAnimation = ani;
}




// Randmaximum-Animation „positive und negative Blöcke annihilieren sich gegenseitig“ [B], Teil von [3+4]

msa.RandmaximumExplosion = function () {
	// :TODO:
	throw 'not yet implemented';
}
