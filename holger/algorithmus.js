/* $Id$
 * UTF-8
 * 
 * MSA-Algorithmus (Numerik und ereignisbasierter Wiedereinstieg)
 * Visualisierung der Divide-and-Conquer--Loesung des Maximum--Sub-Array--Problems
 * 
 * Copyright (c) 2010 Arne Johannessen
 * Copyright (c) 2009 Holger Schropp
 * All rights reserved.
 * 
 * This program is free software; you can redistribute it or
 * modify it under the terms of a 3-clause BSD-style license.
 * There is absolutely no warranty for this program!
 * See LICENSE for details.
 */


// make sure our namespace exists
if (! window.msa) { window.msa = {}; }


msa.Algorithmus = function (invariantOptions) {
	
	// invariant options
	var invariants = {
		array: null,
		interruptHook: null
	}
	
	// varying options
	var fertig = null;
	var linkeGrenze, rechteGrenze;
	
	// local ('instance') variables
	var mitte;
	var ergebnis = {};
	var ergebnisNodes = {};
	var animationen = {};
	var self = this;
	
	
	this.applyOptions = function (options) {
		if (! options) {
			return;
		}
		if (options instanceof Function) {
			fertig = options;
			return;
		}
		if (options.array) { invariants.array = options.array; }
		if ('left' in options) { linkeGrenze = options.left; }
		if ('right' in options) { rechteGrenze = options.right; }
		if (options.fertig) { fertig = options.fertig; }
		if (options.interruptHook) { invariants.interruptHook = options.interruptHook; }
	}
	this.applyOptions(invariantOptions);
	
	
	function validateOptions () {
		var optionsValid = invariants.array && invariants.array instanceof Array
				&& typeof linkeGrenze != 'undefined' && linkeGrenze >= 0 && linkeGrenze < invariants.array.length
				&& typeof rechteGrenze != 'undefined' && rechteGrenze >= 0 && rechteGrenze < invariants.array.length
				&& linkeGrenze <= rechteGrenze
				&& typeof fertig == 'function';
		if (! optionsValid) {
			throw 'Options to MSA algorithm are incomplete or illegal:'
					+ ' array=' + String(invariants.array)
					+ ' left=' + String(linkeGrenze)
					+ ' right=' + String(rechteGrenze)
					+ ' fertig=' + String(fertig)
					+ ' interruptHook=' + String(invariants.interruptHook);
		}
	}
	
	
	function interruptAt (position) {
		return invariants.interruptHook ? invariants.interruptHook(self, position) : false;
	}
	
	
	this.durchlaufen = function (varyingOptions, l, r) {
		this.applyOptions(varyingOptions);
		if (typeof l != 'undefined') { linkeGrenze = l; }
		if (typeof r != 'undefined') { rechteGrenze = r; }
		
		console.log( 'Options to MSA algorithm are:'
				+ ' array=' + String(invariants.array)
				+ ' left=' + String(linkeGrenze)
				+ ' right=' + String(rechteGrenze)
				+ ' fertig=' + String(fertig)
				+ ' interruptHook=' + String(invariants.interruptHook) );
		validateOptions();
		
		// animation .split
		msa.trennstrich.zeichnenAdapter(linkeGrenze, rechteGrenze, trivialUndSplit);
//		trivialUndSplit();
	}
	
	
	function trivialUndSplit () {
		
		//trivialer Fall?
		if (linkeGrenze >= rechteGrenze ) {
			// trivialer Fall => Ergebnis melden
			
			var animation = new msa.MaxHochfahren();
			if (linkeGrenze > rechteGrenze) {
				fertig (0, null);  // leerer Array
			}
			else {
				animation.hochf(linkeGrenze, function(){
					var trivialErgebnis = invariants.array[linkeGrenze];
					var trivialErgebnisNode = animation.geben().trivialElement;
					if (trivialErgebnis < 0 && invariants.array.length == 1) { trivialErgebnis = 0; }  // loest Problem Nr. 6 (siehe Bugliste) -aj3
					fertig (trivialErgebnis, trivialErgebnisNode);  // nur ein Element
				});
			}
			
		}
		else {
			// kein trivialer Fall => loesen mit Divide and Conquer
			
			// Split (Divide)
			mitte = Math.floor((linkeGrenze + rechteGrenze) / 2);
			rekursionLinks();
		}
	}
	
	
	function rekursionLinks () {
		var linkerTeil = new msa.Algorithmus(invariants);
		setTimeout(function () {
			linkerTeil.durchlaufen(rekursionRechts, linkeGrenze, mitte);
		}, 1);
	}
	
	
	function rekursionRechts (ergebnisLinks, ergebnisLinksNode) {
		ergebnis.links = ergebnisLinks;
		ergebnisNodes.links = ergebnisLinksNode;
		
		var rechterTeil = new msa.Algorithmus(invariants);
		setTimeout(function () {
			rechterTeil.durchlaufen(theJoin, mitte + 1, rechteGrenze);
		}, 1);
	}
	
	
	function theJoin (ergebnisRechts, ergebnisRechtsNode) {
		ergebnis.rechts = ergebnisRechts;
		ergebnisNodes.rechts = ergebnisRechtsNode;
		
		msa.trennstrich.zeichnenAdapter(linkeGrenze, rechteGrenze, function () {
			randmaximumLinkerTeil();
		}, true);
	}
	
	
	function randmaximumLinkerTeil () {
		interruptAt('randmaximumLinkerTeil2') || randmaximumLinkerTeil2();
	}
	
	
	this.returnFromInterrupt = function () { randmaximumLinkerTeil2(); };
	
	
	function randmaximumLinkerTeil2 () {
		
		// Sub-Array von rechts nach links durchlaufen und rechtes Randmaximum bestimmen
		var maximaleSumme = 0;
		var summe = 0;
		for (var i = mitte; i >= linkeGrenze; i--) {
			summe += invariants.array[i];
			if (summe > maximaleSumme) {
				maximaleSumme = summe;
			}
		}
		ergebnis.randmaximumLinkerTeil = maximaleSumme;
		
		var animation = new msa.RandmaximumAnimation({
			startFromIndex: mitte,
			columnCount: linkeGrenze - mitte - 1,
			divider: document.getElementsByClassName('trennstrich')[0],  // :BUG: dirty hack, but seems to work and is only used for horizontal positioning anyway
			after: function () {
				ergebnisNodes.randmaximumLinkerTeil = animation.randmaximumNode();
/*
				animation.containerNode().style.opacity = 1;
				emile(animation.containerNode(), 'opacity:0', { duration: 600, after: function () {  // :TODO: this animation should better be handled by msa.RandmaximumAnimation itself
					animation.flush();
					randmaximumRechterTeil();
				} });
*/
				randmaximumRechterTeil();
			},
			leftIndex: linkeGrenze,
			rightIndex: rechteGrenze
		});
		animation.run();
		animationen.randmaximumLinkerTeil = animation;  // speichern fuer spaeteres ausblenden
	}
	
	
	function randmaximumRechterTeil () {
		
		// Sub-Array von links nach rechts durchlaufen und linkes Randmaximum bestimmen
		var maximaleSumme = 0;
		var summe = 0;
		for (var i = mitte + 1; i <= rechteGrenze; i++) {
			summe += invariants.array[i];
			if (summe > maximaleSumme) {
				maximaleSumme = summe;
			}
		}
		ergebnis.randmaximumRechterTeil = maximaleSumme;
		
		var animationsEinstellungen = {
			startFromIndex: mitte + 1,
			columnCount: rechteGrenze - mitte,
			divider: document.getElementsByClassName('trennstrich')[0],  // :BUG: dirty hack, but seems to work and is only used for horizontal positioning anyway
			after: function () {
				ergebnisNodes.randmaximumRechterTeil = animation.randmaximumNode();
				ergebnisAuswaehlen();
			},
			leftIndex: linkeGrenze,
			rightIndex: rechteGrenze
		};
		var animation = new msa.RandmaximumAnimation(animationsEinstellungen);
		animation.run();
		animationen.randmaximumRechterTeil = animation;  // speichern fuer spaeteres ausblenden
	}
	
		
	function ergebnisAuswaehlen () {
		// groesstes der drei Maxima ermitteln (noch Join)
		
		var maximaleSumme = ergebnis.randmaximumLinkerTeil + ergebnis.randmaximumRechterTeil;
		if (ergebnis.links > maximaleSumme) {
			maximaleSumme = ergebnis.links;
		}
		if (ergebnis.rechts > maximaleSumme) {
			maximaleSumme = ergebnis.rechts;
		}
		
		var animation = new msa.Addieren();
		animation.addieren(ergebnis, ergebnisNodes, mitte, function(maximaleSummeNode){
			animationen.randmaximumRechterTeil.fadeOut();
			animationen.randmaximumLinkerTeil.fadeOut();
			// Ergebnis zurueckgeben an hoehere Ebene
			fertig(maximaleSumme, maximaleSummeNode);
		});
	}
}
