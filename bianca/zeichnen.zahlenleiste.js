/* $Id$
 * UTF-8
 * 
 * Zahlenleiste zeichnen
 * Visualisierung der Divide-and-Conquer--Loesung des Maximum--Sub-Array--Problems
 * 
 * Copyright (c) 2010 Arne Johannessen
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


//was in der Funktion msa.Zahlenleiste aufgelistet wird wird alles ausgefuehrt unten bei new msa.Zahlenleiste
msa.Zahlenleiste = function () {
	
	var node = null;
	
	//zahlenwerte greift auf das Array zu, das in Arne´s 'ui.js'-Datei steht:
	var zahlenwerte = msa.theArray;
	
	var duration = 2100 / msa.theSpeed;
	
	
	function init () {
		// ein HTML-DIV-Element mit dem Klassennahmen 'zahlenleiste' wird erstellt.
		//Dieses DIV-Element umschliesst alle Elemente, die die Zahlenleiste betreffen 
		node = document.createElement('DIV');
		node.className = 'zahlenleiste';
	}
	
	//In dieser Funktion wird festgelegt, wie die einzelnen Bloecke gezeichnet und positioniert werden
	this.zahlenblockZeichnen = function (wert, positionX) {
		//Ein Zahlenblock ist eine Einheit, das bedeutet ein gruenes, bzw ein rotes Kaestchen
		var zahlenblock = document.createElement('DIV');
		zahlenblock.className = 'zahlenblock';
		//die *.style.*-Zeilen definieren den Ausgangsstyle der Animation
		zahlenblock.style.left = positionX;
		zahlenblock.style.width = '0';
		zahlenblock.style.height = Math.abs(wert)*30+'px';
		zahlenblock.style.fontSize = '0';
	
		// Zahlenwerte, die kleiner gleich Null sind, werden unterhalb des Zahlenleisten-Strichs gezeichnet. 
		//Die Farbanimation der Zahlen beginnt mit einem rot-ton.
		if (wert<=0){
			zahlenblock.style.color = '#b6220d';
			zahlenblock.style.top = 1 + 'px';
		}
		// Zahlenwerte, die groesser Null sind, werden oberhalb des Zahlenleisten-Strichs gezeichnet
		//Die Farbanimation der Zahlen beginnt mit einem gruen-ton.
		else {
			zahlenblock.style.color = '#4bd449';
			zahlenblock.style.bottom = 1 + 'px';
		}
		
		//Die Zahlenwerte werden visualisiert, indem aus den einzelnen Einheiten (block) ein Block (zahlenblock) zusammengesetzt wird
		for(var i=0; i<Math.abs(wert); i++){
			var block = document.createElement('DIV');
			//Ist der Wert groesser Null, so werden gruene Elemente verwendet:
			if (wert>0){
				block.className = 'Einheit';
			}
			//Ansonsten werden rote Elemente verwendet:
			else{
				block.className = 'Einheit negativ';
			}
			//Das von dem Zahlenleisten-Strich aus gesehene erste Element wird jeweils mit dem Wert des ganzen Blocks beschriftet:
			if (i == 0 && wert < 0 || i == Math.abs(wert) - 1 && wert > 0) {
				block.innerHTML = wert;
				//Um das korrekte Vorzeichen anzufügen wird auf die Funktion 'vorzeichenAnbringen' in Arnes 'ui.js'-Datei zugegriffen:
				msa.ui.vorzeichenAnbringen(block);
			}
			//Der Knoten 'block' wird an 'zahlenblock' angehaengt:
			zahlenblock.appendChild(block);
		}
		//Der Knoten 'zahlenblock' wird an 'node' angehaengt:
		node.appendChild(zahlenblock);
		//Der Aufbau der Zahlenbloecke, sowie deren Beschriftung wird animiert:
		emile(zahlenblock, 'left:positionX;width:30px;color:#ffffff;font-size:20px;', { duration: duration, after: function(){msa.ui.zahlenleisteZeichnenFertig()} });
	}
	
	//Funktion zur Festlegung der horizontalen Ausrichtung der Zahlenbloecke:
	this.positionLeft = function (stelle) {
		return (110 + stelle * 50);
	}
	
	//Hier wird alles aufgelistet, was in das Canvas-Element (das helle Rechteck) gezeichnet wird:
	this.zeichnen = function () {
		// Der Knoten 'node' wird an das Canvas-Element angefuegt:
		var canvasNode = msa.ui.dom.canvas;
		canvasNode.appendChild(node);
		
		// Die Zahlenleiste wird an das DOM angefuegt:
		msa.ui.dom.zahlenleiste = node;
		
		//Der Zahlenleisten-Strich wird definiert und mittels Animation gezeichnet
		var strich = document.createElement('DIV');
		strich.className = 'zahlenleiste-strich';
		strich.style.left = '300px';
		strich.style.width = '0';
		node.appendChild(strich);
		
		emile(strich, 'left:70px;width:460px', { duration: duration, after: function(){msa.ui.zahlenleisteZeichnenFertig()} });
		
		
		//Die Funktionen zum zeichnen und horizontalen platzieren der Zahlenbloecke werden aufgerufen:
		for(var i = 0; i < zahlenwerte.length; i++) {
			this.zahlenblockZeichnen(zahlenwerte[i], this.positionLeft(i) + 'px');
		}
		
	}
	
	init();
	
}

msa.zahlenleiste = new msa.Zahlenleiste();