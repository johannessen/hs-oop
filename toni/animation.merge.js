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
	
	
	
	var zahl1 = null;
	var zahl2 = null;
	var zahl3 = null;
	
	function init () {
		// create the HTML element in its initial state
		var zahlen = msa.hochfahren.zahlen ();
		zahl1 = zahlen.zahl1
		zahl2 = zahlen.zahl2
		zahl3 = zahlen.zahl3
	}
	
	
   this.merge = function () {
/*
       var zahlvonoben;
	   
	   if(zahl1 <zahl2){
	   zahlvonoben = zahl2;
	      else if(zahl1>zahl2){
		  nehme zahl1;
		  }
	   }
	   
	   if(zahlvon oben if<zahl3){
	       nehme zahl3;
	      else if(zahlvonoben > zahl3){
		     nehmen zaahlvonoben;
		  }
	   }
	          
	   zahlvonoben.style.fontSize = '100%';	   
       emile(zahlvonoben, 'font-size:200%', { duration: 3000 });    
         
*/
	}
		
	init();
	
}


// execute this immediately when the app is loaded; 
msa.schaltstelle.addDomLoadedMessage(function () {
//neues objekt wird erstellt, zahlenreihe wird gezeichnet
	msa.merge = new msa.Merge();
	//funktion wir aufgerrufen 
	msa.merge.merge();
});


