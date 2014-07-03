KISSY.add("apiapp/mviews/partials/header",function(a,b,c,d,e){return b.extend({tmpl:'<div class="toolbar clearfix"> {{if data.isHome}} <h1>Magix API</h1> {{else}} <a class="icon-home" href="#!/home"><i class="iconfont">&#336;</i></a> {{if !data.isIndex}} <a class="icon-menu" mx-click="toggleMenu<prevent>({ver:{{data.infos.ver}}})" href="#!/home"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </a> {{/if}} <div class="form-search clearfix" style="margin-left:{{if data.isIndex}}50{{else}}85{{/if}}px"> <input autocomplete="off" value="{{if data.q}}{{data.q}}{{/if}}" class="search" type="text" mx-keydown="search" id="{{data.viewId}}_sipt" /> <i class="iconfont delete">&#378;</i> <div class="btn-search" mx-click="search"><i class="iconfont" name="search-btn">&#337;</i></div> </div> {{/if}} </div> {{if !data.isHome&&!data.isIndex}} <div class="menu-extended"> <div class="extended-inner"> <div class="clearfix"> <div class="menu-outer"> {{if data.extList&&data.extList.length}}<div class="menu-t">核心模块</div>{{/if}} <ul class="menu"> {{each data.coreList as val}} <li class="menu-list"> <a href="#!/{{data.infos.loader}}/{{data.infos.ver}}/{{val.name}}">{{val.dName}}</a> </li> {{/each}} </ul> </div> {{if data.extList&&data.extList.length}} <div class="menu-outer"> <div class="menu-t">扩展模块</div> <ul class="menu"> {{each data.extList as val}} <li class="menu-list"> <a href="#!/{{data.infos.loader}}/{{data.infos.ver}}/{{val.name}}">{{val.dName}}</a> </li> {{/each}} </ul> </div> {{/if}} </div> </div> </div> {{/if}}',init:function(){this.observeLocation({path:!0,keys:"q"})},updateUI:function(a){var b=this;a.viewId=b.id,a.q=b.location.get("q");var d=c.render(b.tmpl,a);b.setViewHTML(b.id,d)},render:function(){var b=this,c=b.location,f={};"/home"==c.path?(f.isHome=!0,b.updateUI(f)):a.endsWith(c.path,"/index")?(f.isIndex=!0,b.updateUI(f)):d.createRequest(b).fetchAll({name:"Class_List"},function(a,c){a?b.setViewHTML(b.id,a.msg):b.updateUI({coreList:c.get("coreList"),extList:c.get("extList"),infos:e.local("APIPathInfo")})},b)},search:function(){var b=a.one("#"+this.id+"_sipt").val(),c=e.local("APIPathInfo");this.navigate(["",c.loader,c.ver,"search"].join("/"),{q:b})},"toggleMenu<click>":function(b){var c=a.one(".menu-extended");if(!c)return void(this.$dropShown=!1);var d=c.height();if(d)c.animate({height:"0"},.4,"easeBoth"),this.$dropShown=!1;else{var e="1.0"==b.params.ver||"1.1"==b.params.ver?234:280;c.animate({height:e},.4,"easeOut"),this.$dropShown=!0}},"search<click,keydown>":function(a){"keydown"==a.type?13==a.keyCode&&this.search():this.search()},"$doc<click>":function(a){this.$dropShown&&!this.inside(a.target)&&this["toggleMenu<click>"]()}})},{requires:["magix/view","apiapp/helpers/crox","apiapp/models/manager","magix/magix"]});