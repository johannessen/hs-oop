/* $Id$
 * encoding utf-8
 * 
 * „Schaltstelle“ (quasi Rahmen, Leinwand und Kleber, um alles zusammen zu halten)
 * Visualisierung der Divide-and-Conquer–Lösung des Maximum–Sub-Array–Problems
 * Skriptsprachen / Objektorientierte Programmierung WS 2009/10, Gruppe 5
 * 
 * Copyright (c) 2009 Arne Johannessen
 * All rights reserved.
 */


// make sure our namespace exists
if (! window.msa) { window.msa = {}; }


msa.Schaltstelle = function () {
	
	
	// Singleton
	if (arguments.callee.instance) {
		return arguments.callee.instance;
	}
	arguments.callee.instance = this;
	
	
	this.addDomLoadedMessage = function (message) {
		domLoadedMessages[domLoadedMessages.length] = message;
		if (domLoaded) {
			message();
		}
	}
	
	
	this.domNode = function (name) {
		if (domNodeCache[name]) {
			return domNodeCache[name];
		}
		var id = msa.domId[name];
		if (! id) {
			throw 'Unknown DOM node named "' + name + '"';
		}
		domNodeCache[name] = document.getElementById(id);
		return domNodeCache[name];
	}
	
	
	this.addNodeWithName = function (node, name) {
		domNodeCache[name] = node;
	}
	
	
	this.removeNode = function (nodeRef) {
		if (typeof nodeRef == 'string') {
			var name = nodeRef;
		}
		else {
			for (var i in domNodeCache) {
				if (domNodeCache[i] == nodeRef) {
					var name = i;
					break;
				}
			}
			return;  // object not cached; fail silently
		}
		domNodeCache[name] = undefined;
	}
	
	
	var domNodeCache = {};
	
	
	var domLoaded = false;
	
	
	var domLoadedMessages = [];
	
	
	function domDidLoad () {
		// only execute this function once (Singleton)
		if (domLoaded) {
			return;
		}
		domLoaded = true;
		
		for (var i = 0; i < domLoadedMessages.length; i++) {
			domLoadedMessages[i]();
		}
	}
	
	
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
