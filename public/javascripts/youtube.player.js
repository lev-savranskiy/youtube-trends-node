/*eslint-env jquery*/

// script is not in use
// we do not need to build player dynamically

$(document).ready(function(){
    const id = window.location.href.split('/').pop().replace(/[^a-z0-9-_]/ig,'');
    $('<iframe/>', {
        src: 'https://www.youtube.com/embed/'+id+'?autoplay=1'
    })
        .css('height', '100%')
        .css('width', '100%')
        .attr('allowFullScreen', '')
        .attr('frameborder', 0)
        .appendTo('#video-container');

    $('#video-container').css('height', '90%')
});