/* $Id$
 * encoding utf-8
 * 
 * "merge"-Animation (7) (Visualisierung der Auswahl des hoechsten aus je drei Maximis)
 * Visualisierung der Divide-and-Conquer--Loesung des Maximum--Sub-Array--Problems
 * 
 * Copyright (c) 2010 Arne Johannessen
 * Copyright (c) 2009 Antonia Boemanns
 * All rights reserved.
 * 
 * This program is free software; you can redistribute it or
 * modify it under the terms of a 3-clause BSD-style license.
 * There is absolutely no warranty for this program!
 * See LICENSE for details.
 */


// make sure our namespace exists
if (! window.msa) { window.msa = {}; }


msa.Addieren = function () {
	
	var animationsDauer = 2000 / msa.theSpeed;
		
	/*beim Aufruf von 'addieren' fahren die übergebenen Variablen nodeLinks und nodeRechts auf die Zielposition
	  und werden danach unsichtbar.Danach wird die Summe aus den Werten von nodelinks und nodeRechts errechnet und 
	  in rmaxs ausgegeben. 
	*/
	this.addieren = function (ergebnis, ergebnisNodes, mitteIndex, binfertig) {
		var zahlLinks = ergebnis.randmaximumLinkerTeil;
		var nodeLinks = ergebnisNodes.randmaximumLinkerTeil;
		var zahlRechts = ergebnis.randmaximumRechterTeil;
		var nodeRechts = ergebnisNodes.randmaximumRechterTeil;
		
		var posLeftMax = (msa.zahlenleiste.positionLeft(mitteIndex) + msa.zahlenleiste.positionLeft(mitteIndex + 1)) / 2 + 15;
		var posTopMax = nodeLinks.offsetTop;
		//zielPos ist die Position an der nodeLinks und nodeRechts nach der Animation stehen sollen	
		var zielPos = 'left:' + posLeftMax + 'px;top:' + nodeLinks.offsetTop + 'px';
		var rmaxs = document.createElement('DIV');
		rmaxs.className = 'rmaxs';

		emile(nodeLinks, zielPos, { duration: animationsDauer, after: function() {
			
			// summanden unsichtbar machen
			nodeLinks.style.visibility = 'hidden';
			nodeRechts.style.visibility = 'hidden';
			
			// berechnete summe dem dom-baum hinzufuegen (quasi: ins html einfuegen)
			var summe = zahlLinks + zahlRechts;
			rmaxs.innerHTML = summe;
			msa.ui.vorzeichenAnbringen(rmaxs);
			rmaxs.style.left=(posLeftMax - 10) + 'px';
			rmaxs.style.top=(nodeLinks.offsetTop) + 'px';
			rmaxs.style.zIndex='2';
			rmaxs.style.background='white';
			rmaxs.style.fontSize='20px';
			msa.ui.dom.zahlenleiste.appendChild(rmaxs);
			new msa.Hochfahren().hochfahren(rmaxs, binfertig, ergebnis, ergebnisNodes);
			} 
		});    
		   
		emile(nodeRechts, zielPos, { duration: animationsDauer });
	}
	
}
