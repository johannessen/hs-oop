/* Id: zeichnen.zahlenleiste.js 2009-12-04
 * 
 * Zahlenleiste zeichnen
 * Visualisierung der Divide-and-Conquer--Loesung des Maximum--Sub-Array--Problems
 * Skriptsprachen / Objektorientierte Programmierung WS 2009/10, Gruppe 5
 * 
 * Copyright (c) 2009 Bianca Foerster
 * All rights reserved.
 */


// make sure our namespace exists
if (! window.msa) { window.msa = {}; }


// Implementierungsvorschlag von Arne:

msa.Zahlenleiste = function () {
	
	
	var node = null;
	
	
	function init () {
		// create the HTML element in its initial state
		node = document.createElement('DIV');
		node.className = 'zahlenleiste-example';
		node.style.left = '300px';
		node.style.width = '0';
	}
	
	
	this.zeichnen = function () {
		// add the existing element to the HTML page
		var canvasNode = msa.schaltstelle.domNode('canvas');
		canvasNode.appendChild(node);
		
		// make our newly added element available to the rest of the app
		msa.schaltstelle.addNodeWithName(node, 'zahlenleiste');
		
		// do a little animation, just for fun
		emile(node, 'left:10px;width:580px', { duration: 3000 });
	}
	
	
	init();
	
}


// execute this immediately when the app is loaded
msa.schaltstelle.addDomLoadedMessage(function () {
	msa.zahlenleiste = new msa.Zahlenleiste();
	msa.zahlenleiste.zeichnen();
});
