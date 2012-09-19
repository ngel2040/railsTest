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
    console.log('list_update', item, this)

    $('ul', '#listsWrap').append(this.list_tmpl(item.attributes));
  }
  , render: function() {
    $('#listsWrap').html('<ul></ul>');
  }
});

(function($) {

  var Item = Backbone.Model.extend({
    defaults: {
      part1: 'hello'
      , part2: 'world'
    }
  });

  var List = Backbone.Collection.extend({
    model: Item
  });

  var ListView = Backbone.View.extend({
    el:$('.body')
    , events: {
      'click button#add': 'addItem'
    }
    , initialize: function() {
      _.bindAll(this, 'render', 'addItem', 'appendItem'); 

      this.conllection = new List;
      this.conllection.bind('add', this.appendItem);

      this.counter = 0;
      this.render();
    }
    , render: function() {
      var me = this;

      me.$el.append('<button type="button" id="add">add</button>')
      me.$el.append('<ul></ul>');
      _.each(this.conllection.models, function(item) {
        me.appendItem(item);
      });
    }
    , addItem: function() {
      this.counter++;
      var item = new Item;
      item.set({
        part2: item.get('part2') + this.counter
      });
      this.conllection.add(item);
    }
    , appendItem: function(item) {
      console.log('appendItem', item);
      $('ul', this.el).append(_.template($('#list_tmpl').html(), item.attributes));
    }
  });

  var listView = new ListView
})(jQuery);