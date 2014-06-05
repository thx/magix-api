/*
    author:xinglie.lkf@taobao.com
 */
KISSY.add('apiapp/mviews/partials/search', function(S, View, MM, Crox, Magix) {
     return View.extend({tmpl:"{{search=data.search}}\r\n{{infos=data.infos}}\r\n{{if search.nsGrouped.length}}\r\n<div class=\"content\">\r\n    {{each search.nsGrouped as group}}\r\n        {{each group.properties as property}}\r\n        <div class=\"list\">\r\n            <a href=\"#!/{{infos.loader}}/{{infos.ver}}/{{group.name.toLowerCase()}}?focus=p_{{property._name}}\"><span class=\"item\">{{{search.color(property._name)}}}</span></a>{{if property.isPrivate}}<span class=\"mark\">P</span>{{/if}}<span class=\"mark\">Property</span><span class=\"mark\">{{group.name}}</span>\r\n            <div class=\"desc\">{{property.desc}}</div>\r\n        </div>\r\n        {{/each}}\r\n\r\n        {{each group.staticProperties as property}}\r\n        <div class=\"list\">\r\n            <a href=\"#!/{{infos.loader}}/{{infos.ver}}/{{group.name.toLowerCase()}}?focus=sp_{{property._name}}\"><span class=\"item\">{{{search.color(property._name)}}}</span></a>{{if property.isPrivate}}<span class=\"mark\">P</span>{{/if}}<span class=\"mark\">StaticProperty</span><span class=\"mark\">{{group.name}}</span>\r\n            <div class=\"desc\">{{property.desc}}</div>\r\n        </div>\r\n        {{/each}}\r\n\r\n        {{each group.methods as method}}\r\n        <div class=\"list\">\r\n            <a href=\"#!/{{infos.loader}}/{{infos.ver}}/{{group.name.toLowerCase()}}?focus=m_{{method._name}}\"><span class=\"item\">{{{search.color(method._name)}}}</span></a>{{if method.isPrivate}}<span class=\"mark\">P</span>{{/if}}<span class=\"mark\">Method</span><span class=\"mark\">{{group.name}}</span>\r\n            <div class=\"desc\">{{method.desc}}</div>\r\n        </div>\r\n        {{/each}}\r\n\r\n        {{each group.staticMethods as method}}\r\n        <div class=\"list\">\r\n            <a href=\"#!/{{infos.loader}}/{{infos.ver}}/{{group.name.toLowerCase()}}?focus=sm_{{method._name}}\"><span class=\"item\">{{{search.color(method._name)}}}</span></a>{{if method.isPrivate}}<span class=\"mark\">P</span>{{/if}}<span class=\"mark\">StaticMethod</span><span class=\"mark\">{{group.name}}</span>\r\n            <div class=\"desc\">{{method.desc}}</div>\r\n        </div>\r\n        {{/each}}\r\n\r\n        {{each group.events as event}}\r\n        <div class=\"list\">\r\n            <a href=\"#!/{{infos.loader}}/{{infos.ver}}/{{group.name.toLowerCase()}}?focus=e_{{event._name}}\"><span class=\"item\">{{{search.color(event._name)}}}</span></a>{{if event.isPrivate}}<span class=\"mark\">P</span>{{/if}}<span class=\"mark\">Event</span><span class=\"mark\">{{group.name}}</span>\r\n            <div class=\"desc\">{{event.desc}}</div>\r\n        </div>\r\n        {{/each}}\r\n    {{/each}}\r\n</div>\r\n{{else}}\r\n    未找到您搜索的{{search.key}}\r\n{{/if}}",
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
                        me.setViewHTML(me.id, Crox.render(me.tmpl, {
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