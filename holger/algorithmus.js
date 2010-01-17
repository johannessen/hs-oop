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
	var ergebnisNodes = {};
	var animationen = {};
	
	this.durchlaufen = function (options, l, r) {
		fertig = options.fertig;
		array = options.array;
		linkeGrenze  =l;
		rechteGrenze =r;
		
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
				// :TODO: Arne
				fertig (0, null);  // leerer Array
			}
			else {
				animation.hochf(linkeGrenze, function(){
					var trivialErgebnis = Math.max(0, array[linkeGrenze]);
					var trivialErgebnisNode = animation.geben().trivialElement;
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
		var linkerTeil = new msa.Algorithmus()
		var options = {};
		options.fertig = rekursionRechts;
		options.array = array;
		setTimeout(function () {
			linkerTeil.durchlaufen(options, linkeGrenze, mitte);
		}, 1);
	}
	
	
	function rekursionRechts (ergebnisLinks, ergebnisLinksNode) {
		ergebnis.links = ergebnisLinks;
		ergebnisNodes.links = ergebnisLinksNode;
		
		var rechterTeil = new msa.Algorithmus()
		var options = {};
		options.fertig = theJoin;
		options.array = array;
		setTimeout(function () {
			rechterTeil.durchlaufen(options, mitte + 1, rechteGrenze);
		}, 1);
	}
	
	
	function theJoin (ergebnisRechts, ergebnisRechtsNode) {
		ergebnis.rechts = ergebnisRechts;
		ergebnisNodes.rechts = ergebnisRechtsNode;
		
		msa.trennstrich.zeichnenAdapter(linkeGrenze, rechteGrenze, function () {
			randmaximumLinkerTeil();
		});
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
		});
		animation.run();
		animationen.randmaximumLinkerTeil = animation;  // speichern fuer spaeteres ausblenden
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
		ergebnis.randmaximumRechterTeil = maximaleSumme;
		
		var animationsEinstellungen = {
			startFromIndex: mitte + 1,
			columnCount: rechteGrenze - mitte,
			divider: document.getElementsByClassName('trennstrich')[0],  // :BUG: dirty hack, but seems to work and is only used for horizontal positioning anyway
			after: function () {
				ergebnisNodes.randmaximumRechterTeil = animation.randmaximumNode();
				ergebnisAuswaehlen();
			},
		};
		var animation = new msa.RandmaximumAnimation(animationsEinstellungen);
		animation.run();
		animationen.randmaximumRechterTeil = animation;  // speichern fuer spaeteres ausblenden
	}
	
		
	function ergebnisAuswaehlen () {
		// groesstes der drei Maxima ermitteln (noch Join)
		
		var maximaleSumme = ergebnis.randmaximumLinkerTeil + ergebnis.randmaximumRechterTeil;
		var maximaleSummeNode = null;
		if (ergebnis.links > maximaleSumme) {
			maximaleSumme = ergebnis.links;
			maximaleSummeNode = ergebnisNodes.links;
		}
		if (ergebnis.rechts > maximaleSumme) {
			maximaleSumme = ergebnis.rechts;
			maximaleSummeNode = ergebnisNodes.rechts;
		}
		
		msa.addieren.addieren(
			ergebnis.randmaximumLinkerTeil, ergebnisNodes.randmaximumLinkerTeil,
			ergebnis.randmaximumRechterTeil, ergebnisNodes.randmaximumRechterTeil,
			function(){
				animationen.randmaximumRechterTeil.fadeOut();
				animationen.randmaximumLinkerTeil.fadeOut();
				// Ergebnis zurueckgeben an hoehere Ebene
				fertig(maximaleSumme, maximaleSummeNode);
			},
			ergebnis.links, ergebnisNodes.links,
			ergebnis.rechts, ergebnisNodes.rechts
		);
	}
}

//msa.algorithmus = new msa.Algorithmus();


