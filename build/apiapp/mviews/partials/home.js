/*
    author:xinglie.lkf@taobao.com
 */
KISSY.add('apiapp/mviews/partials/home', function(S, View) {
     return View.extend({tmpl:"<div class=\"clearfix\"> <div class=\"menu-outer\"> <div class=\"menu-t\">版本与类库选择</div> <ul class=\"menu\"> <li class=\"menu-list\"> <a href=\"#!/kissy/1.2/index\">Magix1.2(Kissy版)</a> </li> <li class=\"menu-list\"> <a href=\"#!/seajs/1.2/index\">Magix1.2(seajs+jQuery版)</a> </li> <li class=\"menu-list\"> <a href=\"#!/requirejs/1.2/index\">Magix1.2(requirejs+jQuery版)</a> </li> <li class=\"menu-list\"> <a href=\"#!/kissy/1.1/index\">Magix1.1(Kissy版)</a> </li> <li class=\"menu-list\"> <a href=\"#!/seajs/1.1/index\">Magix1.1(seajs+jQuery版)</a> </li> <li class=\"menu-list\"> <a href=\"#!/requirejs/1.1/index\">Magix1.1(requirejs+jQuery版)</a> </li> <li class=\"menu-list\"> <a href=\"#!/kissy/1.0/index\">Magix1.0(Kissy版)</a> </li> <li class=\"menu-list\"> <a href=\"#!/seajs/1.0/index\">Magix1.0(seajs+jQuery版)</a> </li> <li class=\"menu-list\"> <a href=\"#!/requirejs/1.0/index\">Magix1.0(requirejs+jQuery版)</a> </li> </ul> </div> </div>",
        render: function() {
            var me = this;
            me.setViewHTML(me.id, me.tmpl);
        }
    });
}, {
    requires: ['magix/view']
});