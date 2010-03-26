/* $Id$
 * UTF-8
 * 
 * "split"–Animation (Visualisierung der Einschraenkung der Zahlenleiste auf den momentan betrachteten Sub-Array)
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



msa.Trennstrich = function  () {;

	var trennstrich = null;
	var binfertig;
	
	
	this.zeichnenAdapter = function (l, r, callback, skipAnimation) {
		
		/* Die Methode Element.getElementsByClassName() ist in HTML 5
		 * definiert und wird nur von modernen User Agents implementiert.
		 * Firefox 3, Safari 4, Opera 10 und Chrome 1 unterstützen sie,
		 * nicht aber Internet Explorer 8. Mehr Informationen:
		 * <http://www.whatwg.org/specs/web-apps/current-work/#dom-document-getelementsbyclassname>
		 * <http://www.quirksmode.org/dom/w3c_core.html#gettingelements>
		 */
		var zahlen = msa.ui.dom.zahlenleiste.getElementsByClassName('zahlenblock');
		
		var index = Math.floor((l + r) / 2) + 1
		var zahl = zahlen[index]; 
		
		//  bereich hervorheben
		for (var i=0; i < l; i++) {
			zahlen[i].className = 'zahlenblock aus';
		}
		for (var j=l; j <= r; j++) {
			zahlen[j].className = 'zahlenblock';
		}
		for (var k=r+1; k < zahlen.length; k++)
		{
			zahlen[k].className = 'zahlenblock aus';
		}
		
		// trennstrich zeichnen
		if (l >= r) {
			callback();  // :TODO:
		}
		else {
			binfertig = callback;
			
			index = Math.floor((l + r) / 2) + 1
			zahl = zahlen[index];
			var zahlPositionX = zahl.offsetLeft;
			
			this.zeichnen(zahlPositionX - 11, skipAnimation);
		}
	}
	
	
	this.zeichnen = function (left, skipAnimation) {
		
		// falls  der strich schon existiert, loeschen
		var trennstrich = msa.ui.dom.trennstrich;
		if (trennstrich) {
			trennstrich.parentNode.removeChild(trennstrich);
		}
		
		var canvasNode = msa.ui.dom.canvas;
		trennstrich = document.createElement('DIV');
		trennstrich.className = 'trennstrich';
		trennstrich.style.left = left + 'px';
		trennstrich.style.top = skipAnimation ? '10px' : '300px';
		trennstrich.style.height = skipAnimation ? '380px' : '0px';
		trennstrich.style.width = '3px';
		canvasNode.appendChild(trennstrich);
		
		// make our newly added element available to the rest of the app
		msa.ui.dom.trennstrich = trennstrich;
		
		if (skipAnimation) {
			binfertig();
		}
		else {
			// do a little animation, just for fun
			//Dauer der Animation in millisekunden
			emile(trennstrich, 'height:380px;top:10px', { duration: 1000 / msa.theSpeed, after: function () {
				binfertig();
			} });
		}
		
	}
	
}
msa.trennstrich = new msa.Trennstrich();
