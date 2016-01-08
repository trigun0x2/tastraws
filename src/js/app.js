var TA = window.TA;

class Strawpoll {
  constructor() {
    this.owner;
    TA.api.get('/user').then((user) => {
      this.owner = user.accounts.twitch.metadata.name;
      console.log(this.owner);
    });
    TA.twitch.chat.on('say', (data) => {
      // This should also check to see if the poster is a mod/owner
      if (data.message.match(/!strawpoll http:\/\/strawpoll.me\//)){
        $("#strawpreview")
          .attr('src', data.message.replace("!strawpoll ","") + "/r")
          .fadeIn();
      }

      if (data.message == "!strawpoll off"){
        $("#strawpreview").fadeOut();
      }
    });
  }
}

var trivia = new Strawpoll();
