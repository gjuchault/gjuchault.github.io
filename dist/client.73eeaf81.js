webpackJsonp([0,2],[,,function(e,t,n){"use strict";var r=n(42),s=n(27),a=n.n(s),i=n(12);n.n(i);n.d(t,"a",function(){return c});var c=new r.a(Object.assign({},a.a))},function(e,t,n){"use strict";var r=n(24),s=n.n(r);window.Promise=window.Promise||s.a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(22),s=n.n(r);s.a.install({onUpdateReady:function(){console.log("update ready"),s.a.applyUpdate()},onUpdated:function(){console.log("updated"),location.reload()}})},function(e,t){e.exports={icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAJFBMVEUAAAD///////////////////////////////////////////+0CY3pAAAAC3RSTlMA/FtU8lawJwOkOrA2qfAAAACaSURBVDjLzdMxCgIxFAbhh42LrVhZeQNPocU2HsLOxsJLeAYbryCITS4nS0iGDKTe/avAx5DqxWK3vqa8iPLIe6QO3How9mB6sEMHVnsBwacFgl0LBJcWCKIFAgGBgEBAICCYBhAYcnAUlGAbBgJ9TiAgEBAICAybGgiGVwkE8ayBYHgLeMwDY9K+9Qy0Xz0c7cypNTvdY6n7Azy8xrNhsjUfAAAAAElFTkSuQmCC"}},function(e,t){e.exports=[{title:"Analysons le FN",picture:{src:"analysonsFN.jpg",baseWidth:700,count:2},url:"https://analysonslefn.fr/",desc:"Political website for 2017's France election. Huge analysis of how incoherent the extreme right party political program is.",tags:["JS","HTML5","Political"]},{title:"UTT Arena 2015",picture:{src:"arena2015.jpg",baseWidth:1590,count:3},url:"http://ungdev.github.io/arena.utt.fr-2015/",desc:"Website for the UTT Arena 2015, a 300-players LAN party.",tags:["JS","HTML5"]},{title:"UTT Arena 2016",picture:{src:"arena2016.jpg",baseWidth:1680,count:3},url:"http://ungdev.github.io/arena.utt.fr-2016/",desc:"Website for the UTT Arena 2016, a 300-players LAN party.",tags:["JS","HTML5"]},{title:"Buckless",picture:{src:"buckless.jpg",baseWidth:600,count:2},url:"https://buckless.com/",desc:"A NFC tag payment system for events, structures and retail. Founder and developer.",tags:["node","docker","founding"]},{title:"Convertisseur CICE",picture:{src:"cice.jpg",baseWidth:1200,count:3},url:"http://convertisseur-cice.fr/",desc:"Political website for 2017's France election. Demonstrates the unusefulness of a fiscal advantage for companies.",tags:["JS","HTML5","Political"]},{title:"Enseack",picture:{src:"enseack.jpg",baseWidth:1e3,count:2},url:"https://github.com/RobotikUTT/enseack-2015/tree/centralServer",desc:"Participed to an electronics hackathon. We realized a small prototype within 48 hours that was designed to evaluate benefits of a solar panel.",tags:["JS","HTML5","robotics"]},{title:"fuzzyjs",picture:{src:"fuzzy.jpg",baseWidth:1857,count:3},url:"https://github.com/gjuchault/fuzzyjs",desc:"fuzzyjs is a fuzzy search algorithm in javascript.",tags:["JS","Fuzzy"]},{title:"Requelize",picture:{src:"requelize.jpg",baseWidth:1920,count:3},url:"https://github.com/buckutt/requelize",desc:"A RethinkDB ORM, with a lot of nice features (3-way relationships, Joi schemas, RxJS feeds, etc.).",tags:["ORM","database","RethinkDB"]},{title:"Tambouille Électorale",picture:{src:"tambouille.jpg",baseWidth:1200,count:3},url:"https://tambouille-electorale.fr/",desc:"Political website for 2017's France election. Lists fiddling candidates in some parties.",tags:["JS","HTML5","Political"]}]},function(e,t,n){"use strict"},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(29),s=n.n(r),a=n(32),i=n.n(a),c=n(28),o=n.n(c);t.default={components:{gHeader:s.a,gProjects:i.a,gFooter:o.a},data:function(){return{webp:!1}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(5);n.n(r);t.default={props:["link"],data:function(){return{openInNewTabIcon:r.icon}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=(n(7),n(30)),s=n.n(r),a=n(33),i=n.n(a),c=!0;t.default={props:["project"],data:function(){return{currentImageZoomed:null,fullscreenEnter:!1}},components:{gOpen:s.a,gTag:i.a},computed:{backgroundImage:function(){for(var e=c?"/static/"+this.project.picture.src:this.project.picture.src,t=[],n=0;n<this.project.picture.count;n+=1){var r=c?"/static/"+this.project.picture.src:this.project.picture.src,s="1x";n>0&&(r=r.replace(".jpg","@x"+(n+1)+".jpg"),s=n+1+"x"),t.push("url("+r+") "+s)}return["background-image: url("+e+")","background-image: image-set("+t.join(", ")+")","background-image: -webkit-image-set("+t.join(", ")+")"].join("; ")}},mounted:function(){this.$fullscreen=this.$refs.fullscreen,this.$backdrop=this.$refs.backdrop},methods:{zoom:function(){var e=this;this.currentImageZoomed="/static/"+this.project.picture.src.replace(".jpg","@x"+this.project.picture.count+".jpg"),this.$fullscreen.classList.add("fullscreen"),setTimeout(function(){e.$fullscreen.style.transition=".2s opacity ease",e.$backdrop.style.transition=".2s opacity ease",setTimeout(function(){e.$fullscreen.style.opacity=1,e.$backdrop.style.opacity=1})})},zoomOut:function(){this.isHiding=!0,this.$fullscreen.style.opacity=0,this.$backdrop.style.opacity=0},clean:function(){this.isHiding&&(this.isHiding=!1,this.$fullscreen.removeAttribute("style"),this.$backdrop.removeAttribute("style"),this.currentImageZoomed=null)}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(31),s=n.n(r),a=n(6),i=n.n(a);t.default={components:{gProject:s.a},data:function(){return{projects:i.a}}}},,function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t,n){e.exports=n.p+"static/media/github.bd3f1baf.png"},function(e,t,n){e.exports=n.p+"static/media/linkedin.f80a27df.png"},,,,,,function(e,t,n){n(13);var r=n(0)(n(8),n(34),null,null);e.exports=r.exports},function(e,t,n){n(14);var r=n(0)(null,n(35),"data-v-23c51f97",null);e.exports=r.exports},function(e,t,n){n(18);var r=n(0)(null,n(39),"data-v-44f78389",null);e.exports=r.exports},function(e,t,n){n(15);var r=n(0)(n(9),n(36),"data-v-246689c6",null);e.exports=r.exports},function(e,t,n){n(17);var r=n(0)(n(10),n(38),"data-v-44012e66",null);e.exports=r.exports},function(e,t,n){n(16);var r=n(0)(n(11),n(37),"data-v-34cd5c14",null);e.exports=r.exports},function(e,t,n){n(19);var r=n(0)(null,n(40),"data-v-726e3a64",null);e.exports=r.exports},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{webp:e.webp},attrs:{id:"app"}},[n("g-header"),e._v(" "),n("g-projects"),e._v(" "),n("g-footer")],1)},staticRenderFns:[]}},function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},staticRenderFns:[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("footer",[r("a",{attrs:{target:"_blank",rel:"noopener",href:"https://github.com/gjuchault"}},[r("img",{attrs:{src:n(20),height:"16",alt:"Github"}}),e._v("\n    Github\n  ")]),e._v(" "),r("a",{attrs:{target:"_blank",rel:"noopener",href:"https://www.linkedin.com/in/gjuchault/"}},[r("img",{attrs:{src:n(21),height:"16",alt:"LinkedIn"}}),e._v("\n    LinkedIn\n  ")])])}]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"open"},[n("a",{attrs:{target:"_blank",rel:"noopener",href:e.link},on:{click:function(e){e.stopPropagation()}}},[n("img",{attrs:{src:e.openInNewTabIcon,height:"32",width:"32",alt:"Open in new tab"}}),e._v(" "),n("span",[e._v("Open in new tab")])])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("main",e._l(e.projects,function(e,t){return n("g-project",{key:t,attrs:{project:e}})}))},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"project"},[n("div",{staticClass:"project__image",style:e.backgroundImage,on:{click:e.zoom}},[n("g-open",{attrs:{link:e.project.url}})],1),e._v(" "),n("h3",[e._v(e._s(e.project.title))]),e._v(" "),n("div",{staticClass:"project__tags"},e._l(e.project.tags,function(t,r){return n("g-tag",{key:r},[e._v(e._s(t))])})),e._v(" "),n("p",{staticClass:"project__description"},[e._v("\n    "+e._s(e.project.desc)+"\n  ")]),e._v(" "),n("img",{directives:[{name:"show",rawName:"v-show",value:e.currentImageZoomed,expression:"currentImageZoomed"}],ref:"fullscreen",class:{fullscreen:e.currentImageZoomed},attrs:{src:e.currentImageZoomed},on:{click:e.zoomOut,transitionend:e.clean}}),e._v(" "),n("div",{ref:"backdrop",staticClass:"backdrop",on:{click:e.zoomOut}})])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("header",[n("h1",[e._v("Gabriel Juchault")]),e._v(" "),n("div",{staticClass:"line"}),e._v(" "),n("h2",[e._v("Web developer")])])}]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("span",{staticClass:"tag"},[e._t("default")],2)},staticRenderFns:[]}},,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=(n(3),n(2));n(4),r.a.$mount("#app")}],[43]);
//# sourceMappingURL=client.73eeaf81.js.map