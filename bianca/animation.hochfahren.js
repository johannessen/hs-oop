/* $Id: algorithmus.js 2010-01-15$
 * 
 * Hochfahr-Animation (1)+(2) (bereits bekanntes, linkes/rechtes Ergebnis "faehrt hoch"; einschl. trivialer Fall)
 * Visualisierung der Divide-and-Conquer--Loesung des Maximum--Sub-Array--Problems
 * Skriptsprachen / Objektorientierte Programmierung WS 2009/10, Gruppe 5
 * 
 * Copyright (c) 2010 Bianca Foerster
 * All rights reserved.
 * 
 * This program is free software; you can redistribute it or
 * modify it under the terms of a 3-clause BSD-style license.
 * There is absolutely no warranty for this program!
 * See LICENSE for details.
 */


// make sure our namespace exists
if (! window.msa) { window.msa = {}; }

msa.MaxHochfahren = function (){
	
	var max = null;
	var verzoegerung = 1700;

	function init(){
		max = document.getElementById('max');
	}
	
	//Diese Funktion legt fest, wann und wie die absoluten Maxima (max) hochfahren:
	this.maxHochfahren = function (stelle){
		max = document.createElement('DIV');
		max.className = 'max';
		//Fuegt das ELement 'max' an das Canvas-Element an:
		msa.ui.dom.zahlenleiste.appendChild(max);
		
		max.style.top = '-10px';
		
		//Da hier nur der triviale Fall abhandelt wird werden nur die vorhandenen Werte der Zahlenleiste verwendet. 
		//Die horizontale Platzierung erfolgt indem  auf die Funktion 'positionLeft' aus 'zeichnen.zahlenleiste.js' zugegriffen wird:
		max.style.left = msa.zahlenleiste.positionLeft(stelle) + 'px';
		//Als Werte werden die Zahlen aus dem Array in Arnes 'ui.js'-Datei verwendet, wie auch schon in der Datei 'zeichnen.zahlenleiste.js':
		max.innerHTML = msa.theArray[stelle];
		msa.ui.vorzeichenAnbringen(max);
		
		emile(max, 'top:-200px', { duration: verzoegerung});
	}
	
	//Funktion zur Festlegung, welcher Wert (stelle in dem Array) wann 'hoch faehrt':
	this.hochf = function (stelle, binfertig) {
	    // animation
		this.maxHochfahren(stelle); 
		setTimeout(function () {
			binfertig();
		}, verzoegerung);
	}
	
	//Schnittstelle zu Antonias 'animation.merge.js'-Datei. Die Werte werden ihr uebergeben:
	this.geben = function () {
	    return{
			trivialElement:max,
			maxl:document.getElementById('maxl'),
			maxr:document.getElementById('maxr')
		}
	}
	init();
}

msa.schaltstelle.addDomLoadedMessage(function () {
//neues Objekt wird erstellt, Zahlenleiste wird gezeichnet
	msa.maxHochfahren = new msa.MaxHochfahren();
//	setTimeout(function () {
//		msa.maxHochfahren.hochf(0, function(){
//		});
//	}, 3000);
});