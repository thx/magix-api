KISSY.add("apiapp/sub-tmpl",function(a,b){var c=/\{{2}#magix-tmpl-(\w+)\}{2}([\s\S]*?)\{{2}\/magix-tmpl-\1\}{2}/g,d=/\{{2}magix-include-(\w+)\}{2}/g;return b.mixin({setViewHTML:b.prototype.setHTML,getSubTmpl:function(a){var b=this,c=b.$subTmpls;return c?c[a]||"":""}},function(){var a=this;a.$subTmpls={},a.on("inited",function(){a.tmpl=a.tmpl.replace(c,function(b){return b.replace(c,function(b,c,d){a.$subTmpls[c]=d}),""}).replace(d,function(b,c){return a.$subTmpls[c]||""})})})},{requires:["magix/view"]});