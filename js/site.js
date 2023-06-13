function encodeImageFileAsURL(element) {
    let file = element.files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
        console.log('RESULT', reader.result);
    }
    reader.readAsDataURL(file);
}

function setClipboard(text) {
    const type = "text/plain";
    const blob = new Blob([text], {type});
    const data = [new ClipboardItem({[type]: blob})];

    navigator.clipboard.write(data).then(
      () => {
          /* success */
      },
      () => {
          /* failure */
      }
    );
}

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

    /* CALCULATOR */

    this.prices = {
        hr: 100,
        ss: 0.2,
        cc: 1,
        rt: 3,
    }
    this.calcDefaults = {
        title: 'Title',
        text: '',
        mt: 120,
        et: 30,
        ss: 50,
        cc: 50,
        rt: 5
    }

    this.calculatePrice = function () {
        let ls = window.localStorage;
        let p = this.prices;

        let mt = $('._js-calc-mt').val();
        let et = $('._js-calc-et').val();
        let mth = mt / 60;
        let ss = $('._js-calc-ss').val();
        let cc = $('._js-calc-cc').val();
        let rt = $('._js-calc-rt').val();
        let title = $('._js-calc-title').val();
        let text = $('._js-calc-text').val();

        let mp = mth * p.hr + ss*p.ss + cc * p.cc + rt * p.rt;
        let ep = mp / mt * et;
        mp = Math.floor(mp * .85 / 10) * 10;
        ep = Math.floor(ep / 10) * 10;

        $('._js-calc-mp').val(mp);
        $('._js-calc-ep').val(ep);

        ls.setItem('mt', mt.toString());
        ls.setItem('ss', ss.toString());
        ls.setItem('cc', cc.toString());
        ls.setItem('rt', rt.toString());
        ls.setItem('mp', mp.toString());
        ls.setItem('title', title.toString());
        ls.setItem('text', text.toString());
    }

    this.encodeImageFileAsURL = function(element){
        if (!element.files[0]) return false;
        let file = element.files[0];
        let reader = new FileReader();
        reader.onloadend = function () {
            let image = reader.result + '';
            window.localStorage.setItem('image', image.toString());
        }
        reader.readAsDataURL(file);
    }
    this.initCalc = function () {
        let $imageElement = $('._js-calc-image');
        $imageElement.on('change', function(e){
            _this.encodeImageFileAsURL($imageElement[0]);
            $('._js-open-plan').attr('disabled', false);
        });
        let d = this.calcDefaults;
        $('._js-calc-title').val(d.title);
        $('._js-calc-text').val(d.text);
        $('._js-calc-mt').val(d.mt);
        $('._js-calc-et').val(d.et);
        $('._js-calc-ss').val(d.ss);
        $('._js-calc-cc').val(d.cc);
        $('._js-calc-rt').val(d.rt);

        $('._js-calc-calculate').on('click', function(){
            _this.calculatePrice();
        });
        $('._js-open-plan').on('click', function(){
            window.open(location.origin + '/plan.html','_blank');
        });
    }

    /* RENDER PLAN */

    this.plans = {
        'Pilot': {
            title: 'Pilot',
            text: {
                en: '',
                ru: 'Если коротко, то это очень коротко. Это знакомство, начало, шаг вперёд\n'
            },
            image: 'pilot.jpg',
            q: 1,
            mt: 30,
            ss: 10,
            cc: 10,
            rt: 1
        },
        'Portrait': {
            title: 'Portrait',
            text: {
                en: '',
                ru: 'Каждый человек это весь его путь, все переживания и достижения. Часто скрытые, глубокие черты характера личности возможно уловить за доли секунды'
            },
            image: 'portrait.jpg',
            q: 1,
            mt: 90,
            ss: 100,
            cc: 40,
            rt: 5
        },
        'Product': {
            title: 'Product',
            text: {
                en: '',
                ru: 'Вкусный…Сочный…Нежный… Это все, что надо знать\n'
            },
            image: 'product.jpg',
            q: 1,
            mt: 60,
            ss: 100,
            cc: 40,
            rt: 5
        },
        'Moment': {
            title: 'Moment',
            text: {
                en: '',
                ru: 'Задумчивый взгляд в очереди за бургером может рассказать о человеке не меньше, чем его портрет, который художник рисовал несколько дней\n'
            },
            image: 'moment.jpg',
            q: 1,
            mt: 90,
            ss: 100,
            cc: 40,
            rt: 5
        },
        'Character': {
            title: 'Character',
            text: {
                en: '',
                ru: 'Человек стремится примерить новые образы и маски. Можно даже стать чем-то иным, за пределами человеческих ролей, чтобы насладиться свободой\n'
            },
            image: 'character.jpg',
            q: 1,
            mt: 120,
            ss: 50,
            cc: 25,
            rt: 5
        },
        'Promo': {
            title: 'Promo',
            text: {
                en: '',
                ru: 'Презентации повсюду. Всё потому, что нам есть, что показать, есть чем гордиться, что предложить обществу и самим себе'
            },
            image: 'promo.jpg',
            q: 1,
            mt: 60,
            ss: 50,
            cc: 20,
            rt: 5
        },
        'Family': {
            title: 'Family',
            text: {
                en: '',
                ru: 'Семья едва ли не самое прочное, что есть в человеческой природе. Семья помогает и воспитывает, утешает и делает сильнее'
            },
            image: 'family.jpg',
            q: 1,
            mt: 90,
            ss: 100,
            cc: 30,
            rt: 3
        },
        'Adventure': {
            title: 'Adventure',
            text: {
                en: '',
                ru: 'В “приключении” мы отправимся по стопам истории. Пережить что-то невероятное, сказочное, захватывающее - желание любого человека\n'
            },
            image: 'adventure.jpg',
            q: 1,
            mt: 120,
            ss: 50,
            cc: 20,
            rt: 5
        },
        'Nude': {
            title: 'Nude',
            text: {
                en: '',
                ru: 'Красота человеческого тела манит и предостерегает. Этот стиль как никакой другой помогает стать увереннее и полюбить себя'
            },
            image: 'nude.jpg',
            q: 1,
            mt: 120,
            ss: 60,
            cc: 30,
            rt: 5
        },
        'The One': {
            title: 'The One',
            text: {
                en: '',
                ru: 'Сюжет, эмоция, мораль или идея, а может всё вместе, может 10 лет жизни будет витать в одном снимке'
            },
            image: 'the_one.jpg',
            q: 2.5,
            mt: 60,
            ss: 1,
            cc: 1,
            rt: 1
        },
    }

    this.renderPlan = function(plan) {
        let container, data, image;
        if (!!plan && typeof plan === 'object') {
            if (plan.hasOwnProperty('container')) container = plan.container;
            if (plan.hasOwnProperty('data')) data = plan.data;
            if (plan.hasOwnProperty('image')) image = plan.image;
        }
        let ls = window.localStorage;
        if (!container) container = $('#plan');
        if (!data) data = {
            ss: ls.getItem('ss'),
            cc: ls.getItem('cc'),
            rt: ls.getItem('rt'),
            mt: ls.getItem('mt'),
            mp: ls.getItem('mp'),
            text: ls.getItem('text'),
            title: ls.getItem('title'),
        }
        if (!image) image = ls.getItem('image');

        for (let key in data) container.find('._js-render-' + key).html(data[key]);
        container.find('._js-render-image').css({'background-image' : `url(${image})`});
    }
    this.createPlansList = function() {
        let plansHtml = '';
        for (let key in this.plans) {
            let plan = this.plans[key];
            plansHtml += `<div class="plans-list-item _js-plans-list-item" data-key="${key}">${plan.title}</div>`;
        }
        $('._js-plans-list').html(plansHtml);
        $(document).on('click', '._js-plans-list-item', function(){
            let key = $(this).data('key');
            _this.calculatePlan(_this.plans[key]);
        });
    }
    this.calculate = function ({mt, ss, cc, rt, q}) {
        let p = this.prices;
        let mth = mt / 60;
        let mp = mth * p.hr * q + ss * p.ss + cc * p.cc + rt * p.rt;
        return {mp, mt, ss, cc, rt}
    }
    this.calculatePlan = function (plan) {
        let planData = this.calculate(plan);
        planData.title = plan.title;
        planData.text = plan.text;
        planData.image = plan.image;
        window.localStorage.setItem('plan', JSON.stringify(planData));
    }
    this.renderPreparedPlan = function() {
        let lang = 'ru';
        let plan = JSON.parse(window.localStorage.getItem('plan'));
        let container = $('#plan');
        for (let key in plan) {
            if (key !== 'image') {
                container.find('._js-render-' + key).html(plan[key]);
            }
            if (key === 'text') {
                container.find('._js-render-' + key).html(plan[key][lang]);
            }
        }
        container.find('._js-render-image').css({'background-image': `url(/images/plans/${plan.image})`});
    }

};

$(function(){
    window.BASE = new ClassBASE();
    window.BASE.themeInit();
    window.BASE.navSubmenuInit();
    window.BASE.swiperHomepageInit();
    window.BASE.initCalc();
});