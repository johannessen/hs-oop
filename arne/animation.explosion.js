/* $Id$
 * encoding utf-8
 * 
 * Randmaximum-Animation „positive und negative Blöcke annihilieren sich gegenseitig“ [B], Teil von ③+④
 * Visualisierung der Divide-and-Conquer–Lösung des Maximum–Sub-Array–Problems
 * Skriptsprachen / Objektorientierte Programmierung WS 2009/10, Gruppe 5
 * 
 * Copyright (c) 2010 Arne Johannessen
 * All rights reserved.
 */


// make sure our namespace exists
if (! window.msa) { window.msa = {}; }


msa.BlockExplosion = function (block1, block2) {
	this.block1 = block1;
	this.block2 = block2;
}
msa.BlockExplosion.constructor = msa.BlockExplosion;

msa.BlockExplosion.prototype.removeBlocksAtStep = 1;
msa.BlockExplosion.prototype.stepCount = 5;
msa.BlockExplosion.prototype.millisecondsPerStep = 100;
msa.BlockExplosion.prototype.imageClassName = 'explosion';
msa.BlockExplosion.prototype.imageOffsetTop = -9;
msa.BlockExplosion.prototype.imageOffsetLeft = -9;

msa.BlockExplosion.prototype.heightOfImagePerStep = function (imageNode) {
	return imageNode.offsetWidth;
}

msa.BlockExplosion.prototype.run = function () {
	var block1 = this.block1;
	var block2 = this.block2;
	var removeBlocksAtStep = this.removeBlocksAtStep;
	var stepCount = this.stepCount;
	var millisecondsPerStep = this.millisecondsPerStep;
	
	// set up initial state of explosion's animation
	var imageNode = document.createElement('DIV');
	imageNode.className = this.imageClassName;
	imageNode.style.top = (block1.offsetTop + this.imageOffsetTop) + 'px';
	imageNode.style.left = (block1.offsetLeft + this.imageOffsetLeft) + 'px';
	block1.parentNode.appendChild(imageNode);
	var heightOfImagePerStep = this.heightOfImagePerStep(imageNode);
	
	function explosion (step) {
		setTimeout(function () {
			if (! imageNode) { return; }  // fail silently if some of our DOM nodes vanished
			
			if (step >= stepCount) {
				if (! imageNode.parentNode) { return; }
				imageNode.parentNode.removeChild(imageNode);  // get rid of this animation's remains
				return;  // end recursion
			}
			
			if (step == removeBlocksAtStep) {
				if (block1 && block1.parentNode) { block1.parentNode.removeChild(block1); }
				if (block2 && block2.parentNode) { block2.parentNode.removeChild(block2); }
			}
			
			var backgroundPositionTop = heightOfImagePerStep * step * -1;
			imageNode.style.backgroundPosition = '0 ' + backgroundPositionTop + 'px';
			explosion(step + 1);
			
		}, millisecondsPerStep);
	}
	
	explosion(1);
}
