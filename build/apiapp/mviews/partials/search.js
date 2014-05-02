/*
    author:xinglie.lkf@taobao.com
 */
KISSY.add('apiapp/mviews/partials/search', function(S, View, MM, Crox, Magix) {
     return View.extend({template:"{{search=data.search}} {{infos=data.infos}} {{if search.nsGrouped.length}} <div class=content> {{each search.nsGrouped as group}} {{each group.properties as property}} <div class=list> <a href=\"#!/{{infos.loader}}/{{infos.ver}}/{{group.name.toLowerCase()}}?focus=p_{{property._name}}\"><span class=item>{{{search.color(property._name)}}}</span></a>{{if property.isPrivate}}<span class=mark>P</span>{{/if}}<span class=mark>Property</span><span class=mark>{{group.name}}</span> <div class=desc>{{property.desc}}</div> </div> {{/each}} {{each group.staticProperties as property}} <div class=list> <a href=\"#!/{{infos.loader}}/{{infos.ver}}/{{group.name.toLowerCase()}}?focus=sp_{{property._name}}\"><span class=item>{{{search.color(property._name)}}}</span></a>{{if property.isPrivate}}<span class=mark>P</span>{{/if}}<span class=mark>StaticProperty</span><span class=mark>{{group.name}}</span> <div class=desc>{{property.desc}}</div> </div> {{/each}} {{each group.methods as method}} <div class=list> <a href=\"#!/{{infos.loader}}/{{infos.ver}}/{{group.name.toLowerCase()}}?focus=m_{{method._name}}\"><span class=item>{{{search.color(method._name)}}}</span></a>{{if method.isPrivate}}<span class=mark>P</span>{{/if}}<span class=mark>Method</span><span class=mark>{{group.name}}</span> <div class=desc>{{method.desc}}</div> </div> {{/each}} {{each group.staticMethods as method}} <div class=list> <a href=\"#!/{{infos.loader}}/{{infos.ver}}/{{group.name.toLowerCase()}}?focus=sm_{{method._name}}\"><span class=item>{{{search.color(method._name)}}}</span></a>{{if method.isPrivate}}<span class=mark>P</span>{{/if}}<span class=mark>StaticMethod</span><span class=mark>{{group.name}}</span> <div class=desc>{{method.desc}}</div> </div> {{/each}} {{each group.events as event}} <div class=list> <a href=\"#!/{{infos.loader}}/{{infos.ver}}/{{group.name.toLowerCase()}}?focus=e_{{event._name}}\"><span class=item>{{{search.color(event._name)}}}</span></a>{{if event.isPrivate}}<span class=mark>P</span>{{/if}}<span class=mark>Event</span><span class=mark>{{group.name}}</span> <div class=desc>{{event.desc}}</div> </div> {{/each}} {{/each}} </div> {{else}} 未找到您搜索的{{search.key}} {{/if}}",
        init: function() {
            this.observeLocation('q');
        },
        render: function() {
            var me = this;
            var loc = me.location;
            var val = loc.get('q');
            if (val) {
                if (me.$lastSearch) {
                    me.$lastSearch.stop();
                }
                me.$lastSearch = MM.searchInfos(val, function(e, m) {
                    if (e) {
                        me.setViewHTML(me.id, e.msg);
                    } else {
                        me.setViewHTML(me.id, Crox.render(me.template, {
                            search: m,
                            infos: Magix.local('APIPathInfo')
                        }));
                    }
                }, me);
            } else {
                me.setViewHTML('多少搜点东西吧~');
            }
        }
    });
}, {
    requires: ['magix/view', 'apiapp/models/manager', 'apiapp/helpers/crox', 'magix/magix']
});