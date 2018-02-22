Mapset.prototype.eventbox=function(questions){
    var div=$('<div/>'), popup=$('<div id="event" class="pop center"/>'),
        main=div.clone().addClass('pop_main'), span=$('<span/>'), p=$('<p/>');
    var answers=['1-3月', '4-6月', '10-12月'], abc=['A','B','C'];
    var h=$(window).outerHeight()/2-250;

    popup.css('top', h);
    popup.append(div.clone().addClass('pop_title2')).append(main).appendTo('body')
    popup.append('<div class="pop_close"><a href="#"><img src="images/close.png" alt="關閉" width="40" height="40" title="關閉" border="0"/></a></div>');
    var  boxtitle=$('.pop_title2');
    var callback=function(action){
        $.ajax({
            url: '#',
            method: 'post',
            data: action
        });
    };
    switch (questions){
        case 1:
            var question=function(){
                for(var i=0; i<answers.length; i++){
                    div.clone().addClass('td').text(abc[i]+'.'+answers[i]).appendTo('.pop_main .table');
                    $('<input>').attr({
                        'type': 'radio',
                        'name': 'answer'
                    }).prependTo('.pop_main .td:eq('+i+')');
                }
            };
            var checkans=function(e, answer){
                $('.pop_but + .font01').remove();
                if(e+1 == answer.questionEvent.answer) {
                    var ans;
                    ans={rewardId:answer.rewardId, rewardEvent:1};
                    span.clone().addClass('font01').text('您答對！可獲得大富翁幸運抽獎(超商禮券)抽獎機會1次 ').appendTo(main).delay(1000).queue(function(){callback(ans)});
                    $('.pop_but').off('click');
                }
                else  {
                    span.clone().addClass('font01').text('您答錯了！').appendTo(main);
                    $('.pop_but').off('click');
                }
            };
            boxtitle.text('問答題目');
            $('<span/>').css('float', 'right').append($('<a/>',{
                href: '#',
                target: '_blank',
                text: '查看提示'
            })).appendTo(main);
            p.clone().css({
                fontSize: "130%",
                fontWeight: 900
            }).text('每年的什麼時候洄游性的黑鮪魚在臺灣南端的巴士海峽海域準備產卵？').appendTo(main);
            span.clone().addClass('font01').text('Q.').prependTo($('p'));
            div.clone().addClass('table').appendTo(main).queue(question()).dequeue();
            span.clone().addClass('pop_but').append($('<a />').text('確認'))
                .appendTo(main);
            $('.pop_but').on('click', function(){
                checkans($(":radio[name='answer']").index($(":radio[name='answer']:checked")), questions);
            });
            break;
        case 2:
            // var url=location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '') + questions.shareEvent.url;
            boxtitle.text('新聞分享');
            p.clone().addClass('.sharetitle').text('台灣燈會 見證花燈技藝傳承與創新').appendTo(main);
            $('<hr />').appendTo(main);
            p.clone().text('每年到了元宵節，全臺各地舉辦各種熱鬧的慶典，其中最吸睛也是最多人參與的，就是元宵節當天開展的台灣燈會！台灣燈會每年移至不同縣市展出，將城市當成大型的花燈展演舞台，配合當地自然地景、人文內涵，規劃燈區主題；其中展出要角之一，就是由燈藝師手工製作的傳統花燈，精彩創新的花燈展演，也讓台灣燈會登上國際舞台，').append('<a href="#">...詳全文 </a>').appendTo(main);
            $('<hr />').appendTo(main);
            span.clone().addClass('pop_but').append($('<a />').text('分享至臉書')).insertAfter('hr:last-child');
            $('.pop_but').on('click', function(){
                Mapset.sharebox('facebook', '#', '繞著台灣跑  環島大富翁');
                // var ans;
                // ans={rewardId:questions.rewardId, rewardEvent:2};
                // callback(ans)
            });
            break;
        case 3:
            boxtitle.text('現玩現送');
            p.clone().addClass('font01 sharetitle').appendTo(main);
            var font=$('.sharetitle'), bouns=Math.floor(Math.random()*4+1);
            switch (bouns){
                case 1:
                    font.text('您獲得點數200點!!');
                    break;
                case 2:
                    font.text('您獲得點數500點!!');
                    break;
                case 3:
                    font.text('您獲得點數5000點!!');
                    break;
                default:
                    font.text('您獲得免費擲骰1次!!');
                    break;
            }
            $('<hr />').appendTo(main);
            break;
        case 4:
            boxtitle.text('到達終點');
            $('<img/>', {
                src: 'images/winner.gif',
                alt: '台灣觀光年歷-環島大富翁'
            }).appendTo(main);
            div.clone().addClass('font01 sharetitle').appendTo(main);
            $('.sharetitle').text('恭喜您完成今日環島任務！獲得環島終點(LED液晶電視) 抽獎機會1次，也歡迎明天繼續來挑戰環島大富翁～');
            span.clone().addClass('pop_but').append($('<a />').text('確認'))
                .appendTo(main);
            break;
        case 5:
            $('.drop').remove();
            $('#event, .pop_bg1, .pop_bg2').remove();
            break;
        default:
            var textselect=Math.floor(Math.random()*2+1);
            boxtitle.text('回到原點');
            $('<img/>', {
                src: 'images/bear-3.png',
                alt: '台灣觀光年歷-環島大富翁'
            }).appendTo(main);
            div.clone().addClass('font01 sharetitle').appendTo(main);
            textselect == 1 ? $('.sharetitle').text('很殘念，遇到史上最強颱風將你吹回到起點！') : $('.sharetitle').text('哎呀 你不小心掉進了陷阱  回到了原點');
            break;
    }
};
Mapset.prototype.dicerun=function(dice){
    var i=1, dicenum=0;
    dice.removeClass();
    dice.addClass("dice");
    dice.css('cursor', 'default');
    dicenum = Math.floor(Math.random() * 6 + 1);
    dice.stop().animate({
        left : '+2px'
    }, 85, function() {
        dice.addClass('dice-t');
    }).delay(170).animate({
        top : '-5px'
    }, 85, function(){
        dice.removeClass('dice-t').addClass('dice-s');
    }).delay(170).animate( {
        opacity : 'show'
    }, 510, function() {
        dice.removeClass('dice-s').addClass('dice-e');
    }).delay(85).animate({
        left : '-2px',
        top: '2px'
    }, 85, function(){
        dice.removeClass('dice-e').addClass('dice-' + dicenum);
        dice.css('cursor', 'pointer');
    }).queue(function walk(){
        setTimeout(function(){
            bearp=Mapset.walkStep(bearp, bear);
            if(i < dicenum){
                walk();
                i++;
            }else{
                Mapset.lightbox(1, dicenum);
                $('.rollarea').css('pointer-events', 'auto');
            }
        }, 500);
    }).delay(500*(dicenum+1)).queue(function(){

    }).dequeue();
};

