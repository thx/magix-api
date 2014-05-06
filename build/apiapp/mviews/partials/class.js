/*
    author:xinglie.lkf@taobao.com
 */
KISSY.add('apiapp/mviews/partials/class', function(S, View, MM, Magix, Crox) {
    var FindParent = function(name, map, inner) {
        var a = [];
        if (!inner) {
            a.push({
                name: name
            });
        }
        var info = map[name.toLowerCase()];
        if (info) {
            info = info.get();
        }
        if (info) {
            var temp = info.inherits && info.inherits[0];
            if (temp) {
                temp = temp.alias.split('.')[0];
                a.push({
                    type: 'mix',
                    name: temp
                });
                temp = FindParent(temp, map, true);
                if (temp.length) {
                    a = a.concat(temp);
                }
            } else {
                temp = info.inheritsFrom && info.inheritsFrom[0];
                if (temp) {
                    a.push({
                        name: temp
                    });
                    temp = FindParent(temp, map, true);
                    if (temp.length) {
                        a = a.concat(temp);
                    }
                }
            }
        }
        return a;
    };
    var ExtendClass = {
        view: null,
        data: null,
        infos: null,
        method_params: function(params) {
            var a = [];
            if (params) {
                for (var i = 0, name; i < params.length; i++) {
                    name = params[i].name;
                    if (name.indexOf('.') == -1) {
                        a.push(name);
                    }
                }
            }
            return a;
        },
        moreInfos: function(key, val) {
            key = '$' + key;
            if (!ExtendClass[key]) {
                ExtendClass[key] = {};
            }
            ExtendClass[key][val._name] = val;
            return '';
        },
        inherits_relation: function(name) {
            var result = '';
            var tmpl = ExtendClass.view.getSubTmpl('inherits');
            var ir = FindParent(name, ExtendClass.infos.map);
            result = Crox.render(tmpl, {
                list: ir.reverse()
            });
            return result;
        }
    };
    var ClassExample = {
        info: null,
        example_desc: function(val) {
            return val.desc.replace(/ /g, '&nbsp;').replace(/(?:\bfunction|var|if|else|this\b)/g, '<span style="color:blue">$&</span>').replace(/(^|[^:])(\/{2}[\s\S]*?)(?:[\r\n]|$)/mg, '$1<span style="color:green">$2</span><br />').replace(/\r\n|\r|\n/g, '<br />');
        }
    };
     return View.extend({template:"{{entity=data.data}} <div class=content> <div class=clearfix> <h2> {{if entity.isClass}} {{data.moreInfos('class',entity)}} {{if entity._params||entity.example}} <a href=\"#!/home\" mx-click=\"toggleMoreInfos<prevent>{name:{{entity.alias}},type:class,anchor:.content}\"><i class=\"tree plus\"></i> {{/if}} {{/if}} {{entity.alias}} {{if entity.isClass}}{{if entity._params||entity.example}}</a>{{/if}} ({{data.method_params(entity._params)}}) {{/if}} <small>{{entity.desc}}</small> </h2> {{{data.inherits_relation(entity._name)}}} </div> {{if entity.properties&&entity.properties.length}} <h3>属性</h3> {{each entity.properties as val}} {{data.moreInfos('properties',val)}} <div class=list> {{if val._params||val.example}} <a href=\"#!/home\" mx-click=\"toggleMoreInfos<prevent>{name:{{val._name}},type:properties}\"> {{/if}} <i class=\"tree plus\" {{if !val._params&&!val.example}} style=background:none{{/if}}></i> <span class=item id=\"J_p_{{val._name}}\">{{val._name}}</span> {{if val._params||val.example}}</a>{{/if}} <small>&#123;{{if val.type}}{{val.type}}{{else}}{{if(val.defaultValue=='true'||val.defaultValue=='false')}}Boolean{{/if}}{{/if}}&#125;{{if val.memberOf!=entity._name}}<span class=mark>I</span>{{/if}}</small><div class=desc>{{val.desc}}</div></div> {{/each}} {{/if}} {{if entity.staticProperties&&entity.staticProperties.length}} <h3>静态属性</h3> {{each entity.staticProperties as val}} <div class=list><span class=item id=\"J_sp_{{val._name}}\">{{val._name}}</span>{{if val.type}} <small>&#123;{{val.type}}&#125;</small>{{/if}}</div> <div class=desc>{{val.desc}}</div> {{/each}} {{/if}} {{if entity.methods&&entity.methods.length}} <h3>方法</h3> {{each entity.methods as val}} {{data.moreInfos('methods',val)}} <div class=list> {{if val._params||val.example||val.returns}} <a href=\"#!/home\" mx-click=\"toggleMoreInfos<prevent>{name:{{val._name}},type:methods}\">{{/if}}<i class=\"tree plus\" {{if !val._params&&!val.example&&!val.returns}} style=background:none{{/if}}></i><span class=item id=\"J_m_{{val._name}}\">{{val._name}}({{data.method_params(val._params)}})</span> {{if val._params||val.example||val.returns}}</a>{{/if}}{{if val.isPrivate}}<span class=mark>P</span>{{/if}}{{if val.memberOf!=entity._name||(entity.inheritsMap&&entity.inheritsMap[val.alias])}}<span class=mark>I</span>{{/if}} <div class=desc>{{val.desc}}</div> </div> {{/each}} {{/if}} {{if entity.staticMethods&&entity.staticMethods.length}} <h3>静态方法</h3> {{each entity.staticMethods as val}} {{data.moreInfos('staticMethods',val)}} <div class=list> <a href=\"#!/home\" mx-click=\"toggleMoreInfos<prevent>{name:{{val._name}},type:staticMethods}\"><i class=\"tree plus\"></i><span class=item id=\"J_sm_{{val._name}}\">{{val._name}}({{data.method_params(val._params)}})</span></a>{{if val.isPrivate}}<span class=mark>P</span>{{/if}} <div class=desc>{{val.desc}}</div> </div> {{/each}} {{/if}} {{if entity.events&&entity.events.length}} <h3>事件</h3> {{each entity.events as val}} {{data.moreInfos('events',val)}} <div class=list> <a href=\"#!/home\" mx-click=\"toggleMoreInfos<prevent>{name:{{val._name}},type:events}\"><i class=\"tree plus\"></i><span class=item id=\"J_e_{{val._name}}\">{{val._name}}</span></a>{{if val.memberOf!=entity._name}}<span class=mark>I</span>{{/if}} <div class=desc>{{val.desc}}</div> </div> {{/each}} {{/if}} </div> {{#magix-tmpl-inherits}} <div class=ihrt-outer> 继承关系： <div class=ihrt> <div class=ihrt-t>Object</div> {{each data.list as val}} <div class=ihrt-list> {{val.name}}{{if val.type}}&lt;{{val.type}}&gt;{{/if}} {{/each}} {{each data.list as val}} </div> {{/each}} </div> </div> <div class=cb></div> {{/magix-tmpl-inherits}} {{#magix-tmpl-method}} {{content=false}} {{if data.info._params&&data.info._params.length}} {{content=true}} <h4>参数：</h4> <div class=callout> {{each data.info._params as key=>val}} {{val.name}}&#123;{{val.type}}&#125;{{if val.desc}}{{val.desc}}{{/if}}{{if key<data.info._params.length-1}}<br  /><br  />{{/if}} {{/each}} </div> {{/if}} {{if data.info.returns&&data.info.returns.length}} {{content=true}} <h4>返回值：</h4> <div class=callout> {{each data.info.returns as key=>val}} &#123;{{val.type}}&#125;{{if val.desc}}{{val.desc}}{{/if}} {{/each}} </div> {{/if}} {{if data.info.example&&data.info.example.length}} {{content=true}} <h4>示例：</h4> <div class=example> {{each data.info.example as val}} {{{data.example_desc(val)}}} {{/each}} </div> {{/if}} {{if !content}} 无 {{/if}} {{/magix-tmpl-method}}",
        init: function() {
            this.observeLocation('focus');
        },
        render: function() {
            var me = this;
            var infos = Magix.local('APIPathInfo');
            MM.fetchClassInfos(function(e, i) {
                if (e) {
                    me.setViewHTML(me.id, e.msg);
                } else {
                    var m = i.map[infos.action];
                    if (m) {
                        var data = m.get();
                        ExtendClass.data = data;
                        ExtendClass.infos = i;
                        ExtendClass.view = me;
                        var html = Crox.render(me.template, ExtendClass);
                        me.setViewHTML(me.id, html);
                        var focus = me.location.get('focus');
                        if (focus) {
                            var node = S.one('#J_' + focus);
                            if (node) {
                                me.manage(setTimeout(function() {
                                    S.DOM.scrollTop(node.offset().top - 50);
                                    var cnt = node.parent('.list');
                                    cnt.css({
                                        backgroundColor: '#fff'
                                    }).animate({
                                        backgroundColor: '#FF8400'
                                    }, 0.3).animate({
                                        backgroundColor: '#fff'
                                    }, 0.3).animate({
                                        backgroundColor: '#FF8400'
                                    }, 0.3).animate({
                                        backgroundColor: '#fff'
                                    }, 0.3);
                                }, 600));
                            }
                        }
                    } else {
                        me.setViewHTML(me.id, 'not found:' + infos.action);
                    }
                }
            }, me);
        },
        'toggleMoreInfos<click>': function(e) {
            var me = this;
            var cntId = me.id + '_method_details';
            var cnt = S.one('#' + cntId);
            if (!cnt) {
                cnt = document.createElement('div');
                cnt.id = cntId;
                document.body.appendChild(cnt);
                cnt = S.one(cnt);
            }
            var current = S.one('#' + e.currentId);
            var icon = current.one('i');
            if (icon != me.$lastIcon && me.$lastIcon) {
                me.$lastIcon.removeClass('minus').addClass('plus');
            }
            var currentDD = current.parent('div');
            if (currentDD.contains(cnt)) {
                var none = cnt.css('display') == 'none';
                cnt.css({
                    display: none ? '' : 'none'
                });
                if (none) {
                    icon.removeClass('plus').addClass('minus');
                } else {
                    icon.removeClass('minus').addClass('plus');
                }
            } else {
                cnt.css({
                    display: '',
                    paddingLeft: 24
                });
                currentDD.append(cnt);
                icon.removeClass('plus').addClass('minus');
            }
            me.$lastIcon = icon;
            var tmpl = me.getSubTmpl('method');
            var data = ExtendClass;
            var methods = data['$' + e.params.type] || {};
            var info = methods[e.params.name] || {};
            ClassExample.info = info;
            var top = icon.offset().top;
            if (top < S.DOM.scrollTop()) {
                S.DOM.scrollTop(top - 50);
            }
            cnt.html(Crox.render(tmpl, ClassExample));
        }
    });
}, {
    requires: ['magix/view', 'apiapp/models/manager', 'magix/magix', 'apiapp/helpers/crox', 'anim']
});