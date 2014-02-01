/*Begin custom.js file
Termé -Responsive Personal Portfolio Template main JS file
 *  owwwlab.com @2013
 *  owwwlab@gmail.com
----------------------------------------------*/

$(document).ready(function() {

    /*Initialze preloader
    ----------------------------------------------*/
    preLoader();

    /*Pages methods for navigation
    ----------------------------------------------*/
    var pages = {
        wrapper: $("#body-wrapper"),
        navContainer: $('#nav-container'),
        navLi: $("ul#nav li"),
        config: {
            height: $(window).height(),
            responsiveWidth: 600,
            windowWidth: $(window).width()
        },
        init: function() {

            /*Basic Setups
            ------------------------------------------------*/
            this.sections = this.wrapper.children('section');
            this.currentPage = this.sections.filter('.active');
            this.sections.css('height', this.config.height);
            this.wrapper.css('height', this.config.height);
            this.sections.children('.inner-wrapper').css('height', this.config.height);
            this.config.navHeight = this.navContainer.height();
            this.currentPage.css('z-index', 101).show();
            this.config.desktopFlag = (this.config.windowWidth < this.config.responsiveWidth) ? false : true;

            //Responsive Drop down menu
            if(!this.config.desktopFlag){
                this.dropdown();
            }

            this.demandPage = this.currentPage;
            this.demandPage.find('.contain').css('padding-top',this.config.navHeight);
            this.toTop = true;
            showScroll(this);
            this.toTop = false;
            initHome(this);

            /*Navigation Events Handlers
            ----------------------------------------------*/
            var self = this,navT,nav,anim,obj;
            this.navLi.on('mouseover', function() {
                obj=(self.toTop)?{top:'-16px'}:{top:'0px'};
                var topText=$(this).find('span.top'),
                    bottomText=$(this).find('span.bottom');
                anim = new TimelineLite({});
                anim
                .to(topText,0.4,obj)
                .to(bottomText,0.4,obj,'-=0.4');
            });
            this.navLi.on('mouseleave', function() {
                obj=(self.toTop)?{top:'0px'}:{top:'-16px'};
                var topText=$(this).find('span.top'),
                    bottomText=$(this).find('span.bottom');
               anim = new TimelineLite({});
                anim
                .to(topText,0.4,obj)
                .to(bottomText,0.4,obj,'-=0.4');
            });
            this.navLi.on('click', function() {
                pages.navigate($(this).attr('data-page'));
            });
        },

        /*Navigate  
        ----------------------------------------------*/
        navigate:function(demandPageID){
            pages.demandPage = pages.sections.filter(demandPageID);
            if (pages.demandPage.attr('id') == pages.currentPage.attr('id')) {
                    return false;
                }
            pages.navLi.removeClass('active');
            pages.navLi.filter('[data-page="'+demandPageID+'"]').addClass('active');
             
             pages.setup();
             pages.showDemand();
        },

        /*Page Transitions
        ----------------------------------------------*/
        showDemand: function() {
            if (this.demandPage.attr('id') == 'gallery') {
                showFolio(pages.demandPage);
            }
             if (this.currentPage.attr('id') == 'home') {
                homeCarousel('stop');
            }
            var self = this,
                buttonHeight = self.config.height - self.config.navHeight,
                layerHeight = self.config.height,
                top = new TimelineLite({onComplete: self.done}),
                layerAnim = {},
                navObj = {},
                paddingAnim = {},
                scrollBar = self.currentPage.find('.ps-scrollbar-y-rail');
            
            if (self.toTop) {
                layerAnim = {'height': 0, ease: Power4.easeInOut};
                navObj = {top: 0, ease: Power4.easeInOut};

            } else {
                layerAnim = {'height': layerHeight, ease: Power4.easeInOut};
                navObj = {top: buttonHeight, ease: Power4.easeInOut};
            }
            self.navContainer.removeClass('onpage')
            top
                .to(self.navContainer, 1.5, navObj)
                .to(scrollBar, 0.01, {right: '-15px'}, '-=1.5');
            if (self.toTop) {
                top
                    .to(self.currentPage, 1.5, layerAnim, '-=1.5');
            }
            else {
                top
                    .to(self.demandPage, 1.5, layerAnim, '-=1.5');
                }
        },

        /*Initial setups for each page transition
        ----------------------------------------------*/
        setup: function() {
            var self = pages,
                height = self.config.height,
                navHeight = self.config.navHeight;

            if (self.toTop) {
                self.demandPage.css({
                    'z-index': 99,
                    'display': 'block',
                    'height': height
                });
                self.demandPage.find('.contain').css('padding-top', navHeight);
            }
            else {
                self.currentPage.css('z-index', 99);
                self.demandPage.css({
                    'z-index': 101,
                    'display': 'block',
                    'height': 0
                });
                self.demandPage.find('.contain').css('padding-bottom', navHeight);
            }
        },

        /*Done method which is fired after each page transition
        ----------------------------------------------*/
        done: function() {
            showScroll(pages);
            var pageId = pages.demandPage.attr('id');
            if (pageId == 'music') {
                showSkills(pages.demandPage);
            } else if (pageId == 'contact') {
                showContact();
            } else if (pageId == 'home') {
                homeCarousel('start');
            }
            pages.navContainer.toggleClass('bottom');
            if(pages.toTop){
                pages.navContainer.find('span').css('top','-16px'); 
            }
            else{
                pages.navContainer.find('span').css('top','0px'); 
            }
           
            pages.toTop = !pages.toTop;
            pages.currentPage.removeClass('active').css({'z-index': 1}).hide();
            pages.currentPage.find('.contain').css({'padding-bottom': 0, 'padding-top': 0});
            pages.currentPage = pages.demandPage;
            pages.currentPage.addClass('active').css('z-index', 101);
        },

        /*Convert Menu to a dropdown in small devices
        ----------------------------------------------*/
        dropdown:function(){
            var selectnav=$('<select id="dropdown-nav"></select>').appendTo(this.navContainer);
            this.navLi.each(function(){
                selectnav.append('<option value="'+$(this).attr('data-page')+'">'+$(this).find('span.top').text()+'</option>');
            });
            selectnav.on('change',function(){
                pages.navigate(this.value);
            });
        }
    };
    pages.init();


    /*Navigate using buttons other than navigation menu
    ----------------------------------------------*/
    $('.custom-navigate').on('click',function(){
        pages.navigate($(this).attr('data-destination'));
    })



    /*Skill section elements
    ----------------------------------------------*/
/*    function showSkills(demandPage) {

        //Circular Easy pie chart
        demandPage.find('.chart').easyPieChart({
            scaleColor: false,
            barColor: '#D0482B',
            lineWidth: 10,
            trackColor: '#4a504f',
            lineCap: 'butt',
            animate: 1000,
            size: 70,
            onStep: function(from, to, percent) {
                $(this.el).find('span').text(Math.round(percent) + '%');
            }
        });
        
        //Vertical bar charts
        var windowHeight=$(window).height(),
            elem=demandPage.find('.chart-container'),
            elemOffset=windowHeight-elem.height()+100;
        elem.waypoint(function() {
            elem.find('li').each(function(){
                var percent=$(this).attr('data-percent');
                TweenMax.to($(this).children('.bar'),2,{height:percent});
            });
        },{
            context: demandPage.find('.inner-wrapper'),
            offset:elemOffset,
            triggerOnce: true
        });    
    }*/

    /*Portfolio section elements
    ----------------------------------------------*/
    function showFolio(page) {
        var $container = $('#folio');

        //Isotope Initialize
        $container.isotope({
            itemSelector: '.item',
            transformsEnabled: true,
            duration: 750,
            resizable: true,
            resizesContainer: true,
            layoutMode: 'masonry'
        });

        //Folio filters handler
        var folioFilter = $('.folio-filter');
        folioFilter.find('a').click(function() {

            folioFilter.find('.active').removeClass('active');
            $(this).parent().addClass('active');
            var selector = $(this).attr('data-filter');
            selector = (selector == "*") ? selector : '.' + selector;
            $container.isotope({filter: selector});
            var parent = $(this).parent();
            if (!parent.find('.bg').length) {
                folioBg = folioFilter.find('.bg');
                var folioBgClone = folioBg.clone();
                TweenMax.to(folioBg, 0.5, {scaleX: 0, scaleY: 0, opacity: 0, onComplete: function() {
                        folioBg.remove();
                    }});
                folioBgClone.appendTo(parent);
                TweenMax.from(folioBgClone, 0.5, {scaleX: 0, scaleY: 0, opacity: 0});
            }
            return false;
        });

        //Portfolio popup click handler//
        $container.find('.item').on('click', function() {
            var box = $('#folio-popup'),
                extraDetails=$(this).find('.extra-information');
            box.html('<button title="Close (Esc)" type="button" class="mfp-close">×</button>');
            if (extraDetails.length>0){
                box.append(extraDetails.clone());
                box.addClass('with-content');
            }else{
                box.removeClass('with-content');
                box.append($(this).find('img').clone());

            }    
        });

        //Portfolio magnifix popup //
        $container.magnificPopup({
            delegate: 'a',
            type: 'inline',
            removalDelay: 300,
            mainClass: 'my-mfp-slide-bottom'
        });

    }

    /*Contact section elements
    ----------------------------------------------*/
    function showContact() {
        var contactSection=$('section#contact');
        if (!contactSection.hasClass('activated')){
            contactSection.addClass('activated');

            //Google map initialization
            $('#google-map').gmap3({
            map: {
                options: {
                    maxZoom:13,
                    streetViewControl: false,
                    mapTypeControl: false,
                }
            },
            styledmaptype: {
                id: "mystyle",
                options: {
                    name: "Style 1"
                },
                styles: [
                    {
                        featureType: "all",
                        stylers: [
                            {"saturation": -100}, {"gamma": 0.9}
                        ]
                    }
                ]
            },
          overlay:{
            //Edit following line and enter your own address
            address: "48.008516, 37.805904",
            options:{
              content: '<div id="map-marker"><i class="icon-map-marker"></i></div>',
              offset:{
                y:-65,
                x:-20
              }
            }
          }
        },
        "autofit");
        $('#google-map').gmap3('get').setMapTypeId("mystyle");
        submitContact();
        }

        //Google map parallax effect
        $('.inner-wrapper').scroll(function(){
            $this=$(this);
            var scrollAmount=$this.scrollTop();
            TweenMax.to($('#google-map'),0,{top:-550-scrollAmount});
        })
    }

    //Contact form inputs place holder
 /*   $(":input[placeholder]").placeholder();


    //Ajax contact form 
    function submitContact() {
        var contactForm = $('form#contact-form');

        contactForm.submit(function(e) {
            e.preventDefault();
            if ($("#alert-wrapper").length) {
                return false;
            }

            var alertWrapper = $('<div id="alert-wrapper"><button type="button" class="close" data-dismiss="alert">X</div>').appendTo(contactForm);
            $('form#contact-form .alert').remove();

            var hasError = false,
                ajaxError = false;

            //form input validation     
            contactForm.find('.requiredField').each(function() {
                if ($.trim($(this).val()) == '') {
                    var labelText = $(this).attr('placeholder');
                    alertWrapper.append('<div class="alert">You forgot to enter your ' + labelText + '.</div>');
                    hasError = true;
                } else if ($(this).hasClass('email')) {
                    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                    if (!emailReg.test($.trim($(this).val()))) {
                        var labelText = $(this).attr('placeholder');
                        alertWrapper.append('<div class="alert"> You\'ve entered an invalid ' + labelText + '.</div>');
                        hasError = true;
                    }
                }
            });

            //Showing alert popup
            var showAlert = new TimelineLite({paused: true});
            hideAlert = new TimelineLite({paused: true});
            showAlert.to(alertWrapper, 0.3, {opacity: 1, top: '30%'});
            hideAlert.to(alertWrapper, 0.3, {opacity: 0, top: '60%', onComplete: function() {
                    alertWrapper.remove();
            }});

            if (hasError) {
                //Thers is  error in form inputs show alerts
                showAlert.play();
                alertWrapper.find('button').on('click', function() {
                    hideAlert.play();
                })
            }
            else {
                //Validation passed send form data to contact.php file via ajax
                var formInput = $(this).serialize();
                $.post($(this).attr('action'), formInput);
                $.ajax({
                    type: 'POST',
                    url: $(this).attr('action'),
                    dataType: 'json',
                    data: formInput,
                    success: function(data) {
                        //Ajax request success
                        if (data.status == "error") {
                            ajaxError = true;
                            contactForm.append('<div class="alert"><strong>Sorry</strong> There was an error sending your message!</div>');
                        } else if (data.status == 'ok') {
                            contactForm.slideUp(300, function() {
                                $(this).before('<div class="alert"><strong>Thanks</strong> Your email has been delivered. </div>');
                            });
                        }
                    },
                    error: function() {
                        //Ajax request success
                        ajaxError = true;
                        $('form#contact-form').append('<div class="alert"><strong>Sorry</strong> There was an error sending your message!</div>');
                    }
                });
            }
            if (ajaxError) {
                //Ajax request had some errors
                showAlert.play();
                alertWrapper.find('button').on('click', function() {
                    hideAlert.play();
                });
            }
            return false;
        });
    } */

    /*Perfect scrollbar activation runs on each page transition
    ----------------------------------------------*/
    function showScroll(pages) {
        var currentWrapper=pages.currentPage.find('.inner-wrapper');
        currentWrapper.scrollTop(0);
        currentWrapper.perfectScrollbar('destroy');
        $('.inner-wrapper').stellar();
        var innerWrapper = pages.demandPage.find('.inner-wrapper'),
                scrollTop = {};
        innerWrapper.css('height',pages.config.height-pages.config.navHeight);
        innerWrapper.perfectScrollbar({
            wheelSpeed: 50,
            suppressScrollX:true
        });
        innerWrapper.css('height',pages.config.height);
        var scrollBar = innerWrapper.find('.ps-scrollbar-y-rail');
        if (!pages.toTop){
            scrollBar.addClass('stick-top');
        }
        if (scrollBar.find('.ps-scrollbar-y').height() == 0){
            scrollBar.css('display', 'none');
        }
        scrollBar.css('right', '-15px');
        TweenMax.to(scrollBar, 0.5, {right: '0px'});
    }

    /*Fix home elements position and scrollbar
    ----------------------------------------------*/
    function initHome(pages){
        var homeSection=$('section#home'),
        contents=$('#home-contents'),
        contentsHeight=contents.height(),
        windowHeight=pages.config.height-pages.config.navHeight,
        availableHeight=windowHeight-contentsHeight,
        scrollBar=homeSection.find('.ps-scrollbar-y-rail');
        
        if (availableHeight>20){
            contents.css('margin-top',availableHeight/2);
        }else{
            contents.css('margin-top',20);
        }
        if (contentsHeight+availableHeight/2<windowHeight){
            homeSection.addClass('no-scroll');
        }
    }

    /*Home page Carousel and background slider
    ----------------------------------------------*/
    function homeCarousel(stat) //is triggered at the top of the file
    {
        var slider=$('#bg-slider');

        if (stat=='stop'){
            $('#caption-carousel').trigger("stop");

        }else if(stat=='start'){
            $('#caption-carousel').trigger("play",true);
            
        }else if(stat=='init'){
            var slideNumbers=slider.find('div').length;
            slider.find('div').each(function(){
                var imgSrc=$(this).find('img').attr('src');
                itemWidth=$(window).width();
                itemHeight=$(window).height();               
                $(this).css({'background': 'url(' + imgSrc + ')','width':itemWidth,'height':itemHeight});
            })
            runSlider();
        }
        //Initialize Caroufredsel
        function runSlider(){
            var nextSlide=1,
                prevSlide=0;
            $('#caption-carousel').carouFredSel({
                width               : 300,
                height              : 80,
                circular:true,
                infinite:true,
                direction           : "up",
                items               :{
                    visible:1
                },
                onCreate:function(data){
                    //Show items after creating carousel
                    data.items.show();
                },
                scroll : {
                    duration        : 1000,                         
                    pauseOnHover    : false,
                    fx:'fade',
                    onBefore:function(data){
                        //Sliding background image on changing carousel
                        data.items.visible.addClass('visible-caption');
                        nextSlide=(prevSlide+1)%slideNumbers;
                        TweenMax.to(slider.children().eq(prevSlide),2.5,{autoAlpha:0});
                        TweenMax.to(slider.children().eq(nextSlide),2,{autoAlpha:1});
                    },
                    onAfter:function(data){
                        data.items.old.removeClass('visible-caption');
                        prevSlide=(prevSlide+1)%slideNumbers;
                    }
                }        
            });
        }
    }


    /*PreLoader 
    ----------------------------------------------*/
        function preLoader(){
        //Define Variables
        var preloader=$('#preloader'),
            overlay=preloader.find('#load-overlay'),
            totalImages=$('img'),
            totalImagesNum=totalImages.length,
            loadedImagesNum=0,
            percentage;

        //Core- Change load percentage on each image load
        totalImages.each(function(){
            if ($.browser.msie){
                $(this).onload = new function(){
                    loaderCore();
                }
            }else{
                $(this).load(function(){
                    loaderCore();
                })
            }
            function loaderCore(){

                loadedImagesNum=loadedImagesNum+1;
                var percentage=(1-(loadedImagesNum/totalImagesNum))*100+'%';
                TweenMax.to(overlay,0.1,{width:percentage});
                if (loadedImagesNum==totalImagesNum){
                    hideLoader();
                }
            }
        });

        //Hide loader element
        function hideLoader(){
            (new TimelineLite())
            .to(preloader,1.5,{height:0, ease: Power4.easeInOut})
            .to($('#text-load'),1.5,{opacity:0, ease: Power4.easeInOut,onComplete:function(){$('#text-load').remove()}},'-=1.5')
            .to($('#nav-container'),1.5,{top:0,ease: Power4.easeInOut,onStart:function(){homeCarousel('init');}},'-=1.5')
            .from($('#profile'),1.5,{top:'-30px',opacity:0,ease: Power4.easeInOut},'-=1.2')
            .from($('#home-socials'),1.5,{bottom:'-10px',opacity:0,ease: Power4.easeInOut},'-=1.2')
            .from($('.arrow-down'),1.5,{scaleX:2, scaleY:2,top:'-50px',opacity:0,ease: Power4.easeInOut},'-=0.7');
        }
    }
});

/*Reloading Site on window resize
----------------------------------------------*/
$(window).on('resize', function() {
    location.reload();
});


/*End of custom.js file
----------------------------------------------*/

