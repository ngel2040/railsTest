_.templateSettings = {
    interpolate: /\{\{\=(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g
};

//슬라이드.

var model, view, router, child, slide;
(function() {
	var me, _model, _location,
	world, blood, job, local, ship;
	_location = location;

	world = Backbone.Model.extend({
		defaults: {

		}
		, inAction: function() {
			
		}
		, outAction: function() {
			
		}
	});
	blood = Backbone.Model.extend({
		defaults: {

		}
		, inAction: function() {
			
		}
		, outAction: function() {
			
		}
	});
	job = Backbone.Model.extend({
		defaults: {

		}
		, inAction: function() {
			
		}
		, outAction: function() {
			
		}
	});
	local = Backbone.Model.extend({
		defaults: {

		}
		, inAction: function() {
			
		}
		, outAction: function() {
			
		}
	});
	ship = Backbone.Model.extend({
		defaults: {

		}
		, inAction: function() {
			
		}
		, outAction: function() {
			
		}
	});

	child = Backbone.View.extend({
		tagName: 'div'
		, events: {

		}
		, initialize: function() {
			this.el.className = 'slide';
			this.$el.append(_.template($('#sub_content_tmpl').html(), {}));
		}
		, render: function(id) {
			this.el.id = 'slide_' + id;
			this.$('.sub_content_inner').append(_.template($('#sub_' +  0 /*id*/ + '_tmpl').html(), {}));
			this.initEnder();
			return this;
		}
		, initEnder: function() {
			this.En = Ender(this.$('.sub_content_inner')[0]).iScroll({
		    snap: true,
		    momentum: false,
		    hScrollbar: true,
		    onScrollEnd: function () {
		      console.log(this.currentPageX);
		    }
		   });
		}
		, inAction: function() {
			this.model.inAction();
		}
		, outAction: function() {
			this.model.outAction();	
		}
		, move: function(isNext) {
			var y = this.En.currPageY;
			console.log(this.En, isNext)
			if (!isNext && y === 0) return true;
			if (isNext && y === 2) return true;

			isNext ? this.En.scrollToPage(0, 'next') : this.En.scrollToPage(0, 'prev');
		}
	});

	model = Backbone.Model.extend({
		defaults:{
			contents: [
				{id: 0, subContent: null, subView: null}
				, {id: 1, subContent: null, subView: null}
				, {id: 2, subContent: null, subView: null}
				, {id: 3, subContent: null, subView: null}
				, {id: 4, subContent: null, subView: null}
			]
		}
		, initialize: function() {
			
		}
	});

	view = Backbone.View.extend({
		el: $('body')
		, events: {
			'mousewheel': 'setHash'
		}
		, initialize: function() {
			var hash = _location.hash;

			me = this;
			_model = me.model;

			me.preload_image();
			me.$('.loading').hide();

			slide = new SwipeView('#slide_wrap', { numberOfPages: _model.get('contents').length });
			me.init_nav();
			me.init_sub();
			me.init_slide();

			if (hash) slide.goToPage(parseInt(hash.replace('#', ''), 10));

			$(window).bind('hashchange', function(e) {
			//	console.log(e);
			});

			key('down, right, space, enter, pagedown', function() {
				if (slide.isMoving) return;
				slide.next();
			});
			key('up, left, backspace, pageup', function() {
				if (slide.isMoving) return;
				slide.prev();
			});
		}
		, preload_image: function() {
			
		}
		, init_nav: function() {
			me.nav = new Nav_view({model: _model});
			me.$('#slide_wrap').append(me.nav.el);
		}
		, init_sub: function() {
			var contents, i, len;
			contents = _model.get('contents');
			len = contents.length;
			
			for (i = 0; i < len; i++) {
				var instance = new child;

				contents[i].subView = instance;
				contents[i].subContent = instance.render(i).el;	
			}
		}
		, init_slide: function() {
			var i, contents, page, nav;

			contents = _model.get('contents');
			nav = me.$('#nav a');

			for (i = 0; i < 3; i++) {
				page = i == 0 ? contents.length - 1 : i - 1;
				$(slide.masterPages[i]).html(contents[page].subContent);
				contents[page].subView.En.refresh();
			}

			slide.onFlip(function () {
				var upcoming, page,	i;

				for (i = 0; i < 3; i++) {
					page = slide.masterPages[i];
					upcoming = page.dataset.upcomingPageIndex;

					if (upcoming != page.dataset.pageIndex) {
						$(page).html(contents[upcoming].subContent);
					}
				}
				
				_location.hash = slide.pageIndex;
				nav.removeClass('selected');
				nav.eq(slide.pageIndex + 1).addClass('selected');
			});
		}
		, setHash: function(e, flag) {
			var currentChild = _model.get('contents')[slide.masterPages[slide.currentMasterPage].dataset.pageIndex];
			var childView = currentChild.subView;

			if (childView.move(flag < 0)) {
				flag < 0 ? slide.next() : slide.prev();
			}
		}
	});

	Nav_view = Backbone.View.extend({
		tagName: 'ul'
		, events: {
			'click a': 'go_to_page'
		}
		, initialize: function() {
			var contents = _model.get('contents');
			this.el.id = 'nav';
			this.$el.append(_.template($('#nav_list_tmpl').html(), { len: contents.length}));
		}
		, go_to_page: function(e) {
			e.preventDefault();
			if (slide.isMoving) return;

			var $target, href;
			$target = $(e.currentTarget);

			if ($target.hasClass('prev')) return slide.prev();
			if ($target.hasClass('next')) return slide.next();
			
			href = $target.attr('href');
			slide.goToPage(parseInt(href.replace('#', ''), 10));
		}
	});

	router = Backbone.Router.extend({
		
	});
})();