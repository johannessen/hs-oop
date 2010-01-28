/* $Id$
 * encoding utf-8
 * 
 * Randmaximum-Animation „positive und negative Blöcke annihilieren sich gegenseitig“ [B], Teil von ③+④
 * Visualisierung der Divide-and-Conquer–Lösung des Maximum–Sub-Array–Problems
 * Skriptsprachen / Objektorientierte Programmierung WS 2009/10, Gruppe 5
 * 
 * Copyright (c) 2010 Arne Johannessen
 * All rights reserved.
 * 
 * This program is free software; you can redistribute it or
 * modify it under the terms of a 3-clause BSD-style license.
 * There is absolutely no warranty for this program!
 * See LICENSE for details.
 */


// make sure our namespace exists
if (! window.msa) { window.msa = {}; }


/**
 * The BlockExplosion animation shows a small expanding puff of smoke atop a
 * block node passed to this constructor call. It is inspired by Mac OS X's
 * Dock puff animation, which is shown when the user drags something out of the
 * Dock; here, the BlockExplosion animation is shown when two blocks collide
 * and are supposed to annihilate each other. Typically this is the case when
 * one is negative and the other positive, and an addition takes place.
 * 
 * This animation is design to run stand-alone.
 * 
 * This animation will appear at the position of block1. Both block1 and block2
 * will be removed from the DOM at some point while this animation is run.
 * 
 * Example:
 *  // these blocks must exist in the DOM and should both be at the same location
 *  var block, existingBlock;
 *  var explosion = new msa.BlockExplosion(block, existingBlock);
 *  explosion.run();
 * 
 * Optionally, the animation object's configuation may be changed before
 * executing run() to start the animation.
 * 
 * @param block1 - a block to take the position from and delete
 * @param block2 - a block to delete
 */
msa.BlockExplosion = function (block1, block2) {
	this.block1 = block1;
	this.block2 = block2;
}
msa.BlockExplosion.constructor = msa.BlockExplosion;


/**
 * The step after which to remove the block1 and block2 nodes from the DOM
 * tree. The lowest possible value is 1, for which the blocks will be removed
 * after the first step.
 */
msa.BlockExplosion.prototype.removeBlocksAtStep = 1;


/**
 * The number of steps in this animation. It might make sense to change this
 * when you use thise code with a different animation image.
 */
msa.BlockExplosion.prototype.stepCount = 5;


/**
 * The number of milliseconds each step will take to run.
 */
msa.BlockExplosion.prototype.millisecondsPerStep = 100;


/**
 * The HTML class name of the DOM node that shows this animation's image.
 */
msa.BlockExplosion.prototype.imageClassName = 'explosion';


/**
 * By default, the puff image is larger than a block, so this negative offset
 * moves the puff image up so that it is centered atop the block. Given in
 * pixels.
 */
msa.BlockExplosion.prototype.imageOffsetTop = -9;


/**
 * By default, the puff image is larger than a block, so this negative offset
 * moves the puff image left so that it is centered atop the block. Given in
 * pixels.
 */
msa.BlockExplosion.prototype.imageOffsetLeft = -9;


/**
 * This method is called once to determine the height of each step of the
 * animation image. The default image's steps are squared, so the default
 * implementation simply returns the image's width.
 * @param imageNode - a reference to the image's DOM node
 */
msa.BlockExplosion.prototype.heightOfImagePerStep = function (imageNode) {
	return imageNode.offsetWidth;
}


/**
 * The actual workhorse of the animation. Call this to get things rolling.
 */
msa.BlockExplosion.prototype.run = function () {
	// make local copies of the prototype properties available to the closure
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
	
	// definie a single step of the animation
	function explosion (step) {
		setTimeout(function () {
			if (! imageNode) { return; }  // fail silently if our DOM node vanished
			
			if (step >= stepCount) {
				if (! imageNode.parentNode) { return; }
				imageNode.parentNode.removeChild(imageNode);  // get rid of this animation's remains
				return;  // end recursion
			}
			
			if (step == removeBlocksAtStep) {
				if (block1 && block1.parentNode) { block1.parentNode.removeChild(block1); }
				if (block2 && block2.parentNode) { block2.parentNode.removeChild(block2); }
			}
			
			// execute next step of the animation
			var backgroundPositionTop = heightOfImagePerStep * step * -1;
			imageNode.style.backgroundPosition = '0 ' + backgroundPositionTop + 'px';
			explosion(step + 1);
			
		}, millisecondsPerStep);
	}
	
	explosion(1);
}
