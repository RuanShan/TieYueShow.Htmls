$(document).ready(function(){

  var player = videojs(document.querySelector('.video-js'));
  
  $('#myModal').on('hidden.bs.modal', function (e) {
    player.pause();
  })
  $('#myModal').on('show.bs.modal', function (e) {
    player.play();
  })

  $('#myModal').on('shown.bs.modal', function (e) {  
            // 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零  
            $(this).css('display', 'block');  
            var modalHeight=$(window).height() / 2 - $('#myModal .modal-dialog').height() / 2;  
            $(this).find('.modal-dialog').css({  
                'margin-top': modalHeight  
            });  
  });  
		
  $('.play-audio-btn').click(function(){
	  var $this = $(this);
	  var audioElement = document.getElementById('audio-js');
	$this.toggleClass('audio-off audio-on');
	  if($this.hasClass('audio-on'))
	  {
	    audioElement.play();
	  }else{
		audioElement.pause();  
	  }
  })
  
  
   var mySwiper = new Swiper ('.swiper-container', {
	autoplay : 3000,
    effect : 'fade',
	onAutoplayStop: function(swiper){
      alert('事件触发了;');    
	},
	onReachEnd: function(swiper){
      //alert('到了最后一个slide');
	  
	  $('#image_list .swiper').fadeOut();
	  $('#image_list .grid').fadeIn();
    }

  })        
});