$(function(){
    var dice = $("#dice"), dicenum, event=0;
    $('.rollarea').css('pointer-events', 'auto');
    //地圖建置
    for(var i=0; i< map.position.length; i++){
        Mapset.renderMap(map.position[i], map.spaces[i]);
    }
    //配置熊熊
    Mapset.hobear(2);

    //擲骰子
    if(event==0){
        Mapset.lightbox(2, '是否要使用30點紅利兌換擲骰機會一次？');
        $('.rollarea').css('pointer-events', 'none');
        dice.on('click', function(){
            var b=new Mapset();
            b.dicerun(dice);
        });

        //location.reload();
    }else if(event == 2){
        Mapset.lightbox(2, '哭哭了！紅利點數不足，明天再來玩吧！');
    }else if(event == 3){
        Mapset.lightbox(2, '請先登入之後在再熊熊一起玩遊戲喔！');
    }else{
        $('.rollarea').css('pointer-events', 'none');
        Mapset.lightbox(2, '是否要使用30點紅利兌換擲骰機會一次？');
    };
    $('#facebook').on('click', function(e){
        e.preventDefault();
        Mapset.sharebox('facebook', '#', '繞著台灣跑  環島大富翁');

    });
    $('#google').on('click', function(e){
        e.preventDefault();
        Mapset.sharebox('google', '#');
    });
    $('li[class^=menu_]:not(".menu_but3")').on('click', function(e){
        e.preventDefault();
        var btn=this.className.split('_')[1];
        Mapset.lightbox(0, btn);
    })
})