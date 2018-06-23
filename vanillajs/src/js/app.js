var App  = (function(w,d,ac){
    
    function loadDynamicData(){
        return new Promise(function(resolve,reject){
            var xhttp=new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var res = JSON.parse(xhttp.responseText);
                    resolve(res);
                }
            };
            xhttp.open("GET", "http://pb-api.herokuapp.com/bars", true);
            xhttp.send();
        })
    }
    function requestData(){
        instance.loader.show();
        loadDynamicData().then(function(data){
            instance.loader.hide();
            instance.buildProgressBars(data)
        })
    }
    var App = function(){
        this._bars = [];
        this._activeBar = null;
    }

    App.prototype.init = function(){
        // root element
        var rootEl = d.createElement('div');
        rootEl.classList.add('container');
        
        // control container and control
        var controls = d.createElement('div');
        controls.classList.add('controls');
        var btn = d.createElement('button');
        btn.innerText = 'Load Remote Data';
        btn.type = 'button';
        btn.addEventListener('click',requestData);
        controls.appendChild(btn);
        rootEl.appendChild(controls);

        var bc = d.createElement('div');
        bc.classList.add('row');
        this._bc= bc;
        rootEl.appendChild(bc);

        this._el = rootEl;
        d.body.appendChild(this._el);

        requestData();
    }
    App.prototype.buildProgressBars = function(data){
        while(this._bc.firstChild){
            this._bc.removeChild(this._bc.firstChild);
        }
        this._bars.length = 0;
        var select = d.createElement("select");
            select.classList.add("select");
            select.addEventListener('change',function(){
                instance._activeBar = instance._bars[select.value];
            })
        data.bars.forEach(function(v,idx){
            var bar = new ac.ProgressBar(v,data.limit);
            instance._bars.push(bar);

            var col = d.createElement('div');
            col.classList.add("bar-col", "col-12", "col-md-6", "col-lg-4");
            col.appendChild(bar._el);
            instance._bc.appendChild(col);

            // construct select options
            var option = document.createElement("option");
                option.value = idx;
                option.text = "Progress "+(idx+1);
                select.appendChild(option);

        })
        instance._activeBar = this._bars[0];
        var col = d.createElement('div');
            col.classList.add("col-control", "col-12");
            instance._bc.appendChild(col);    
            col.appendChild(select);

        data.buttons.forEach(function(v){
            var btn = d.createElement('button');
            btn.innerText = v;
            btn.value = v;
            btn.type = 'button';
            btn.addEventListener('click',function(){
                instance._activeBar.adjustValue(+this.value);    
            })
            col.appendChild(btn);
        })

    }
    var instance = new App();
        instance.loader = new ac.Loader();
        instance.init();
    return instance;
})(window,document,window.AppComponents);