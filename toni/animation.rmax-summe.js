/* Id: animation.rmax-summe.js 2009-12-04
 * encoding utf-8
 * 
 * Randmaximorum-Animation (5)+(6) (Visualisierung der Addition beider Randmaximorum; Ergebnis "faehrt hoch")
 * Visualisierung der Divide-and-Conquer--Loesung des Maximum--Sub-Array--Problems
 * Skriptsprachen / Objektorientierte Programmierung WS 2009/10, Gruppe 5
 * 
 * Copyright (c) 2009 Antonia Boemanns
 * All rights reserved.
 */


// make sure our namespace exists
if (! window.msa) { window.msa = {}; }

msa.Hochfahren = function () {
	
	var animationsDauer = 2200;
	
	function init () {
		
	}
	/*beim Aufruf von 'hochfahren' fährt  die übergebene Variable
	  rmaxs auf die Zielposition, zwischen maxl uns maxr in 'animation.merge'
	*/
	this.hochfahren = function (objekt, wennFertig, ergebnis, ergebnisNodes) {
	
		var zielPos = 'top:-200px';
		
		//rmaxs (wird von addieren) übergeben
		var rmaxs = objekt;
		rmaxs.style.zIndex = '2';
		rmaxs.style.background = 'white';
		rmaxs.style.fontSize = '20px';
		
		emile(rmaxs, zielPos, {duration: animationsDauer});
		
		setTimeout(function () {
			var animation = new msa.Merge(ergebnisNodes);
			animation.merge(wennFertig, rmaxs, ergebnis);
		}, animationsDauer);
	}
	init();
}


// execute this immediately when the app is loaded; 
msa.schaltstelle.addDomLoadedMessage(function () {

	msa.hochfahren = new msa.Hochfahren();

});
