TA.init();

TA.on('twitch.chat', function(data){
  // This should also check to see if the poster is a mod/owner
  if (data.message.match(/!strawpoll http:\/\/strawpoll.me\//)){
    $("#strawpreview").src = data.replace("!strawpoll ","") + "/r";
    $("#strawpreview").fadeIn();
  }

  if (data.message == "!strawpoll off"){
    $("#strawpreview").fadeOut();
  }
}
