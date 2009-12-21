/* Id: zeichnen.zahlenleiste.js 2009-12-04
 * 
 * Zahlenleiste zeichnen
 * Visualisierung der Divide-and-Conquer--Loesung des Maximum--Sub-Array--Problems
 * Skriptsprachen / Objektorientierte Programmierung WS 2009/10, Gruppe 5
 * 
 * Copyright (c) 2009 Bianca Foerster
 * All rights reserved.
 */


// make sure our namespace exists
if (! window.msa) { window.msa = {}; }


//was in der Funktion msa.Zahlenleiste aufgelistet wird wird alles ausgefuehrt unten bei new msa.Zahlenleiste
msa.Zahlenleiste = function () {
	
	
	var node = null;
	
	
	function init () {
		// create the HTML element in its initial state
		node = document.createElement('DIV');
		node.className = 'zahlenleiste-example';
	}
	
	
	this.zahlenblockZeichnen = function (wert, positionX) {
		var zahlenblock = document.createElement('DIV');
		zahlenblock.className = 'zahlenblock';
		zahlenblock.style.left = positionX;
		zahlenblock.style.width = '0';
		zahlenblock.style.color = '#55de52';
		zahlenblock.style.height = Math.abs(wert)*30+'px';
		zahlenblock.style.fontSize = '0';
	
		if (wert<=0){
			zahlenblock.style.top = 1 + 'px';
		}
		else {
			zahlenblock.style.bottom = 1 + 'px';
		}
	
		for(var i=0; i<Math.abs(wert); i++){
			var block = document.createElement('DIV');
			block.className = 'Einheit';
			
			if (i == 0 && wert < 0){
				block.innerHTML = wert;
			}
			if (i == Math.abs(wert) - 1 && wert > 0){
				block.innerHTML = wert;
			}
			
			
			zahlenblock.appendChild(block);
		}
		node.appendChild(zahlenblock);
		emile(zahlenblock, 'left:positionX;width:30px;color:#444444;font-size:20px;', { duration: 3000, after: function(){msa.ui.zahlenleisteZeichnenFertig()} });
		
	}
	
	
	this.zeichnen = function () {
		// add the existing element to the HTML page
		var canvasNode = msa.ui.dom.canvas;
		canvasNode.appendChild(node);
		
		// make our newly added element available to the rest of the app
		msa.ui.dom.zahlenleiste = node;
		
		
		var strich = document.createElement('DIV');
		strich.className = 'zahlenleiste-strich';
		strich.style.left = '300px';
		strich.style.width = '0';
		node.appendChild(strich);
		
		// do a little animation, just for fun
		//Dauer der Animation in millisekunden
		emile(strich, 'left:70px;width:460px', { duration: 3000, after: function(){msa.ui.zahlenleisteZeichnenFertig()} });
		
		this.zahlenblockZeichnen(2,'110px');
//		this.zahlenblockZeichnen(2,'110px');
		this.zahlenblockZeichnen(4,'160px');
		this.zahlenblockZeichnen(-8,'210px');
		this.zahlenblockZeichnen(-1,'260px');
		this.zahlenblockZeichnen(2,'310px');
		this.zahlenblockZeichnen(-6,'360px');
		this.zahlenblockZeichnen(4,'410px');
		this.zahlenblockZeichnen(3,'460px');
		
	}
	
	init();
	
}

//msa bedeutet maximumsubarray - Namensraum/Variable?
msa.zahlenleiste = new msa.Zahlenleiste();