(function() {
    $.fn.rotateClass = function() {
        let $this = this,
            clsList = arguments.length > 1 ? [].slice.call(arguments) : arguments[0];
        if (clsList.length === 0) {
            return $this;
        }
        if (typeof clsList === 'string') {
            clsList = clsList.indexOf(' ') > -1 ? clsList.split(/\s+/) : [ clsList ];
        }
        if (clsList.length > 1) {
            for (let idx = 0; idx < clsList.length; idx++) {
                if ($this.hasClass(clsList[idx])) {
                    let nextIdx = (idx + 1) % clsList.length,
                        nextCls = clsList.splice(nextIdx, 1);
                    return $this.removeClass(clsList.join(' ')).addClass(nextCls[0]);
                }
            }
        }
        return $this.toggleClass(clsList[0]);
    }
})(jQuery);

$(function(){
    const $body = $('body');
    const swiper = new Swiper('.swiper', {
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
    $('.theme-switcher').on('click', function(){
        $body.rotateClass('theme-dark','theme-light');
    });
});