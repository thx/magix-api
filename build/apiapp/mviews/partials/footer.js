/*
    author:xinglie.lkf@taobao.com
 */
KISSY.add('apiapp/mviews/partials/footer', function(S, View) {
     return View.extend({tmpl:"<div id=\"footer\">Copyright, <span class=\"belong\">xinglie.lkf@taobao.com</span></div>",
        render: function() {
            var me = this;
            console.log('footer render');
            me.setViewHTML(me.id, me.tmpl);
        }
    });
}, {
    requires: ['magix/view']
});