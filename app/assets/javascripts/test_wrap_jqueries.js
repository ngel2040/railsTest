test( "ts(), ts.$ == $", function() {
	ts();
	ok( ts.$ == $, "Passed!" );
	jQuery('#qunit-fixture').append(jQuery('<div class="testDiv"></div>'));
	ts('.testDiv');
	ok( ts.$[0] == $('.testDiv')[0], "passed!");
});