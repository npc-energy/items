$(function(){
    $('.pc').on('click',function(){
      $(this.parentNode.parentNode).addClass('none').siblings().removeClass('none');
    })
});