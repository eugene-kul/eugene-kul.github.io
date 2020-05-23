var booksBP=new Object;
var oTripleSlider={
    sParent:".triple-slider",
    cLoaded:"triple-slider__slider_loaded",
    cLoadedOpacity:"triple-slider__slider_loaded-opacity",
    cShowed:"triple-slider__slider_showed",
    cItem:"triple-slider__item",
    cItemHidden:"triple-slider__item_hidden",
    cItemLeft:"triple-slider__item_left",
    cItemLeftHalf:"triple-slider__item_left-half",
    cItemActive:"triple-slider__item_active",
    cItemRightHalf:"triple-slider__item_right-half",
    cItemRight:"triple-slider__item_right",
    cDotActive:"active",
    sLinkNext:".triple-slider__next",
    sLinkPrev:".triple-slider__prev",
    sDots:".triple-slider__dots",
    sDot:".triple-slider__dot",
    sImg:".triple-slider__img",
    sArrows:".triple-slider__arrows",
    htmlDot:'<div class="triple-slider__dot dots__item"><span></span></div>',
    slideWidth:715,
    movedSidesTo:0,
    setIntervalId:false,
    init:function(t,e,i,s){
            var n=$(t);
            var r=n.closest(oTripleSlider.sParent);
            var o=r.find(oTripleSlider.sLinkNext);
            var a=r.find(oTripleSlider.sLinkPrev);
            var l=r.find(oTripleSlider.sDots);
            var d=5e3;
            if(n.find("."+oTripleSlider.cItem).length){
                var h=$("body");
                if(typeof i!=="undefined")oTripleSlider.slideWidth=i;
                if(typeof s!=="undefined")oTripleSlider.movedSidesTo=s;
                if(typeof e!=="undefined")d=parseInt(e);
                oTripleSlider.setSlider(n);
                n.addClass(oTripleSlider.cLoaded);
                setTimeout(function(){n.addClass(oTripleSlider.cLoadedOpacity)},100*3);
                setTimeout(function(){n.addClass(oTripleSlider.cShowed)},100*7);
                h.trigger("eksmoPromoViewForCheck");
                $(window).on("resize",function(){
                    var t=$(window).width();
                    //if(t!=w&&t>booksBP.xsMax)oTripleSlider.setPosition(n)
                });
                n.on("click","."+oTripleSlider.cItemRightHalf,function(t){
                    t.preventDefault();
                    oTripleSlider.next(n)
                });
                n.on("click","."+oTripleSlider.cItemLeftHalf,function(t){
                    t.preventDefault();oTripleSlider.prev(n)
                });
                if(o.length){
                    o.on("click",function(){
                        oTripleSlider.next(n);
                        oTripleSlider.autoPlay(n)
                    })
                }
                if(a.length){
                    a.on("click",function(){
                        oTripleSlider.prev(n);
                        oTripleSlider.autoPlay(n)
                    })
                }
                if(l.length){
                    l.on("click",oTripleSlider.sDot,function(t){
                        if(!$(this).hasClass(oTripleSlider.cDotActive)){
                            var e=$(oTripleSlider.sDot).index(t.target)+1;
                            oTripleSlider.slideTo(n,e);
                            oTripleSlider.autoPlay(n)
                        }
                    })
                }
                oTripleSlider.autoPlay(n,d);
            }
    },
    autoPlay:function(t,e){
        /*
        var e=parseInt(e);
        if(e){
            oTripleSlider.setIntervalId=setInterval(function(){
                oTripleSlider.next(t)
            },e)
        } else {
            if(oTripleSlider.setIntervalId)clearInterval(oTripleSlider.setIntervalId)
        }
    */
    },
    next:function(t){
        var e=parseInt(t.attr("data-n"));
        var i=t.find("."+oTripleSlider.cItem);
        if(i.length){
            t.append(t.find("."+oTripleSlider.cItem).first().remove());
            oTripleSlider.setPosition(t);
            if(e>=i.length)e=1;else e++;
            t.attr("data-n",e);oTripleSlider.setActiveDot(t,e)
        }
    },
    prev:function(t){
        var e=parseInt(t.attr("data-n"));
        var i=t.find("."+oTripleSlider.cItem);
        if(i.length){
            t.prepend(t.find("."+oTripleSlider.cItem).last().remove());
            oTripleSlider.setPosition(t);
            if(e<=1)e=i.length;else e--;t.attr("data-n",e);
            oTripleSlider.setActiveDot(t,e)
        }
    },
    slideTo:function(t,e){
        var e=parseInt(e);
        var i=t.find("."+oTripleSlider.cItem);
        if(e&&e>0&&e<=i.length){
            var s=parseInt(t.attr("data-n"));
            if(e!=s){
                var n=e-s;
                var r=Math.abs(n);
                if(n!=0){
                    i.addClass(oTripleSlider.cItemHidden);
                    for(var o=1;o<=r;o++){
                        if(n>0)t.append(t.find("."+oTripleSlider.cItem).first().remove());
                        else if(n<0)t.prepend(t.find("."+oTripleSlider.cItem).last().remove())
                    }
                    oTripleSlider.setPosition(t);
                    t.attr("data-n",e);
                    oTripleSlider.setActiveDot(t,e);
                    setTimeout(function(){
                        i.removeClass(oTripleSlider.cItemHidden)
                    },100*3)
                }
            }
        }
    },
    setActiveDot:function(t,e){
        var e=parseInt(e);
        if(e){
            var i=t.closest(oTripleSlider.sParent);
            var s=i.find(oTripleSlider.sDot);
            var n=s.eq(e-1);
            s.removeClass(oTripleSlider.cDotActive);n
            .addClass(oTripleSlider.cDotActive)
        }
    },
    setClasses:function(t){
        var e=t.find("."+oTripleSlider.cItem);
        e.removeClass(oTripleSlider.cItemLeft).removeClass(oTripleSlider.cItemLeftHalf).removeClass(oTripleSlider.cItemActive).removeClass(oTripleSlider.cItemRightHalf).removeClass(oTripleSlider.cItemRight).each(function(t){
            if(e.length==1){
                $(this).addClass(oTripleSlider.cItemActive)
            } else if(e.length>=5){
                if(t==0)$(this).addClass(oTripleSlider.cItemLeft);
                else if(t==1)$(this).addClass(oTripleSlider.cItemLeftHalf);
                else if(t==2)$(this).addClass(oTripleSlider.cItemActive);
                else if(t==3)$(this).addClass(oTripleSlider.cItemRightHalf);
                else if(t==4)$(this).addClass(oTripleSlider.cItemRight)}
            }
    )},
    setPosition:function(t){
        var e=$(window).width();
        var i=t.find("."+oTripleSlider.cItem).first().outerWidth(true);
        if(e<=booksBP.smMax)oTripleSlider.movedSidesTo=i;
        oTripleSlider.setClasses(t);
        oTripleSlider.loadImages(t);
        var s=t.find("."+oTripleSlider.cItemActive);
        t.find("."+oTripleSlider.cItemLeft).css({transform:"translateX("+-parseInt(e+i*3)+"px)"});
        t.find("."+oTripleSlider.cItemLeftHalf).css({transform:"translateX("+-parseInt(e+i/2+oTripleSlider.movedSidesTo)+"px)"});
        s.css({transform:"translateX("+-parseInt(oTripleSlider.slideWidth+(e-oTripleSlider.slideWidth)/2)+"px)"});
        t.find("."+oTripleSlider.cItemRightHalf).css({transform:"translateX("+-parseInt(i/2-oTripleSlider.movedSidesTo)+"px"});
        t.find("."+oTripleSlider.cItemRight).css({transform:"translateX("+parseInt(i*3)+"px)"});
    },
    setSlider:function(t){
        var e=t.closest(oTripleSlider.sParent);
        var i=t.find("."+oTripleSlider.cItem);
        var s=e.find(oTripleSlider.sDots);
        var n=e.find(oTripleSlider.sArrows);
        if(i.length===1)n.hide();
        if(i.length>1&&s.length){
            //for(var r=1;r<=i.length;r++) s.append(oTripleSlider.htmlDot);
            for(var r=1;r<=i.length;r++) s.append('<div class="triple-slider__dot dot_'+r+' dots__item"><span></span></div>');
            s.find(oTripleSlider.sDot).first().addClass(oTripleSlider.cDotActive)
        }
        if(i.length<5&&i.length>1){
            for(var r=0;r<i.length;r++){
                t.append(t.find("."+oTripleSlider.cItem).eq(r).clone());
                if(t.find("."+oTripleSlider.cItem).length===4&&r===1)r=-1
            }
        }
        t.prepend(t.find("."+oTripleSlider.cItem).last().remove());
        t.prepend(t.find("."+oTripleSlider.cItem).last().remove());
        oTripleSlider.setPosition(t);
        t.attr("data-n",1)
    },
    loadImages:function(t){
        var e=$(window).width();
        if(e>booksBP.xsMax){
            var i=t.find(t.find("."+oTripleSlider.cItemLeftHalf).find(oTripleSlider.sImg)).add(t.find("."+oTripleSlider.cItemActive).find(oTripleSlider.sImg)).add(t.find("."+oTripleSlider.cItemRightHalf).find(oTripleSlider.sImg));
            loadSrcOrBg(i)
        }
    }
};
oTripleSlider.init(".triple-slider__slider");
