KISSY.add("apiapp/mviews/partials/class",function(a,b,c,d,e){var f=function(a,b,c){var d=[];c||d.push({name:a});var e=b[a.toLowerCase()];if(e&&(e=e.get()),e){var g=e.inherits&&e.inherits[0];g?(g=g.alias.split(".")[0],d.push({type:"mix",name:g}),g=f(g,b,!0),g.length&&(d=d.concat(g))):(g=e.inheritsFrom&&e.inheritsFrom[0],g&&(d.push({name:g}),g=f(g,b,!0),g.length&&(d=d.concat(g))))}return d},g={view:null,data:null,infos:null,method_params:function(a){var b=[];if(a)for(var c,d,e=0;e<a.length;e++)d=a[e],c=d.name,-1==c.indexOf(".")&&b.push(c);return b},moreInfos:function(a,b){return a="$"+a,g[a]||(g[a]={}),g[a][b._name]=b,""},inherits_relation:function(a){var b="",c=g.view.getSubTmpl("inherits"),d=f(a,g.infos.map);return b=e.render(c,{list:d.reverse()})}},h={info:null,example_desc:function(a){return a.desc.replace(/ /g,"&nbsp;").replace(/(?:\bfunction|var|if|else|this\b)/g,'<span style="color:blue">$&</span>').replace(/(^|[^:])(\/{2}[\s\S]*?)(?:[\r\n]|$)/gm,'$1<span style="color:green">$2</span><br />').replace(/\r\n|\r|\n/g,"<br />")}};return b.extend({tmpl:'{{entity=data.data}} <div class="content"> <div class="clearfix"> <h2> {{if entity.isClass}} {{data.moreInfos(\'class\',entity)}} {{if entity._params||entity.example}} <a href="#!/home" mx-click="toggleMoreInfos<prevent>({name:{{entity.alias}},type:class,anchor:.content})"><i class="tree plus"></i> {{/if}} {{/if}} {{entity.alias}} {{if entity.isClass}}{{if entity._params||entity.example}}</a>{{/if}} ({{data.method_params(entity._params)}}) {{/if}} <small>{{entity.desc}}</small> </h2> {{{data.inherits_relation(entity._name)}}} </div> {{if entity.properties&&entity.properties.length}} <h3>属性</h3> {{each entity.properties as val}} {{data.moreInfos(\'properties\',val)}} <div class="list"> {{if val._params||val.example}} <a href="#!/home" mx-click="toggleMoreInfos<prevent>({name:{{val._name}},type:properties})"> {{/if}} <i class="tree plus" {{if !val._params&&!val.example}} style="background:none"{{/if}}></i> <span class="item" id="J_p_{{val._name}}">{{val._name}}</span> {{if val._params||val.example}}</a>{{/if}} <small>&#123;{{if val.type}}{{val.type}}{{else}}{{if(val.defaultValue==\'true\'||val.defaultValue==\'false\')}}Boolean{{/if}}{{/if}}&#125;{{if val.memberOf!=entity._name}}<span class="mark">I</span>{{/if}}</small><div class="desc">{{val.desc}}</div></div> {{/each}} {{/if}} {{if entity.staticProperties&&entity.staticProperties.length}} <h3>静态属性</h3> {{each entity.staticProperties as val}} <div class="list"><span class="item" id="J_sp_{{val._name}}">{{val._name}}</span>{{if val.type}} <small>&#123;{{val.type}}&#125;</small>{{/if}}</div> <div class="desc">{{val.desc}}</div> {{/each}} {{/if}} {{if entity.methods&&entity.methods.length}} <h3>方法</h3> {{each entity.methods as val}} {{data.moreInfos(\'methods\',val)}} <div class="list"> {{if val._params||val.example||val.returns}} <a href="#!/home" mx-click="toggleMoreInfos<prevent>({name:{{val._name}},type:methods})">{{/if}}<i class="tree plus" {{if !val._params&&!val.example&&!val.returns}} style="background:none"{{/if}}></i><span class="item" id="J_m_{{val._name}}">{{val._name}}({{data.method_params(val._params)}})</span> {{if val._params||val.example||val.returns}}</a>{{/if}}{{if val.isPrivate}}<span class="mark">P</span>{{/if}}{{if val.memberOf!=entity._name||(entity.inheritsMap&&entity.inheritsMap[val.alias])}}<span class="mark">I</span>{{/if}} <div class="desc">{{val.desc}}</div> </div> {{/each}} {{/if}} {{if entity.staticMethods&&entity.staticMethods.length}} <h3>静态方法</h3> {{each entity.staticMethods as val}} {{data.moreInfos(\'staticMethods\',val)}} <div class="list"> <a href="#!/home" mx-click="toggleMoreInfos<prevent>({name:{{val._name}},type:staticMethods})"><i class="tree plus"></i><span class="item" id="J_sm_{{val._name}}">{{val._name}}({{data.method_params(val._params)}})</span></a>{{if val.isPrivate}}<span class="mark">P</span>{{/if}} <div class="desc">{{val.desc}}</div> </div> {{/each}} {{/if}} {{if entity.events&&entity.events.length}} <h3>事件</h3> {{each entity.events as val}} {{data.moreInfos(\'events\',val)}} <div class="list"> <a href="#!/home" mx-click="toggleMoreInfos<prevent>({name:{{val._name}},type:events})"><i class="tree plus"></i><span class="item" id="J_e_{{val._name}}">{{val._name}}</span></a>{{if val.memberOf!=entity._name}}<span class="mark">I</span>{{/if}} <div class="desc">{{val.desc}}</div> </div> {{/each}} {{/if}} </div> {{#magix-tmpl-inherits}} <div class="ihrt-outer"> 继承关系： <div class="ihrt"> <div class="ihrt-t">Object</div> {{each data.list as val}} <div class="ihrt-list"> {{val.name}}{{if val.type}}&lt;{{val.type}}&gt;{{/if}} {{/each}} {{each data.list as val}} </div> {{/each}} </div> </div> <div class="cb"></div> {{/magix-tmpl-inherits}} {{#magix-tmpl-method}} {{content=false}} {{if data.info._params&&data.info._params.length}} {{content=true}} <h4>参数：</h4> <div class="callout"> {{each data.info._params as key=>val}} {{val.name}} &#123;{{val.type}}&#125; {{if val.isOptional}}[可选参数] {{/if}}{{if val.desc}}{{val.desc}}{{/if}}{{if key<data.info._params.length-1}}<br /><br />{{/if}} {{/each}} </div> {{/if}} {{if data.info.returns&&data.info.returns.length}} {{content=true}} <h4>返回值：</h4> <div class="callout"> {{each data.info.returns as key=>val}} &#123;{{val.type}}&#125;{{if val.desc}}{{val.desc}}{{/if}} {{/each}} </div> {{/if}} {{if data.info.example&&data.info.example.length}} {{content=true}} <h4>示例：</h4> <div class="example"> {{each data.info.example as val}} {{{data.example_desc(val)}}} {{/each}} </div> {{/if}} {{if !content}} 无 {{/if}} {{/magix-tmpl-method}}',init:function(){this.observeLocation("focus")},render:function(){var b=this,f=d.local("APIPathInfo"),h=c.fetchClassInfos(b);h.next(function(c,d){if(c)b.setViewHTML(b.id,c.msg);else{var h=d.map[f.action];if(h){var i=h.get();g.data=i,g.infos=d,g.view=b;var j=e.render(b.tmpl,g);b.setViewHTML(b.id,j);var k=b.location.get("focus");if(k){var l=a.one("#J_"+k);l&&b.manage(setTimeout(function(){a.DOM.scrollTop(l.offset().top-50);var b=l.parent(".list");b.css({backgroundColor:"#fff"}).animate({backgroundColor:"#FF8400"},.3).animate({backgroundColor:"#fff"},.3).animate({backgroundColor:"#FF8400"},.3).animate({backgroundColor:"#fff"},.3)},600))}}else b.setViewHTML(b.id,"not found:"+f.action)}})},"toggleMoreInfos<click>":function(b){var c=this,d=c.id+"_method_details",f=a.one("#"+d);f||(f=document.createElement("div"),f.id=d,document.body.appendChild(f),f=a.one(f));var i=a.one("#"+b.currentId),j=i.one("i");j!=c.$lastIcon&&c.$lastIcon&&c.$lastIcon.removeClass("minus").addClass("plus");var k=i.parent("div");if(k.contains(f)){var l="none"==f.css("display");f.css({display:l?"":"none"}),l?j.removeClass("plus").addClass("minus"):j.removeClass("minus").addClass("plus")}else f.css({display:"",paddingLeft:24}),k.append(f),j.removeClass("plus").addClass("minus");c.$lastIcon=j;var m=c.getSubTmpl("method"),n=g,o=n["$"+b.params.type]||{},p=o[b.params.name]||{};h.info=p;var q=j.offset().top;q<a.DOM.scrollTop()&&a.DOM.scrollTop(q-50),f.html(e.render(m,h))}})},{requires:["magix/view","apiapp/models/manager","magix/magix","apiapp/helpers/crox","anim"]});