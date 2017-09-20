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

//V1 method
String.prototype.format = function()
{
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,
        function(m,i){
            return args[i];
        });
}

//V2 static
String.format = function() {
    if( arguments.length == 0 )
        return null;

    var str = arguments[0];
    for(var i=1;i<arguments.length;i++) {
        var re = new RegExp('\\{' + (i-1) + '\\}','gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
}

$(window).load(function(){

    $('#preloader').fadeOut(100, function() {
               $('body').css('overflow','auto');
               $(this).hide();
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
  //垂直居中
  //$('.culture.modal').on('shown.bs.modal', function (e) {
  //          // 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零
  //          $(this).css('display', 'block');
  //          var modalHeight=$(window).height() / 2 - $('#myModal .modal-dialog').height() / 2;
  //          $(this).find('.modal-dialog').css({
  //              'margin-top': modalHeight
  //          });
  //});
  // 详细页面
  if( $('#image_list').is('*'))
  {
    var autoplay = 3000;
    if (typeof(g_autoplay) != "undefined") { autoplay = g_autoplay; }
    var swiper = new Swiper ('.swiper-container', {
  	  autoplay : autoplay,
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
      var media = document.getElementById('audio-js');
      media.play();
      var text = $('.typing-ani').text();
      var typing = new Typing("typing-ani",{
        "typingSpeed":80,  //打字速度，数值为时间间隔（ms）-1
        //"cursorSpeed":50, //光标闪烁速度，数值为时间间隔（ms）
        });
      typing.add(text).callback(function(){ ;}).execute();

      $('.play-audio-btn').click(function(){
    	  var $icon = $('.glyphicon',this);
    	  $icon.toggleClass('glyphicon-volume-off').toggleClass('glyphicon-volume-up');
    	  if($icon.hasClass('glyphicon-volume-up'))
    	  {
    	    media.play();
    	  }else{
    		  media.pause();
          typing.close();
          if( swiper != null && swiper.slides ) //集团简介页面没有swiper
          {
            swiper.slideTo(swiper.slides.length-1);
          }
    	  }
      })
    }else{
      $('.typing-ani .text').show();
    }
  }

  //铁越之歌, 铁越文化  //政治建设, 旗帜引领
  $('.play-inner-audio-btn').click(function(){
    var media = $('audio',this)[0];
    var $icon = $('.glyphicon',this);
    $icon.toggleClass('glyphicon-volume-off').toggleClass('glyphicon-volume-up');
    if($icon.hasClass('glyphicon-volume-up'))
    {
      media.play();
    }else{
      media.pause();
    }
  })

  if( $('.play-inner-audio-btn').is('*'))
  {
      if( $.getUrlVar('noaudio')!='1')
      {
          $('.play-inner-audio-btn').trigger('click');
      }
  }

  // 打开文化体系对话框
  $('.culture.modal').on('show.bs.modal', function (e) {
    var media = $('audio',this)[0];
    var $button = $('.play-audio-btn', this);
    var $icon = $('.glyphicon',this);
    $icon.toggleClass('glyphicon-volume-off').toggleClass('glyphicon-volume-up');
    if($icon.hasClass('glyphicon-volume-up'))
    {
      media.play();
    }else{
      $button.trigger('click');
    }

  })
  // 关闭文化体系对话框
  $('.culture.modal').on('hide.bs.modal', function (e) {
    var media = $('audio',this)[0];
    media.pause();
  })
  //如果是铁越风采页面
  if($('.culture5').is('*'))
  {
    //'铁越速度##videos/fengcai/sample.jpg##videos/fengcai/sample.webm',
	  var lines = [
        '感动铁越##videos/fengcai/感动铁越.jpg##videos/fengcai/01感动铁越.webm',
        '铁越速度##videos/fengcai/铁越速度.jpg##videos/fengcai/02铁越速度.webm',
        '拓荒者的足迹##videos/fengcai/拓荒者的足迹.jpg##videos/fengcai/03拓荒者的足迹.webm',
        '2017年三八才艺##videos/fengcai/2017年三八才艺.jpg##videos/fengcai/sample.webm',
        '2016年三八才艺##videos/fengcai/2016年三八才艺.jpg##videos/fengcai/052016年三八才艺展示.webm',
        '2015年三八才艺##videos/fengcai/2015年三八才艺.jpg##videos/fengcai/062015年三八才艺展示.webm',
        '两学一做-白总##videos/fengcai/两学一做-白总.jpg##videos/fengcai/07两学一做-白总.webm',
        '于志斌讲课##videos/fengcai/于志斌讲课.jpg##videos/fengcai/08于志斌讲课.webm',
        '王建臣讲课##videos/fengcai/王建臣讲课.jpg##videos/fengcai/09王建臣讲课.webm',
      ];
	  //如果C#对象存在
	  if (typeof(c_video_manager_async) != "undefined") {
      $('#preloader').show();
  		c_video_manager_async.videoFiles().then(function(res){
  			init_video_list( lines);
        bind_play_event();
        $('#preloader').hide();
  		})
	  }else{
      //测试使用
      init_video_list( lines);
      bind_play_event();
    }

  }

});

// params
//   lines: a array of string , 字符串的结构  视频标题##视频缩略图路径##视频文件路径
// 		示例: '铁越速度##videos/fengcai/sample.jpg##videos/fengcai/sample.webm'
function init_video_list( lines)
{
  //
	var template = '<div class="video-thumb">\
        <div class="image" > <a href="javascript:void(0)" class="play-btn">    <img src="{1}" class="img-fullw"></a>\
					<div class="video-wrap"><video class="video-js  vjs-hidden" data-setup=\'{"controls": true, "autoplay": false, "preload": "auto", "fluid": true}\'>\
					  <source src="{2}" type="video/webm"/>\
					</video></div>\
				</div>\
				<div class="title">{0}</div>\
			</div>';
  var $video_list =$( '.video-list').empty();//清空示例数据

  for(var i=0;i<lines.length; i++)
	{
		var line = lines[i];
		//铁越速度##images/play.jpg##videos/大连城市物流共同配送中心.webm
		var combo_items = line.split('##');
    var t = String.format( template,  combo_items[0], combo_items[1],combo_items[2]);
    $video_list.append( t);
	}
}

function bind_play_event()
{
  $('.play-btn').click(function(){
    // <a class='play-btn'> play button </a>
    // <video> source </video>
    var video = $(this).next('.video-wrap').find('video')[0];
    var player = videojs(video,{
      controls: true,
      autoplay: false,
      preload: "auto",
      fluid: true,
      BigPlayButton: { class:'vjs-hidden'  }
    });
    var FullscreenToggleComponent = videojs.getComponent('FullscreenToggle');
    //var CloseButton = videojs.getComponent('CloseButton');
    //var closeButton = new CloseButton(player);
    var closeButton = player.addChild( 'CloseButton');
    //var fullscreenToggle = new FullscreenToggleComponent(player);

    player.on("play",
        function () { console.log('play');
    });

    player.on("ended",
        function () { console.log('ended');
    });
    closeButton.on("click",
        function (event) {
          event.stopPropagation();
          player.pause();
          player.hide();
          player.exitFullscreen();
    });
    //fullscreenToggle.trigger('click');
    player.requestFullscreen();
    player.currentTime(0);
    player.show();
    player.play();
  })
}
