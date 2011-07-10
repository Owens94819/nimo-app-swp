/***
 * 
 * 
 * 
 * ************
 * VERSION 0.8
 * ************
 * 
 *
 * 
 * ***/

(function (script, handler) {
    script.attributes = {
        name: 'App',
        view: 'view',
        target: 'target',
        action: '-action',
        app: 'app',
        delete: 'delete',
        item: 'items',
        station: '[[station]]',
        string: '[[string]]',
        request: 'onrequest',
        com: 'com',
        cache: {
            item: 'item',
            station: 'station'
        }
    };

    script.handler = handler;
    script.onerror = null;
    /*
    script.obj = new Object();
    script.arr = new Array();
*/
    script[script.attributes.item] = new Object();
    script[script.attributes.com] = new Object();
    script[script.attributes.string] = new Object();
    script[script.attributes.station] = new Object();

    script.error = {
        param: `a valid argument required.\n - <string>`,
        name0: ` is invalid\n -argument should only contain latin letters.\n -value.length should not be greater than 10.`,
        con: `Failed to construct 'App':\n`,
        con1: `Failed to setItem:\n`,
        arg: `2 arguments required, but only 0 present.`,
        type: ` -'App' cannot be called as a function.\n -Please use the 'new' operator <new App()> instead.`,
        index: {
            index: 'TEXT:Hello App!.',
            name: 'TEXT:nimo-app_v0.7.js',
            author: 'TEXT:Owens'
        }
    };

    script.error.type = script.error.con + script.error.type
    window[script.attributes.name] = script;

    var exe = function () {
        var sct = new script('xxNIMOxx', 3, 200);
        sct.config.devMode = false;
        sct.com({});
        sct[script.attributes.delete]()
        if (!document.body) {
            requestAnimationFrame(exe)
        }
    }
    // exe();
}
)(function () {
    /*
TODO:
FIXE - onrequest
TODO:
FIXE - com:index+"text"
TODO:
encode value @syn in com asetItem
TODO:
FIXE - make all properties updates instead of just target
    */

    //bundles
    var App = window.App || this.constructor, AppName = arguments[0], stName = arguments[1], Cdata = arguments[1], P2 = arguments[1] + arguments[2], handler = App.error, log = App.handler, pack = this, $$obj = {}, trash = {}, $Html = document.documentElement, attribute = App.attributes || {}, loadTime = 0, rendered = false, cfg, app;
    Cdata = 'object' == typeof Cdata ? Cdata : App[attribute.station][AppName];

    try {
        var cache = attribute.cache;
    } catch (e) { }

    var log, autoUpdateMode;

    if (P2 === 2003) {
        AppName = '';
        P2 = true;
    } else {
        P2 = false;
    }

    //
    //p_u
    //attributes syntax
    var syn = {
        d: function (v, y) {
            try {
                v = atob(v);
            } catch (error) { }
            if (typeof y == 'string') {
                var do_ = txt[y];
                var v = do_(v);
            }
            return v;
        },
        e: function (v, y) {
            try {
                v = btoa(v)
            } catch (error) { }
            if (typeof y == 'string') {
                var do_ = txt[y];
                var v = do_(v);
            }
            return v;
        },
        file: function (v, y) {
            v = rq(v, y);
            return v;
        },
        text: function (v, y) {
            v = v + "";
            if (typeof y == 'string') {
                var do_ = txt[y];
                var v = do_(v);
            }
            return (v);
        },
        number: function (v, y) {
            v = v == 0 ? 0 : +v;

            // v = eval(v);
            v = v || 0;
            if (typeof y == 'string') {
                var do_ = txt[y];
                var v = do_(v);
            }
            return v;
        },
        object: function (v, y) {
            v = stringifyJSON(v);
            if (typeof y == 'string') {
                var do_ = txt[y];
                var v = do_(v);
            }
            return (v);
        },
        undefined: function (v, y) {
            v = '';
            if (typeof y == 'string') {
                var do_ = txt[y];
                var v = do_(v);
            }
            return (v);
        },
        stream: function (x) {
            var p = parseString(x, true, 'file');
            var base = 'data:;base64'
            var r = join_ps(syn, p[0])(p[1], 'promise');
            return new Promise(function (rs) {
                r.then(function (e) {
                    //FIXME - base64
                    //LOG - var bl, e,
                    //stream returns text instead of base64 format
                    var bl = new Blob([e]);
                    url = URL.createObjectURL(bl);
                    rs(url);
                });
            }
            );
        }
    };
    syn[attribute.com] = function (v, y) {
        var x = App[attribute.com][AppName][v];
        y = y + ""
        y = y in txt ? y : 'null';
        x = txt[y](x)
        return x;
    }
        ;
    syn.string = syn.text;
    //new Function
    var callback = function () {//  alert('error')
    }

    var time = {
        mil: function (e) {
            return e;
        },
        sec: function (e) {
            return 1000 * e;
        },
        min: function (e) {
            return 1000 * 60 * e;
        }
    }

    var createElement = function (a) {
        try {
            var a = document.createElement(a);
        } catch (error) {
            var msg = error.message
            log(pack.onerror, msg);
            var a = document.createElement('span');
        }
        return a;
    }

    var EqualTo = function (name, arr) {
        var rnt = false
        arr.forEach(function (v) {
            if (v === name) {
                return rnt = v === name;
            }
        })
        return rnt;
    }

    var vld_type = function (x) {
        var tox = typeof x;
        tox = tox in syn ? tox : 'text';
        return tox;
    }
    var XstringifyJSON = function (obj) {
        var str;
        str = obj;
        if ('object' == typeof obj && obj) {
            str = String()
            for (var key in obj) {
                str += `"${key}":${XstringifyJSON(obj[key])},`
            }
            str = str.substring(0, --str.length)
            str = `{${str}}`
        } else {
            if ('string' == typeof obj) {
                str = `\`${purify_string(String(str), `\\$\``, '\\')}\``
            } else if ('function' == typeof obj) {
                str = `${str}`
            }

        }
        return str;
    }

    var purify_string = function (val, str, max) {
        str = str.trim()
        var sl = "\\\\\\";
        if (max) {
            var sl = "";
            if ('number' === typeof max) {
                for (var i = 0; i < max.length; i++) {
                    sl += '\\'
                }
            } else if ('string' == typeof max) {
                sl = max;
            } else {
                sl = "\\";
            }
        }
        var newStr = '';
        for (var i = 0; i < val.length; i++) {
            var e = val.charAt(i);
            for (var i_0 = 0; i_0 < str.length; i_0++) {
                var e_0 = str.charAt(i_0);
                if (e === e_0) {
                    e = sl + e
                }
            }
            newStr += e;
        }
        return (newStr)
    }

    //@parameter<replace()>
    var regex = {
        0: {
            cd: /\<+\{+[^\s\w]*[^\n]+\}\>/gi,
            0: "$&`)+\"",
            1: "\"+\"\"+\pm\(`\\$&",
        },
        html: {
            0: /[\w\W]*<\{{nimoApp}\}>/i,
        },
        /* syn: {
            0: new RegExp(purify_string(`<!--\\?+\\w[^>]+\\?-->`, '\\', 1), 'gm'),
            1: new RegExp(purify_string(`<\\?+\\w[^>]+\\?>`, '\\', 1), 'gm')
        } */
        syn: {
            0: new RegExp(purify_string(`<!--\\?+${AppName}[\\s\\?][^>]+\\?-->`, '\\', 1), 'gm'),
            1: new RegExp(purify_string(`<\\?+${AppName}[\\s\\?][^>]+\\?>`, '\\', 1), 'gm')
        }
    };

    var HTMLtag = function (tag, attributes, fallback) {
        var app = App[App.attributes.item][attributes[attribute.app]];
        var url = fallback.url;
        if (!tag) {
            attributes[attribute.view] = eval(attributes[attribute.view])
            view = parseString(attributes[attribute.view], 'string');
            view[1] = parseUrl(view[1]);
            view[1] = view[1][attribute.view]

            try {
                var _view = join_ps(app, view[0])
                view = join_ps(_view, view[1]);
            } catch (error) {
                view = '';
            }
            return view || '';
        }

        // var tg = `<${tag} ${attributes} >${fallback}</${tag}>`;
        var elem = createElement(tag);
        elem.$setAttribute = function (a, b) {
            if (!b) {
                return;
            }
            try {
                elem.setAttribute(a, b)
            } catch (error) {
                var msg = error.message
                log(pack.onerror, msg);
            }
        }
        var val = elem.outerHTML;
        if (val.indexOf('></') < 0) {
            val = true;
            var target = 'value'
        } else {
            val = false
            var target = 'innerHTML';
        }

        attributes[attribute.view] = eval(attributes[attribute.view])
        //delete(attributes[attribute.view])
        if (fallback) {
            var view = parseString(fallback[attribute.view]);
            try {
                var _view = join_ps(app, view[0])
                view = join_ps(_view, view[1]);
            } catch (error) {
                view = fallback[attribute.view];
            }
            fallback[attribute.view] = view;
            // console.log(url);
            url[attribute.target] = url[attribute.target] || target;
            url[url[attribute.target]] = fallback[attribute.view] || "";
            delete (url[attribute.target])
            for (var prop in url) {
                if (val == true) {
                    elem.$setAttribute(prop, url[prop])
                } else {
                    elem[prop] = url[prop]
                }
            }
        }
        //@ - html self closing tag
        //@ - note: self closing has no falback
        // if (EqualTo(tag, ['img', 'input'])) {
        //    var tg = `<${tag} ${attributes} />`;
        // }
        // console.log(attributes);

        for (var prop in attributes) {
            elem.$setAttribute(prop, attributes[prop])
        }
        val = elem.outerHTML;
        // console.log(val);

        return val;
    }

    //encode html
    var nimoEnc = function (e) {
        e = e.replace(/</g, '&nmlt'),
            e = e.replace(/>/g, '&nmgt');

        e = e.replace(/%=/g, '%equal;')
        e = e.replace(/%&/g, '%and;');
        e = e.replace(/%\?/g, '%qu;');

        e = purify_string(e, '"', true)
        return e;
    }

    //decode encoded html
    var nimoDec = function (e) {
        e = e.replace(/&nmlt/g, '<'),
            e = e.replace(/&nmgt/g, '>');

        e = e.replace(/%equal;/g, '=')
        e = e.replace(/%qu;/g, '?');
        e = e.replace(/%and;/g, '&')

        return e;
    }

    //cleaning up tabs
    var nimoMin = function (e) {
        e = e.replace(/  /gm, ' '),
            e = e.replace(/  /gm, ' '),
            e = e.replace(/\n\r|\n/gm, ' ');

        return e;
    }

    var appSelector = function (e, f) {
        if (e) {//attribute.app = e;
        }
        var app = e || attribute.app;
        var all = document.all;
        var arr = [];

        //var val = 0; val < all.length; val++
        //var val in all
        for (var val = 0; val < all.length; val++) {
            //var value = val
            var value = all[val];

            // console.log(value,value.app);
            var type = false;

            if ('object' == typeof (value)) {
                type = value.getAttribute([attribute.app]) || value[attribute.app];
            }

            if (type) {
                //vl1
                var value_app;
                if (value_app = value.getAttribute(app)) {
                    value[app] = value_app;
                    value.removeAttribute(app);
                }
                var name = value.getAttribute(attribute.app) || value[attribute.app];
                if (name === AppName) {
                    var view_name = value.getAttribute(attribute.view) || value[attribute.view];
                    if (view_name) {
                        //     
                        if (f) {
                            //setItem issue here
                            var view = value[attribute.view];
                            var f_len = f.length;
                            var view = view.substring(0, f_len);
                            if (view === f) {
                                arr[arr.length] = value;
                            }
                        } else {
                            arr[arr.length] = value;
                        }
                    }
                }
            }
        }

        return arr;
    }

    //enables autoUpdateMode
    var autoUM = function () {
        pack.store[attribute.item] = app || App[attribute.item][AppName];
        pack.autoUpdateMode = true;
        autoUpdateMode();
    };

    //checks if @parameter1 as nimo syntax
    //expected syntax = <?<name> echo(<value>) ?>
    var trueType = function (e, t) {
        try {
            e = e.replace(/\*/g, '')
        } catch (error) {
            return String(e);
        }
        // e = e.replace(/\?-->|\?>/g, '#'),
        e = e.replace(regex.syn[0], '*'),
            e = e.replace(regex.syn[1], '*'),

            // e = e.replace(/[^\*]/g, '');
            e = e.includes('*');
        return e;
    }

    //checks if App() === <class>
    var isClass = function (obj) {
        var cont = obj.constructor;
        obj = false;
        // WARNING:  bugs detected
        // TODO: fixe
        // FIXME: cont.caller
        try {
            obj = cont.arguments !== undefined ? cont.caller !== undefined ? cont.name == "" ? true : false : false : false;
        } catch (e) { }
        return obj;
    }

    //gets the total number of properties inside an object
    // var obj_length = function(x) {
    //     var arr = [];
    //    for (var prop in x) {
    //        arr[arr.length] = prop;
    //    }
    //    return arr.length;
    //  }

    //object_proto
    //gets the last property inside an object
    var object_proto = function (object, return_last_prop) {
        var arr = [];
        for (var prop in object) {
            arr.push(prop);
        }
        if (return_last_prop) {
            return arr[arr.length - 1];
        } else {
            return arr;
        }
    }

    //removes all white spaces
    var cleanSpace = function (x, y) {
        if (y) {
            return x.trim();
        }
        var x = x.replace(/\s/g, '');
        return x;
    }

    //check if string is a valid aphabeth
    var isAphabelt = function (value) {
        if ('string' == typeof value) {
            var r_len = value.length;
            value = value.replace(/[a-z]/gi, 'x'),
                value = value.replace(/[^\x]/gi, '');
            if (r_len === value.length) {
                return true;
            }
        }
    };

    var clearAttributes = function () {/*
 the below code causes @parseHtml to remove app 
 and view attributes before @update could access them
       */
        //appSelector()
        // appSelector('view')
    }

    //mimic <new Promise>,
    //@returns<then()> *returns @parameter<1> to <promise>
    var $prom = function (x) {

        return new Promise(function (r) {
            r(x);
        }
        );
    }

    //merges two object together
    var merge = function ($this, $with, name) {
        $with = eval($with);
        for (var prop in $this) {
            $with[name][prop] = $this[prop];
        }

        return $with;
    }

    //FIXE me: double qoute in stringify obj
    var parseJSON = function (x, df) {
        var ar = arguments;
        df = ar.length > 1 ? df : 'object' == typeof def && def ? def : {};

        try {
            eval(`var y = [${x}]`)
        } catch (error) {
            log(pack.onerror, `@ - unexpected error from:\n\n  ${x}`)
            var y = [df];
        }

        y = y[0]
        y = 'object' == typeof y ? y : df;

        return y;
    }

    var stringifyJSON = function (x) {
        try {
            var y = XstringifyJSON(x)
        } catch (error) {
            return log(pack.onerror, `@ - unexpected error`);
        }
        return y;
    }

    /*
    @ - proccess value if it returns a Promise object,
     and this function makes it easy to do just that
    */
    var EndValue = function (elm, value) {
        if (value === null) {
            return '';
        }
        if (value && 'object' === typeof value) {
            //value is an object, probably a promise type
            var name = value.constructor.name;
            name = name.toLowerCase()
            if (name === 'promise') {
                value.then(function (e) {
                    //run parsing for <e> @syn <object>
                    EndValue(elm, e);
                });
            } else {//value is not a promise type, run fallback here

            }
        } else {
            // value = decodeURI(value);
            value = parseHtml(value)
            if (elm[attribute.target]) {
                name = elm[attribute.target];
                if (elm[name] != value) {
                    // setTimeout(function () {
                    //   console.log(value);
                    // }, 2222);
                    //elm[name] = value;
                    eval(`elm.${name} = value`)
                    run('onvaluemodified', {value:value,element:elm})
                } else {//console.log(value);
                }
                ultra_update(app)
            }//Owens94819/nimo-tester

        }
    }

    var itemManger = function (e, obj, bl) {
        obj.val = parseHtml(obj.val);
        if (bl) { } else if (e[obj.prop] !== obj.val) {
            e[obj.prop] = obj.val;
            //e[obj.prop] = obj.val || e[obj.prop];
        }
    }
    //parse strings <attributes syntax>
    // param < 2 = apps
    // param < 3 = syn
    var join_ps = function (a, b) {
        var $b = parseM(b, true);
        b = EqualTo(typeof a, ['string', 'number']) ? a : a[$b[0]];

        //  console.log(b);

        if (b && EqualTo(typeof b, ['string', 'number']) || String(b) === '0') {
            if ('object' == typeof $b[1]) {

                //heads up here
                $b = $b[1];
                $b[0] = $b[0] || '';
                $b[1] = $b[1] || '';

                a = $b[0];
                a = a + b;
                a = a + $b[1];
                b = a;
            } else {
                b = b + $b[1]
            }
        }
        return b;
    }
    var parseString = function (x, y, z) {
        var typ = typeof (x)

        if ('object' !== typeof x) {

            x = x + '';
            z = z ? z : 'text';
            var idx = x.indexOf(':');
            var sub_1 = x.substring(0, idx)
                , sub_1 = cleanSpace(sub_1)
                , sub_1 = sub_1.toLowerCase()
                , sub_2 = x.substring(idx + 1, x.length)
                , sub_2 = cleanSpace(sub_2, '-')
        } else {
            var sub_1 = typ
                , sub_2 = x;
        }

        // TRY: *log(y)
        if (y) {
            if (sub_1 == '') {
                sub_1 = z;
            }
            if (sub_1 in syn === false && y !== undefined) {
                sub_1 = z;
                sub_2 = x;
            }
        }

        //@ - this.com(object)
        typ = typ in syn ? typ : 'text';
        sub_1 = typ === 'number' ? typ : sub_1;
        var r = join_ps(syn, typ)(sub_2);
        return [sub_1, r];
    };

    // HEADS UP:
    var store = function (x, y) {
        var x = parseString(x, true, vld_type(typeof x));

        var do_ = join_ps(syn, x[0]);
        //join_ps
        var prm = do_(x[1], 'promise');
        var $prm = new Promise(function (r) {
            prm.then(function (e) {
                /**
               *
               * ERROR HERE: e = e
               *
               *
               * **/
                //    e = "text:" + e;
                e = e || e == 0 ? e : x[0] + ':' + x[1];
                r({
                    val: e,
                    prop: y
                })
            });
        }
        )
        return $prm;
    };

    //parse tag localName with (-)
    //FOR:app-<name>
    //RETURNS:<name>
    var parseM = function (x, y) {
        // x = x.toLowerCase();
        var x_i = x.lastIndexOf('+');
        var x_1 = x.substring(0, x_i).trim();
        var x_2 = x.substring(x_i + 1).trim();
        if (y) {
            if (x_i < 0) {
                return [x_2, x_1]
            }
            try {
                //fixe here (x_2)
                x_2 = eval(x_2)
            } catch (error) { }
            return [x_1, x_2]
        }
        return x_2;
    }

    //parsing @<?> to <length>
    //<?name=66> = {name:66}
    //return: <object>
    var parseUrl = function (val, x, y) {
        val = val || '';
        var tg_v = !x ? "innerHTML" : '';
        if (y) {
            if (!val.includes('?')) {
                return ({
                    url: {}
                })[attribute.view] = val
            }
        }
        if (!val.includes('?')) {
            val = val + "?" + attribute.target + "=" + tg_v
        }

        //@ - changeable (?) to (#, / etc)
        var i1 = val.indexOf('?');
        var view = val.substring(0, i1);
        var url = val.substring(i1 + 1, val.length).trim();
        if (url == "") {
            var url = attribute.target + "=" + tg_v;
        }
        if (!url.includes('=')) {
            var url = url + "="
        }

        url = url.trim()
        url = nimoEnc(url)

        //@ - fixed the letter of (url) if it === (&). @ - substring()
        var url = url.replace(/=/g, '":"')
            , url = url.replace(/&/g, '","');
        var url = `{"${url}"}`;
        url = nimoDec(url)

        var url = parseJSON(url);

        var str = '?'
        var lst = object_proto(url, 'return last property')
        for (var prop in url) {
            var x_prop = prop;

            var $vl = url[prop];
            prop = prop.trim();
            delete (url[x_prop])
            $vl = 'string' == typeof $vl ? $vl.trim() : $vl;

            str += `${prop}=${$vl}`
            str += prop === lst ? '' : '&'
            var vl = $vl;

            if (!y) {
                //remeber to remove the below code to fixe loading delay
                // vl = parseUrl(vl,true,true).view;

                vl = parseString(vl);
                //x_1
                //PROBLEMS IN HERE
                //App or syn @loc
                //App[App.attributes.item][AppName]
                var loc = app;
                var vl1 = join_ps(loc, vl[0]) || $vl;
                vl1 = 'object' == typeof vl1 ? join_ps(vl1, vl[0]) || $vl : vl1;
                vl = vl1
            }

            url[prop] = vl;
        }

        //compusory properties
        if (!x) {
            url[attribute.target] = url[attribute.target] || tg_v;
            if (view.trim() == 0) {
                view = attribute.com + ':';
                url[attribute.target] = '';
            }
        }

        //heads up here 
        //@ - str
        // str = view+str
        // view = str
        view = url[attribute.view] || view;
        var obj = {
            url: url
        }
        obj[attribute.view] = view.trim();
        return obj;
    }

    //checks if AppName is a valid name
    var make_valid = function (val) {
        var val = val + ""
            , val = val.trim()
            , len = val.length;
        if (10 > len && val) {
            //  if (isAphabelt(val)) {
            return val;
            //  } else {
            //    return null;
            // }
        }
        return false;
    }

    // Active-User: @this.delay
    var parseTime = function (v) {
        if ('number' == typeof v) {
            return v;
        }
        v = String(v);
        v = v.toLowerCase();
        var num = v.replace(/[^0-9.]/gi, '')
            , str = v.replace(/[^a-z]/gi, '');
        num = num || 0;
        try {
            num = eval(num);
            str = str.trim();
        } catch (e) {
            if (e) {
                log(pack.onerror, 'invalid duration!.');
                return num;
            }
        }

        if (str == "") {
            return num;
        }

        if (str in time == false) {
            log(pack.onerror, `invalid time!.\n -try the following format, 'mil', 'sec', 'min'.`);
            return num;
        }

        return time[str](num);
    }

    //php syntax :)
    //<?<name> ?>
    var parseHtml = function (e) {
        var txt = 'object' == typeof e ? e.innerHTML : e;
        if ('object' !== typeof e) {//  console.log(e);
        }
        var tt = trueType(txt);
        if (tt === true) {

            try {

                // txt = purify_string(txt,'`(${\'\"})+')
                txt = txt.replace(/`|\$|{|\+/g, '\\$&'),
                    txt = txt.replace(regex.syn[0], '`+don(`$&`)+`'),
                    txt = txt.replace(regex.syn[1], '`+don(`---$&--`)+`'),
                    txt = '`' + txt + '`';
                txt = eval(txt);
            } catch (error) {
                return txt;
            }
            if ('object' == typeof e) {
                //var target = e[attribute.app] === AppName ? e[attribute.target] || 'innerHTML' : 'innerHTML';
                e.innerHTML = String(txt);
            }
        }
        // setTimeout(function() {
        //    clearAttributes();
        // });
        return txt;
    }

    //making request <file>
    var rq = function (x, y) {

        //  x = x.includes('.') ? x : x + '.html';
        //.app
        /*
        // TODO: problem with host
        if a 404 error occur
        acode host problem
        //TRY: x = window.location.href + x;
        //OR TRY: x = x;
        */
        //if (window.win) {
        // x = window.location.href + x;
        //}
        var prm = new Promise(function (r) {
            var rqt = new XMLHttpRequest();
            // var pnd = pack[attribute.request];
            if (y) {
                rqt.onloadstart = function (e) {
                    e = e.target;
                    run(attribute.request, e)
                }
                    ;
            }

            //console.log(rqt);
            rqt.onloadend = function () {
                if (this.readyState == 4 && this.status == 200) {
                    //var response = this.response;
                    // response = response.replace(/[^]*<\{{nimoApp}\}>/i, '<\{{nimoApp}\}>')

                    //console.log(this.response);

                    // var response = response.trim();
                    // var tr = response.substring(3, 10).toLowerCase();
                    //if (tr === 'nimoapp') {
                    //    var response = response.substring(13, response.length)
                    //encode words
                    // }
                    // var response = encodeURL(response);
                    r(this.response)
                } else {
                    log(pack.onerror, `${this.status || 'unknown'} error while fetching '${x}'`)
                    r(x)
                }
            }
                ;
            rqt.open("GET", x, true);
            try {
                rqt.send();
            } catch (e) {
                log(pack.onerror, `${e.name} while fetching '${x}'\n -this could be due to an invalid protocol '${location.protocol}'`)
                r(x)
            }
        }
        );

        return prm;
    };

    var echo = function (v) {
        v = purify_string(v, '\',+', 2)

        v = "','" + v + "'";
        return v;
    }

    var exp = function (x, y) {

        var $x = parseUrl(x);
        x = $x[attribute.view];

        var tag = 'text' in $x.url ? null : $x.url.tag || 'span';

        var p_y = parseUrl(y, true);
        //  p_y[attribute.view] = p_y[attribute.view] ||  'com:';
        // p_y.url[attribute.target] = p_y.url[attribute.target] || ''

        var $y = (p_y[attribute.view])

        $y = parseString($y)
        var err_msg = `Error @${x}.\n -'${y}' is undefined.\n  -> error successfully resolved.`;
        var err_msg1 = `Error @${x}.\n -'${$y[1]}' is undefined @${y}.\n  -> error successfully resolved.`;
        var err_type = 404;
        try {
            // join_ps =
            var apps = join_ps(App[App.attributes.item], x)
            apps = join_ps(apps, $y[0]);
            apps = join_ps(apps, $y[1]);
        } catch (e) {
            if (e) {
                log(pack.onerror, err_msg, err_type);
            }
        }
        /*
PROBLEM:
 HEADS UP:
        */
        apps = App[App.attributes.item]
        if (x in apps) {
            apps = join_ps(App[App.attributes.item], x);

        } else {
            log(pack.onerror, err_msg, err_type);
            //return '';
            apps = {}
        }
        if ($y[0] in apps) {
            apps = join_ps(apps, $y[0]);
        } else {
            log(pack.onerror, err_msg, err_type);
            apps = {}
        }

        if (parseM($y[1], true)[0] && parseM($y[1], true)[0] in apps) {
            apps = join_ps(apps, $y[1]);
        } else {

            log(pack.onerror, err_msg1, err_type);
            apps = ''
        }

        //@ - authentication
        //if ($y[1] in apps === false) {
        //console.log(apps);
        //log(pack.onerror, `Error @${x}.\n -'${y}' is undefined @${x}.`);
        //    return '';
        //}

        // var apps = apps[$y[1]];
        //var tt = trueType(apps)

        // if (tt === true) {
        var apps = parseHtml(apps)

        //}

        var apps = parseString(apps);
        //App[App.attributes.item][AppName]
        //var ap =app;
        /*
         WARNING:  bugs in here
        //VARIABLES: 'var tg'
        //FIXE: ${app}
        //$line
        //console.log(apps)
        // TRY: var tg = `<${tag} app="${x}" view="${p_y[attribute.view]}?target=${p_y.url[attribute.target]}">${apps[1]}</${tag}>`;
        */

        var fallback = p_y.url.fallback;
        // var target = p_y.url[attribute.target]||'${target}';
        delete (p_y.url.fallback);
        delete (p_y.url.tag);

        var str = '';
        fallback = parseUrl(fallback, true)

        //for (var prp in p_y.url) {
        // TODO: do authentication here
        //   str += ` ${prp}=${p_y.url[prp]}`;
        //}
        //value_app
        var p_u = p_y.url;
        p_u[attribute.target] = purify_string(p_u[attribute.target] || '', '${') || '${target}';
        var target = '';

        for (var prp in p_u) {
            var tgt = p_u[prp]
            if (prp != attribute.target) {
                tgt = purify_string(tgt, '${');
            }
            target += `&${prp}=${tgt}`;
        }
        target = target.substring(1, target.length)

        //here
        target = `${attribute.target}=${p_u[attribute.target]}`;

        delete (p_y.url[attribute.target]);
        p_u[attribute.app] = x
        p_y[attribute.view] = purify_string(p_y[attribute.view], '${') + "?"
        p_u[attribute.view] = p_u[attribute.view] || `\`${p_y[attribute.view]}${target}\``;
        //fallback = fallback || '';
        //var tg = `${attribute.app}=${x} ${attribute.view}=${p_y[attribute.view]}?${attribute.target}=${target} ${str}`;
        //var tg = HTMLtag(tag, tg, fallback, p_y[attribute.view]);
        // console.log(p_u);
        // console.log(p_u);
        var tg = HTMLtag(tag, p_u, fallback);

        return tg;
    }

    var don = function (v) {
        // WARNING: ERRORs IN HERES!!
        v = purify_string(v, `"'()\``);
        v = '"' + v.substring(5, v.length - 4).trim();
        v = v.replace(/\s/, '"+echo(`');

        v = v.replace(/\n/gim, '');
        // v = cleanSpace(v)
        v = v + "`);"
        v = "'" + eval(v);
        // v = cleanSpace(v)
        v = "exp(" + v + ");";
        v = eval(v);
        return v;
    }

    //@attributes_syntax in objects @setItem;
    var lookT = function (obj, x) {
        for (var prp in obj) {
            var def = obj[prp];
            if (EqualTo(typeof def, ['string', 'number'])) {
                var c = parseString(def, '-');

                if (c[0] == attribute.com) {//try: obj[prp]='eval:'+c[1];
                }
            }
        }
        return obj;
    }

    var mark_view = function (st) {
        st[attribute.view] = st.getAttribute(attribute.view) || st[attribute.view];
        st.removeAttribute(attribute.view)
    };

    //updates @tag_attributes app=<name>
    var update_ex = function (apps, ex, ex2) {
        //var len = arguments.length;
        //var typ = 'at';
        //var name = '[app="' + AppName + '"]';
        //var elm = document.querySelectorAll(name);
        var elm = appSelector(attribute.view);
        // var arr = [];
        // for (var i = 0; i < elm.length; i++) {
        //     arr.push(elm[i]);
        // }
        // var _this = this;
        //var max_len = elm.length
        // eval('var t = ' + max_update);
        //arr.forEach(t);
        elm.forEach(max_update)
        //  return reture_$to_update_ex;
    }

    //updates app-<name>
    var update = function (apps, ex, ex2) {
        apps = app || apps
        var len = arguments.length;
        var typ = 'tg';
        // var name = 'app-' + AppName;
        var name = '[' + attribute.app + '="' + AppName + '"]';
        // var elm = document.querySelectorAll(name);
        var elm = appSelector();
        // var arr = [];
        // for (var i = 0; i < elm.length; i++) {
        //   arr.push(elm[i]);
        // }
        //if (arr.length < 1) {
        //   update_ex(App[App.attributes.item][AppName], true);
        //   return;
        // }
        //console

        var _this = this;
        var t;
        eval(`t = ${tags}`);
        //arr.forEach(t);

        elm.forEach(t)
        t = undefined;
    }

    var ultra_update = function (apps, name, ve) {
        apps = apps || app
        name = name || attribute.view;
        if (apps == undefined) {
            return;
        }
        ve = ve || window.document.querySelectorAll('[' + name + ']');
        appSelector(name)
        if (ve.length > 0) {
            for (var i = 0; i < ve.length; i++) {
                var elm = ve[i];
                var app_name = elm.getAttribute(attribute.app) || elm[attribute.app];
                if (app_name !== AppName) {
                    /**
                  HEADS UP HERE
                  LOCATION: break;
                  */

                    //HEADS UP HERE
                    break;
                }
                elm[attribute.view] = elm.getAttribute(attribute.view) || elm[attribute.view];

                if (elm[attribute.view] == undefined) {
                    return false;
                }
                elm.removeAttribute(attribute.view);
                //elm.removeAttribute(attribute.app);

                $target(elm)

                var p = parseString(elm[attribute.view])

                // HEADS UP:
                var p_1 = join_ps(apps, p[0]);

                if (!p_1 || p[1] == 0) {
                    return ('no view');
                }
                if (p[1] in p_1 == false) {
                    return ('no view');
                }

                p_1 = join_ps(p_1, p[1])

                //error here
                //p
                var p = parseString(p_1, true, vld_type(typeof p_1))
                var p_1 = join_ps(syn, p[0]);
                p_1 = p_1(p[1])
                if (EqualTo(typeof p_1, ['string', 'number'])) {
                    var $e = parseString(p_1, 'string');
                    p_1 = join_ps(syn, $e[0])($e[1]);
                }
            //run('onvaluemodified', app)
                
                //if (elm[elm[attribute.target]] != String(p_1) || parseHtml(p_1) != elm[elm[attribute.target]]) {
                EndValue(elm, p_1)
                // elm[elm[attribute.target]] = parseHtml(p_1);
                // }

                var vw = window.document.querySelectorAll('[' + name + ']')
                if (vw.length > 0) {
                    ultra_update(apps)
                }
            }
        } else {
            return '';
        }
        return 'done!';
    }

    // DO: bug fixed
    // HEADS UP: only title is updating
    var max_update = function (st, index, length) {

        //  var strapp = strapp||undefined;
        //    var arr;
        var el = st;
        //DO:setting getting <tag attributes>[attribute.view];
        mark_view(st);

        //DO:parse <tag attributes>[attribute.view];
        $target(st)
        var p = parseString(st[attribute.view]);

        //if (index === 0) {
        //trash.strapp2 = parseJSON(App.string[AppName]);
        //}

        var strapp = parseJSON(App[attribute.string][AppName]) || {};

        //here
        // if (p[0]in strapp === false && p[0]in App[App.attributes.item][AppName] === false) {
        //  return (false);
        //}

        strapp[p[0]] = join_ps(strapp, p[0]) || {};

        var old = join_ps(strapp, p[0]) || {};
        var _new = app;
        _new = join_ps(_new, p[0]) || {};
        //if (p[1].trim() == 0) {
        // return 
        //}
        // console.log(p[1]);

        var $old = join_ps(old, p[1]);
        var $new = join_ps(_new, p[1]);

        // var st_target = st[st[attribute.target]]
        //  , st_target = parseString(st[st[attribute.target]])

        //  var st_new = parseString($new,'text')
        //  console.log(st_new);
        // Error: bugs
        // TODO:

        /*
        var $n =$new;
        if ('string' === typeof $new) {
            var $e = parseString($new, 'string');
            $new = syn[$e[0]]($e[1])||$new;
        }
        if ('string' === typeof $old) {
            var $e = parseString($old, 'string');
            $old = ((strapp)[$e[0]]||{})[$e[1]]||$old;
        }
*/

        if ($old !== $new) {
            /*
TODO: update item by st.view other tha st.target
*/
            new Promise(function (r) {
                // var val_syn = parseString($new, true, vld_type(typeof $new));
                // var $new_0 = syn[val_syn[0]](val_syn[1]);

                //HEADS up!!

                if (EqualTo(typeof $new, ['string'])) {
                    var $e = parseString($new, 'string');
                    $new = join_ps(syn, $e[0])($e[1], null) || $new;
                }

                EndValue(st, $new);

                //st[st[attribute.target]] = parseHtml($new);
                //app[p[0]][p[1]] = $new;

                strapp[p[0]][p[1]] = $new;
                // strapp[p[0]][p[1]] = $n;

                //trash.strapp2[p[0]][p[1]] = $new;

                var obj = {
                    tag: st,
                    value: $new,
                };
                obj[attribute.view] = st[attribute.view];

                var resolve_$at_updateItem = obj;

                r(resolve_$at_updateItem);
                // reture_$to_update_ex =resolve_$at_updateItem;
            }
            ).then(function (obj) {
                /**
                 * trash.updated_date_$_max_update = trash.updated_date_$_max_update||[];
                 * trash.updated_date_$_max_update.push(e);
                 */

                //UPDATE HERE:

                run('onupdate', obj);
                //(pack.onupdate || new Function)(obj)
            });
        } else { }

        //length.length === max_len
        if (index + 1 === length.length) {

            //App[App.attributes.item][AppName]
            // run =
            var strapp_ = app;
            App[attribute.string][AppName] = stringifyJSON(strapp_);
            run('onchange', strapp_)
            delete (trash.strapp2)
            //return;

        }

        //HEADS UP HERE: denger here
        //denger successfully fixed!
        //closed!!!
        //if (i + 1 === len) {
        //  App.string[AppName] = stringifyJSON(strapp);
        //}

        //DO: checks if <attributes><view> exist in document.body;
        //RETURNS: boolean
        //VARIABLES: <$st> <st>
        //  return;
        var $st = false;
        var $st = st.attributes[attribute.view] === undefined ? false : true;
        if ($st === true) {

            // FIXME: add two param <boolean>
            //TRY:update_ex(apps,$st);
            update_ex(app);
        }

    }

    // HEADS UP: this creates <element>.act property in the element making the user manipulate multiple properties inside <element>
    var $target = function (elm, x) {
        // WARNING: bugs in here
        var v = elm[attribute.action] ? elm[attribute.action] : elm[attribute.view];
        v = v + ""
        elm[attribute.app] = elm.getAttribute(attribute.app) || elm[attribute.app]
        elm.removeAttribute(attribute.app);

        //if (!elm.act) {
        // elm.act = v;
        if (v.includes('?')) {
            elm[attribute.action] = v;
            var pr = parseUrl(v);
            elm[attribute.view] = elm[attribute.view] || elm[attribute.view] != 0 ? parseUrl(elm[attribute.view])[attribute.view] : pr[attribute.view];
            for (var prp in pr.url) {
                var ul = pr.url[prp];
                var p = parseString(ul)
                var $p = p;

                var _app = app;

                var val = ""
                if (p[0] in _app) {
                    val = join_ps(_app, p[0]);
                    if (p[1] in val) {
                        val = join_ps(val, p[1])
                    } else {
                        val = '';
                        break;
                    }
                    p = parseString(val);
                    if (p[0] in _app === false) {
                        p[0] = 'text'
                    }
                    val = join_ps(syn, p[0])(p[1]);

                } else {
                    val = p[1]
                }
                if (elm[prp] !== val && x && $p[0] in app) { } else if (!x) {
                    elm[prp] = val;
                }
            }

            try {
                elm[attribute.target] = elm[attribute.target].trim();
            } catch (e) { }

            /**
             * //no longer need due to @parseUrl
             * 
            if (elm[attribute.target] in elm === false) {
                elm[attribute.target] = 'innerHTML';
            }
             */
        }
        //  }

        elm[attribute.target] = elm[attribute.target] == 0 || elm[attribute.target] ? elm[attribute.target] : 'innerHTML';
        //  elm[attribute.action] += ''
        return elm[attribute.target];
    }

    // @update eval(tag+'')
    var tags = function (elm) {
        var apps = apps || app
        //FOR: app-<name>
        if (!elm.getAttribute(attribute.app) || !elm[attribute.app]) {
            // WARNING: bugs in here
            // AT: elm.setAttribute
            var loc = elm.localName;
            var loc = parseM(loc);
            //elm.setAttribute('app',loc);
        }
        elm[attribute.view] = elm.getAttribute(attribute.view) || elm[attribute.view];
        if (elm[attribute.view] == undefined) {
            return false;
        }
        elm.removeAttribute(attribute.view);
        $target(elm)
        var view = parseString(elm[attribute.view]);

        // if ('string' == typeof ex) {
        //     if (view[0] !== ex) {
        //        return false
        //    }
        //}

        var err_0 = `@${elm[attribute.view]}.\n '${view[0]}' is undefined or invalid\n -use the getItem() method to look into this error`;
        var err_1 = `@${elm[attribute.view]}.\n '${view[1]}' is undefined or invalid\n -use the getItem() method to look into this error\n -> error successfully resolved.`;
        apps = apps || app

        if (view[0] in apps === false) {
            //  console.log(view[1]);

            var err_type = view[0] === attribute.com ? 419 : undefined;
            var err_msg = view[0] === attribute.com ? err_0 + '\n -Load time Error' : err_0;
            log(pack.onerror, err_msg, err_type)
            //var apps ={}
            return;
        }
        var val0 = join_ps(apps, view[0])

        if (!parseM(view[1], true)[0]) {
            return;
        }
        if (parseM(view[1], true)[0] in val0 === false) {
            var err_type = 404;
            var err_msg = err_1;

            log(pack.onerror, err_msg, err_type)
            // var val =''
            return;
        } else {
            var val = join_ps(val0, view[1]);
        }

        var val = parseString(val, 'text');
        var do_ = join_ps(syn, val[0]);
        var vl = do_(val[1], App[attribute.com][AppName])

        //console.log(val);
        if (val[0] == attribute.com) {// vl = parseString(vl, null);
            // var do_ = syn[vl[0]];
            // vl = do_(vl[1]);
        }

       var promise = new Promise(function (resolve) {

           var valueResolver = function (e) {
               /*
                WARNING: lots of bugs in this function
             */
               if (ex === undefined) {
                   if (EqualTo(typeof e, ['string', 'number'])) {
                       e = parseHtml(e)
                       e = parseString(e, 'string');
                       e = join_ps(syn, e[0])(e[1])

                   }

                   EndValue(elm, e)
                   // elm[elm[attribute.target]] = syn[$e[0]]($e[1]);

                   if (document.querySelector(`[${attribute.app}="${AppName}"]`)) {
                       ultra_update(apps, attribute.app)
                   }
                   resolve([elm, e]);
               }
           };

     if ('object' == typeof vl) {
    // TODO: try check if (vl+'') includes 'Promise' or === '[Object Promise]'
    vl.then(function (vl) {
         valueResolver(vl)
         })
     } else {
       valueResolver(vl)
        }
       })

     return (promise);
    }

    var txt = {
        null: function (x) {
            return x;
        },
        promise: $prom
    }
    txt[undefined] = txt.null;

    if (arguments.length < 1) {
        log(pack.onerror, handler.con + `1 argument required, but only ${arguments.length} present.\n - argument 1 = <string>`)
        return;
    }
    // <App> @param<1>
    var $AppName, app, $com, prep = function (obj, value, item) {
        //Get cahcing
        var al = `config`
        item = App[App.attributes.item][AppName]
        item = stringifyJSON(item)
        value = {};

        for (var key in pack) {
            if (al.includes(key)) {
                value[key] = pack[key]
            }
        }

        value = stringifyJSON(value);

        //  if (cfg.autoBackup) {
        obj = new Object();
        obj[cache.item] = item;
        obj[cache.station] = value
        obj = stringifyJSON(obj);
        //   }
        return obj;
    }, Dprep = function (e) {
        //parse cache
        e = e
        //localStorage[stName];
        if (e) {
            e = parseJSON(e);
            app = parseJSON(e[cache.item]);
            pack = parseJSON(e[cache.station])

            App[attribute.item][AppName] = app;

            for (var key in pack) {
                App[attribute.station][AppName][key] = pack[key]
            }

            pack = App[attribute.station][AppName]
            cfg = pack.config

            parseHtml($Html);
            run('onload')
            return pack;
        }
        return null;
    }

    var autoUpdateMode = function () {
        //make an interval here @requestAnimationFrame or @setInterval or selfMake
        //requestAnimationFrame(autoUpdateMode);
        //
        if (!pack.autoUpdateMode) {
            return pack.autoUpdateMode = autoUM;
        } else {
            if (rendered) {
                update_ex();
            }
            requestAnimationFrame(autoUpdateMode);
        }
    }
        , run = function (f, arg, p) {
            arg = arg || pack;
            p = p || pack;
            (p[f] || callback)(arg)
            //new Function
        };

    var rendering = function () {
        /***
*
* app loaded!!
* @<pack.onload>
* @<update>
*
*
* ***/
        /**
*
*
* HEADS UP HERE: setTimeout <500>
*
* **/

        var time = parseTime(cfg.delay);
        if (cfg.devMode == false) {
            log = callback;
        }
        //new Function
        parseHtml($Html);
        //loaded
        rendered = true;

        App[attribute.string][AppName] = stringifyJSON(app);
        var load = function (a) {
            //var $apps = App[App.attributes.item][AppName];
            //pack.onload(pack)
            //parseHtml($Html);
            //console.log(appSelector());
            update(app);
            if (pack.onload !== null) {

                //a ==== true
                if (a === true) {
                    run('onload');
                } else {
                    setTimeout(function () {
                        run('onload');
                  }, loadTime);
                }

            }
        }

        if (time) {
            setTimeout(load, time);
        } else {
            load(true);
        }
        if (pack.autoUpdateMode === true) {
            autoUM();
        }
    }

    //loaded
    var exe = function (e) {
        // parseHtml($Html);
        //rst.then(function (e) {
        // remove typeof === number
        if ('string' == typeof e) {
            e = parseJSON(e, null);
        }

        e = e || App.error.index

        // heads up here 
        // app[attribute.com] = e;

        var last = object_proto(e).length;
        var num = 0;
        for (var prop in e) {
            var st = store(e[prop], prop);
            st.then(function (val) {
                //      console.log(val);
                num++
                //var $val = val.val.length;
                //if ($val > 800) {
                // val.val = e[val.prop];
                // }

                //val.val = parseHtml(val.val);
                //  var ph = val.val;
                // $com[val.prop] = ph;
                itemManger($com, val);
                itemManger(App[attribute.com][AppName], val);
                //App[attribute.com][AppName][val.prop] = ph;
                //parseHtml($Html);
                if (num === last) {
                    rendering();
                    /**
           *
           * <end> @break @loop
           *
           **/

                }
            });
        }
        //  });
        delete (pack[attribute.com])
        //[attribute.com]
    };

    var onsettled = function (array, value) {
        for (value of array) {
            pack[value] = (App[attribute.station][AppName] || pack)[value] || null;
        }
    }

    ////////

    AppName = AppName || arguments[0];
    /*
    if (stName || 'number' != typeof stName
    ) {
        log(pack.onerror, `@App(<string>,<number>).\n - expecting a valid number but instead saw an invalid identifier #${typeof stName} (${stName}).\n - Try any valid number greater than 0.\n error resolved`)
        stName = 'null';
    }
    stName = `${AppName}.V(${stName}).nimo.app`;
*/
    //console.log();
    // (function () {
    // checks if AppName ain't a false value
    if (!AppName || AppName == 0) {
        log(pack.onerror, handler.param);
        return null;
    }
    // checks if AppName ain't an invalid value
    AppName = make_valid(AppName);

    if (!AppName) {
        log(pack.onerror, `'${$AppName}'` + handler.name0);
        return null;
    }

    {// log = new Function;
        //parseHtml($Html);
        // log = App.handler;
    }

    /*
    if (AppName in App[App.attributes.item]) {
        delete (this.delay)
        log(pack.onerror, `'${$AppName}' already exist`);
        return;
    }
*/

    //checks if App() is a class, *user
    if (!isClass(pack)) {

        if (App[App.attributes.station] && AppName in App[App.attributes.station]) {
            return App[App.attributes.station][AppName];
            // return pack;
        } else {
            log(pack.onerror, handler.type);
            return null;
        }

        /*
        if (Dprep()) {
            update(app);
        } else {
            log(pack.onerror, handler.type);
            return null;
        }*/
    } else {
        //<globalise>
        // makeing AppName an Object properties, *globalise
        App[attribute.com][AppName] = {};
        App[App.attributes.item][AppName] = {};
        App[App.attributes.item][AppName][attribute.com] = {};

        //depending files
        new Promise(function (r) {
            pack[attribute.com] = function () {
                if (arguments.length < 1) {
                    log(pack.onerror, `Failed to load manifest.\n 1 arguments required, but only ${arguments.length} present.\n - argument 1 = <Object||Json file>`)
                }

                var val = arguments[0] || App.error.index;

                if ('string' == typeof val) {
                    //parse url as object - returns 'null' if it's invalid
                    log = new Function
                    var prm = parseJSON(val, null);
                    log = App.handler
                    //if expected url is not a valid string <object> then request for string.
                    prm = prm || rq(val)

                    //heads up here
                    // prm = 'string' === typeof prm ? $prom(prm) : prm;
                } else if ('object' == typeof val) {
                    //heads up here - 
                    //console.log(App.items.nimo.com.index);
                    app[attribute.com] = val;
                    var prm = val;
                    // var prm = new Promise(function ($r) {
                    //        $r(val);
                    //  }
                    // );
                } else {
                    return log(pack.onerror, `@parameter - ${attribute.com}(Object||String)`);
                }

                //   $obj.load = prm;
                r(prm);
            }
            //  alert(5)
            //  update(app);
        }
        ).then(exe);

        //configurations
        cfg = pack.config = new Object();
        cfg.delay = 500,
            cfg.devMode = true;
        //cfg.autoBackup = false;
    }

    app = App[App.attributes.item][AppName];
    $com = App[App.attributes.item][AppName][attribute.com];
    attribute.action = 'act-' + AppName + attribute.action

    //name

    //}  )(App);

    //loading @<this.com>
    /* setTimeout(function () {
        if (pack[attribute.com]) {
            exe();
        }
    }, 100); */

    //<globalise> @App[App.attributes.item]

    //prepered functions
    onsettled(['onload', 'onvaluemodified', 'onupdate', 'onchange', 'onerror', attribute.request]);

    //pack.onload = null;
    //pack.onupdate = null;
    //pack.onchange = null;
    //pack.onerror = null;
    //pack[attribute.request] = null

    //auto updating
    pack.autoUpdateMode = autoUM;

    //extensions
    pack.extension = function () {
        var e = arguments[0];
        if (arguments.length < 1) {
            log(pack.onerror, `Failed to create an extension.\n 1 arguments required, but only ${arguments.length} present.\n - argument 1 = <Function>`)
            return
        }

        if ('function' === typeof e) {
            var mth = {
                objectSyntaxs: syn,
                appMethods: pack,
                update: function () {
                    if (rendered) {
                        update_ex(app);
                    }
                }
            };
            e(mth);
        } else {
            log(pack.onerror, `Failed to create an extension.\n expecting argument 1 data type to be a <function>, but instead saw a <${typeof e}>`)
            return
        }
    }

    //caching system
    pack.cache = ({
        upload: function (cache) {
            if (!cache || 'string' !== typeof cache) {
                return log(pack.onerror, `A valid argument expected.\n - argument[0] = <string>`)
            }

            // Dprep = 
            Dprep(cache);

            //PROBLEM HERE > 

            //pack = App(AppName,pack)

            // App[attribute.station][AppName].config = pack.config;

            // console.log(App[attribute.station][AppName], pack);

            // App[attribute.station][AppName] = pack;

            rendering();
            return pack;
        },
        download: function () {
            return prep();
        }
    });
    //   rendered = true;

    //database
    //globalise object
    pack.store = (/*
        this.autoUpdate ? {
        item: function() {
            var item = arguments[0];
            if (arguments.length < 1) {
                log(pack.onerror, `1 arguments required, but only ${arguments.length} present.\n - argument 1 = <string>`)
                return
            }
            if (item in app === false) {
                app[item] = {};
            }
            return app[item]
        },
        hasItem: function() {
            var item = arguments[0];
            return item in app
        }
    } : 
    */

        {
            setItem: function () {
                var name = arguments[0];
                var obj = arguments[1];
                if (arguments.length < 2) {
                    log(pack.onerror, handler.con1 + `2 arguments required, but only ${arguments.length} present.\n - argument 1 = <string>\n - argument 2 = <object>`)
                    return
                }
                if ('string' === typeof obj) {
                    obj = rq(obj);
                } else if ('object' === typeof obj) {
                    app[name] = obj;
                    obj = new Promise(function (resolve, reject) {
                        resolve(obj);
                    }
                    );
                } else if (!obj) {
                    return log(pack.onerror, '@setItem\n -argument 1 most be a string\n argument 2 should be the following, a valid object, a valid URL to a \'.JSON\' file.')
                } else {
                    obj = new Promise(function (r) {
                        r(String(obj))
                    }
                    )
                }
                var c = name.toLowerCase().trim();
                if (c === attribute.com) {
                    log(pack.onerror, `@setItem\n '${c}' is an invalid name!.\n -try something else.`);
                    return false;
                }
                obj.then(function (e) {
                    if ('string' === typeof e) {
                        var e = parseJSON(e, e);
                        app[name] = e;
                    }

                    //var e = lookT(e, App.com);
                    var lst = object_proto(e, 'return last property');

                    for (var prp in e) {
                        var e_prp = e[prp]
                        var st = store(e_prp, prp);
                        st.then(function (obj) {

                            itemManger(e, obj);

                            if (obj.prop === lst) {
                                app[name] = e;
                                var i = appSelector(attribute.view, name + ':');
                                //ultra_update(null, null, i)
                                //or
                                //console.log(i);
                                i.forEach(max_update)
                                // callback:app[name] = e;
                            }
                        })
                    }

                    //app[name] = e;
                    // callback:app[name] = e;
                })
            },

            updateItem: function () {

                var name = arguments[0];
                var value = arguments[1];
                name = name.includes(':') ? name : name + ':';
                name = parseString(name);

                if (name[0] in app == false) {
                    //callback use only
                    update_ex(app, true);

                    log(pack.onerror, `@updateItem\n '${name}' is not a valid item.`)
                    return false;
                }
             value=value||app[name[0]];
                if (true) {
                    try {
                        if (name[1]) {
                            app[name[0]][name[1]] = value;
                        } else {
                            app[name[0]] = value;
                        }
                    } catch (error) {
                        log(pack.onerror, `@updateItem.\n - invalid identifier "${arguments[0]}"`)
                    }
                }

                name = name[0];
                var obj = app[name];
                
                var $this = this;
                /*
                                                                                GOTO : isClass <VARIABLE>
                                                                    
                                                                    
                                                                                */
                if (isClass(this)) {
                    var prm = new Promise(function (r) {
                        r(merge(this, `App[attribute.item].${AppName}`, name));
                    }
                    )
                } else {
                    var prm = new Promise(function (r) {
                        //setTimeout(function () {
                        r(obj);
                        //},1);
                    }
                    )
                }
                prm.then(function (e) {

                    /**
                                                                                 * pack.onupdate(new Promise(function (r) {
                                                                                    setTimeout(function () {
                                                                                        r(trash.updated_date_$_max_update)
                                                                                        delete(trash.updated_date_$_max_update)
                                                                                    });
                                                                                }));
                                                                                 */
                    //run code here
                    if (pack.autoUpdateMode != true || 'function' == typeof pack.autoUpdateMode && rendered) {
                        //App[App.attributes.item][AppName]
                        update_ex(app, true);
                    }
                });

                return obj;
            },

            hasItem: function () {
                var name = arguments[0];
                return (name in app);
            },

            getItem: function () {
                var name = arguments[0],
                value;

                if(!name){
                   return app;
                }

                name = name.includes(':') ? name : name + ':';
                name = parseString(name);

                if(!name[1]){
                   return app[name[0]]
                }
                
                if (name[0] in app) {
                    value = app[name[0]]
                } else {
                    return;
                }

                if('object' == typeof value){
                           value = value[name[1]]
                }

                return value;
            },

            getAllItem: function () {
                return app;
            }
        });
    /*
    this[attribute.delete] = function () {
        delete (App[App.attributes.station][AppName]);
        delete (App[App.attributes.item][AppName]);
        delete (App[App.attributes.string][AppName]);
    }
*/

    //run updates
    //pack =
    pack.name = AppName;
    App[attribute.station][AppName] = /*App[attribute.station][AppName] ||*/
        pack;
    //autoUpdateMode();
    return App[App.attributes.station][AppName];
    //[AppName] = this);
    // {
    //     log = new Function;
    //     parseHtml($Html);
    //     log = App.handler;
    // }

    // autoUpdateMode();
}, //handler
    function () {
        var event = arguments[0];
        var value = arguments[1];
        var type = arguments[2];
        (event || new Function)({
            value: value,
            code: type
        });
        console.error(value);
    })
//)
//
