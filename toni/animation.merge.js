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

	//rmaxl und rmaxr werden von maxHochfahren übergeben
	//rmaxs wird von hochfahren übergeben
	var maxl = null;
	var rmaxs = null;
	var maxr = null;
	//maxs ist die höchste Zahl aus maxl, rmaxs, maxr 
	var maxs = null;
	
	function init () {

		var geben = msa.maxHochfahren.geben ();
		maxl = geben.maxl;
		maxr = geben.maxr;
	}
	/*beim Aufruf von 'merge' werden in den 'if-Anweisungen' die übergebenen Inhalte der Variablen maxl, maxr 
	  und rmax (welche rmaxs zugewiesen wird) verglichen und der höchste wert wird an die 'emile-Animation' 
      übergeben. maxl und maxr fahren zusammen auf die Position  
	*/
    this.merge = function (binfertig, rmax) {
		rmaxs = rmax;
	   	var zielPos = 'left:445px;top:50px';
		
		// die übergebenen Zahlen werden verglichen und die höchste wird in die variable maxs geschrieben 
	    if(Number(maxl.innerHTML) < Number(rmaxs.innerHTML)){
			maxs = rmaxs;
	    }else{
			maxs = maxl;
	    }
	   
	    if(Number(maxs.innerHTML)<Number(maxr.innerHTML)){
			maxs = maxr;
	    }
	    //maxs wird auf 200% vergrößert
        emile(maxs, 'font-size:200%', { duration: 3000, after: function(){ 

			maxl.style.visibility = 'hidden';
			maxr.style.visibility = 'hidden'; 
		
			maxs.style.fontSize = '0.14em';	
			
			emile(maxs, 'font-size:1em', { duration: 3000, after: function(){ 
		
					binfertig();}
				}); 
			}		
		});		
		
        emile(maxl, zielPos, { duration: 3000});    
        emile(maxr, zielPos, { duration: 3000});  		

	}
	init();
}

// execute this immediately when the app is loaded; 
msa.schaltstelle.addDomLoadedMessage(function () {

	msa.merge = new msa.Merge();
	
});