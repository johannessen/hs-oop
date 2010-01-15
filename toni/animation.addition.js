/* Id: animation.addition.js 2009-12-04
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

msa.Addieren = function () {
	
	function init () {	
	}
	
    this.addieren = function (zahlLinks, nodeLinks, zahlRechts, nodeRechts, binfertig) {
		//zielPos ist die Position an der nodeLinks und nodeRechts nach der Animation stehen sollen	
		var zielPos = 'left:445px;top:300px';
		var rmaxs;		
		rmaxs = document.createElement('DIV');

		emile(nodeLinks, zielPos, { duration: 3000, after: function() {
			
			// summanden unsichtbar machen
			nodeLinks.style.visibility = 'hidden';
			nodeRechts.style.visibility = 'hidden';
			
			// berechnete summe dem dom-baum hinzufuegen (quasi: ins html einfuegen)
			var summe = zahlLinks + zahlRechts;
			rmaxs.innerHTML = summe;
			rmaxs.style.top='300px'; 
			rmaxs.style.left='445px';
			rmaxs.style.zIndex='2';
			rmaxs.style.background='white';
			rmaxs.style.fontSize='20px';
			msa.ui.dom.canvas.appendChild(rmaxs);
			} 
		});    
		   
		emile(nodeRechts, zielPos, { duration: 3000 });
	    
		setTimeout(function () {
			msa.hochfahren.hochfahren(rmaxs);
		}, 3000);	
	}
	init();
}

// execute this immediately when the app is loaded; 
msa.schaltstelle.addDomLoadedMessage(function () {

	msa.addieren = new msa.Addieren();

	nodeLinks = document.getElementById('nodeLinks');      
	nodeLinks.style.top='300px'; 
    nodeLinks.style.left='425px';
	nodeLinks.style.fontSize='20px';
	nodeLinks.style.fontWeight='bold';
	
	nodeRechts = document.getElementById('nodeRechts');
  	nodeRechts.style.top='300px'; 
    nodeRechts.style.left='465px';
	nodeRechts.style.fontSize='20px';
	nodeRechts.style.fontWeight='bold';
	
	msa.addieren.addieren(4, nodeLinks, 3, nodeRechts, function(){
		}
	);
});