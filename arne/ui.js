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
 * The hard-coded default array that we work with.
 */
msa.theArray = [2, -3, 5, -1, 1, -4, 2, 3];


/**
 * This is the adapter to the human interface. In a Model-View-Controller
 * pattern according to Jacobsen, this is a 'View' object that Jacobsen calls
 * 'Interface' object; according to Reenskaug et. al, this is a 'Controller'
 * object.
 * 
 * This object prototype was dveloped out of msa.Schaltstelle when it was
 * realised that the latter was suffering from scope creep. As a result,
 * msa.Schaltstelle is now a mere collection of some utility functions.
 * 
 * Creating multiple instances of msa.Ui is unsupported and will likely
 * produce problems.
 */
msa.Ui = function () {
	
	
	/**
	 * Object containing public DOM references. May be supplanted by code
	 * outside msa.Ui.
	 * 
	 * The references listed here having 'null' value are required references,
	 * without which the applicaton won't work.
	 */
	this.dom = {
		canvas: null,
		startButton: null
	}
	
	
	// local reference as lexical closure
	var dom = this.dom;
	
	
	/**
	 * This function starts off the demonstration of the divide-and-conquer
	 * approach to the MSA problem. Call this to get things going.
	 */
	function run () {
		dom.startButton.disabled = true;
		if (dom.output) {
			dom.output.innerHTML = 'Vorführung läuft…';
		}
		var options = {
			fertig: function (zahl, node) { showFinalResult(zahl, node); },
			array: msa.theArray
		}
		var algorithmus = new msa.Algorithmus();
		algorithmus.durchlaufen(options, 0, options.array.length - 1);
	}
	
	
	/**
	 * This function is used as a callback function when the demo is started.
	 * It is supposed to be called when the demo is done and announces the
	 * final result when it is.
	 * 
	 * @param ergebnisZahl - value of the final result
	 * @param ergebnisNode - DOM node containing the final result's value
	 */
	function showFinalResult (ergebnisZahl, ergebnisNode) {
		if (dom.output) {
			// report final result value
			dom.output.innerHTML = ergebnisZahl;
			msa.ui.vorzeichenAnbringen(dom.output);
			dom.output.innerHTML = 'Summe des Maximum–Sub-Arrays: ' + dom.output.innerHTML;
		}
		
		// let the final result's node vanish
		ergebnisNode.style.backgroundColor = 'transparent';
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
	 * Try to find and assign references to frequently-needed nodes of the
	 * HTML DOM tree.
	 */
	function initDomReferences () {
		dom.canvas = document.getElementById('canvas');
		dom.startButton = document.getElementById('start-button');
		dom.output = document.getElementById('state');
	}
	
	
	/**
	 * Sets up the UI widgets to be enabled and ready to be used.
	 */
	function initButtons () {
		dom.startButton.onclick = run;
		dom.startButton.disabled = false;
	}
	
	
	/**
	 * This method is supposed to be called by the animation object running
	 * after this web page has been opened to signal that the animation is
	 * done and the UI widgets should be enabled.
	 */
	this.zahlenleisteZeichnenFertig = function () {
		initButtons();
	}
	
	
	/**
	 * Adds a typograohically correct + or - sign to a DOM node.
	 * 
	 * @param element - the DOM node containing the value to be signed
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
	 * Constructor handler; arranges for the UI to be initialised as soon as
	 * the DOM has finished loading.
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
		
		// read test array from URL query string
		var uri = window.location.toString();
		if (uri.indexOf('?') > 0) {
			var array = uri.substring(uri.indexOf('?') + 1).split(',');
			msa.theArray = [];
			for (var i = 0; i < array.length; i++) {
				if (! array[i].match(/^[-+0-9]+$/)) {
					break;
				}
				msa.theArray.push(Number(array[i]));
			}
		}
	}
	
	
	init();
	
}


msa.ui = new msa.Ui();
