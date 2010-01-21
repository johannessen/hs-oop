/* $Id$
 * encoding utf-8
 * 
 * „Schaltstelle“ (Mini-Framework mit einigen nützlichen Methoden)
 * Visualisierung der Divide-and-Conquer–Lösung des Maximum–Sub-Array–Problems
 * Skriptsprachen / Objektorientierte Programmierung WS 2009/10, Gruppe 5
 * 
 * Copyright (c) 2009-2010 Arne Johannessen
 * All rights reserved.
 */


// make sure our namespace exists
if (! window.msa) { window.msa = {}; }


/**
 * Some utility methods, particularly for registering for the DOMContentLoaded
 * event.
 * 
 * A while into the development of msa.Schaltstelle it was realised that scope
 * creep was changing its focus from what Jacobsen might call a 'Control'
 * object to an 'Interface' object, with lots of UI-specific code. As a result,
 * lots of stuff was moved out to msa.Ui and it turned out that not much was
 * left over. That's why msa.Schaltstelle is now a mere collection of utility
 * functions, despite its high-flying name.
 * 
 * Creating multiple instances of msa.Ui is unsupported and will likely
 * produce problems. A make-shift Singleton pattern has been included in an
 * attempt to catch misuse early.
 */
msa.Schaltstelle = function () {
	
	// Singleton
	if (arguments.callee.instance) {
		throw 'only call this once!';
	}
	arguments.callee.instance = this;
	
	
	var domLoaded = false;
	var domLoadedMessages = [];
	
	
	/**
	 * Register a callback function for the DOMContentLoaded event.
	 * 
	 * @param message - the function reference to be called
	 */
	this.addDomLoadedMessage = function (message) {
		domLoadedMessages[domLoadedMessages.length] = message;
		if (domLoaded) {
			message();
		}
	}
	
	
	/**
	 * To be called whenever it has been determined that the DOM tree is in
	 * fact available. This function is intended to be called multiple times;
	 * it will only send registered messages the first time it is called.
	 */
	function domDidLoad () {
		// only execute this function once (Singleton)
		if (domLoaded) {
			return;
		}
		domLoaded = true;
		
		for (var i = 0; i < domLoadedMessages.length; i++) {
			try {
				domLoadedMessages[i]();
			}
			catch (exception) {
				if (exception instanceof msa.Schaltstelle.DomReferenceException) {
					throw exception;  // a required DOM reference failed to load; abort these steps
				}
			}
		}
	}
	
	
	/**
	 * Register JS event handlers to call the domDidLoad() function. Several
	 * handlers are registered to maximise interoperability.
	 */
	function registerDomDidLoad () {
		/* Currently there's no interoperable way to register an event
		 * handler to be called after the DOM is loaded, but before images
		 * are loaded. A W3C Working Draft proposes an event that is in
		 * fact implemented by most recent browser versions. However, if
		 * older browsers come into play, other methods might need to be
		 * used.
		 * 
		 * This particular algorithm is:
		 * - expected to work in Firefox 2+, Opera 9+, Safari 3.1+, IE 5.5+
		 * - successfully tested in Firefox 2.0-3.5, Opera 10.0, Safari 4.0, IE 7.0-8.0
		 * 
		 * See also:
		 * <http://www.w3.org/TR/2009/WD-html5-20090825/syntax.html#the-end>
		 * <http://dean.edwards.name/weblog/2006/06/again/>
		 * <https://prototype.lighthouseapp.com/projects/8886/tickets/64-safari-now-has-domcontentloaded-event-use-it>
		 */
		
		if (document.addEventListener) {
			document.addEventListener('DOMContentLoaded', function () {
				domDidLoad();
			}, false);
		}
		
		// IE doesn't support DOMContentLoaded, but we can try to use the @defer attribute
		/*@cc_on @if (@_win32 || @_win64)
			document.write('<SCRIPT ID="ie__onload" SRC="//:" DEFER><\/SCRIPT>');
			var script = document.getElementById('ie__onload');
			script.onreadystatechange = function () {
				if (this.readyState == 'complete') {
					domDidLoad();
				}
			}
		/*@end @*/
		
		// last resort
		window.onload = function () {
			domDidLoad();
		}
		
	}
	
	
	registerDomDidLoad();
	
}

msa.schaltstelle = new msa.Schaltstelle();




/**
 * An exception prototype to be used when a required DOM element like the
 * canvas cannot be found.
 * 
 * @param referenceName - the name of the reference (will be used in the message)
 */
msa.Schaltstelle.DomReferenceException = function (referenceName) {
	this.message = this.name + ': required DOM reference "' + referenceName + '" unavailable; aborting start of animation';
}
msa.Schaltstelle.DomReferenceException.constructor = msa.Schaltstelle.DomReferenceException;


/**
 * Name of this Exception.
 */
msa.Schaltstelle.DomReferenceException.prototype.name = 'msa.Schaltstelle.DomReferenceException';


/**
 * Returns this exception's message, including the name of the missing
 * DOM reference.
 * 
 * @return string representation of this object
 */
msa.Schaltstelle.DomReferenceException.prototype.toString = function () {
	return this.message;
}
