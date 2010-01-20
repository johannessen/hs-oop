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


/**
 * das Array, auf dem gearbeitet wird
 */
msa.theArray = [2, -3, 5, -1, 1, -4, 2, 3];



/**
 * 
 */
msa.Ui = function () {
	
	
	/**
	 * public DOM references
	 */
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
	
	
	/**
	 * local reference as lexical closure
	 */
	var dom = this.dom;
	
	
	/**
	 * 
	 */
	function run () {
		dom.startButton.disabled = true;
		dom.output.innerHTML = 'Vorführung läuft…';
		var options = {
			fertig: function(zahl, node){ showFinalResult(zahl, node); },
			array: msa.theArray
		}
		var algorithmus = new msa.Algorithmus();
		algorithmus.durchlaufen(options, 0, options.array.length - 1);
	}
	
	
	/**
	 * 
	 */
	function showFinalResult (ergebnisZahl, ergebnisNode) {
		// report final result value
		dom.output.innerHTML = ergebnisZahl;
		msa.ui.vorzeichenAnbringen(dom.output);
		dom.output.innerHTML = 'Summe des Maximum–Sub-Arrays: ' + dom.output.innerHTML;
		
		// let the final result's node vanish
		ergebnisNode.style.opacity = 1;
		ergebnisNode.style.fontSize = '20px';
		ergebnisNode.style.marginLeft = 0;
		ergebnisNode.style.marginTop = 0;
		emile(ergebnisNode, 'opacity:0;font-size:96px;margin-left:-.5em;margin-top:300px', { duration: 1200 });

		// flash the screen once in celebration
		document.documentElement.style.backgroundColor = '#eee';
		emile(document.documentElement, 'background-color:#090', { duration: 120, after: function () {
			emile(document.documentElement, 'background-color:#eee', { duration: 180 });
		} });
		
		// enable the start button to give the user another chance to see the demo
		dom.startButton.disabled = false;
	}
	
	
	/**
	 * 
	 */
	function initDomReferences () {
		dom.canvas = document.getElementById('canvas');
		dom.startButton = document.getElementById('start-button');
		dom.output = document.getElementById('state');
	}
	
	
	/**
	 * 
	 */
	function initButtons () {
		dom.startButton.onclick = run;
		dom.startButton.disabled = false;
	}
	
	
	/**
	 * 
	 */
	this.zahlenleisteZeichnenFertig = function () {
		initButtons();
	}
	
	
	/**
	 * 
	 */
	this.vorzeichenAnbringen = function (element) {
		try {
			var wert = Number(element.innerHTML);
			if (wert < 0) {
				element.innerHTML = '−' + (-wert);
			}
			if (wert > 0) {
				element.innerHTML = '+' + wert;
			}
		}
		catch (e) {
		}
	}
	
	
	/**
	 * 
	 */
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
