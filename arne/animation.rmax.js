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
	
	var b1, b2;
	this.b1 = function () { return b1; }
	this.b2 = function () { return b2; }
	
	
	function init (options) {
		x0 = options.x;
		y0 = 50;  // :TODO: figure this one out in a way that makes sense
		x1 = x0;
		containerNode = document.createElement('DIV');
		containerNode.className = 'randmaximum-container';
		msa.ui.dom.zahlenleiste.appendChild(containerNode);
		
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
	}
	
	
	this.flush = function () {
		containerNode.parentNode.removeChild(containerNode);
	}
	
	
	function blockNodeList (columnNode) {
		// :TODO:
		throw 'not yet implemented';
	}
	
	
	function blockNodeClone (node) {
		var clone = node.cloneNode(false);
		containerNode.appendChild(clone);
		return clone;
	}
	
	
	this.moveDownColumn = function (options) {
//		var blocks = blockNodeList(options.column);
		var blocks = options.blocks;  // :TODO: fix this mess
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
	if (window.ani) {
		ani.flush();
	}
	ani = new msa.RandmaximumAnimation({
		x: 405,  // :TODO: maybe a ref to the divider element would be ideal?
	});
	ani.moveDownColumn({
		column: null,
		blocks: ani.b1(),
	});
	setTimeout(function () {
		ani.moveDownColumn({
			column: null,
			blocks: ani.b2(),
		});
	}, 2000);
}




// Randmaximum-Animation „positive und negative Blöcke annihilieren sich gegenseitig“ [B], Teil von [3+4]

msa.RandmaximumExplosion = function () {
	// :TODO:
	throw 'not yet implemented';
}
