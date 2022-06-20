const ClassBASE = function() {
    const _this = this;
    const $body = $('body');
    const $themeSwitcher = $('.theme-switcher');

    /* STORES */
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
            // _this.store.set(key, val);
            // let d = location.hostname.split('.').reverse();
            let cookieString = key + '=' + encodeURIComponent(val) + '; domain=' + location.hostname + '; path=/; Secure; sameSite=Lax';
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
            // _this.store.del(key);
            // _this.cookie.set(key, '', {clear: true});
            document.cookie = key + '=; Max-Age=0;';
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
            const dataJSON = JSON.stringify(data);
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

    /* SWIPER HOMEPAGE */
    this.swiperHomepageOptions = {
        loop: true,
        slidesPerView: 1.3,
        spaceBetween: '4%',
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
            480: {
                slidesPerView: 2.6,
                spaceBetween: '3%',
            },
            1024: {
                slidesPerView: 3.75,
                spaceBetween: '2%',
            }
        }
    };
    this.swiperHomepageInit = function() {
        if ($('.swiper-homepage').length)
            _this.swiperHomepage = new Swiper('.swiper-homepage', _this.swiperHomepageOptions);
    }

    /* THEME SWITCHER */
    this.themes = ['theme-dark', 'theme-light'];
    this.themeDefault = 'theme-dark';
    this.themeApply = function(theme) {
        for (let i = 0, len = _this.themes.length; i < len; i++) {
            $body.removeClass(_this.themes[i]);
        }
        $body.addClass(theme);
        $themeSwitcher.data('current-theme', theme);
        _this.lstore.set('theme', theme);
        this.themeCurrent = theme;
    }
    this.themeApplyCurrent = function() {
        const currentTheme = _this.lstore.get('theme') || _this.themeDefault;
        if (!!currentTheme && !$body.hasClass(currentTheme))
            this.themeApply(currentTheme);
    }
    this.themeChange = function() {
        let index;
        for (let i = 0, len = _this.themes.length; i < len; i++) {
            if (this.themeCurrent === _this.themes[i]) {
                index = i === len - 1 ? 0 : i + 1;
                break;
            }
        }
        this.themeApply(_this.themes[index]);
    }
    this.themeSwitcherInit = function() {
        $themeSwitcher.on('click', function(){
            _this.themeChange();
        });
    }
    this.themeInit = function () {
        _this.themeCurrent = _this.lstore.get('theme')
            ? _this.lstore.get('theme')
            : this.themeDefault
        _this.themeSwitcherInit();
        _this.themeApplyCurrent();
        setTimeout(function() {$body.addClass('theme-inited');}, 300);
    }

    /* NAV */
    this.navContactsInit = function() {
        $('._js-show-nav-contacts').on('click', function (){
            $('._js-nav-contacts').toggleClass('show');
            $('body').toggleClass('show-contacts');
        });
    }
    this.navSubmenuInit = function() {
        $('._js-nav-show-submenu').on('click', function(){
            const $submenuItem = $('._js-nav-submenu-' + $(this).data('submenu'));
            if ($submenuItem.hasClass('show')) {
                $submenuItem.removeClass('show');
            } else {
                $('._js-nav-submenu').removeClass('show');
                $submenuItem.addClass('show');
            }
        });
        $('._js-nav-submenu-close').on('click', function(){
            $(this).parent().removeClass('show');
        });
    }
};

$(function(){
    window.BASE = new ClassBASE();
    window.BASE.themeInit();
    window.BASE.navSubmenuInit();
    window.BASE.swiperHomepageInit();
});