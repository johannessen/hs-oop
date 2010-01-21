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
 * The RandmaximumAnimation is one of the major parts of this project, as the
 * divide-and-conquer approach to the maximum sub-array problem relies on the
 * edge maximum (Randmaximum or just 'rmax') to join the two parts after
 * recursion has run its course. The rmax behaviour is not always intuitive.
 * This animation attempts to make it easy to understand how the rmax works by
 * behaving as in an additive numbering system (as opposed to a positional
 * system).
 * 
 * This animation is not designed to run stand-alone. It requires access to a
 * properly initialised msa.ui.dom.
 * 
 * Example:
 *  new msa.RandmaximumAnimation({
 *      startFromIndex: 6,
 *      columnCount: -3,
 *      divider: document.getElementsByClassName('trennstrich')[0],
 *      after: function () { alert('done'); },
 *  }).run();
 * 
 * @param options - a configuration object with the following properties:
 *  startFromIndex: index of the msa.theArray item nearest to the dividing
 *   point (required)
 *  columnCount: number of columns to animate (negative for right-hand side
 *   rmax) (required)
 *  divider: a reference to a DOM node at the horizontal position of the
 *   dividing point (required)
 *  after: a callback function reference that will be called when the animation
 *   is done (required)
 *  leftIndex: left-most msa.theArray item to be considered for this
 *   animation's vertical position (optional)
 *  rightIndex: right-most msa.theArray item to be considered for this
 *   animation's vertical position (optional)
 *  x1: (ignored, no longer supported)
 */
msa.RandmaximumAnimation = function (options) {
	
	// some variables for easier handling with the closures
	
	// initial x0 and y0 and current x1 pixel position of the animation
	var x0, y0;
	var x1 = 0;  // relative to x0
	
	// various DOM node references we need at one point or other
	var containerNode;  // container node for this animation (for positioning)
	var stackNode;  // the background 'progress bar' to the maximum marker
	var stackedBlocksContainerNode;  // a container for all the blocks on the stack
	var numberNode;  // the 'current' (scrolling) value
	var numberMaxNode;  // the 'maximum' (jumping) value
	
	// copies of configuration options for more convenient access
	var startFromIndex;
	var columnCount;
	var direction;
	var animationDone;  // delegate function
	
	// state variables
	var columnIndexOffset = 0;  // current msa.theArray index, offset by startFromIndex
	var currentValue = 0;  // current subtotal of the rmax sum
	var currentMaxValue = 0;  // highest subtotal of the rmax sum up till now
	var cloneBlocksColumns = [];  // clones blocks for columns from Zahlenleiste
	
	
	/**
	 * Read the options passed to us as parameter to the constructor and
	 * configure the animation accordingly. The essential DOM nodes are also
	 * created.
	 */
	function init () {
		startFromIndex = options.startFromIndex;
		columnCount = options.columnCount;
		direction = columnCount / Math.abs(columnCount);
		animationDone = options.after || function () {};
		
		initCoordinates();
		createDomNodes();
	}
	
	
	/**
	 * Determines initial x0 and y0 coordinates to start the animation at in
	 * accordance with the parameters passed to the constructor call.
	 */
	function initCoordinates () {
		x0 = options.divider.offsetLeft + 2 * options.divider.offsetWidth * direction;
		
		/* We want to prevent overlapping those columns that we receive blocks from,
		 * because that'd be an ugly visual effect. So the idea is to determine the
		 * maximum height of all negative columns in the vicinity of the divider line.
		 * This algorithm may consider more columns than strictly necessary in some
		 * situations (e. g. odd number of array items), but that's of no concern to
		 * us -- the rmax stack will simply have more clearance than necessary.
		 */
		var maxNegative = 0;
		var maxNegativeIndicesDefined = options.leftIndex != undefined && options.rightIndex != undefined;
		if (maxNegativeIndicesDefined) {
			for (var i = options.leftIndex; i <= options.rightIndex; i++) {
				maxNegative = Math.min(maxNegative, msa.theArray[i]);
			}
		}
		else {
			/* Since we didn't receive absolute array indices, we can only take
			 * into consideration those columns that we actively operate on, not
			 * any others that might be affected in ways this animation doesn't
			 * know about.
			 */
			for (var i = 0; Math.abs(columnCount - i) > 0; i += direction) {  // bi-directional for loop
				maxNegative = Math.min(maxNegative, msa.theArray[startFromIndex + i]);
			}
		}
		y0 = maxNegative * -30 + 30;
	}
	
	
	/**
	 * Creates all the DOM nodes required for this animation, including their
	 * class name, style and other attributes.
	 */
	function createDomNodes () {
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
	}
	
	
	/**
	 * To avoid disturbing the existing Zahlenleiste graphic, we clone its blocks
	 * and use the copies instead of the originals for this animation. This
	 * function creates those clones.
	 * 
	 * @param columnNode - reference to the DOM node of the column to be cloned
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
	 * Call this method to remove all of this animation's DOM elements from the
	 * DOM tree. Calling this method multiple times is allowed, but has no effect.
	 * 
	 * Warning: the results of this method when called while the animation is
	 * running are explicitly undefined.
	 */
	this.flush = function () {
		if (! containerNode || ! containerNode.parentNode) { return; }
		containerNode.parentNode.removeChild(containerNode);
	}
	
	
	/**
	 * This function calls the callback function supplied to the constructor if
	 * the animation has finished running.
	 */
	function moveDone () {
		if (columnIndexOffset * direction >= cloneBlocksColumns.length) {
			animationDone();
		}
	}
	
	
	/**
	 * The actual workhorse of the animation. Call this to get things rolling.
	 * 
	 * Moves down exactly one column (the next one in line, that's the first one
	 * of those that hasn't been moved down yet). Needs to be called multiple
	 * times to perform the entire animation. See run() for a convenience method
	 * with an example implementation of that.
	 * 
	 * Note that the options parameter accepts only one optional property. The
	 * options object may be empty or undefined.
	 * 
	 * @param options - a configuration object with the following property:
	 *  after: a callback function reference that will be called when this step
	 *  of the animation is done (optional)
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
	 * Accessor to the container DOM node that is an ancestor of all this
	 * animation's DOM elements. May be useful for things like animating a fade
	 * out of the entire rmax animation.
	 * 
	 * @return reference to the rmax container node
	 */
	this.containerNode = function () {
		return containerNode;
	}
	
	
	/**
	 * Accessor to the DOM node that contains the result value of rmax -- that is,
	 * the largest of all possible sub-array values of those that are anchored at
	 * the divider at one end.
	 * 
	 * This is what you need if you want to further animate this animation's
	 * result in the larger context of the divide-and-conquer MSA algorithm demo.
	 * 
	 * @return reference to the maximum value display's node
	 */
	this.randmaximumNode = function () {
		return numberMaxNode;
	}
	
	
	/**
	 * Convenience method that sets up the animation of the complete set of
	 * moveDownColumn() calls. Clients should use this method if they don't want
	 * to make those individual calls themselves manually. If you want custom
	 * timings, you're out of luck and actually need to call moveDownColumn()
	 * for yourself.
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
	 * Convenience method to slow down the flush() by means of an opacity
	 * reduction animation. In contrast to flush() itself, this method may not be
	 * called multiple times.
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
