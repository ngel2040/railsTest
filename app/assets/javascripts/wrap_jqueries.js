/*
* http://oscarotero.com/jquery/
* jQuery 1.9 reference 기준으로 qQuery의 메소드를 랩핑함.
*/
(function() {
	window.ts = window.ts || function() {};
	var _toString, _array, _slice;
	_toString = Object.prototype.toString;
	_array = Array.prototype;
	_slice = _array.slice;

	ts = function(context) {
		ts.$ = context ? $(context) : $;
		return ts;
	};
	ts.attrCss = function(method) {
		var args, _method;
		args = _slice.call(arguments);
		args.splice(0, 1);
		return this.$[method].apply(this.$, args);
	};
	//TODO test code필요함.
})();