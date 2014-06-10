/*
    author:xinglie.lkf@taobao.com
 */
KISSY.add('apiapp/mviews/partials/header', function(S, View, Crox, MM, Magix) {
     return View.extend({tmpl:"<div class=\"toolbar clearfix\"> {{if data.isHome}} <h1>Magix API</h1> {{else}} <a class=\"icon-home\" href=\"#!/home\"><i class=\"iconfont\">&#336;</i></a> {{if !data.isIndex}} <a class=\"icon-menu\" mx-click=\"toggleMenu<prevent>({ver:{{data.infos.ver}}})\" href=\"#!/home\"> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> </a> {{/if}} <div class=\"form-search clearfix\" style=\"margin-left:{{if data.isIndex}}50{{else}}85{{/if}}px\"> <input autocomplete=\"off\" value=\"{{if data.q}}{{data.q}}{{/if}}\" class=\"search\" type=\"text\" mx-keydown=\"search\" id=\"{{data.viewId}}_sipt\" /> <i class=\"iconfont delete\">&#378;</i> <div class=\"btn-search\" mx-click=\"search\"><i class=\"iconfont\" name=\"search-btn\">&#337;</i></div> </div> {{/if}} </div> {{if !data.isHome&&!data.isIndex}} <div class=\"menu-extended\"> <div class=\"extended-inner\"> <div class=\"clearfix\"> <div class=\"menu-outer\"> {{if data.extList&&data.extList.length}}<div class=\"menu-t\">核心模块</div>{{/if}} <ul class=\"menu\"> {{each data.coreList as val}} <li class=\"menu-list\"> <a href=\"#!/{{data.infos.loader}}/{{data.infos.ver}}/{{val.name}}\">{{val.dName}}</a> </li> {{/each}} </ul> </div> {{if data.extList&&data.extList.length}} <div class=\"menu-outer\"> <div class=\"menu-t\">扩展模块</div> <ul class=\"menu\"> {{each data.extList as val}} <li class=\"menu-list\"> <a href=\"#!/{{data.infos.loader}}/{{data.infos.ver}}/{{val.name}}\">{{val.dName}}</a> </li> {{/each}} </ul> </div> {{/if}} </div> </div> </div> {{/if}}",
        init: function() {
            this.observeLocation({
                path: true,
                keys: 'q'
            });
        },
        updateUI: function(data) {
            var me = this;
            data.viewId = me.id;
            data.q = me.location.get('q');
            var html = Crox.render(me.tmpl, data);
            me.setViewHTML(me.id, html);
        },
        render: function() {
            var me = this;
            var loc = me.location;
            var data = {};
            if (loc.path == '/home') {
                data.isHome = true;
                me.updateUI(data);
            } else if (S.endsWith(loc.path, '/index')) {
                data.isIndex = true;
                me.updateUI(data);
            } else {
                MM.createMRequest(me).fetchAll({
                    name: 'Class_List'
                }, function(e, m) {
                    if (e) {
                        me.setViewHTML(me.id, e.msg);
                    } else {
                        me.updateUI({
                            coreList: m.get('coreList'),
                            extList: m.get('extList'),
                            infos: Magix.local('APIPathInfo')
                        });
                    }
                }, me);
            }
        },
        search: function() {
            var val = S.one('#' + this.id + '_sipt').val();
            var infos = Magix.local('APIPathInfo');
            this.navigate(['', infos.loader, infos.ver, 'search'].join('/'), {
                q: val
            });
        },
        'toggleMenu<click>': function(e) {
            var menu = S.one('.menu-extended');
            if (!menu) {
                this.$dropShown = false;
                return;
            }
            var height = menu.height();
            if (!height) {
                var h = (e.params.ver == '1.0' || e.params.ver == '1.1') ? 234 : 280;
                menu.animate({
                    height: h
                }, 0.4, 'easeOut');
                this.$dropShown = true;
            } else {
                menu.animate({
                    height: '0'
                }, 0.4, 'easeBoth');
                this.$dropShown = false;
            }
        },
        'search<click,keydown>': function(e) {
            if (e.type == 'keydown') {
                if (e.keyCode == 13) {
                    this.search();
                }
            } else {
                this.search();
            }
        },
        '$doc<click>': function(e) {
            if (this.$dropShown && !this.inside(e.target)) {
                this['toggleMenu<click>']();
            }
        }
    });
}, {
    requires: ['magix/view', 'apiapp/helpers/crox', 'apiapp/models/manager', 'magix/magix']
});