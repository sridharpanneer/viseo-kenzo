var util = require('./util');
$.widget("rimowa.multisrc", {

    // default options
    options: {
        'typeLoadDefault': 'mobile',
        'breakPointMobile': 768,
        'dataDisplayAttribute': 'data-display'
    },

    // The constructor
    _create: function () {
        this._init();
        this._bindevent();
        this._updateSrc();
    },

    _init: function() {
        let hasDataDisplayAttr = this.element[0].hasAttribute(this.options.dataDisplayAttribute);
        let valDataDisplayAttr = hasDataDisplayAttr && this.element.attr(this.options.dataDisplayAttribute);

        if(!hasDataDisplayAttr || valDataDisplayAttr === "") {
            this.element.attr(this.options.dataDisplayAttribute, this._getypeToLoad());
        }

    },
    _updateOrientation() {
        if(util.isPortrait()) {
            this._updateSrc('mobile');
        }
        else{
            this._updateSrc('desktop');
        }
    },
    _bindevent: function() {
        if (util.isMobile() || $(window).width() < 1024) {
            $(document).ready(this._updateOrientation.bind(this))
        }
    },
    _getypeToLoad: function () {


        this._typeDisplay = $(window).width() <= this.options.breakPointMobile ? 'mobile' : 'desktop';
        return this._typeDisplay;
    },

    _updateSrc: function (forceTypeDisplay) {
        let type =  forceTypeDisplay || this._getypeToLoad() || this.options.typeLoadDefault;

        let $images = this.element.find('img');
        let attrSrc = 'data-src-' + type;

        for (var i = 0; i < $images.length; i++) {
            let $currentImg = $($images[i]);
            let urlSrc = $currentImg.attr(attrSrc);

            $currentImg.attr('src', urlSrc);
        }
    }

});
