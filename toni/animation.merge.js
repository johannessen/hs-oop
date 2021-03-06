/* $Id$
 * encoding utf-8
 * 
 * "merge"-Animation (7) (Visualisierung der Auswahl des hoechsten aus je drei Maximis)
 * Visualisierung der Divide-and-Conquer--Loesung des Maximum--Sub-Array--Problems
 * 
 * Copyright (c) 2010 Arne Johannessen
 * Copyright (c) 2009 Antonia Boemanns
 * All rights reserved.
 * 
 * This program is free software; you can redistribute it or
 * modify it under the terms of a 3-clause BSD-style license.
 * There is absolutely no warranty for this program!
 * See LICENSE for details.
 */


// make sure our namespace exists
if (! window.msa) { window.msa = {}; }

msa.Merge = function (ergebnisNodes) {
	
	var animationsDauer = 750 / msa.theSpeed;
	
	//rmaxl und rmaxr werden von maxHochfahren übergeben
	//rmaxs wird von hochfahren übergeben
	var maxl = null;
	var rmaxs = null;
	var maxr = null;
	//maxs ist die höchste Zahl aus maxl, rmaxs, maxr 
	var maxs = null;
	
	function init () {
		maxl = ergebnisNodes.links;
		maxr = ergebnisNodes.rechts;
	}
	
	/* beim Aufruf von 'merge' werden in den 'if-Anweisungen' die übergebenen Inhalte der Variablen maxl, maxr 
	 * und rmax (welche rmaxs zugewiesen wird) verglichen und der höchste wert wird an die 'emile-Animation' 
	 * übergeben. maxl und maxr fahren zusammen auf die Position  
	 */
	this.merge = function (binfertig, rmax, ergebnis) {
		rmaxs = rmax;
		var rmaxsNumber = ergebnis.randmaximumLinkerTeil + ergebnis.randmaximumRechterTeil;
		var zielPos = 'left:' + (rmax.offsetLeft) + 'px';
		
		// die übergebenen Zahlen werden verglichen und die höchste wird in die variable maxs geschrieben 
		var maxsNumber;
		if(ergebnis.links < rmaxsNumber){
			maxs = rmaxs;
			maxsNumber = rmaxsNumber;
		}else{
			maxs = maxl;
			maxsNumber = ergebnis.links;
		}
	   
		if(maxsNumber<ergebnis.rechts){
			maxs = maxr;
			maxsNumber = ergebnis.rechts;
		}
		//maxs wird auf 200% vergrößert
		emile(maxs, 'font-size:40px', { duration: animationsDauer * 0.533, after: function(){ 
			
			maxl.style.visibility = 'hidden';
			maxr.style.visibility = 'hidden'; 
			rmaxs.style.visibility = 'hidden'; 
			
			maxs.style.visibility = 'visible'; 
			maxs.style.fontSize = '40px';	
			maxs.style.zIndex = 2;  // eigentlich "initial" bzw. undefined, aber der IE mag das nicht -aj3
			
			emile(maxs, 'font-size:20px', { duration: animationsDauer, after: function(){ 
				binfertig(maxs);}
			}); 
		} });		
		
		var durationMove = animationsDauer * 0.693;
		emile(maxl, zielPos, { duration: durationMove });    
		emile(maxr, zielPos, { duration: durationMove });  		
		
		// loest Problem Nr. 10 (siehe Bugliste) -aj3
		maxs.style.zIndex = 10;
		maxs.style.backgroundColor = 'white';
	}
	
	init();
}
