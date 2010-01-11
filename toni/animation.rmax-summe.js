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

// 2 variablen, position, dann 3 zahlen, dom-elemente - div im canvas, später referenz auf dom elemente, div mit beispielwert: var zahl1Node = document.getElementById('Zahl1'); 
msa.Hochfahren = function () {

	var rmaxs = null;
	
	function init () {
		// create the HTML element in its initial state
	    //rmaxs = document.getElementById('rmaxs');       
		

		
		//rmaxs werden von addition übergeben
//	var weitergeben = msa.addieren.weitergeben ();
//	rmaxs = weitergeben.rmaxs;
	
	}
	
	this.hochfahren = function (objekt) {
		rmaxs = objekt;
		rmaxs.style.top = '300px';
		rmaxs.style.zIndex = '2';
		rmaxs.style.background = 'white';
		rmaxs.style.fontSize = '20px';
		
		emile(rmaxs, 'left:445px;top:50px', {
			duration: 3000
		});
		
		setTimeout(function () {
			var wennFertig = function(){
//				alert('fertig')
	        };
			msa.merge.merge(wennFertig, rmaxs);
		}, 3000);
	}
	/*
  this.zahlen = function () {
  return{
		rmaxs:rmaxs,
	}
  }
  */
	init();
}


// execute this immediately when the app is loaded; 
msa.schaltstelle.addDomLoadedMessage(function () {
	//neues objekt wird erstellt, zahlenreihe wird gezeichnet
	msa.hochfahren = new msa.Hochfahren();

	//funktion wird aufgerrufen 
	//msa.hochfahren.hochfahren();
});



