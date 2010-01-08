/* Id: zeichnen.zahlenleiste.js 2009-12-20
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
	//Array mit den Zahlen der Zahlenleiste:
	var zahlenwerte = new Array(2,4,-8,-1,2,-6,4,3);
	
	this.nehmen = function(){
		return{
			zahllenwerte:zahlenwerte
		}
	}
	
	function init () {
		// create the HTML element in its initial state
		node = document.createElement('DIV');
		node.className = 'zahlenleiste';
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
			if (wert>0){
				block.className = 'Einheit';
			}
			else{
				block.className = 'Einheit negativ';
			}
			
			if (i == 0 && wert < 0){
				block.innerHTML = '−' + (-wert);
			}
			if (i == Math.abs(wert) - 1 && wert > 0){
				block.innerHTML = '+' + wert;
			}
			
			
			zahlenblock.appendChild(block);
		}
		node.appendChild(zahlenblock);
		//Animation - Aufbau der Zahlenblöcke und deren Beschriftung:
		emile(zahlenblock, 'left:positionX;width:30px;color:#ffffff;font-size:20px;', { duration: 3000, after: function(){msa.ui.zahlenleisteZeichnenFertig()} });
		
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
		
		//Array mit den X-Positionen der einzelnen Zahlen auf der Zahlenleiste:
		for(var i = 0; i < zahlenwerte.length; i++) {
			this.zahlenblockZeichnen(zahlenwerte[i], (110 + i * 50) + 'px');
		}
		
	}
	
	init();
	
}

//msa bedeutet maximumsubarray - Namensraum/Variable?
msa.zahlenleiste = new msa.Zahlenleiste();