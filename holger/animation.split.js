/* Id: animation.split.js 2009-12-04
 * 
 * "split"–Animation (Visualisierung der Einschraenkung der Zahlenleiste auf den momentan betrachteten Sub-Array)
 * Visualisierung der Divide-and-Conquer--Loesung des Maximum--Sub-Array--Problems
 * Skriptsprachen / Objektorientierte Programmierung WS 2009/10, Gruppe 5
 * 
 * Copyright (c) 2009 Holger Schropp
 * All rights reserved.
 */


// make sure our namespace exists
if (! window.msa) { window.msa = {}; }


// to be continued...



msa.Trennstrich = function  () {;

	var trennstrich = null;
	var binfertig;
	
	function init () {
		// create the HTML element in its initial state
//		node = document.createElement('DIV');
//		node.className = 'trennstrich-example';
	}
	
	this.zeichnenAdapter = function (l, r, callback) {
		
		var zahlen = msa.ui.dom.zahlenleiste.getElementsByClassName('zahlenblock');
		
		var index = Math.floor((l + r) / 2) + 1
		var zahl = zahlen[index]; 
		
		
		//  bereich hervorheben
		for (var i=0; i < l; i++)
		{
			zahlen[i].className = 'zahlenblock aus';
			
					
		}	
			
		for (var j=l; j <= r; j++)
		{
			zahlen[j].className = 'zahlenblock';
		}
		
		for (var k=r+1; k < zahlen.length; k++)
		{
			zahlen[k].className = 'zahlenblock aus';
		}
				
			
			
		
		
		
		
		
		
		// trennstrich zeichnen
		if (l == r) {
			callback();  // :TODO:
		}
		else {
			
			binfertig = callback;
			
			index = Math.floor((l + r) / 2) + 1
			zahl = zahlen[index];
			var zahlPositionX = zahl.offsetLeft;
			
			this.zeichnen(zahlPositionX - 10);
		}
	}
	
	
		
			
				
		
	this.zeichnen = function (left) {
	
		// falls  der strich schon existiert, loeschen
		var trennstrich = msa.ui.dom.trennstrich;
		if (trennstrich) {
			trennstrich.parentNode.removeChild(trennstrich);
		}
		
		// add the existing element to the HTML page
		var canvasNode = msa.ui.dom.canvas;
		
		trennstrich = document.createElement('DIV');
		trennstrich.className = 'trennstrich';
		trennstrich.style.left = left + 'px';
		trennstrich.style.top = '300px';
		trennstrich.style.width = '3px';
		canvasNode.appendChild(trennstrich);
		
		// make our newly added element available to the rest of the app
		msa.ui.dom.trennstrich = trennstrich;
		
				
		// do a little animation, just for fun
		//Dauer der Animation in millisekunden
		emile(trennstrich, 'height:400px;top:20px', { duration: 300, after: function () {
			binfertig();
		} });
		
		
	}
	
	init ();
}
msa.trennstrich = new msa.Trennstrich();

//zahlenleiste.appendChild(trennstrich);
msa.schaltstelle.addDomLoadedMessage(function () {
	
	msa.trennstrich.zeichnenAdapter(function(){});
	
});



