// Initialize medium zoom.
// note: $ = jquery
$(document).ready(function() {
    var margin = window.innerWidth <= 767 ? 10 : 100;
    medium_zoom = mediumZoom('[data-zoomable]', {
        margin: margin,
        background: '#ffffffee',
    })
});