(function() {
    var b_search = function(arr, len, target) {
        var first, last, mid;

        first = 0;
        last = len -1;

        while(first <= last) {
            mid = parseInt((first+last) / 2, 10);
            if (target == arr[mid]) return mid;

            if (target < arr[mid]) {
              last = mid - 1;
            } else {
              first = mid + 1;
            }

        } //end while
        return -1;
    };

    var arr = [0];
    var i = 100000;
    while (--i) {
        arr[i] = i; 
    }
    var s_stemp = new Date().getTime();
    //while(++i < 10000) b_search(arr, arr.length, 20);
    //console.log('recursive', new Date().getTime() - s_stemp);
})();