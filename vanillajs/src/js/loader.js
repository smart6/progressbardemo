(function(w,d,ac){
    w.AppComponents = ac || {};
    var Loader = function(){
        this._el = document.createElement('div');
        this._el.classList.add('loader');
        d.body.appendChild(this._el);
    }
    Loader.prototype.show = function(){
        this._el.classList.add('show');
    }
    Loader.prototype.hide = function(){
        this._el.classList.remove('show');
    } 
    w.AppComponents.Loader = Loader;
})(window,document, window.AppComponents);