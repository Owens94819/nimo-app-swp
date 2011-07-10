
//@ - benchmarking performance
var now = Date.now();
var name = 'nimo img sld';

//@ - <html>
var body = document.documentElement;
body.style.opacity = '0';
//@ - max image file
var img = 4;

//@ - creating app
var app = new App('nimo');
app.autoUpdateMode();
if (localStorage[name]) {
    app.cache.upload(localStorage[name]);
} else {
    app.com('app/app.json')
    app.config.delay = 50;
}

var store = app.store;
var item = store.items;
var get = item.com;
// store.items.com

//@ - slider
function runTime() {
    if (typeof (get.num) != 'number') {
        return ("updates freezed");
     }
    get.num++;
    return ("updated");
}

//@ - pause/play slider
function controller() {
    if (typeof (get.num) != 'number') {
        get.num = +get.num;
        return ("played");
    }
    get.num = String(get.num);
    return ("paused")
}

//@ - app updated!!
app.onupdate = function(e) {
    if (get.num > img) {
        get.num = 0;
    }
}

//@ - change made
app.onchange = function(e) {
  localStorage[name] = app.cache.download();
}

//@ - error handler / fallback
app.onerror = function(e) {
    if (e.code == 419) {
        location.reload();
    }
}

//@ - file request loading
app.onrequest = function(e) {

}

//@ - app/items are loaded
app.onload = function(e) {
    setInterval(runTime, 1000);
    body.style.opacity = '';
    console.log(`loading time = ${Date.now()-now}ms`)
};
