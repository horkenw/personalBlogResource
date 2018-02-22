document.body.innerHTML += '<div class="pop center" style="top: 232px"><div class="pop_title2">請使用較新的瀏覽器來玩遊戲!!</div><div class="pop_close ie8"><a href="#"><img src="images/close.png" alt="關閉" width="40" height="40" title="關閉" border="0"/></a></div><div class="pop_main"><span class="font01">此網頁不支援IE8或以下瀏覽器，請使用Firefox、或Google Chrom獲得更好遊戲品質!</span></div></div>';
$('.ie8').on('click', function(){
    $('.pop').remove();
})