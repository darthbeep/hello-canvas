var c, ctx, toggle;
$(document).ready(function() {

    c=document.getElementById('canvas');
    ctx=c.getContext("2d");
    toggle="arc";

    $("#canvas").click(function(event) {
        console.log('click');
        var rect = c.getBoundingClientRect();
        if (toggle=="arc") {
            ctx.beginPath();
            ctx.arc(event.clientX-rect.left, event.clientY-rect.top, 10, 0, 2* Math.PI);
            ctx.stroke();
            ctx.fill();
        }
        if (toggle=="rect") {
            ctx.fillRect(event.clientX-rect.left, event.clientY-rect.top, 10, 10);
        }
    });

    $("#toggle").click(function(event) {
        toggle=="arc" ? toggle="rect" : toggle="arc";
    });
    $('#clear').click(function(event) {
        ctx.clearRect(0, 0, c.width, c.height);
    });
    $('#color').click(function(event) {
        var r = parseInt(Math.random() * 255);
        var g =  parseInt(Math.random() * 255);
        var b =  parseInt(Math.random() * 255);
        ctx.fillStyle = 'rgba(' + r +', ' + g +', ' + b +', 1.0)';
    });
});
