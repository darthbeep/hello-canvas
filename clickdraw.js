var c, ctx, toggle;
var lastX = 0, lastY = 0;
$(document).ready(function() {

    c=document.getElementById('canvas');
    ctx=c.getContext("2d");
    toggle="arc";

    $("#canvas").click(function(event) {
        var rect = c.getBoundingClientRect();
        ctx.lineTo(event.clientX-rect.left, event.clientY-rect.top);
        ctx.stroke();
        lastX = event.clientX-rect.left;
        lastY = event.clientY-rect.top;
        if (toggle=="arc") {
            ctx.beginPath();
            ctx.arc(event.clientX-rect.left - 5, event.clientY-rect.top - 5, 10, 0, 2* Math.PI);
            ctx.stroke();
            ctx.fill();
        }
        if (toggle=="rect") {
            ctx.fillRect(event.clientX-rect.left - 5, event.clientY-rect.top - 5, 10, 10);
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

    $('#read').click(function(event) {
        var f = document.getElementById('file');
        if ('files' in f) {
            handleFileSelect(f.files);
        }
    });


    //Stolen from https://www.html5rocks.com/en/tutorials/file/dndfiles/
    function handleFileSelect(evt) {
        var files = evt;

        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0; i < files.length; i++) {
            f = files[i];
            // Only process image files.
            if (!f.type.match('image.*')) {
                alert("File is not an image. Sorry :(");
                continue;
            }
            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                return function(e) {
                    // Render thumbnail.
                    var span = document.createElement('span');
                    span.innerHTML = ['<img class="thumb" id="can" src="', e.target.result,
                    '" title="', escape(theFile.name), '"/>'].join('');
                    document.getElementById('list').insertBefore(span, null);

                    // My part, puts the image on the canvas
                    $('#can').load(function() {
                         var can = document.getElementById('can');
                         ctx.drawImage(can, 0, 0, c.width, c.height);
                         $('#can').remove();
                    });
                };
            })(f);

            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
        }
    }


});
