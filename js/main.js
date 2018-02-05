$(document).ready(function(){
   //윈도우 height값 구한 뒤 설정하는 함수
   init();

   //첫번째 화면 활성화
   $('html,body').animate({scrollTop:0},1000);
   //첫번째 버튼 활성화
   $('#nav a').removeClass('active').eq(0).addClass('active');


   //햄버거 클릭 시 전체화면 메뉴 보이기
   //input이 클릭 시 checked 되면 메뉴 보여지고, 사라지고
   var ckbox = $('#menu');
      $(ckbox).on('click',function () {
          if (ckbox.is(':checked')) {
             $('#all_menu_list').css({'display':'block'})
          } else {
             $('#all_menu_list').css({'display':'none'})
          }
      });


});

//창크기 조절할 때마다 height값 재설정
$(window).resize(function(){
   init();
})

var windowHeight = $(window).height();
//윈도우 height값 구한뒤 설정하는 함수
function init(){
   //하이트값 윈도우 창에 맞에 채우기
   windowHeight = $(window).height();
   // console.log(windowHeight);
   $('.height').css({'height':windowHeight});
   $('#all_menu_list').css({'height':windowHeight});
}

//스크롤 한 번에 한 페이지
$(function(){

    //마우스 휠에 따라 위치 이동하기
    $('html, body').mousewheel(function(e, delta){//delta 휠의 이동값
      if($(window).scrollTop()>windowHeight*4){
        this.scrollTop = windowHeight*4;
        return;
      }
      this.scrollTop -= (delta*windowHeight);
      e.preventDefault();
    })

    //paging 클릭하면
    $('#nav a').on('click',function(){
      //paging index값 구하기
      var i = $(this).index();
      //paging index값에 맞춰서 container div 탑 위치 구하기
      var target = $('#container>div').eq(i).offset().top;
      //paging에 맞는 div 순서 위치로 이동
      $('html,body').stop().animate({scrollTop:target},1000);
      //선택되지않은 버튼에 active 클라스 제거하고
      $('#nav a').removeClass('active');
      //선택된 버튼에 active 클라스 적용해라
      $(this).addClass('active');
      return false;
   })
})
//처음 스크롤 일어날때 아래 페이지로 넘김과 동시에
//숨겨있던 헤더 보이고 픽스되기


//헤더의 메뉴 페이지에 맞는 메뉴로 변경되기

//선택한 메뉴로 페이지 이동시키기
