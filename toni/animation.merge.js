/* Id: animation.merge.js 2009-12-04
 * 
 * "merge"-Animation (7) (Visualisierung der Auswahl des hoechsten aus je drei Maximis)
 * Visualisierung der Divide-and-Conquer--Loesung des Maximum--Sub-Array--Problems
 * Skriptsprachen / Objektorientierte Programmierung WS 2009/10, Gruppe 5
 * 
 * Copyright (c) 2009 Antonia Boemanns
 * All rights reserved.
 */


// make sure our namespace exists
if (! window.msa) { window.msa = {}; }

msa.Merge = function () {
	
	var maxl = null;
	var rmaxs = null;
	var maxr = null;

	var zahlneu = null;
	
	function init () {
		// create the HTML element in its initial state
		//zahl1 = document.getElementById('Zahl1');
	    //zahl2 = document.getElementById('Zahl2');       
	    //zahl3 = document.getElementById('Zahl3');
		var zahlen = msa.hochfahren.zahlen ();
		rmaxs = zahlen.rmaxs;
		
		var geben = msa.maxHochfahren.geben ();
		maxl = geben.maxl;
		maxr = geben.maxr;
	}
	
   this.merge = function () {
       //var zahlneu;
	   if(Number(maxl.innerHTML) < Number(rmaxs.innerHTML)){
	    zahlneu = rmaxs;
	      }else{
		  zahlneu = maxl;
	    }
	   
	   if(Number(zahlneu.innerHTML)<Number(maxr.innerHTML)){
	       zahlneu = maxr;
	    }
	          
	   zahlneu.style.fontSize = '100%';	
       zahlneu.style.top = '50px';	
       zahlneu.style.left = '445px';	   
       emile(zahlneu, 'font-size:200%', { duration: 3000 });    
         
	}
		
	init();
}

// execute this immediately when the app is loaded; 
msa.schaltstelle.addDomLoadedMessage(function () {
//neues objekt wird erstellt, zahlenreihe wird gezeichnet
	msa.merge = new msa.Merge();
	//funktion wir aufgerrufen 
//	msa.merge.merge();
});