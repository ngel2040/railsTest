_.templateSettings = {
    interpolate: /\[\[\=(.+?)\]\]/g,
    evaluate: /\[\[(.+?)\]\]/g
};

/*
* comment app
* textare에 입력 -> 입력 높이에 따라 리사이즈
* 저장 -> 간단한 validate 후 댓글 동적 생성
* delete -> 해당 댓글 삭제
* server 없는 관계로 새로고침 하면 초기화
*/

var Comment_model = Backbone.Model.extend({
  
});

var Comment_view = Backbone.View.extend({
  el: $('')
  , events: {

  }
  , initialize: function() {
    
  }

});


/*
* gnb menu
*/

var Menu_model = Backbone.Model.extend({
  defaults: {
    active_maingnb: 0,
    selected_submenu: null
  }
});

var Menu_view = Backbone.View.extend({
  el: $('.menu')
  , events: {
    'click [data-click="selected_submenu"]': 'selected_submenu'
    , 'mouseover [data-mouse="toggle_submenu"]': 'toggle_submenu'
    ,'mouseleave [data-mouse="toggle_submenu"]': 'toggle_submenu'
  }
  , initialize: function() {
    this.className = 'active';
    this.model.bind('change:active_maingnb', this.update_submenu, this);
    this.model.bind('change:selected_submenu', this.selected_render, this);
  }
  , selected_submenu: function(e) {
    e.preventDefault();
    this.model.set({
      selected_submenu: $(e.currentTarget).parent().attr('id')
    });
  }
  , toggle_submenu: function(e) {
    this.model.set({
      active_maingnb: e.type == 'mouseover' ? e.currentTarget.id : 0
    });
  }
  , update_submenu: function() {
    var currentValue, $selected_el;
    currentValue = this.model.get('active_maingnb');
    $selected_el = $('#' + this.model.get('selected_submenu'));

    if (currentValue == 0) {
      this.$el.find('.maingnb').removeClass(this.className);
      $selected_el.addClass(this.className);
    } else {
      $('#' + currentValue).addClass(this.className);
      $selected_el.removeClass(this.className);
    }
  }
});



/*
* underscore template
*/

var Main_grid_model = Backbone.Model.extend({});

var Single_gird_view = Backbone.View.extend({
  tagName: 'article'
  , events: {

  }
  , initialize: function() {
    //TODO
    /*
    * 각 그리드릴 싱클 뷰에 담고 각각의 모델에서 제어하도록 변경.
    */
  }
});

var Main_grid_view = Backbone.View.extend({
  el: $('.wrap_main')
  , events: {

  }
  , initialize: function() {
    this.main_gird_tmpl = $('#main_gird_tmpl').html();
    this.grid_update();
  }
  , grid_update: function() {
    var data = this.model.attributes;
    var tmp = '';
    for (var n in data) {
      tmp += _.template(this.main_gird_tmpl, data[n]);
    }
    this.$el.append(tmp).masonry({
      itemSelector: '.basic_layout'
    });
  }
});


/*
* todo 
*/

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