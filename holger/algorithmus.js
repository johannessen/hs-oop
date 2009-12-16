/* Id: algorithmus.js 2009-12-04
 * 
 * MSA-Algorithmus (Numerik und ereignisbasierter Wiedereinstieg)
 * Visualisierung der Divide-and-Conquer--Loesung des Maximum--Sub-Array--Problems
 * Skriptsprachen / Objektorientierte Programmierung WS 2009/10, Gruppe 5
 * 
 * Copyright (c) 2009 Holger Schropp
 * All rights reserved.
 */


// make sure our namespace exists
if (! window.msa) { window.msa = {}; }

msa.Algorithmus = function () {
	
	var array;
	var fertig = null;
	var linkeGrenze, rechteGrenze;
	var mitte;
	var ergebnis = {};
	
	this.durchlaufen = function (options, l, r) {
		fertig = options.fertig;
		array = options.array;
		linkeGrenze  =l;
		rechteGrenze =r;
		// animation .split
		setTimeout(this.trivialUndSplit, 1);
//		msa.split.animieren(l, r, this);
	}
	
	
	this.trivialUndSplit = function () {
		
		//trivialer Fall?
		if (linkeGrenze >= rechteGrenze ) {
			// trivialer Fall => Ergebnis melden
			
			if (linkeGrenze > rechteGrenze) {
				fertig (0);  // leerer Array
			}
			if (array[linkeGrenze] < 0) {
				fertig (0);  // nur ein Element (negativ => Maximum ist leerer Sub-Array)
			}
			else {
				fertig (array[linkeGrenze]);  // nur ein Element
			}
			
		}
		else {
			// kein trivialer Fall => loesen mit Divide and Conquer
			
			mitte = Math.floor((linkeGrenze + rechteGrenze) / 2);
			
			setTimeout(rekursionLinks, 1);
		}
	}
	
	// Split (Divide)
	function rekursionLinks ()
	{
		var linkerTeil = new msa.Algorithmus()
		var options = {};
		options.fertig = rekursionRechts;
		options.array = array;
		setTimeout(function () {
			linkerTeil.durchlaufen(options, linkeGrenze, mitte);
		}, 1);
		
	}
	
	function rekursionRechts (ergebnisLinks) {
		ergebnis.links = ergebnisLinks;
		
		var rechterTeil = new msa.Algorithmus()
		var options = {};
		options.fertig = randmaxima;
		options.array = array;
		setTimeout(function () {
			rechterTeil.durchlaufen(options, mitte + 1, rechteGrenze);
		}, 1);
		
	}
	
	function randmaxima (ergebnisRechts) {
		ergebnis.rechts = ergebnisRechts;
		
		
		
/*		
		
		SubArray leftMaximum = findMaximumSubArray(... leftIndex, centerIndex);
		SubArray rightMaximum = this.findMaximumSubArray(rightPart); // analog
		join(...);
	}

	// Join (Merge)
	function join (...)
	{
		leftPart.findRightEdgeMaximum();
		rightPart.findLeftEdgeMaximum();
		SubArray centerMaximum = new SubArray(array, leftPart.getBeginIndex(), rightPart.getEndIndex());
		centerMaximum.setSum(leftPart.getSum() + rightPart.getSum());
		
		msa.animation.rmax_summe(...);
	}		

	// groesstes der drei Maxima ermitteln (noch Join)
	function findMax ()
	{
		
		
		
		
*/
		ergebnis.mitte = 0;
		
		// groesstes der drei Maxima ermitteln (noch Join)
	
		var maximaleSumme = ergebnis.mitte;
		if (ergebnis.links > maximaleSumme) 
		{
			maximaleSumme = ergebnis.links;
		}
		if (ergebnis.rechts > maximaleSumme) 
		{
			maximaleSumme = ergebnis.rechts;
		}
	
		
//		msa.animation.merge(...);
			
//		msa.animation.hochfahren(...);
//		msa.split.animieren(l, r, ...);  // gleiche, originale grenzen l und r
		
		// Ergebnis zurueckgeben
		//msa.schaltstelle....(maximum);
		setTimeout(function () {
			fertig(maximaleSumme, 'Ergebnis');
		}, 1);
	}
}

//msa.algorithmus = new msa.Algorithmus();


