/* Id: algorithmus.js 2009-12-04
 * 
 * MSA-Algorithmus (Numerik und ereignisbasierter Wiedereinstieg)
 * Visualisierung der Divide-and-Conquer--Loesung des Maximum--Sub-Array--Problems
 * Skriptsprachen / Objektorientierte Programmierung WS 2009/10, Gruppe 5
 * 
 * Copyright (c) 2009 Holger Schropp
 * All rights reserved.
 */


// make sure our namespace exists
if (! window.msa) { window.msa = {}; }

/*

function msa (l, r);
	// animation .split
	msa.split.animieren(l, r, trivial);
}

//trivialer Fall
function trivial ()
	if (array.getLength() <= 1) 
	{
		SubArray maximum = (SubArray)array.clone();
		if (maximum.getSum() < 0) 
			{
				maximum.setLength(0);
			}
		msa.animation.hochfahren(...);  // vor dem return
		return maximum;
	}
}
		
// Split (Divide)
function split ()
{
	int leftIndex = array.getBeginIndex();
	int rightIndex = array.getEndIndex();
	int centerIndex = (leftIndex + rightIndex) / 2;
	
	SubArray leftMaximum = findMaximumSubArray(... leftIndex, centerIndex);
	SubArray rightMaximum = this.findMaximumSubArray(rightPart); // analog
	join(...);
}

// Join (Merge)
function join (...)
{
	leftPart.findRightEdgeMaximum();
	rightPart.findLeftEdgeMaximum();
	SubArray centerMaximum = new SubArray(array, leftPart.getBeginIndex(), rightPart.getEndIndex());
	centerMaximum.setSum(leftPart.getSum() + rightPart.getSum());
	msa.animation.rmax_summe(...);
}		

// groesstes der drei Maxima ermitteln (noch Join)
function findMax ()
{
	var maximum = centerMaximum;
	if (leftMaximum.getSum() > maximum.getSum()) 
	{
		maximum = leftMaximum;
	}
	if (rightMaximum.getSum() > maximum.getSum()) 
	{
		maximum = rightMaximum;
	}
	msa.animation.merge(...);
		
	msa.animation.hochfahren(...);
	msa.split.animieren(l, r, ...);  // gleiche, originale grenzen l und r
	
	// Ergebnis zurueckgeben
	//msa.schaltstelle....(maximum);
	fertig(maximum);
}

*/

/*
msa.schaltstelle.addDomLoadedMessage(function () 
{
	int[] array = SubArray.createRandomArray();
	//SubArray maximumSubArray = new Loesung42().findMaximumSubArray(array);

	msa.Subarray maximumSubArray = new msa.Subarray(array); //Die ganze Klasse wird als Konstruktor ausgeführt.
	
});
*/
