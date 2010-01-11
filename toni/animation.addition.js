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
		// create the HTML element in its initial state
		
		
		
		
	}
	
   this.addieren = function (zahlLinks, nodeLinks, zahlRechts, nodeRechts, binfertig) {
		
		
		
		var zielCss = 'left:445px;top:300px';
		var rmaxs;		

        emile(nodeLinks, zielCss, { duration: 3000, after: function() {
			
			// summanden unsichtbar machen
			nodeLinks.style.visibility = 'hidden';
			nodeRechts.style.visibility = 'hidden';
			
			// berechnete summe dem dom-baum hinzufuegen (quasi: ins html einfuegen)
			var summe = zahlLinks + zahlRechts;
			rmaxs = document.createElement('DIV');
			rmaxs.innerHTML = summe;
			rmaxs.style.top='300px'; 
			rmaxs.style.left='445px';
			rmaxs.style.zIndex='2';
			rmaxs.style.background='white';
			rmaxs.style.fontSize='20px';
			msa.ui.dom.canvas.appendChild(rmaxs);
			
			
			//binfertig();
	    } });    
		   
		emile(nodeRechts, zielCss, { duration: 3000 });
	    
		setTimeout(function () {
			msa.hochfahren.hochfahren(rmaxs);
		}, 3000);
		
	
	}
	
/*
	this.weitergeben = function () {
		return{
			rmaxs:rmaxs
		}
	}
*/
	
	init();
}

// execute this immediately when the app is loaded; 
msa.schaltstelle.addDomLoadedMessage(function () {
//neues objekt wird erstellt, zahlenreihe wird gezeichnet
	msa.addieren = new msa.Addieren();
	//funktion wir aufgerrufen

	nodeLinks = document.getElementById('nodeLinks');
	    //zahl2 = document.getElementById('Zahl2');       
	    nodeRechts = document.getElementById('nodeRechts');
	    
	nodeLinks.style.top='300px'; 
    nodeLinks.style.left='425px';
	nodeLinks.style.fontSize='20px';
	nodeLinks.style.fontWeight='bold';
   
	nodeRechts.style.top='300px'; 
    nodeRechts.style.left='465px';
	nodeRechts.style.fontSize='20px';
	nodeRechts.style.fontWeight='bold';
	
	msa.addieren.addieren(4, nodeLinks, 3, nodeRechts, function(){
//			alert('fertig2')
	        }
		);
	
//	setTimeout(function () {
//		msa.hochfahren.hochfahren();
//	}, 3000);
});