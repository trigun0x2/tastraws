var TA = window.TA;

class TwitchTrivia {

  constructor() {
    let triviaAPI = "http://jservice.io/api/random";
    let ans = null;
    let triviaState = false;

    TA.twitch.chat.on('say', (data) => {
      console.log(data);
      if (data.message == '!trivia' && !triviaState){
        $.get(triviaAPI, (trivia) => {
          let question = trivia[0].question;
          console.log(question);
          TA.twitch.chat.say(question);
          $(".text-area").text(question);
          $(".trivia-cont").fadeIn();
          ans = trivia[0].answer;
          console.warn(ans);
          triviaState = true;
        });
      }else if (this.match_ans(data.message, ans)){
        TA.twitch.chat.say(data.from + " has answered correctly!");
        $(".question-cont").fadeOut(() => {
          $(".winner-name").text(data.from);
          $(".winner-cont").fadeIn();
        });
        setTimeout(() => $(".question-cont").fadeOut());
        triviaState = false;
      }
    });
  };

  // Checks if the answer is correct
  match_ans(guess, answer) {
   var score = answer.score(guess);
   console.log(score);
   return score > 0.7;
  }
  debug() {
    triviaState = false;
    TA.twitch.chat.emit('say', {message: "!trivia"});
  }
}

var trivia = new TwitchTrivia();
