/* Id: animation.addition.js 2009-12-04
 * encoding utf-8
 * 
 * "merge"-Animation (7) (Visualisierung der Auswahl des hoechsten aus je drei Maximis)
 * Visualisierung der Divide-and-Conquer--Loesung des Maximum--Sub-Array--Problems
 * Skriptsprachen / Objektorientierte Programmierung WS 2009/10, Gruppe 5
 * 
 * Copyright (c) 2009 Antonia Boemanns
 * All rights reserved.
 */


// make sure our namespace exists
if (! window.msa) { window.msa = {}; }

	var posLeftRmax = [125,175,225,275,325,375,425,465];

msa.Addieren = function () {
	var posLeftMax = [145,195,245,295,345,395,445];
		
	function init () {	
	
	}
	/*beim Aufruf von 'addieren' fahren die übergebenen Variablen nodeLinks und nodeRechts auf die Zielposition
	  und werden danach unsichtbar.Danach wird die Summe aus den Werten von nodelinks und nodeRechts errechnet und 
	  in rmaxs ausgegeben. 
	*/
	 	//this.positionLeft = function (stelle) {
		//return (110 + stelle * 50);
	//}
	
    this.addieren = function (zahlLinks, nodeLinks, zahlRechts, nodeRechts, binfertig) {
		//zielPos ist die Position an der nodeLinks und nodeRechts nach der Animation stehen sollen	
		var zielPos = 'left:445px;top:300px';
		var rmaxs = document.createElement('DIV');		

		emile(nodeLinks, zielPos, { duration: 3000, after: function() {
			
			// summanden unsichtbar machen
			nodeLinks.style.visibility = 'hidden';
			nodeRechts.style.visibility = 'hidden';
			
			// berechnete summe dem dom-baum hinzufuegen (quasi: ins html einfuegen)
			var summe = zahlLinks + zahlRechts;
			rmaxs.innerHTML = summe;
			rmaxs.style.left=posLeftMax[6] + 'px';
			rmaxs.style.top='300px'; 
			rmaxs.style.zIndex='2';
			rmaxs.style.background='white';
			rmaxs.style.fontSize='20px';
			msa.ui.dom.canvas.appendChild(rmaxs);
			} 
		});    
		   
		emile(nodeRechts, zielPos, { duration: 3000 });
	    
		setTimeout(function () {
			msa.hochfahren.hochfahren(rmaxs, binfertig);
		}, 3000);	
	}
	init();
}

// execute this immediately when the app is loaded; 
msa.schaltstelle.addDomLoadedMessage(function () {

	msa.addieren = new msa.Addieren();

	nodeLinks = document.getElementById('nodeLinks');      
	nodeLinks.style.top='300px'; 
    nodeLinks.style.left=posLeftRmax[6] + 'px';
	nodeLinks.style.fontSize='20px';
	nodeLinks.style.fontWeight='bold';
	
	nodeRechts = document.getElementById('nodeRechts');
  	nodeRechts.style.top='300px'; 
    nodeRechts.style.left=posLeftRmax[7] + 'px';
	nodeRechts.style.fontSize='20px';
	nodeRechts.style.fontWeight='bold';
	
	msa.addieren.addieren(4, nodeLinks, 3, nodeRechts, function(){
		}
	);
});