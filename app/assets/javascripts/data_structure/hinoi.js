(function() {
    var hanoi = function (disc, src, aux, dst) {
        if (disc > 0) {
            hanoi(disc - 1, src, dst, aux);
            $('#text').append('<li> Move disc ' + disc + ' from ' + src + ' to ' + dst + '</li>');
            hanoi(disc - 1, aux, src, dst);
        }
    };

    var cnt = 10;
    //hanoi(cnt, 'a', 'b', 'c');
})();