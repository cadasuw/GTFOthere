var NewComponent = React.createClass({
	render: function() {
	  return (
		<div>
		  $(function() {'{'}
		  var video = document.getElementById("video");
		  var showVideo = $(".top-banner-video");
		  var playVideo = $("#play-video");
		  var pauseVideo = $("#pause-video");
		  var body = $("html, body");
		  playVideo.on("click", function(e) {'{'}
		  e.preventDefault();
		  pauseVideo.fadeIn();