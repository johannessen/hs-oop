/* $Id$
 * encoding utf-8
 * 
 * Automatisiertes Unit-Testing
 * Visualisierung der Divide-and-Conquer–Lösung des Maximum–Sub-Array–Problems
 * Skriptsprachen / Objektorientierte Programmierung WS 2009/10, Gruppe 5
 * 
 * Copyright (c) 2009 Arne Johannessen
 * All rights reserved.
 */

/* This file incorporates work by Tobie Langel, licensed "under the terms of
 * an MIT-style license", with no disclosed detailed license terms. (?)
 * 
 * evidence.js, version 0.6
 * 
 * Copyright (c) 2009 Tobie Langel (http://tobielangel.com)
 * 
 * evidence.js is freely distributable under the terms of an MIT-style license.
 */


out = [];
tests = [];
loglevel = Evidence.UI.Console.Logger.NOTSET;
delay = 600;  // expected max time for a test suite to finish (ms)


window.onload = function () {
	
	// run all provided test suites and log the result
	for (var i = 0; i < tests.length; i++) {
		var suite = (new Evidence.TestLoader()).loadTestsFromTestCase(tests[i]);
		var runner = new Evidence.UI.Console.TestRunner(new Evidence.UI.Console.Logger(loglevel));
		var result = runner.run(suite);
		// the runner may return before the test suite is complete, so we need to wait
		setTimeout(function(){
			out[out.length] = new OutImportant('\nCompleted test suite ' + suite + ': ' + result + '.\n');
		}, delay);
	}
	
	// after all runners have been started, we need to wait some more and then display the logged result
	setTimeout(function(){
		var pre = document.createElement('PRE');
		for (var i = 0; i < out.length; i++) {
			if (out[i].important) {
				var node = document.createElement('STRONG');
				node.appendChild(document.createTextNode(out[i]));
			}
			else {
				var node = document.createTextNode(out[i]);
			}
			pre.appendChild(node);
			pre.appendChild(document.createTextNode('\n'));
		}
		document.body.insertBefore(pre, document.body.firstChild);
	}, delay * tests.length + 50);  // run after all else is done
	
	/* Note: This timer-based logging technique *will* fail as soon as only
	 * one of the test suites takes longer than the specified delay time.
	 * However, while the HTML output will be incomplete in that situation,
	 * the real logging output that evidence.js prints directly to the console
	 * is unaffected and will always be complete. Increase the loglevel if
	 * necessary to make sure of that.
	 */
}


// extend Evidence.TestCase to add HTML logging output and some utility assert methods
function MyTestCase (methodName) {
	
	// this override adds a suitable output logging string item to the output
	// :KLUDGE: this method's prototype's interface isn't stable!
	this._assertExpression = function (expression, message, template) {
		var args = Array.prototype.slice.call(arguments, 3);
		if (expression) {
			out[out.length] = 'Step succeded. (' + ((arguments.callee.caller == this.assertWithMyReason) ? message : 'Not ' + message.toLowerCase()) + ' ' + Evidence.UI.printf(template, args) + ')';
			this.addAssertion();
		} else {
			var templateWithArgs = Evidence.UI.printf(template, args);
			out[out.length] = new OutImportant(message + ' ' + templateWithArgs);
			throw new Evidence.AssertionFailedError(message, templateWithArgs, args);
		}
	}
	
	// utility method for slightly improved output through overridden _assertExpression()
	this.assertWithMyReason = function (expression, kind, template) {
		arguments[0] = arguments[0] == arguments[1];
		arguments[1] = (arguments[0] ? 'Passed' : 'Failed') + ' ' + (arguments[1] ? 'assertion' : 'refutation') + '.';
		this._assertExpression.apply(this, arguments);
	}
	
	
	// asserts that the given arrays are deeply equal
	this.assertArrayEqual = function (array1, array2) {
		var equal = array1.length == array2.length;
		var i = array1.length - 1;
		while (equal && i >= 0) {
			if (array1[i] != array2[i]) {
				equal = false;
				break;
			}
			i -= 1;
		}
		this.assertWithMyReason(equal, true, 'Expected [%o] to be == to [%o].', array1, array2);
	}
	
	// asserts that the given MSA result is correct for the given array (numerical analysis only)
	this.assertMaximumEqual = function (expected, array) {
		var testcase = this;
		testcase.pause();
		(new msa.Algorithmus()).durchlaufen({
			array: array,
			fertig: function(actual){
				testcase.resume(function(){
					this.assertWithMyReason(typeof actual === 'undefined', false, 'Expected MSA of [%o] (%o) to not be undefined.', array, actual);
					this.assertWithMyReason(actual === null, false, 'Expected MSA of [%o] (%o) to not be null.', array, actual);
					this.assertWithMyReason(actual == expected, true, 'Expected MSA of [%o] (%o) to be == to %o.', array, actual, expected);
				});
			},
		}, 0, array.length - 1);
	}
	
	Evidence.TestCase.constructor.call(this, methodName);
}
MyTestCase.prototype = new Evidence.TestCase();
MyTestCase.prototype.constructor = MyTestCase;

MyTestCase.displayName = 'MyTestCase';
MyTestCase.subclasses = [];
MyTestCase.defaultTimeout = Evidence.TestCase.defaultTimeout;

MyTestCase.extend = function (name, methods) {
	
	function chain(subclass, superclass) {
		function Subclass() {}
		Subclass.prototype = superclass.prototype;
		subclass.prototype = new Subclass();
		subclass.prototype.constructor = subclass;
		return subclass;
	}
	
	function MyTestCaseSubclass(methodName) {
		MyTestCase.call(this, methodName);
	}
	
/*
	if (!methods) {
		methods = name;
		name = getNameFromFile();
	}
*/
	
	chain(MyTestCaseSubclass, this);
	MyTestCaseSubclass.displayName = name;
	MyTestCaseSubclass.extend = MyTestCase.extend;
	
	for(var prop in methods) {
		MyTestCaseSubclass.prototype[prop] = methods[prop];
	}
	MyTestCase.subclasses.push(MyTestCaseSubclass);
	return MyTestCaseSubclass;
}


// utility object to mark up important output
function OutImportant (content) {
	this.toString = function () { return '' + content; }
	this.important = true;
}
