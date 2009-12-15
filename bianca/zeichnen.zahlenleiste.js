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


// Implementierungsvorschlag von Arne:
//was in der Funktion msa.Zahlenleiste aufgelistet wird wird alles ausgeführt unten bei new msa.Zahlenleiste
msa.Zahlenleiste = function () {
	
	
	var node = null;
	
	
	function init () {
		// create the HTML element in its initial state
		node = document.createElement('DIV');
		node.className = 'zahlenleiste-example';
	}
	
	
	this.zahlenblockZeichnen = function (wert, positionX) {
		for(var i=0; i<Math.abs(wert); i++){
			var block = document.createElement('DIV');
			block.className = 'Einheit';
			block.style.left = positionX;
			block.style.width = '0';
			block.style.color = 'white';
			
			if (wert<=0){
				block.style.top = (i*30) + 1 + 'px';
				
			}
			else {
				block.style.bottom = (i*30) + 1 + 'px';
			}
			if (i == 0){
				block.innerHTML = wert;
			}
			
			node.appendChild(block);
			emile(block, 'left:positionX;width:30px;', { duration: 300});
			emile(block, 'color:black;', { duration: 500});

		}
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
		emile(strich, 'left:70px;width:460px', { duration: 300, after: function(){msa.ui.zahlenleisteZeichnenFertig()} });
		
		
		this.zahlenblockZeichnen(2,'110px');
		this.zahlenblockZeichnen(2,'110px');
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


msa.zahlenleiste = new msa.Zahlenleiste();
