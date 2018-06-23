!function(t,e,n){t.AppComponents=n||{};var a=function(t,e){this.cv=t,this.mv=e;var n=document.createElement("div");n.classList.add("bar");var a=document.createElement("div");a.classList.add("mark"),n.appendChild(a),this._el=n,this._cursor=a,this.render()};a.prototype.render=function(){var t=Math.round(100*this.cv/this.mv);100<t?this._cursor.classList.add("overflow"):this._cursor.classList.remove("overflow");var e=t+"%";this._cursor.style.width=e,this._el.setAttribute("data-percentage",e)},a.prototype.adjustValue=function(t){this.cv=Math.max(0,this.cv+t),this.render()},t.AppComponents.ProgressBar=a}(window,document,window.AppComponents),function(t,e,n){t.AppComponents=n||{};var a=function(){this._el=document.createElement("div"),this._el.classList.add("loader"),e.body.appendChild(this._el)};a.prototype.show=function(){this._el.classList.add("show")},a.prototype.hide=function(){this._el.classList.remove("show")},t.AppComponents.Loader=a}(window,document,window.AppComponents);var App=function(t,r,d){function s(){c.loader.show(),new Promise(function(e,t){var n=new XMLHttpRequest;n.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var t=JSON.parse(n.responseText);e(t)}},n.open("GET","http://pb-api.herokuapp.com/bars",!0),n.send()}).then(function(t){c.loader.hide(),c.buildProgressBars(t)})}var e=function(){this._bars=[],this._activeBar=null};e.prototype.init=function(){var t=r.createElement("div");t.classList.add("container");var e=r.createElement("div");e.classList.add("controls");var n=r.createElement("button");n.innerText="Load Remote Data",n.type="button",n.addEventListener("click",s),e.appendChild(n),t.appendChild(e);var a=r.createElement("div");a.classList.add("row"),this._bc=a,t.appendChild(a),this._el=t,r.body.appendChild(this._el),s()},e.prototype.buildProgressBars=function(i){for(;this._bc.firstChild;)this._bc.removeChild(this._bc.firstChild);this._bars.length=0;var o=r.createElement("select");o.classList.add("select"),o.addEventListener("change",function(){c._activeBar=c._bars[o.value]}),i.bars.forEach(function(t,e){var n=new d.ProgressBar(t,i.limit);c._bars.push(n);var a=r.createElement("div");a.classList.add("bar-col","col-12","col-md-6","col-lg-4"),a.appendChild(n._el),c._bc.appendChild(a);var s=document.createElement("option");s.value=e,s.text="Progress "+(e+1),o.appendChild(s)}),c._activeBar=this._bars[0];var n=r.createElement("div");n.classList.add("col-control","col-12"),c._bc.appendChild(n),n.appendChild(o),i.buttons.forEach(function(t){var e=r.createElement("button");e.innerText=t,e.value=t,e.type="button",e.addEventListener("click",function(){c._activeBar.adjustValue(+this.value)}),n.appendChild(e)})};var c=new e;return c.loader=new d.Loader,c.init(),c}(window,document,window.AppComponents);