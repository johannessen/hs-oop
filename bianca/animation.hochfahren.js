/* Id: algorithmus.js 2009-12-04
 * 
 * Hochfahr-Animation (1)+(2) (bereits bekanntes, linkes/rechtes Ergebnis "faehrt hoch"; einschl. trivialer Fall)
 * Visualisierung der Divide-and-Conquer--Loesung des Maximum--Sub-Array--Problems
 * Skriptsprachen / Objektorientierte Programmierung WS 2009/10, Gruppe 5
 * 
 * Copyright (c) 2009 Bianca Foerster
 * All rights reserved.
 */


// make sure our namespace exists
if (! window.msa) { window.msa = {}; }

msa.MaxHochfahren = function (){

	var maxl = null;
	var maxr = null;

	function init(){
		maxl = document.getElementById('maxl');
		maxr = document.getElementById('maxr');
	}
	
	this.maxHochfahren = function (){
		maxl.style.top = '200px';
		maxl.style.left = '415px';
		maxr.style.top = '200px';
		maxr.style.left = '475px';
		emile(maxl, 'top:50px', { duration: 3000});
		emile(maxr, 'top:50px', { duration: 3000});
		
//		setTimeout(function () {
//			msa.hochfahren.hochfahren();
//		}, 3000);
	}
	
	this.hochf = function (stelle, wert, binfertig) {
	    // animation
		msa.maxHochfahren.maxHochfahren();  // anzupassen
		
//		setTimeout(function () {
			binfertig();
//		}, 3000);
	}
	
	this.geben = function () {
	    return{
			maxl:maxl,
			maxr:maxr
		}
	}
	init();
}

msa.schaltstelle.addDomLoadedMessage(function () {
//neues objekt wird erstellt, zahlenreihe wird gezeichnet
	msa.maxHochfahren = new msa.MaxHochfahren();
	//funktion wir aufgerrufen 
	//msa.MaxHochfahren.MaxHochfahren();
	setTimeout(function () {
		msa.maxHochfahren.hochf(6, 4, function(){});
	}, 3000);
});
// to be continued...
