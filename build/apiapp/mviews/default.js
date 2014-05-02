/*
    author:xinglie.lkf@taobao.com
 */
KISSY.add('apiapp/mviews/default', function(S, View, Magix, VOM) {
    var NonClass = {
        index: 1,
        search: 1
    };
     return View.extend({template:"<div id=header> <vframe mx-view=\"apiapp/mviews/partials/header\"></vframe> </div> <div style=\"margin-top: 50px;\"> <vframe id=magix_vf_main>哥正在用绳命加载，请稍候哦...</vframe> </div> <vframe mx-view=\"apiapp/mviews/partials/footer\" id=magix_vf_footer></vframe>",
        init: function() {
            this.observeLocation({
                pathname: true
            });
        },
        render: function() {
            var me = this;
            if (!me.rendered) {
                me.setViewHTML(me.id, me.template);
            }
            me.mountMainVframe();
        },
        mountMainVframe: function() {
            var pnReg = /\/([^\/]+)\/(\d+\.\d+)\/([^\/]+)/;
            var loc = this.location;
            var infos = loc.pathname.match(pnReg);
            var vf = VOM.get('magix_vf_main');
            if (infos) {
                Magix.local('APIPathInfo', {
                    loader: infos[1],
                    ver: infos[2],
                    action: infos[3]
                });
                var view = infos[3];
                if (!NonClass[view]) {
                    view = 'class';
                }
                vf.mountView('apiapp/mviews/partials/' + view);
            } else {
                vf.mountView('apiapp/mviews/partials/home');
            }
        }
    });
}, {
    requires: ['magix/view', 'magix/magix', 'magix/vom']
});