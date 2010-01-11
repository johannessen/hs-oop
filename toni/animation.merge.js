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
		
		//rmaxs werden von hochfahren übergeben
//		var zahlen = msa.hochfahren.zahlen ();
//		rmaxs = zahlen.rmaxs;
		//rmaxl und rmaxr werden von maxHochfahren übergeben
		var geben = msa.maxHochfahren.geben ();
		maxl = geben.maxl;
		maxr = geben.maxr;
	}
	
   this.merge = function (binfertig, rmax) {
		rmaxs = rmax;
	   	var zielCss = 'left:445px;top:50px';
		
	    if(Number(maxl.innerHTML) < Number(rmaxs.innerHTML)){
	    zahlneu = rmaxs;
	      }else{
		  zahlneu = maxl;
	    }
	   
	    if(Number(zahlneu.innerHTML)<Number(maxr.innerHTML)){
	       zahlneu = maxr;
	    }
	    
        emile(zahlneu, 'font-size:200%', { duration: 3000
			, after: function(){ 

			
				maxl.style.visibility = 'hidden';
				maxr.style.visibility = 'hidden'; 


		
	    zahlneu.style.fontSize = '100%';	
        zahlneu.style.top = '50px';	
        zahlneu.style.left = '445px';
        zahlneu.style.background = 'white';
	    zahlneu.style.zIndex = '2';
		msa.ui.dom.canvas.appendChild(zahlneu);

				binfertig();

				}	

			
		});		
		
        emile(maxl, zielCss, { duration: 3000
		});    
        emile(maxr, zielCss, { duration: 3000
		});  		
	


	}
		 
	init();
}

// execute this immediately when the app is loaded; 
msa.schaltstelle.addDomLoadedMessage(function () {
//neues objekt wird erstellt, zahlenreihe wird gezeichnet
	msa.merge = new msa.Merge();
	//alert('fertig1')
	//funktion wir aufgerrufen 
//	msa.merge.merge();
});