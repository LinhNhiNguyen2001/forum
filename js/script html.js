$(document).ready(function(){
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) $(".lentop").fadeIn();
        else $(".lentop").fadeOut();
    })
    $(".lentop").click(function () {
        $("body,html").animate({scrollTop: 0}, "slow");
    })

    $(".tab-content > div:not(#ds)").hide()
    $(".tab-content > div:not(#cp)").hide()
    $(".tab a ").click(function() {
        event.preventDefault();

        $(".tab a").removeClass('active')
        $(this).addClass('active')

        var h= $(this).attr('href')
        $(".tab-content > div").hide()
        $(h).show()
    })

})




