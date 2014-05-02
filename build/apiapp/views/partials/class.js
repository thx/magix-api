/*
    author:xinglie.lkf@taobao.com
 */
KISSY.add('apiapp/views/partials/class', function(S, View, MM) {
     return View.extend({template:"magix view content <vframe mx-view=\"apiapp/views/partials/search\"></vframe>",
        render: function() {
            var me = this;
            me.setViewHTML(me.template);
            var s = MM.searchInfos('setviewhml', function(e, m) {
                console.log(e, m);
            }, me);
            //s.stop();
        }
    });
}, {
    requires: ['mxext/view', 'apiapp/models/manager']
});