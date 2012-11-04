/*
backbone todo 
http://backbonejs.org/examples/todos/index.html
*/
// An example Backbone application contributed by
// [Jérôme Gravel-Niquet](http://jgn.me/). This demo uses a simple
// [LocalStorage adapter](backbone-localstorage.js)
// to persist Backbone models within your browser.

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function() {

  // Todo Model
  // ----------

  // Our basic **Todo** model has `title`, `order`, and `done` attributes.
  var Todo = Backbone.Model.extend({

    // Default attributes for the todo item.
    defaults: function() {
      return {
        title: "empty todo...",
        order: Todos.nextOrder(),
        done: false
      };
    },

    // Ensure that each todo created has `title`.
    initialize: function() {
      if (!this.get("title")) {
        this.set({
          "title": this.defaults.title
        });
      }
    },

    // Toggle the `done` state of this todo item.
    toggle: function() {
      this.save({
        done: !this.get("done")
      });
    },

    // Remove this Todo from *localStorage* and delete its view.
    clear: function() {
      this.destroy();
    }

  });

  // Todo Collection
  // ---------------

  // The collection of todos is backed by *localStorage* instead of a remote
  // server.
  var TodoList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Todo,

    // Save all of the todo items under the `"todos"` namespace.
    localStorage: new Store("todos-backbone"),

    // Filter down the list of all todo items that are finished.
    done: function() {
      return this.filter(function(todo) {
        return todo.get('done');
      });
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function() {
      return this.without.apply(this, this.done());
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: function(todo) {
      return todo.get('order');
    }

  });

  // Create our global collection of **Todos**.
  var Todos = new TodoList;

  // Todo Item View
  // --------------

  // The DOM element for a todo item...
  var TodoView = Backbone.View.extend({

    //... is a list tag.
    tagName: "li",

    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),

    // The DOM events specific to an item.
    events: {
      "click .toggle": "toggleDone",
      "dblclick .view": "edit",
      "click a.destroy": "clear",
      "keypress .edit": "updateOnEnter",
      "blur .edit": "close"
    },

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
    },

    // Re-render the titles of the todo item.
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass('done', this.model.get('done'));
      this.input = this.$('.edit');
      return this;
    },

    // Toggle the `"done"` state of the model.
    toggleDone: function() {
      this.model.toggle();
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      this.$el.addClass("editing");
      this.input.focus();
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function() {
      var value = this.input.val();
      if (!value) this.clear();
      this.model.save({
        title: value
      });
      this.$el.removeClass("editing");
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.clear();
    }

  });

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  var AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#todoapp"),

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template($('#stats-template').html()),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "keypress #new-todo": "createOnEnter",
      "click #clear-completed": "clearCompleted",
      "click #toggle-all": "toggleAllComplete"
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {

      this.input = this.$("#new-todo");
      this.allCheckbox = this.$("#toggle-all")[0];

      Todos.bind('add', this.addOne, this);
      Todos.bind('reset', this.addAll, this);
      Todos.bind('all', this.render, this);

      this.footer = this.$('footer');
      this.main = $('#main');

      Todos.fetch();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      var done = Todos.done().length;
      var remaining = Todos.remaining().length;

      if (Todos.length) {
        this.main.show();
        this.footer.show();
        this.footer.html(this.statsTemplate({
          done: done,
          remaining: remaining
        }));
      } else {
        this.main.hide();
        this.footer.hide();
      }

      this.allCheckbox.checked = !remaining;
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(todo) {
      var view = new TodoView({
        model: todo
      });
      this.$("#todo-list").append(view.render().el);
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
      Todos.each(this.addOne);
    },

    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *localStorage*.
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      if (!this.input.val()) return;

      Todos.create({
        title: this.input.val()
      });
      this.input.val('');
    },

    // Clear all done todo items, destroying their models.
    clearCompleted: function() {
      _.each(Todos.done(), function(todo) {
        todo.clear();
      });
      return false;
    },

    toggleAllComplete: function() {
      var done = this.allCheckbox.checked;
      Todos.each(function(todo) {
        todo.save({
          'done': done
        });
      });
    }

  });

  // Finally, we kick things off by creating the **App**.
  var App = new AppView;

});
/*
http://beyondtheclouds.net/Projects/backboneapp#info/1
http://beyondtheclouds.net/Scripts/Backboneapp.js
*/
/// <reference path="Shared/underscore.js" />
/// <reference path="Shared/backbone.js" />
/// <reference path="Shared/jquery-1.6.2.min.js" />
/// <reference path="Shared/Jquery.tmpl.min.js" />
$(document).ready(function() {
  var Item = Backbone.Model.extend({});

  var ItemCollection = Backbone.Collection.extend({
    model: Item,
    comparator: function(item) {
      return item.get("position");
    }
  });

  var MenuView = Backbone.View.extend({
    el: $('#backbone-menu'),
    template: $('#item-tmpl').template(),

    render: function() {
      this.el.empty();
      $.tmpl(this.template, this.model.toArray()).appendTo(this.el);
      return this;
    }
  });

  var ContentView = Backbone.View.extend({
    el: $('#backbone-content'),
    template: $('#content-tmpl').template(),

    render: function() {
      this.el.empty();
      $.tmpl(this.template, this.model).appendTo(this.el);

      return this;
    }
  });


  var NavigationRouter = Backbone.Router.extend({
    _data: null,
    _items: null,
    _view: null,

    routes: {
      "info/:id": "showInfo",
      "*actions": "defaultRoute"
    },
    initialize: function(options) {
      var _this = this;
      $.ajax({
        url: "../Backboneapp_data.json",
        dataType: 'json',
        data: {},
        async: false,
        success: function(data) {
          _this._data = data;
          _this._items = new ItemCollection(data);
          _this._view = new MenuView({
            model: _this._items
          });
          _this._view.render();
          Backbone.history.loadUrl();
        }

      });

      return this;
    },
    defaultRoute: function(actions) {
      this.showInfo(1);
    },
    showInfo: function(id) {
      var view = new ContentView({
        model: this._items.at(id - 1)
      });
      $(".active").removeClass("active");
      $("#item" + id).addClass("active");
      view.render();
    }
  });

  var navigationRouter = new NavigationRouter;
  Backbone.history.start();
});

