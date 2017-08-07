$(window).load(function(){

    $('#preloader').fadeOut(100, function() {
               $('body').css('overflow','auto');
               $(this).remove();
    });
});

$(document).ready(function(){

  if( $('.video-js').is('*'))
  {
    var player = videojs(document.querySelector('.video-js'));
    player.on("play",
        function () {
    });

    player.on("ended",
        function () {
    });

    $('#myModal').on('hidden.bs.modal', function (e) {
      player.pause();
    })
    $('#myModal').on('show.bs.modal', function (e) {
      var $icon = $('.play-audio-btn .glyphicon');
      if($icon.hasClass('glyphicon-volume-up'))
  	  {
        $('.play-audio-btn').trigger('click');
      }
      player.play();
    })
  }
  $('#myModal').on('shown.bs.modal', function (e) {
            // 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零
            $(this).css('display', 'block');
            var modalHeight=$(window).height() / 2 - $('#myModal .modal-dialog').height() / 2;
            $(this).find('.modal-dialog').css({
                'margin-top': modalHeight
            });
  });

  var text = $('.typing-ani').text();
  var typing = new Typing("typing-ani",{
    "typingSpeed":50,  //打字速度，数值为时间间隔（ms）
    //"cursorSpeed":50, //光标闪烁速度，数值为时间间隔（ms）
    });
  typing.add(text).execute();

  $('.play-audio-btn').click(function(){
	  var $icon = $('.glyphicon',this);
	  var audioElement = document.getElementById('audio-js');
	  $icon.toggleClass('glyphicon-volume-off').toggleClass('glyphicon-volume-up');
	  if($icon.hasClass('glyphicon-volume-up'))
	  {
	    audioElement.play();
	  }else{
		  audioElement.pause();
      typing.close();
	  }
  })


  var mySwiper = new Swiper ('.swiper-container', {
	  autoplay : 3000,
    effect : 'fade',
  	onAutoplayStop: function(swiper){
  	},
  	onReachEnd: function(swiper){
        //alert('到了最后一个slide');
  	  $('#image_list .swiper').fadeOut();
  	  $('#image_list .grid').fadeIn();
      }
    })


});
