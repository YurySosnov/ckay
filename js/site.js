const ClassBASE = function() {
    const _this = this;
    const $body = $('body');
    const $themeSwitcher = $('.theme-switcher');
    const themes = ['theme-dark', 'theme-light'];
    this.defaultTheme = 'theme-dark';
    this.store = { // personal store without localStorage, cookies
        data: {},
        get: function(k) {
            let v = _this.store.data[k];
            try {
                v = _this.store.data[k];
            } catch (error) {}
            return v || null;
        },
        set: function(k,v) {
            let obj = {};
            obj[k] = v;
            _this.store.data = Object.assign(_this.store.data, obj);
        },
        del: function(k) {
            delete _this.store.data[k];
        },
        init: function(data, exceptParams) {},
        tplApplied: false
    };
    this.cookie = {
        set: function (key, val, exp) {
            _this.store.set(key, val);
            let d = location.hostname.split('.').reverse();
            let cookieString = key + '=' + encodeURIComponent(val) + '; domain=' + d[1] + '.' + d[0] + '; path=/; Secure; sameSite=Lax';
            if (!!exp) {
                let expires;
                if (typeof exp.y === 'number' && typeof exp.m === 'number' && typeof exp.d === 'number') {
                    expires = new Date(exp.y, exp.m, exp.d);
                }
                if (!!exp.clear) {
                    let cookieDate = new Date();
                    cookieDate.setTime(cookieDate.getTime() - 1);
                    expires = cookieDate;
                }
                cookieString += "; expires=" + expires.toUTCString();
            }
            // document.cookie = key + '=' + encodeURIComponent(val) + '; domain=' + d[1] + '.' + d[0] + '; path=/; Secure; sameSite=Lax';
            document.cookie = cookieString;
        },
        get: function (key) {
            return decodeURIComponent(
                document.cookie.replace(
                    new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(key).replace(/[\-\.\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1'
                )
            ) || false;
        },
        del: function (key) {
            _this.store.del(key);
            _this.cookie.set(key, '', {clear: true});
            // document.cookie = key + '=; Max-Age=0;';
        }
    };
    this.lstore = {
        init: function(data) {
            for (let key in data) {
                let value = data[key];
                window.localStorage.removeItem(key);
                window.localStorage.setItem(key, JSON.stringify(value));
            }
        },
        get: function(key) {
            let value = '';
            let v = window.localStorage.getItem(key);
            try {
                value = JSON.parse(v);
            } catch (err) {
                console.log('localStorage read error, ' + key + ':' + v + ' removed');
                console.log(err);
                console.log(_this.store.get(key));
                // _this.lstore.del(key);
            }

            return value === '' || null ? false : value;
        },
        set: function(key, data) {
            // duplicate in personal store
            _this.store.set(key, data);
            var dataJSON = JSON.stringify(data);
            window.localStorage.setItem(key, dataJSON);
        },
        del: function(key) {
            _this.store.del(key);
            window.localStorage.removeItem(key);
        },
        clear: function() {
            window.localStorage.clear();
        }
    };
    this.swiper = null;

    this.initNavContacts = function() {
        $('._js-show-nav-contacts').on('click', function (){
            $('._js-nav-contacts').toggleClass('show');
            $('body').toggleClass('show-contacts');
        });
    }
    this.initSwiper = function() {
        if ($('.swiper').length) {
            _this.swiper = new Swiper('.swiper', {
                loop: true,
                slidesPerView: 1.25,
                spaceBetween: 8,
                centeredSlides: true,
                speed: 1000,

                // If we need pagination
                // pagination: {
                //     el: '.swiper-pagination',
                // },

                // Navigation arrows
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

                // And if we need scrollbar
                // scrollbar: {
                //     el: '.swiper-scrollbar',
                // },

                breakpoints: {
                    1024: {
                        slidesPerView: 1.5,
                        spaceBetween: 30,
                    }
                }
            });
        }
    }

    this.themeApply = function(theme) {
        for (let i = 0, len = themes.length; i < len; i++) {
            $body.removeClass(themes[i]);
        }
        $body.addClass(theme);
        $themeSwitcher.data('current-theme', theme);
        _this.lstore.set('theme', theme);
        this.themeCurrent = theme;
    }
    this.themeApplyCurrent = function() {
        const currentTheme = _this.lstore.get('theme');
        if (!!currentTheme && !$body.hasClass(currentTheme))
            this.themeApply(currentTheme);
    }
    this.themeChange = function() {
        let index;
        for (let i = 0, len = themes.length; i < len; i++) {
            if (this.themeCurrent === themes[i]) {
                index = i === len - 1 ? 0 : i + 1;
                break;
            }
        }
        this.themeApply(themes[index]);
    }
    this.themeInitSwitcher = function() {
        console.log('initSw');
        $themeSwitcher.on('click', function(){
            console.log('switch');
            _this.themeChange();
        });
    }
    this.themeInit = function () {
        _this.themeCurrent = _this.lstore.get('theme')
            ? _this.lstore.get('theme')
            : this.defaultTheme
        _this.themeInitSwitcher();
        _this.themeApplyCurrent();
        setTimeout(function() {$body.addClass('theme-inited');}, 300);
    }

};

$(function(){
    window.BASE = new ClassBASE();
    window.BASE.themeInit();
    window.BASE.initNavContacts();
    window.BASE.initSwiper();
});