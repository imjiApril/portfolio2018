$(document).ready(function() {
   //윈도우 height값 구한 뒤 설정하는 함수
   init();

   //첫번째 화면 활성화
   $('html,body').animate({
      scrollTop: 0
   }, 1000);
   //첫번째 버튼 활성화
   $('#nav a').removeClass('active').eq(0).addClass('active');
   //nav, paging 비활성화
   $('#main_nav').css({
      'display': 'none'
   });
   $('#nav').css({
      'display': 'none'
   });


   //햄버거 클릭 시 전체화면 메뉴 보이기
   //input이 클릭 시 checked 되면 메뉴 보여지고, 사라지고
   var ckbox = $('#menu');
   $(ckbox).on('click', function() {
      if (ckbox.is(':checked')) {
         $('#all_menu_list').fadeIn();
         $('#nav').fadeOut().css({'z-index':-1});
         //$('#worksPage .wrap_for_works>div').css({'display':'static'});
      } else {
         $('#all_menu_list').fadeOut();
         $('#nav').fadeIn().css({'z-index':0});
         //$('#worksPage .wrap_for_works>div').css({'display':'relative'});
      }
   });


});

//창크기 조절할 때마다 height값 재설정
$(window).resize(function() {
   init();
})

var windowHeight = $(window).height();
//윈도우 height값 구한뒤 설정하는 함수
function init() {
   //하이트값 윈도우 창에 맞에 채우기
   windowHeight = $(window).height();
   // console.log(windowHeight);
   $('.height').css({
      'height': windowHeight
   });
   $('#all_menu_list').css({
      'height': windowHeight
   });
}

//스크롤 한 번에 한 페이지
$(function() {

   //마우스 휠에 따라 위치 이동하기
   $('html, body').mousewheel(function(e, delta) { //delta 휠의 이동값
      if ($(window).scrollTop() > windowHeight * 4) {
         this.scrollTop = windowHeight * 4;
         return;
      }
      this.scrollTop -= (delta * windowHeight);
      e.preventDefault();
   })

   //paging 클릭하면
   $('#nav a').on('click', function() {
      //paging index값 구하기
      var i = $(this).index();
      //paging index값에 맞춰서 container div 탑 위치 구하기
      var target = $('#container>div').eq(i).offset().top;
      //paging에 맞는 div 순서 위치로 이동
      $('html,body').stop().animate({
         scrollTop: target
      }, 1000);
      //선택되지않은 버튼에 active 클라스 제거하고
      $('#nav a').removeClass('active');
      //선택된 버튼에 active 클라스 적용해라
      $(this).addClass('active');
      return false;
   })

   $(window).on('scroll', function() {

      //스크롤바 위치에 따른 페이징 활성화
      var location = $('body,html').scrollTop() + 100;
      $('#container>div').each(function() {
         var tg = $(this).index();
         if ($(this).offset().top <= location) {
            $('#nav a').removeClass('active');
            $('#nav a').eq(tg).addClass('active');
         }
      })


      //처음 스크롤 일어날때 아래 페이지로 넘김과 동시에
      //숨겨있던 헤더 보이고 픽스되기
      if (location >= windowHeight) {
         $('#main_nav').stop().slideDown();
         $('#nav').css({
            'display': 'block'
         });
         if (location >= windowHeight && location < windowHeight * 2) {
            //헤더의 메뉴 페이지에 맞는 메뉴로 변경되기
            $('#main_nav>nav>ul>li').css({
               'background-position': '0 -66px'
            });
         } else if (location >= windowHeight * 2 && location < windowHeight * 3) {
            $('#main_nav>nav>ul>li').css({
               'background-position': '0 -124px'
            });
         } else {
            $('#main_nav>nav>ul>li').css({
               'background-position': '0 -190px'
            });
         }

      } else if (location <= 200) { //첫번째 페이지일때
         //네비, 페이징 안보이기
         $('#main_nav').fadeOut()
         $('#nav').fadeOut();
         //네비 첫 페이지 리스트로 백그라운드 변경
         $('#main_nav>nav>ul>li').css({
            'background-position': '0 4px'
         });
      }
       //console.log('location: ' + location);
       //console.log('windowHeight: ' + windowHeight);
   })

   //all_menu_list 클릭하면
   //선택한 메뉴로 페이지 이동시키기
   $('#all_menu_list>ul>li').on('click', function() {
      //list index값 구하기
      var i = $(this).index();
      //list index값에 맞춰서 container div 탑 위치 구하기
      var target = $('#container>div').eq(i).offset().top;
      //list에 맞는 div 순서 위치로 이동
      $('html,body').stop().animate({
         scrollTop: target
      }, 1000);
      //네비화면 끄고
      $('#all_menu_list').fadeOut();
      //숨겨놨던 paging 나타내기
      $('#nav').fadeIn().css({'z-index':0});
      //input check box 체크안한걸로 상태 바꾸기
      $('input:checkbox[id="menu"]').prop('checked', false)
      return false;
   })


   //스크롤 발생될때 윈도우페이지만큼 내려오면 컨텐츠 보여주고 슬라이드하기
   $(window).scroll(function(){

         if($(this).scrollTop() >= windowHeight-10){
            $('.aboutBox').animate({'margin-left':0},1000).css({'opacity':1});
            $('.skillsBox').animate({'margin-right':0},1000).css({'opacity':1});
            $('.wrap_for_profilePage').fadeTo(1000,1)
         }

   })
})
