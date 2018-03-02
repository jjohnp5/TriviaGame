var trivias = [
    {
        answer: "$50",
        question: "Ulysses S. Grant appears on the front of which denomination of US. currency?",
        choices: ["$20","$10","$50", "$100"]
    },
    {
        answer: "MTV",
        question: "Which fledgling network aired its first music video, titled 'Video Killed the Radio Star,' in 1981?",
        choices: ["ABC","MTV","FOX", "Disney"]
    },
    {
        answer: "Vanessa",
        question: "Who was the first African Amercian woman to be crowned Miss America? : ______ Williams",
        choices: ["Serena","Destiny","Vanessa", "Alyssa"]
    },
    {
        answer: "Twinkies",
        question: "Which sought-after snack took eight months to return to shelves after its parent company, Hostess, declared bankruptcy?",
        choices: ["Minidos","Kol-a-ches","Twinkies", "Breadstix"]
    },
    {
        answer: "$2",
        question: "Which U.S. president appears on the front of the $2 bill?",
        choices: ["$10","$20","$1", "$2"]
    },
    {
        answer: "Paypal",
        question: "Which company was purchased by eBay in 2002 to replace Billpoint as the online auction site's preferred payment method?",
        choices: ["Paypal","Stripe","WePay", "Braintree"]
    },
    {
        answer: "Lincoln",
        question: "Which Kentucky-born U.S. president is honored in the Wrestling Hall of Fame?",
        choices: ["LBJ","Obama","Trump", "Lincoln"]
    }
]

function cloneTrivias(triv){
    obj = triv.map(function(obj){
        curObj = {...obj};
        curObj.choices = [...obj.choices];
        return curObj;
    });
    return obj;
}



var game = {
    gameData : cloneTrivias(trivias),
    currentData : {},
    correctCounter: 15,
    countDown : null,
    timeOut : null,
    startGame : function(){
        this.setQuestion();
        $('.reset-game').css('display', 'none');
        
    },
    setQuestion : function(){

        $('.question').text("");
        $('.choices').empty();
        $('.answer').text("");
        if(this.gameData.length === 0){
            $('.answer').text('All questions over, restarting game....')
            this.reset();
        }else{
        let randomQuestion = Math.floor(Math.random()*this.gameData.length);
        this.currentData = this.gameData[randomQuestion];
        this.gameData = this.gameData.filter((data,i)=> {
            if(i != randomQuestion){
                return data;
            }
         });
         clearTimeout(this.timeOut);
         $(".question").text(this.currentData.question);
         this.setChoices();
         this.startCountdown();

        }
    },
    setChoices : function(){
        let self = this;
        $('.choice').off();
        this.currentData.choices.forEach(data => {
            $('.choices').append(`<button class="choice btn btn-primary btn-block" id="${data}">${data}</button>`)
        });
        $('.choice').on('click', function(){
            
            if($(this).attr('id') === self.currentData.answer){
                self.displayAnswer("Congratulations! The correct answer is ");
                $(this).removeClass("btn-primary").addClass("btn-success");
                clearInterval(self.countDown);
                self.timeOut = setTimeout(function(){
                    self.setQuestion();
                    self.correctCounter = 15;
                    
                },5000)
                
            }else{
                self.displayAnswer("Too bad, try next question.. the correct answer is ");
                $(this).removeClass("btn-primary").addClass("btn-danger");
                clearInterval(self.countDown);
                self.timeOut = setTimeout(function(){
                    self.setQuestion();
                    self.correctCounter = 15;
                    
                },5000)
            }
            $('.choice').off();
        })
    },
    displayAnswer : function(data){
        $('.answer').text(`${data} ${this.currentData.answer}!`);
    },
    reset: function(){
        let self = this;
        $('.reset-game').css('display', 'flex');
        setTimeout(function(){
            self.gameData = cloneTrivias(trivias);
            self.correctCounter = 15;
            clearInterval(self.countDown);
            clearTimeout(self.timeOut);
            self.startGame();
        }, 5000);

    },
    startCountdown: function(){
        let self = this;
        this.countDown = setInterval(function(){
            $('.timer').text(self.correctCounter);
            self.correctCounter--;
            if(self.correctCounter < 0){
                clearInterval(self.countDown);
                self.displayAnswer("Times up! the correct answer is ");
                self.timeOut = setTimeout(function(){
                    self.setQuestion();
                    self.correctCounter = 15;
                },5000)
            }
       }, 1000) 
    }
    
}

game.startGame();

$('.instructions').on('click', () => {
    $('.inst').fadeToggle(1000, 'linear');
    game.reset();
});
$('.close').on('click', ()=>{
    $('.inst').fadeToggle(1000, 'linear')
    game.reset();
})