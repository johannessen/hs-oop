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
			array: [1, 4, -3, 2]
		}
		var algorithmus = new msa.Algorithmus();
		algorithmus.durchlaufen(options, 0, options.array.length - 1);
	}
	
	
	function ergebnisZeigen (ergebnisZahl) {
		// call this as 'return' from algorthm.js
		console.info(ergebnisZahl/*Node.innerHTML*/);
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
	msa.zahlenleiste.zeichnen();
});
