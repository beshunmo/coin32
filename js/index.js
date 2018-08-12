var InfoDetected = {
    init: function (cb) {
        var self = this;
        this.browser = this.defineBrowser();
        this.OS = this.defineOS();
        this.defineCountry(function (country) {
            self.country = country;
            cb();
        });
    },

    defineBrowser: function () {
        var browser = 'Not known';

        if ((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) {
            browser = 'Opera';
        }

        if (typeof InstallTrigger !== 'undefined') {
            browser = 'FireFox';
        }

        if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
            browser = 'Safari';
        }

        if (/*@cc_on!@*/false || !!document.documentMode) {
            browser = 'IE';
        }

        if (browser != 'IE' && !!window.StyleMedia) {
            browser = 'Edge';
        }

        if (!!window.chrome && !!window.chrome.webstore) {
            if (navigator.userAgent.indexOf("YaBrowser") > -1) {
                browser = 'YandexBrowser';
            } else {
                browser = 'Google Chrome';
            }
        }

        return browser;
    },

    defineOS: function () {
        var os = 'Not known';
        var s = navigator.userAgent;

        if (s.indexOf('Windows 95') > -1 || s.indexOf('Win95') > -1) {
            os = 'Windows 95';
        } else if (s.indexOf('Windows 98') > -1 || s.indexOf('Win98') > -1) {
            os = 'Windows 98';
        } else if (s.indexOf('Windows NT 6.1') > -1) {
            os = 'Windows 7';
        } else if (s.indexOf('Windows NT 6.2') > -1) {
            os = 'Windows 8';
        } else if (s.indexOf('Windows NT 10.0') > -1 || s.indexOf('Windows 10.0') > -1) {
            os = 'Windows 10';
        } else if (s.indexOf('Mac_PowerPC') > -1 || s.indexOf('Macintosh') > -1) {
            os = 'Mac OS';
        } else if (s.indexOf('Linux') > -1 || s.indexOf('X11') > -1) {
            os = 'Linux';
        }

        return os;
    },

    defineCountry: function (cb) {
        var URL = 'http://api.ipstack.com/check?access_key=5f07ee51b98a4a00c482a6a679c05fe2';
        var xhr = new XMLHttpRequest();

        xhr.addEventListener('load', function () {
            var countryName = JSON.parse(xhr.response)['country_name'];
            console.log(countryName);
            cb(countryName);
        })

        xhr.open('GET', URL);
        xhr.send();
    },
};

InfoDetected.init(function () {
    document.getElementById("name").innerHTML = InfoDetected.browser;
    document.getElementById("country").innerHTML = InfoDetected.country;
    document.getElementById("os").innerHTML = InfoDetected.OS;

    setTimeout(function () {
        document.querySelector('.modal-overlay').style.display = 'block';
        document.querySelector('.btn-close').addEventListener('click', function () {
            document.querySelector('.modal-overlay').style.display = 'none';
        });
    }, 200);
});    