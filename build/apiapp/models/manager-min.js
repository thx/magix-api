KISSY.add("apiapp/models/manager",function(a,b,c,d){var e=b.create(c,["cKeys"]),f=d.cache(),g=d.cache(40),h=function(a){return a.replace(this.replaceReg,this.replaceExp).replace(/\(/g,'<span style="color:red">').replace(/\)/g,"</span>")};return e.registerModels([{name:"Class_List",url:"index.json",cache:!0,cKeys:function(){var a=d.local("APIPathInfo");return{loader:a.loader,ver:a.ver}},after:function(a){for(var b,c=a.get("list"),d=[],e=[],f={},g=0;g<c.length;g++)b=c[g],b.isCore?d.push(b):e.push(b),f[b.name]=b;a.set("coreList",d),a.set("extList",e),a.set("listMap",f)}},{name:"Class_Entity",cache:!0,after:function(a){var b=a.get("isa");if("CONSTRUCTOR"==b){a.set("isClass",!0);for(var c,e=a.get("methods"),f=[],g=[],h=0;h<e.length;h++)c=e[h],c.isStatic?f.push(c):g.push(c);a.set("methods",g),a.set("staticMethods",f);var i=a.get("properties");if(i){var j=[],k=[];for(h=0;h<i.length;h++)c=i[h],c.isStatic?j.push(c):k.push(c);a.set("properties",k),a.set("staticProperties",j)}}var l=a.get("inherits");l&&a.set("inheritsMap",d.toMap(l,"as"))}}]),e.registerMethods({fetchClassInfos:function(a){var b=d.local("APIPathInfo"),c=[b.loader,b.ver,"infos"].join("_"),g=e.createRequest(a);return f.has(c)?(g.doNext([null,f.get(c)]),g):(g.fetchAll({name:"Class_List"},function(a,c){if(!a){for(var d=[],e=c.get("list"),f=0;f<e.length;f++)a=e[f],d.push({name:"Class_Entity",cName:a.name,cKeys:{name:a.name,platform:b.loader,ver:b.ver}});return d}}),g.next(function(a,b){return a?void 0:g.fetchAll(b,function(a){if(!a){for(var b=arguments,d={},e=[],g=b.length-1;g>0;g--)d[b[g].get("cName")]=b[g],e.push(b[g]);var h={map:d,list:e};return f.set(c,h),h}})}),g)},searchInfos:function(a,b,c){var f={stopped:0,stop:function(){this.stopped=1},destroy:function(){this.stopped=1}},i=d.local("APIPathInfo"),j=[i.loader,i.ver,a].join("_");if(g.has(j))return b(null,g.get(j)),f;var k;if(a.indexOf("@")>-1){var l=a.split("@");a=l[0],k=l[1]}for(var m=c.sign,n=new RegExp("(.*?)("+a.split("").join(")(.*?)(")+")(.*?)","i"),o=[],p=a.length,q=1;p>0;)p--,o.push("$",q,"($",q+1,")"),q+=2;o.push("$",q);var r={replaceReg:n,replaceExp:o.join(""),key:a,color:h,nsGrouped:[]};k&&(k=new RegExp("(.*?)"+k.split("").join("(.*?)")+"(.*?)","i"));var s=e.fetchClassInfos(c);return s.next(function(d,h){if(d)b(d);else{var i=function(a){for(var b=[],c=0;c<a.length;c++)d=a[c],e._sKeyMaxLegth=Math.max(e._sKeyMaxLegth,d._name.length),n.test(d._name)&&b.push(d);return b},l=function(a,d,e){for(var h,k,n,o=a[d],p={name:o.get("_name")},q=["methods","events","properties","staticMethods","staticProperties"],s=0;s<q.length;s++)n=q[s],k=o.get(n),k&&(k=i(k),k.length&&(p[n]=k,h=!0));h&&r.nsGrouped.push(p),f.stopped||(e>d?setTimeout(function(){l(a,d+1,e)},50):(g.set(j,r),m==c.sign&&b(null,r)))};if(e._sKeyMaxLegth>-1&&e._sKeyMaxLegth<a.length)b(null,r);else{var o=h.list;if(k){for(var p,q=[],s=0;s<o.length;s++)p=o[s],k.test(p.get("_name"))&&q.push(p);o=q}o&&o.length?l(o,0,o.length-1):b(null,r)}}}),f}}),e._sKeyMaxLegth=-1,e},{requires:["magix/manager","apiapp/models/model","magix/magix"]});