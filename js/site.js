jQuery(function( $ ) {

  var slides = {
    chrome: {
      count: 4,
      title: 'Chrome'
    },
    firefox: {
      count: 4,
      title: 'Firefox'
    },
    ie: {
      count: 4,
      title: 'Internet Explorer'
    },
    opera: {
      count: 3,
      title: 'Opera'
    },
    safari: {
      count: 3,
      title: 'Safari'
    }
  };
  var elms = {
    modal: $("#modal-popup"),
    controls: $("#modal-controls"),
    content: $("#modal-content"),
    img: $("#modal-content > img"),
    title: $("#modal-title"),
    slideLabel: $("#slide-label")
  };

  function Slider(slides, elms) {
    var currentSlide = 0,
        currentTarget = 'chrome';

    function reloadSlide() {
      elms.img.attr('src', 'img/' + currentTarget + '/' + (currentSlide+1) + '.png');
      elms.slideLabel.text((currentSlide + 1) + '/' + slides[currentTarget].count);
    }

    this.show = function(target) {
      currentTarget = target;
      currentSlide = 0;

      elms.title.text(slides[target].title);
      reloadSlide();

      elms.modal.fadeIn();
    };

    this.first = function() {
      currentSlide = 0;
      reloadSlide();
    };
    this.last = function() {
      currentSlide = slides[currentTarget].count-1;
      reloadSlide();
    };
    this.prev = function() {
      if (currentSlide <= 0) return;
      currentSlide-- ;
      reloadSlide();
    };
    this.next = function() {
      if (currentSlide >= slides[currentTarget].count - 1) return;
      currentSlide++;
      reloadSlide();
    };
  }

  var slider = new Slider(slides, elms);

  elms.controls.on('click', function(e){
    e.stopPropagation();

    var action = $(e.target).data('action');
    if (action) slider[action]();
  });
  elms.content.on('click', function(e){
    e.stopPropagation();
    slider.next();
  });
  elms.modal.on('click', function(){
    elms.modal.fadeOut();
  });

  $("#modal-container").on('click', function(e){
    e.stopPropagation();
  });
  $("#list").on("click", 'div', function(e){
    slider.show($(e.currentTarget).data('target'));
  });
  $(document).on('keydown', function(e) {
    if (elms.modal.is(":visible")) e.preventDefault();
    if(e.which == 27) {
      elms.modal.fadeOut();
    }
    if(e.which == 39 || e.which == 32) {
      slider.next();
    }
    if(e.which == 37) {
      slider.prev();
    }
  });

});