KISSY.add("apiapp/models/manager",function(a,b,c,d){var e=b.create(c,["cKeys"]),f=d.cache(),g=d.cache(40),h=function(a){return a.replace(this.replaceReg,this.replaceExp).replace(/\(/g,'<span style="color:red">').replace(/\)/g,"</span>")};return e.registerModels([{name:"Class_List",url:"index.json",cache:!0,cKeys:function(){var a=d.local("APIPathInfo");return[a.loader,a.ver].join("_")},after:function(a){for(var b,c=a.get("list"),d=[],e=[],f={},g=0;g<c.length;g++)b=c[g],b.isCore?d.push(b):e.push(b),f[b.name]=b;a.set("coreList",d),a.set("extList",e),a.set("listMap",f)}},{name:"Class_Entity",cache:!0,after:function(a){var b=a.get("isa");if("CONSTRUCTOR"==b){a.set("isClass",!0);for(var c,e=a.get("methods"),f=[],g=[],h=0;h<e.length;h++)c=e[h],c.isStatic?f.push(c):g.push(c);a.set("methods",g),a.set("staticMethods",f);var i=a.get("properties");if(i){var j=[],k=[];for(h=0;h<i.length;h++)c=i[h],c.isStatic?j.push(c):k.push(c);a.set("properties",k),a.set("staticProperties",j)}}var l=a.get("inherits");l&&a.set("inheritsMap",d.listToMap(l,"as"))}}]),e.registerMethods({fetchClassInfos:function(a,b){var c=d.local("APIPathInfo"),g=[c.loader,c.ver,"infos"].join("_");if(f.has(g))return void a(null,f.get(g));var h=e.fetchAll({name:"Class_List"},function(b,d){if(!b){for(var e=[],f=d.get("list"),g=0;g<f.length;g++)b=f[g],e.push({name:"Class_Entity",cName:b.name,cKeys:{name:b.name,platform:c.loader,ver:c.ver}});return e}a(b)},b);return h.next(function(b,c){h.fetchAll(c,function(b){if(!b){for(var c=arguments,d={},e=[],h=c.length-1;h>0;h--)d[c[h].get("cName")]=c[h],e.push(c[h]);var i={map:d,list:e};return f.set(g,i),a(b,i),i}a(b)})}),h},searchInfos:function(a,b,c){var d={stopped:0,stop:function(){this.stopped=1},destroy:function(){this.stopped=1}};if(g.has(a))return b(null,g.get(a)),d;var f,i=a;if(a.indexOf("@")>-1){var j=a.split("@");a=j[0],f=j[1]}for(var k=c.sign,l=new RegExp("(.*?)("+a.split("").join(")(.*?)(")+")(.*?)","i"),m=[],n=a.length,o=1;n>0;)n--,m.push("$",o,"($",o+1,")"),o+=2;m.push("$",o);var p={replaceReg:l,replaceExp:m.join(""),key:a,color:h,nsGrouped:[]};return f&&(f=new RegExp("(.*?)"+f.split("").join("(.*?)")+"(.*?)","i")),e.fetchClassInfos(function(h,j){if(h)b(h);else{var m=function(a){for(var b=[],c=0;c<a.length;c++)h=a[c],e._sKeyMaxLegth=Math.max(e._sKeyMaxLegth,h._name.length),l.test(h._name)&&b.push(h);return b},n=function(a,e,f){for(var h,j,l,o=a[e],q={name:o.get("_name")},r=["methods","events","properties","staticMethods","staticProperties"],s=0;s<r.length;s++)l=r[s],j=o.get(l),j&&(j=m(j),j.length&&(q[l]=j,h=!0));h&&p.nsGrouped.push(q),d.stopped||(f>e?setTimeout(function(){n(a,e+1,f)},50):(g.set(i,p),k==c.sign&&b(null,p)))};if(e._sKeyMaxLegth>-1&&e._sKeyMaxLegth<a.length)b(null,p);else{var o=j.list;if(f){for(var q,r=[],s=0;s<o.length;s++)q=o[s],f.test(q.get("_name"))&&r.push(q);o=r}o&&o.length?n(o,0,o.length-1):b(null,p)}}},c),d}}),e._sKeyMaxLegth=-1,e},{requires:["magix/mmanager","apiapp/models/model","magix/magix"]});