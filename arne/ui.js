/* $Id$
 * encoding utf-8
 * 
 * User-Interface (Teil des HTML-Moduls)
 * Visualisierung der Divide-and-Conquer–Lösung des Maximum–Sub-Array–Problems
 * Skriptsprachen / Objektorientierte Programmierung WS 2009/10, Gruppe 5
 * 
 * Copyright (c) 2009-2010 Arne Johannessen
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
		zahlenleiste: undefined,
		startButton: null
	}
	
	/* Public DOM references that are intentionally undefined are merely
	 * placeholders for objects to be defined later. Since nothing is
	 * dependant upon their existence, they may safely be removed. Their
	 * purpose is to give an in-code overview over the abvailable DOM
	 * references while at the same time not interfere with the DOM reference
	 * load success checker algorithm.
	 */
	
	
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
		// execute this immediately when the app is loaded
		msa.schaltstelle.addDomLoadedMessage(function () {
			
			// load all DOM references and check for success
			initDomReferences();
			for (var referenceName in dom) {
				if (! dom[referenceName] && (typeof dom[referenceName] !== 'undefined')) {  // 'undefined' really means 'to be defined later' in this case
					throw new msa.Schaltstelle.DomReferenceException(referenceName);
				}
			}
			
			// DOM loaded successfully; proceed loading the application
			dom.startButton.disabled = true;
			msa.zahlenleiste.zeichnen(msa.theArray);
			
		});
	}
	
	
	init();
	
}


msa.ui = new msa.Ui();
