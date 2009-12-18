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

	var max1 = null;
	var max2 = null;

	function init(){
		max1 = document.getElementById('max1');
		max2 = document.getElementById('max2');
	}
	
	
	this.MaxHochfahren = function (){
		max1.style.top = '200px';
		max2.style.top = '200px';
		emile(max1, 'left:415px;top:100px', { duration: 3000});
		emile(max2, 'left:475px;top:100px', { duration: 3000});
		
		setTimeout(function () {
			msa.hochfahren.hochfahren();
		}, 3000);
	
	}


	init();

}

msa.schaltstelle.addDomLoadedMessage(function () {
//neues objekt wird erstellt, zahlenreihe wird gezeichnet
	msa.MaxHochfahren = new msa.MaxHochfahren();
	//funktion wir aufgerrufen 
	msa.MaxHochfahren.MaxHochfahren();
});
// to be continued...
