
// c문법 좀 보고봐야겠음.
function ArrayList() {
    this.list = [];
    this.numOfData;
    this.currentPostion;
}
ArrayList.prototype.insert = function() {
    this.lists.push(arguments[0]);
    return this.lists;
};
ArrayList.prototype.first = function() {
    this.data = this.lists[0];
    this.dataAdrress = 0;
    return this.data;
};
ArrayList.prototype.next = function() {
    if (this.dataAdrress == undefined) return -1;
    return this.lists[this.dataAdrress++];
};
ArrayList.prototype.remove = function(address) {
    if (address) {
        this.lists.splice(address, 1);
        return this.lists;
    } else {
        return this.lists.pop();    
    }
};
ArrayList.prototype.count = function() {
    return this.lists.length;
};


(function() {
    var lists, cnt;
    lists = new List;

    lists.lInsert(11);
    lists.lInsert(11);
    lists.lInsert(22);
    lists.lInsert(22);
    lists.lInsert(33);

    cnt = lists.lCount()
    console.log('count', cnt);

    console.log('first', lists.lFirst());

    for(var i = 0; i < cnt; i++){
        console.log('next', lists.lNext());
    }

    console.log(lists.lFirst());

    for(var i = 0; i < cnt; i++){
        if(lists.lists[i] == 22) lists.lRemove(i);
    }
    console.log('remove', lists.lists)
    
})();