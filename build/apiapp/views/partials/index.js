/*
    author:xinglie.lkf@taobao.com
 */
KISSY.add('apiapp/views/partials/index', function(S, View) {
     return View.extend({template:"随便来些内容吧",
        render: function() {
            this.setViewHTML(this.template);
        }
    });
}, {
    requires: ['mxext/view']
});