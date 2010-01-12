/* $Id$
 * 
 * MSA-Algorithmus (Numerik und ereignisbasierter Wiedereinstieg)
 * Visualisierung der Divide-and-Conquer--Loesung des Maximum--Sub-Array--Problems
 * Skriptsprachen / Objektorientierte Programmierung WS 2009/10, Gruppe 5
 * 
 * Copyright (c) 2009 Holger Schropp
 * All rights reserved.
 * 
 * Changes 2010-01-12 by Arne Johannessen
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
		
		trivialUndSplit();
	}
	
	
	function trivialUndSplit () {
		
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
//				msa.maxHochfahren.hochf(linkeGrenze, array[linkeGrenze], function(){
					fertig (array[linkeGrenze]);  // nur ein Element
//				});
			 }
			
		}
		else {
			// kein trivialer Fall => loesen mit Divide and Conquer
			
			// Split (Divide)
			mitte = Math.floor((linkeGrenze + rechteGrenze) / 2);
			
			// animation .split
			msa.trennstrich.zeichnenAdapter(mitte + 1, function () {
				rekursionLinks();
			});
		}
	}
	
	
	function rekursionLinks () {
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
		options.fertig = theJoin;
		options.array = array;
		setTimeout(function () {
			rechterTeil.durchlaufen(options, mitte + 1, rechteGrenze);
		}, 1);
	}
	
	
	function theJoin (ergebnisRechts) {
		ergebnis.rechts = ergebnisRechts;
		
		if (rechteGrenze - linkeGrenze > 1) {  // :FIX: prevent double drawing of divider (:TODO: remove this)
			msa.trennstrich.zeichnenAdapter(mitte + 1, function () {
				randmaximumLinkerTeil();
			});
		}
		else {
			randmaximumLinkerTeil();
		}
	}
	
	
	function randmaximumLinkerTeil () {
		
		// Sub-Array von rechts nach links durchlaufen und rechtes Randmaximum bestimmen
		var maximaleSumme = 0;
		var summe = 0;
		for (var i = mitte; i >= linkeGrenze; i--) {
			summe += array[i];
			if (summe > maximaleSumme) {
				maximaleSumme = summe;
			}
		}
		ergebnis.mitte = maximaleSumme;
		
		var animation = new msa.RandmaximumAnimation({
			startFromIndex: mitte,
			columnCount: linkeGrenze - mitte - 1,
			divider: document.getElementsByClassName('trennstrich')[0],  // :BUG: dirty hack, but seems to work and is only used for horizontal positioning anyway
			after: function () {
				animation.containerNode().style.opacity = 1;
				emile(animation.containerNode(), 'opacity:0', { duration: 600, after: function () {  // :TODO: this animation should better be handled by msa.RandmaximumAnimation itself
					animation.flush();
					randmaximumRechterTeil();
				} });
			},
		});
		animation.run();
	}
	
	
	function randmaximumRechterTeil () {
		
		// Sub-Array von links nach rechts durchlaufen und linkes Randmaximum bestimmen
		var maximaleSumme = 0;
		var summe = 0;
		for (var i = mitte + 1; i <= rechteGrenze; i++) {
			summe += array[i];
			if (summe > maximaleSumme) {
				maximaleSumme = summe;
			}
		}
		ergebnis.mitte = ergebnis.mitte + maximaleSumme;
		
		var animation = new msa.RandmaximumAnimation({
			startFromIndex: mitte + 1,
			columnCount: rechteGrenze - mitte,
			divider: document.getElementsByClassName('trennstrich')[0],  // :BUG: dirty hack, but seems to work and is only used for horizontal positioning anyway
			after: function () {
				animation.containerNode().style.opacity = 1;
				emile(animation.containerNode(), 'opacity:0', { duration: 600, after: function () {  // :TODO: this animation should better be handled by msa.RandmaximumAnimation itself
					animation.flush();
					ergebnisAuswaehlen();
				} });
			},
		});
		animation.run();
	}
	
		
	function ergebnisAuswaehlen () {
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


