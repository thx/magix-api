/*
    author:xinglie.lkf@taobao.com
 */
KISSY.add('apiapp/mviews/partials/index', function(S, View, MM, Crox, Magix) {
     return View.extend({tmpl:"<div class=\"clearfix dir\"> {{if data.extList&&data.extList.length}}<div class=\"menu-t\">核心模块</div>{{/if}} <ul class=\"menu\"> {{infos=data.infos}} {{each data.coreList as one}} <li class=\"menu-list\"> <a href=\"#!/{{infos.loader}}/{{infos.ver}}/{{one.name}}\">{{one.dName}}</a> <span class=\"desc\">({{data.extInfo(one.name)}})</span> </li> {{/each}} </ul> {{if data.extList&&data.extList.length}} <div class=\"menu-t\">扩展模块</div> <ul class=\"menu\"> {{each data.extList as one}} <li class=\"menu-list\"> <a href=\"#!/{{infos.loader}}/{{infos.ver}}/{{one.name}}\">{{one.dName}}</a> <span>({{data.extInfo(one.name)}})</span> </li> {{/each}} </ul> {{/if}} </div>",
        render: function() {
            var me = this;
            var r = MM.fetchClassInfos(me);
            console.log(r);
            r.next(function(err, info) {
                if (err) {
                    me.setViewHTML(me.id, err.msg);
                } else {
                    r.fetchAll({
                        name: 'Class_List'
                    }, function(e, m) {
                        if (e) {
                            me.setViewHTML(me.id, e.msg);
                        } else {
                            var html = Crox.render(me.tmpl, {
                                coreList: m.get('coreList'),
                                extList: m.get('extList'),
                                infos: Magix.local('APIPathInfo'),
                                extInfo: function(name) {
                                    console.log(info, name, info.map[name]);
                                    var i = info.map[name];
                                    if (i) {
                                        return i.get('desc');
                                    }
                                    return 'unfound';
                                }
                            });
                            me.setViewHTML(me.id, html);
                        }
                    });
                }
            });
        }
    });
}, {
    requires: ['magix/view', 'apiapp/models/manager', 'apiapp/helpers/crox', 'magix/magix']
});