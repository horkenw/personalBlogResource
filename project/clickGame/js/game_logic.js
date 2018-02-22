if (document.body.clientWidth < 768 && window.innerHeight > window.innerWidth)
    alert('建議使用橫向螢幕來玩遊戲，避免出現畫面錯誤的問題。');
const viewportmeta = document.querySelector('meta[name="viewport"]');
if (viewportmeta) {
    viewportmeta.content = 'width=device-width, initial-scale=0.5';
}

function addZero(number) {
    if (number < 10) return '0' + number;
    else return number;
}

function togglePeopleImg(e) { //image toggle change
    e.preventDefault();
    totalClick++;
    const imageCollection = $(this).find('img');
    imageToggle.call(this);
}

function imageToggle() { //image toggle change
    const v = Math.floor((Math.random() * 3) + 1);
    $('div.progress').width(parseInt(progressBar += v) + 'px');
    if ($(this).find('img').eq(0).is(':visible')) {
        $(this).find('img').eq(0).hide();
        $(this).find('img').eq(1).show();
    } else {
        $(this).find('img').eq(1).hide();
        $(this).find('img').eq(0).show();
    }
}

function showWarning(){
    const warningBox = ['', '再快一點', '手速快點好嗎?', '用點力阿', '速度這麼慢是沒吃飯逆', '永不放棄', '加油加油', '手抽筋了嗎', '選手加油', '努力努力再努力', '嗡嗡嗡'];

    $('.mur').hide();
    frequency = ((Math.random() * 11) + 1).toFixed(2);
    if(warningBox[Math.floor(frequency)]) $('.mur').eq(Math.floor(Math.random() * 3)).show().text(warningBox[Math.floor(frequency)]);
    console.log(warningBox[Math.floor(frequency)]);
}

let countDownNumber = 15,
    totalClick = 0,
    progressBar = $('div.progress').width(),
    frequency = 0.5, quiz;


// $.getJSON('/taipei2017/taipeiAction.do?method=getQuestion', (data) => {
//     switch(data.status){
//         case '1':
//             selectedChactor();
//             quiz = data.question;
//             break;
//         case '2':
//             $('.final_dialog').show();
//             $('.ans_t2').text('你尚未登入遊戲!!');
//             $('.ans_w2').text('請先點選右側登入按鈕登入FB帳號!!');
//             break;
//         case '3':
//             $('.final_dialog').show();
//             $('.ans_t2').text('你今天已經玩過遊戲了，請明天再來!!');
//             $('.power').text(data.result);
//             break;
//         case '4':
//             $('.final_dialog').show();
//             $('.ans_t2').text('不在遊戲時間!!');
//             $('.ans_w2').text('目前不在遊戲期間!!');
//             break;
//     }
// })

function startGame(music) {
    // $('.quiz_selecotr').text(quiz.questionContent);
    // $('.hinted').attr('href', quiz.answerLink);
    $('.answ_selecotr').each((i, v) =>{
        const quizs = quiz['option'+ parseInt(i+1)];
        $(v).find('i').eq(0).after('<span>'+ quizs+'</span>')
    });
    let showMurmur = setInterval(showWarning, 1500);// remaining time
    let countfn = setInterval(() => { // remaining time
        $('.second_n').text(addZero(countDownNumber));
        music.play();
        if (!countDownNumber) {
        	music.pause();
        	music.currentTime = 0;
            clearInterval(countfn);
            clearInterval(showMurmur);
            $('.people').off('touchstart click');
            $('.before_bonus').text(totalClick);
            $('.mur').hide();
            $('.bonus_dialog, .drop_down').show();
            $('#call_bonus').on('click', () => {
                $('.bonus_dialog').hide();
                $('.power_dialog').show();
                $('#submit').on('click', finalPage.bind(this, totalClick));
            });
        }
        countDownNumber--;
    }, 1000);
}

function selectedChactor() { //before start the game
    let countDown = 2;
    const owl = $('.owl-carousel').owlCarousel({
        margin: 20,
        responsiveClass: true,
        loop: false,
        mouseDrag: false,
        touchDrag: true,
        startPosition: 1,
        responsive: {
            0: {
                items: 1
            },
            760: {
                items: 3
            }
        }
    });

    $(document).on('click', '.owl-item', function() {
        const n = $(this).index();

        $('.people').on('touchstart click', togglePeopleImg);
        // var audio = document.querySelector('audio');
        var audio = new Audio('images/file0.mp3');
        $('.people').children().eq(3).attr('src', 'images/people'+n+'.png');
        $('.people').children().eq(4).attr('src', 'images/people'+n+'_2.png');
        $('.people').children().eq(3).on('load', () =>{
            $('.chactor_collection').hide();
            $('.drop_count_down').show();
            let countfn = setInterval(() => { 
	            if (!countDown) {
	                clearInterval(countfn);
                    startGame(audio);
	                $('.drop_down, .drop_count_down').hide();
	            }
	            $('.drop_count_down img').hide();
	            $('.drop_count_down img').eq(countDown-1).show();
	            countDown--;
        	}, 1000);
        })
    });
}

function finalPage(num){
    let anw = $('[type=radio]').index($('[type=radio]:checked'))+1, ans;
    ans = {
        click: num,
        questionId: quiz.questionId,
        answer: anw
    }
    // $.ajax({
    //         url: '/taipei2017/taipeiAction.do?method=doInsert',
    //         data: ans,
    //         success: (data) => {
    //             data = $.parseJSON(data);
    //             switch(data.status){
    //                 case '1':
    //                     $('.ans_t2').text('答對問題！太厲害了，本次順利集氣');
    //                     $('.power').text(data.result);
    //                     break;
    //                 case '2':
    //                     $('.ans_t2').text('太可惜了，答錯囉！下次再接再厲！本次集氣');
    //                     $('.power').text(data.result);
    //                     break;
    //                 case '3':
    //                     $('.ans_t2').text('你尚未登入遊戲!!');
    //                     $('.ans_w2').text('請先點選右側登入按鈕登入FB帳號!!');
    //                     break;
    //                 case '4':
    //                     $('.final_dialog').show();
    //                     $('.ans_t2').text('你今天已經玩過遊戲了，請明天再來!!');
    //                     $('.power').text(data.result);
    //                     break;
    //                 case '5':
    //                     $('.final_dialog').show();
    //                     $('.ans_t2').text('不在遊戲時間!!');
    //                     $('.ans_w2').text('目前不在遊戲期間!!');
    //                     break;
    //             }
    //             $('.power_dialog').hide();
    //             $('.final_dialog').show();
    //         }
    // })
}
selectedChactor();