/*
http://backbone-hangman.heroku.com/
*/
$(function() {

  window.Game = Backbone.Model.extend({
    defaults: {
      threshold: 6
    },
    initialize: function() {
      this.set({
        win: false,
        lost: false
      });
    },
    new: function() {
      var _this = this;

      $.ajax({
        url: "/new",
        type: "POST",
        success: function(response) {
          var json = $.parseJSON(response);

          _this.set({
            lost: false
          });
          _this.set({
            win: false
          });
          _this.trigger("gameStartedEvent", json);
        }
      })
    },
    check: function() {
      var _this = this;

      if (_this.get("lost") || _this.get("win")) return;

      $.ajax({
        url: "/check",
        type: "POST",
        data: {
          char_clicked: this.get("char_clicked")
        },
        success: function(response) {
          var json = $.parseJSON(response);

          if (json.incorrect_guesses >= _this.get("threshold")) _this.set({
            lost: true
          });
          if (json.win) _this.set({
            win: true
          });

          _this.trigger("guessCheckedEvent", json);
        }
      })
    },
    get_answer: function() {
      var _this = this;

      if (!_this.get("lost")) return;

      $.ajax({
        url: "/answer",
        type: "POST",
        success: function(response) {
          var json = $.parseJSON(response);

          _this.trigger("answerFetchedEvent", json);
        }
      })
    }
  })

})




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
    //console.log('hi');
  }
});

var Textarea_model = Backbone.Model.extend({
  
});

var Textarea_view = Backbone.View.extend({
  el: $('.inp_txt')
  , events: {
    'focus': 'inter',
    'blur': 'clearInter',
    'keydown': 'get_height'
  }
  , initialize: function() {
    var initLineHeight = this.$el.css('lineHeight');

    this.fixedWidth = this.$el.width();
    this.lineHeight = parseInt(initLineHeight, 10);

    this.model.set({
      currentHeight: this.$el.height()
      , dummyHeight: 19
    });
    this.model.bind('change:currentHeight', this.height_update, this);
    this.model.bind('change:dummyHeight', this.height_update, this);

    this.height_update();
  }
  , inter: function() {
    var me = this;
    this.interId = setInterval(function() {
      me.get_height();
    }, 100);
  }
  , clearInter: function() {
    clearInterval(this.interId);
  }
  , height_update: function() {
    this.$el.height(this.model.get('currentHeight') + 'px');
  }
  , get_height: function(e) {
    var result;
  console.log(this.el.scrollHeight, this.el.offsetHeight, this.el.clientHeight)
    this.model.set({
      currentHeight: this.el.scrollHeight
    });

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