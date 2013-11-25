/*
    author:xinglie.lkf@taobao.com
 */
KISSY.add('apiapp/mviews/partials/index', function(S, View, MM, Crox, Magix) {
    return View.extend({
        render: function() {
            var me = this;
            MM.fetchClassInfos(function(e, infos) {
                if (e) {
                    me.setViewHTML(e.msg);
                }
                MM.fetchAll({
                    name: 'Class_List'
                }, function(e, m) {
                    if (e) {
                        me.setViewHTML(e.msg);
                    } else {
                        var html = Crox.render(me.template, {
                            coreList: m.get('coreList'),
                            extList: m.get('extList'),
                            infos: Magix.local('APIPathInfo'),
                            extInfo: function(name) {
                                var info = infos.map[name];
                                if (info) {
                                    return info.get('desc');
                                }
                                return 'unfound';
                            }
                        });
                        me.setViewHTML(html);
                    }
                }, me);
            }, me);
        }
    });
}, {
    requires: ['mxext/view', 'apiapp/models/manager', 'apiapp/helpers/crox', 'magix/magix']
});