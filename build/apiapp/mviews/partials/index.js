/*
    author:xinglie.lkf@taobao.com
 */
KISSY.add('apiapp/mviews/partials/index', function(S, View, MM, Crox, Magix) {
     return View.extend({template:"<div class=\"clearfix dir\">\r\n    {{if data.extList&&data.extList.length}}<div class=\"menu-t\">核心模块</div>{{/if}}\r\n    <ul class=\"menu\">\r\n        {{infos=data.infos}}\r\n        {{each data.coreList as one}}\r\n        <li class=\"menu-list\">\r\n            <a href=\"#!/{{infos.loader}}/{{infos.ver}}/{{one.name}}\">{{one.dName}}</a>\r\n            <span class=\"desc\">({{data.extInfo(one.name)}})</span>\r\n        </li>\r\n        {{/each}}\r\n    </ul>\r\n    {{if data.extList&&data.extList.length}}\r\n    <div class=\"menu-t\">扩展模块</div>\r\n    <ul class=\"menu\">\r\n        {{each data.extList as one}}\r\n        <li class=\"menu-list\">\r\n            <a href=\"#!/{{infos.loader}}/{{infos.ver}}/{{one.name}}\">{{one.dName}}</a>\r\n            <span>({{data.extInfo(one.name)}})</span>\r\n        </li>\r\n        {{/each}}\r\n    </ul>\r\n    {{/if}}\r\n</div>",
        render: function() {
            var me = this;
            MM.fetchClassInfos(function(e, infos) {
                if (e) {
                    me.setViewHTML(me.id, e.msg);
                }
                MM.createMRequest(me).fetchAll({
                    name: 'Class_List'
                }, function(e, m) {
                    if (e) {
                        me.setViewHTML(me.id, e.msg);
                    } else {
                        var html = Crox.render(me.template, {
                            coreList: m.get('coreList'),
                            extList: m.get('extList'),
                            infos: Magix.local('APIPathInfo'),
                            extInfo: function(name) {
                                console.log(infos, name, infos.map[name]);
                                var info = infos.map[name];
                                if (info) {
                                    return info.get('desc');
                                }
                                return 'unfound';
                            }
                        });
                        me.setViewHTML(me.id, html);
                    }
                });
            }, me);
        }
    });
}, {
    requires: ['magix/view', 'apiapp/models/manager', 'apiapp/helpers/crox', 'magix/magix']
});