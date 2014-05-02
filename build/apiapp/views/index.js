/*
    author:xinglie.lkf@taobao.com
 */
KISSY.add('apiapp/views/index', function(S, View, Magix) {
     return View.extend({template:"<a href=\"#!/kissy/1.1/index\">kissy 1.1</a> <a href=\"#!/seajs/1.1/index\">seajs 1.1</a> <a href=\"#!/requirejs/1.1/index\">requirejs 1.1</a>",
        render: function() {
            var me = this;
            me.setViewHTML(me.template);
        }
    });
}, {
    requires: ['magix/view', 'magix/magix']
});