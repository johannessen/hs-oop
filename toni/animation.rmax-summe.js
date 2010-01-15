/* Id: animation.rmax-summe.js 2009-12-04
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
	//rmaxs (wird von addieren) übergeben
	var rmaxs = null;
	
	function init () {
		
	}
	
	this.hochfahren = function (objekt) {
	
		var zielPos = 'left:445px;top:50px';
		
		rmaxs = objekt;
		rmaxs.style.top = '300px';
		rmaxs.style.zIndex = '2';
		rmaxs.style.background = 'white';
		rmaxs.style.fontSize = '20px';
		
		emile(rmaxs, zielPos, {duration: 3000});
		
		setTimeout(function () {
			var wennFertig = function(){
				alert('fertig')
	        };
			msa.merge.merge(wennFertig, rmaxs);
		}, 3000);
	}
	init();
}


// execute this immediately when the app is loaded; 
msa.schaltstelle.addDomLoadedMessage(function () {

	msa.hochfahren = new msa.Hochfahren();

});