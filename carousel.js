function Carousel(wrapper, direction, seamless, delay) {
    var l = wrapper + ' .leader';
    var f = wrapper + ' .frame';
    var a_p = wrapper + ' .arrow.prev';
    var a_n = wrapper + ' .arrow.next';
    return {
        init: function(){
            var carousel = this;
            $(a_p).click(function(){
                carousel.prev();
            });
            $(a_n).click(function(){
                carousel.next();
            });
            $(document).on('click', f + '._shaded', function(){
                carousel.position($(f).index($(this)) + 1);
            });
            this.count = $(f).length;
            
            if (delay && $(wrapper).length > 0) {
                clearInterval(carto);
                var carto = setInterval(function(){
                    if (!$(wrapper).is(':hover')) carousel.next();
                }, delay);
            }
            return this;
        },
        prev: function(){
            this.position(this.position() - 1);
            return this;
        },
        next: function(){
            this.position(this.position() + 1);
            return this;
        },
        position: function(p){
            if (arguments.length > 0) {
                var cnt = this.count, margin, outerSize;
                if (seamless) {
                    p = p < 1 ? cnt : p;
                    p = p > cnt ? 1 : p;
                } else {
                    p = p < 1 ? 1 : p;
                    p = p > cnt ? cnt : p;
                }
                $(l).attr('position', p);
                $(f).removeClass('_shaded');
                $($(f)[p - 1]).siblings().addClass('_shaded');
                margin = direction === 'top' ? 'margin-top' : 'margin-left';
                outerSize = direction === 'top' ? 'outerHeight' : 'outerWidth'; 
                $(l).css(margin, - (p * $(f)[outerSize](true)) + $(f)[outerSize](true) + 'px');
                
                if (!seamless) {
                    $(a_p).removeClass('_disabled').addClass(function(){
                        return p === 1 ? '_disabled' : '';
                    });
                    $(a_n).removeClass('_disabled').addClass(function(){
                        return p === cnt ? '_disabled' : '';
                    });
                }
            } else {
                return +$(l).attr('position');
            }
            return this;
        }
  }
}