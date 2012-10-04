_.templateSettings = {
    interpolate: /\{\{\=(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g
};

var Todo_model = Backbone.Model.extend({

});

var Todo_collection = Backbone.Collection.extend({
  mode: Todo_model
});

var Todo_view = Backbone.View.extend({
  el: $('#todoWrap')
  , events: {
    'click [data-click="addItemFilter"]': 'addItemFilter'
  }
  , initialize: function() {
    this.list_tmpl = _.template($('#add_tmpl').html());

    this.collection = new Todo_collection;
    this.collection.bind('add', this.list_update, this);
    this.render();
  }
  , addItemFilter: function(e) {
    
  }
  , addItem: function(items) {
    var me = this;
    _.each(items, function(v, i) {
      var newItem = new Todo_model(v);
      me.collection.add(newItem);
    });
  }
  , list_update: function(item) {
    $('ul', '#listsWrap').append(this.list_tmpl(item.attributes));
  }
  , render: function() {
    $('#listsWrap').html('<ul></ul>');
  }
});