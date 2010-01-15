/* Id: algorithmus.js 2010-01-13
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

	var max = null;
	
	var verzoegerung = 3000;

	function init(){
		max = document.getElementById('max');
	}
	
	
	this.maxHochfahren = function (stelle){
		max = document.createElement('DIV');
		max.className = 'max';
		
		msa.ui.dom.canvas.appendChild(max);
		
		max.style.top = '200px';
		max.style.left = msa.zahlenleiste.positionLeft(stelle) + 'px';
		max.innerHTML = msa.theArray[stelle];
		msa.ui.vorzeichenAnbringen(max);
		emile(max, 'top:50px', { duration: verzoegerung});
		
		
//		setTimeout(function () {
//			msa.hochfahren.hochfahren();
//		}, 3000);
	}
	
	this.hochf = function (stelle, binfertig) {
	    // animation
		msa.maxHochfahren.maxHochfahren(stelle); 
		setTimeout(function () {
			binfertig();
		}, verzoegerung);
	}
	
	
	this.geben = function () {
	    return{
			trivialElement:max,
			maxl:document.getElementById('maxl'),
			maxr:document.getElementById('maxr')
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
		msa.maxHochfahren.hochf(0, function(){
		//alert('fertig mit trivialem fall')
		});
	}, 3000);
});
// to be continued...
