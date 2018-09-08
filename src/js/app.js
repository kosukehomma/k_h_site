import $ from 'jquery';
window.$ = $;
window.jQuery = $;
import 'slick-carousel';
import '../../node_modules/slick-carousel/slick/slick.css';
import '../../node_modules/slick-carousel/slick/slick-theme.css';

$(function(){
    // #で始まるリンクをクリックしたら実行されます
    $('header a[href^="#"]').click(function() {
      // スクロールの速度
      var speed = 500; // ミリ秒で記述
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top;
      $('body,html').animate({scrollTop:position}, speed, 'swing');
      return false;
    });
});