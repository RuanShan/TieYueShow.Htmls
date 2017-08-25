$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
});

$(window).load(function(){

    $('#preloader').fadeOut(100, function() {
               $('body').css('overflow','auto');
               $(this).remove();
    });
});

$(document).ready(function(){

  if( $('.video-js').is('*'))
  {
    $('.play-video-btn').click(function(){
      var player = videojs(document.querySelector('.video-js'),{

        BigPlayButton: { class:'vjs-hidden'  }
      });
      var FullscreenToggleComponent = videojs.getComponent('FullscreenToggle');
      //var CloseButton = videojs.getComponent('CloseButton');
      var fullscreenToggle = new FullscreenToggleComponent(player);
      //var closeButton = new CloseButton(player);
      var closeButton = player.addChild( 'CloseButton');
      player.on("play",
          function () { console.log('play');
      });

      player.on("ended",
          function () { console.log('ended');
      });
      closeButton.on("click",
          function () {
            player.pause();
            player.hide();
            fullscreenToggle.trigger('click');
      });

        var $icon = $('.play-audio-btn .glyphicon');
        if($icon.hasClass('glyphicon-volume-up'))
    	  {
          $('.play-audio-btn').trigger('click');
        }
        //player.trigger('fullscreenchange');
        fullscreenToggle.trigger('click');
        player.show();
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
  if( $('#image_list').is('*'))
  {
    var swiper = new Swiper ('.swiper-container', {
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

    // 如果没有禁止播放音频，则播放音频，显示打字效果。
    if( $.getUrlVar('noaudio')!='1')
    {
      var audio = document.getElementById('audio-js');
      var text = $('.typing-ani').text();
      var typing = new Typing("typing-ani",{
        "typingSpeed":50,  //打字速度，数值为时间间隔（ms）-1
        //"cursorSpeed":50, //光标闪烁速度，数值为时间间隔（ms）
        });
      typing.add(text).callback(function(){ audio.play();}).execute();

      $('.play-audio-btn').click(function(){
    	  var $icon = $('.glyphicon',this);
    	  $icon.toggleClass('glyphicon-volume-off').toggleClass('glyphicon-volume-up');
    	  if($icon.hasClass('glyphicon-volume-up'))
    	  {
    	    audio.play();
    	  }else{
    		  audio.pause();
          typing.close();
          if( swiper && swiper.slides ) //集团简介页面没有swiper
          {
            swiper.slideTo(swiper.slides.length-1);
          }
    	  }
      })
    }else{
      $('.typing-ani .text').show();
    }
  }

});
