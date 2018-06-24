(function(w,d,ac){
    w.AppComponents = ac || {};
    var ProgressBar = function(cv,mv){
        //current value
        this.cv = cv;
        //max value
        this.mv = mv;
        //bar with outline
        var bar = document.createElement('div');
        bar.classList.add('bar');
        //cursor inside bar
        var cursor = document.createElement('div');
        cursor.classList.add('mark');
        bar.appendChild(cursor);
        this._el = bar;
        this._cursor = cursor;
        this.render();
    }
    ProgressBar.prototype.render = function(){
        var percentage = Math.round((this.cv*100)/this.mv);
        if(percentage>100){
            this._cursor.classList.add('overflow');
        }else{
            this._cursor.classList.remove('overflow');
        }
        var computedWidth = percentage+'%';
        this._cursor.style.width = computedWidth;
        this._el.setAttribute("data-percentage",computedWidth);

    }
    ProgressBar.prototype.adjustValue = function(value){
        this.cv=Math.max(0,this.cv+value);
        self.render();
    }
    w.AppComponents.ProgressBar = ProgressBar;
})(window,document, window.AppComponents);