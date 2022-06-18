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
            let nextCls;
            for (let idx = 0; idx < clsList.length; idx++) {
                if ($this.hasClass(clsList[idx])) {
                    let nextIdx = (idx + 1) % clsList.length
                    nextCls = clsList.splice(nextIdx, 1);
                    return $this.removeClass(clsList.join(' ')).addClass(nextCls[0]);
                }
            }
        }
        return $this.toggleClass(clsList[0]);
    }
})(jQuery);