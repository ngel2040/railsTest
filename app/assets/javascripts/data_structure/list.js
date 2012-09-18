function ArrayList() {
    this.arr;
    this.numOfData;
    this.currentPostion;
}
ArrayList.prototype.init = function() {
    this.arr = [];
    this.numOfData = 0;
    this.currentPostion = -1;
};
ArrayList.prototype.insert = function(data) {
    this.arr[this.numOfData] = data;
    this.numOfData++;
};
ArrayList.prototype.first = function(pdata) {
    if(this.numOfData == 0) return;
    this.currentPostion = 0;
    pdata['0'] = this.arr[0];
    return true;
};
ArrayList.prototype.nexts = function(pdata) {
    if (this.currentPostion >= (this.numOfData - 1)) return false;
    this.currentPostion++;
    pdata[this.currentPostion] = this.arr[this.currentPostion];
    return true;
};
ArrayList.prototype.remove = function() {
    var result = this.arr.splice(this.currentPostion, 1);
    this.numOfData--;
    this.currentPostion--;
    return result;
};
ArrayList.prototype.count = function() {
    return this.list.numOfData;
};


(function() {
    var lists, data, cnt;
    data = {};
    lists = new ArrayList();

    lists.init();


    lists.insert(11);
    lists.insert(11);
    lists.insert(22);
    lists.insert(22);
    lists.insert(33);

    if (lists.first(data)) {
        console.log('first', data[lists.currentPostion]);
        while(lists.nexts(data)) {
            console.log('next', data[lists.currentPostion]);
        }
    }

    if (lists.first(data)) {
        if (data[lists.currentPostion] == 22) lists.remove();

        while(lists.nexts(data)) {
            if (data[lists.currentPostion] == 22) lists.remove();
        }
    }
    console.log(lists.arr)

})();