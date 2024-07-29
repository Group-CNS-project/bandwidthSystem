$("#home-section").css({display: 'block'});
$("#dash-board-section").css({display: 'none'});
$("#history-section").css({display: 'none'});

$("#home-button").on('click',()=>{
    $("#home-section").css({display:'block'});
    $("#dash-board-section").css({display:'none'});
    $("#history-section").css({display: 'none'});
});
$("#monitor-button").on('click',()=>{
    $("#dash-board-section").css({display:'block'});
    $("#home-section").css({display:'none'});
    $("#history-section").css({display: 'none'});
});
$("#watch-history").on('click',()=>{
    $("#home-section").css({display:'none'});
    $("#dash-board-section").css({display:'none'});
    $("#history-section").css({display: 'block'});
});