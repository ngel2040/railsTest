(function() {
    var re_b_search = function(arr, first, last, target) {
        var b_search = function(_first, _last) {
            var mid = parseInt((_first+_last) / 2, 10);
            if (target == arr[mid]) return mid;
            return target < arr[mid] ? b_search(_first, mid - 1) : b_search(mid + 1, _last);
        };
        return b_search(first, last);
    };

  var arr = [0];
    var i = 100000;
    while (--i) {
        arr[i] = i; 
    }
    
    var s_stemp = new Date().getTime();
    //while(++i < 10000) re_b_search(arr, 0, arr.length - 1, 20);
    //console.log('recursive', new Date().getTime() - s_stemp);
})();