/*
    author:xinglie.lkf@taobao.com
 */
KISSY.add('apiapp/views/partials/search', function(S, View, MM) {
     return View.extend({template:"<div style=\"width:100%;height:100%;background-color:#000;opacity:.3;position:fixed;left:0;top:0;display:none\" id=abc mx-mousedown=hideSearch></div> <input type=text style=\"width:200px;line-height:25px;height:25px;font-size:16px;position:relative;\" mx-keyup=doSearch mx-focusin=showSearch  /> <vframe mx-view=\"apiapp/views/partials/search-result\" id=J_apiapp_s_result style=\"position:relative;display:none\"></vframe>",
        render: function() {
            this.setViewHTML(this.template);
        },
        'doSearch<keyup>': function(e) {
            var me = this;
            var last = me.$last;
            var val = me.$(e.currentId).value;
            if (last != val) {
                me.$last = val;
                if (me.$lastSearch) {
                    me.$lastSearch.stop();
                }
                if (val) {
                    me.$lastSearch = MM.searchInfos(val, function(e, m) {
                        var vf = me.vom.get('J_apiapp_s_result');
                        if (vf) {
                            vf.invokeView('showResults', e, m);
                        }
                    }, me);
                } else {
                    console.log('nothing');
                }
            }
        },
        'showSearch<focusin>': function(e) {
            this.$('abc').style.display = 'block';
            this.$('J_apiapp_s_result').style.display = 'block';
            this['doSearch<keyup>'](e);
        },
        'hideSearch<mousedown>': function(e) {
            this.$('abc').style.display = 'none';
            this.$('J_apiapp_s_result').style.display = 'none';
        }
    });
}, {
    requires: ['mxext/view', 'apiapp/models/manager']
});