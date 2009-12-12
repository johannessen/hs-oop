/* $Id$
 * encoding utf-8
 * 
 * User-Interface (Teil des HTML-Moduls)
 * Visualisierung der Divide-and-Conquer–Lösung des Maximum–Sub-Array–Problems
 * Skriptsprachen / Objektorientierte Programmierung WS 2009/10, Gruppe 5
 * 
 * Copyright (c) 2009 Arne Johannessen
 * All rights reserved.
 */


// make sure our namespace exists
if (! window.msa) { window.msa = {}; }


// das Array, auf dem gearbeitet wird
msa.theArray = [2, 4, -8, -1, 2, -6, 4, 3];



msa.Ui = function () {
	
	
	// public DOM references
	this.dom = {
		canvas: null,
		zahlenleiste: null,
		startButton: null
	}
	
	
	// local reference as lexical closure
	var dom = this.dom;
	
	
	function run () {
		var options = {
			fertig: function(zahl){ ergebnisZeigen(zahl); },
			array: msa.theArray
		}
		var algorithmus = new msa.Algorithmus();
		algorithmus.durchlaufen(options, 0, options.array.length - 1);
	}
	
	
	function ergebnisZeigen (ergebnisZahl) {
		alert('Maximale Teilsumme: ' + ergebnisZahl);
	}
	
	
	function initDomReferences () {
		dom.canvas = document.getElementById('canvas');
		dom.startButton = document.getElementById('start-button');
	}
	
	
	function initButtons () {
		dom.startButton.onclick = run;
		dom.startButton.disabled = false;
	}
	
	
	this.zahlenleisteZeichnenFertig = function () {
		initButtons();
	}
	
	
	function init () {
		msa.schaltstelle.addDomLoadedMessage(function () {
			initDomReferences();
		});
	}
	
	
	init();
	
}


msa.ui = new msa.Ui();


// execute this immediately when the app is loaded
msa.schaltstelle.addDomLoadedMessage(function () {
	msa.zahlenleiste.zeichnen(msa.theArray);
});
