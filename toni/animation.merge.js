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

	var zahlneu = null;
	
	function init () {
		// create the HTML element in its initial state
		//zahl1 = document.getElementById('Zahl1');
	    //zahl2 = document.getElementById('Zahl2');       
	    //zahl3 = document.getElementById('Zahl3');
		
		
		//zahl1 = document.getElementById(parseInt('Zahl1'));
	    //zahl2 = document.getElementById(parseInt('Zahl2'));       
	    //zahl3 = document.getElementById(parseInt('Zahl3'));
		
		
		
		var zahlen = msa.hochfahren.zahlen ();
		zahl1 = zahlen.zahl1
		zahl2 = zahlen.zahl2
		zahl3 = zahlen.zahl3
	}
	
	
   this.merge = function () {
       //var zahlneu;
	   if(Number(zahl1.innerHTML) < Number(zahl2.innerHTML)){
	    zahlneu = zahl2;
	      }else{
		  zahlneu = zahl1;
	    }
	   
	   
	   if(Number(zahlneu.innerHTML)<Number(zahl3.innerHTML)){
	       zahlneu = zahl3;
	    }
	          
	   zahlneu.style.fontSize = '100%';	
       zahlneu.style.top = '100px';	
       zahlneu.style.left = '435px';	   
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


