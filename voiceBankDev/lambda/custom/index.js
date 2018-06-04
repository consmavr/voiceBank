/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

// alexa-cookbook sample code

// There are three sections, Text Strings, Skill Code, and Helper Function(s).
// You can copy and paste the entire file contents as the code for a new Lambda function,
// or copy & paste section #3, the helper function, to the bottom of your existing Lambda code.

// TODO add URL to this entry in the cookbook


// 1. Text strings =====================================================================================================
//    Modify these strings and messages to change the behavior of your Lambda function

let speechOutput;
let reprompt;
const recipesTable = "iTable";
const welcomeOutput = "Welcome to orange voice bank! ";
const welcomeReprompt = "What would you like to do? ";
const byeOutput = [
    "Hope to see you again!",
    "Bye for now!",
    "Don't be a stranger!",
    "Have a nice day!",
    "Hope i could help!"
]

const minutesInDay = 1440;

const availableSocialMedia = {
    'facebook': '@ <break time="0.1s"/>  ING nl',
    'fb': '@ <break time="0.1s"/>  ING nl',
    'twitter': '@ <break time="0.1s"/>  ING nl',
    'instagram': '@ <break time="0.1s"/> ING nederland',
    'insta': '@ <break time="0.1s"/> ING nederland',
    'linkedin': '@ <break time="0.1s"/> ING nederland',
    'youtube': '@ <break time="0.1s"/> ING nederland',
    'you tube': '@ <break time="0.1s"/> ING nederland'
}


// 2. Skill Code =======================================================================================================

'use strict';
const Alexa = require('alexa-sdk');
const APP_ID = 'amzn1.ask.skill.f5e7f4e5-d3b6-4d57-b600-249851fb35cc';  // TODO replace with your app ID (OPTIONAL).



// const docClient = new awsSDK.DynamoDB.DocumentClient();

const AWS = require('aws-sdk');
// AWS.config.update({ region: 'us-east-1' });
const dynamodb = new AWS.DynamoDB();

const handlers = {

    'LaunchRequest': async function () {
        // let userId = this.event.session.user['userId'].replace('amzn1.ask.account.', '');

        // console.log(userId)
        let timestmp = this.event.request.timestamp;
        let msg = '';
        if (Object.keys(this.attributes).length === 0) {
            this.attributes['timeStampp'] = timestmp;
            this.attributes['visits']= 1;
            this.attributes['balance'] = Math.floor((Math.random() * 5000));
            this.attributes['cardType'] = 'none';
            
            msg += `Thanks for trying out this skill!`;
        } else {
            this.attributes.visits++;
            msg += 'I see your last visit was ';

            let lastTime = this.attributes['timeStampp'];
            let last = new Date(lastTime).getTime();
            let now = new Date(timestmp).getTime();

            let diff = parseInt((now - last) / (1000 * 60));
            diff = parseInt(diff/ minutesInDay);

            let nowDay = new Date(timestmp).getDay();
            let lastDay = new Date(lastTime).getDay();
            if (diff == 0) {
                
                if(nowDay != lastDay){
                    msg += 'yesterday!';
                } else{
                    msg += 'earlier today!';
                }
            }else if(diff == 1 ){
                if(nowDay != lastDay){
                    msg += 'yesterday!';
                } else{
                    msg += 'earlier today!';
                }
            } 
            else {
                msg += `${diff} days ago!`;
            }
            msg += ` You have used this skill ${this.attributes.visits} times!`

        }


        this.response.speak(welcomeOutput + msg).listen(welcomeReprompt);
        this.emit(':responseReady');
    },
    'accountInfo': function () {
        //delegate to Alexa to collect all the required slot values
        // var filledSlots = delegateSlotCollection.call(this);

        let d = this.attributes['balance'];
        if(!d){
            d = Math.floor((Math.random() * 5000));
            this.attributes['balance'] = d;
        }
        let template = {
            "type": "BodyTemplate7",
            "token": "SampleTemplate_3476",
            "backButton": "VISIBLE",
            "title": "Sample BodyTemplate7",
            "backgroundImage": {
                "contentDescription": "Textured grey background",
                "sources": [
                    {
                        "url": "https://i2-prod.dailyrecord.co.uk/incoming/article10112782.ece/ALTERNATES/s615/JS115490324.jpg"
                    }
                ]
            },
            "image": {
                "contentDescription": "Mount St. Helens landscape",
                "sources": [
                    {
                        "url": "http://i.dailymail.co.uk/i/pix/2017/01/05/18/3BDFF6CF00000578-4092196-Parts_of_the_world_could_light_up_with_the_spectacular_glow_of_t-a-11_1483641038757.jpg"
                    }
                ]
            }
        }
        let speechOutput = `You have ${d} euros left in your account`;
        let imageObj = {
            smallImageUrl: 'https://vignette.wikia.nocookie.net/masseffect/images/f/f7/Store_terminal.png',
            largeImageUrl: 'https://vignette.wikia.nocookie.net/masseffect/images/f/f7/Store_terminal.png'
        };
        //say the results
        this.response.speak(speechOutput).cardRenderer("Balance", `Remaining: ${d} euros`, imageObj).renderTemplate(template).shouldEndSession(false);
        this.emit(":responseReady");
    },
    'FollowSocialMedia': function(){
        var filledSlots = delegateSlotCollection.call(this);

        let speechOutput = '';

        var socialMedia = this.event.request.intent.slots.socialMedia.value.toLowerCase();;
        if(availableSocialMedia[socialMedia]){
            if(socialMedia === 'facebook'){
                speechOutput += "A bit old school, i like it! "
            }else if(socialMedia === 'linkedin'){
                speechOutput += "Very professional! "
            }else if(socialMedia === 'twitter'){
                speechOutput += `Who uses twitter any more? `
            }
            speechOutput += `You can follow ING on ${socialMedia} ${availableSocialMedia[socialMedia]}`
        }else{
            speechOutput = `Well ING doesn't have a ${socialMedia} account. Try something more popular maybe.`
        }
        this.attributes['socialMedia'] = socialMedia;
        //say the results
        this.response.speak(speechOutput).shouldEndSession(false);
        this.emit(":responseReady");

    },
    'cardInfoAbroad': function () {
        //delegate to Alexa to collect all the required slot values
        var filledSlots = delegateSlotCollection.call(this);

        let speechOutput;
        //Now let's recap the trip
        var cardType = this.event.request.intent.slots.cardType.value;
        if (this.attributes['cardType'] === 'none') {
            if (cardType === 'credit') {
                speechOutput = 'Yes, You can use your credit card anywhere';
            } else if (cardType === 'debit') {
                speechOutput = 'You need to activate your debit card first';
            }
        } else if (this.attributes['cardType'] === cardType) {
            speechOutput = `You already asked me about ${cardType} card`;
        } else {
            if (cardType === 'credit') {
                speechOutput = 'Yes, You can use your credit card anywhere';
            } else if (cardType === 'debit') {
                speechOutput = 'You need to activate your debit card first';
            }
        }

        this.attributes['cardType'] = cardType;
        //say the results
        this.response.speak(speechOutput).shouldEndSession(false);
        this.emit(":responseReady");
    },
    'howCheckAccount': function () {
        let speechOutput = `On the ‘Mijn ING Overzicht’ homepage, under
        ‘Direct doen’, click the ‘Sparen’  tab
        at the top of the page. Or go to ‘Alles in Mijn
        ING’ at the bottom of the page and, under
        ‘Sparen’, click ‘Spaarsaldo bekijken’`;

        this.response.speak(speechOutput).shouldEndSession(false);
        this.emit(':responseReady');
    },
    'howResetUsername': function () {
        let speechOutput = `To reset your username, you will need:
         your ING debit card;
         the mobile phone on which you receive your TAN codes.`;
        this.response.speak(speechOutput).shouldEndSession(false);;
        this.emit(':responseReady');
    },
    'loginIntent': function(){
        if (this.event.session.user.accessToken == undefined) {
            this.response.speak('to start using this skill, please use the companion app to authenticate on Amazon').linkAccountCard();
            this.emit(':responseReady').shouldEndSession(false);

        }
        else{
            let speechOutput = 'You are already logged in.'
            this.response.speak(speechOutput).shouldEndSession(false);
            this.emit(':responseReady');
        }
    },
    'AMAZON.HelpIntent': function () {
        speechOutput = "";
        reprompt = "";
        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        speechOutput = "Canceling";
        saveLastSession(this);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        speechOutput = byeOutput[getRandomInt(byeOutput.length-1)];

        saveLastSession(this);
        
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.FallbackIntent': function () {
        speechOutput = "I didn't understand that.";
        this.response.speak(speechOutput).shouldEndSession(false);
        this.emit(':responseReady');
    },
    'SessionEndedRequest': async function () {
        var speechOutput = "Ending session.";

        saveLastSession(this);

        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
};

exports.handler = (event, context) => {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.dynamoDBTableName = 'iTable2';
    // To enable string internationalization (i18n) features, set a resources object.
    //alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================

function delegateSlotCollection() {
    console.log("in delegateSlotCollection");
    console.log("current dialogState: " + this.event.request.dialogState);
    if (this.event.request.dialogState === "STARTED") {
        console.log("in Beginning");
        var updatedIntent = this.event.request.intent;
        //optionally pre-fill slots: update the intent object with slot values for which
        //you have defaults, then return Dialog.Delegate with this updated intent
        // in the updatedIntent property
        this.emit(":delegate", updatedIntent);
    } else if (this.event.request.dialogState !== "COMPLETED") {
        console.log("in not completed");
        // return a Dialog.Delegate directive with no updatedIntent property.
        this.emit(":delegate");
    } else {
        console.log("in completed");
        console.log("returning: " + JSON.stringify(this.event.request.intent));
        // Dialog is now complete and all required slots should be filled,
        // so call your normal intent handler.
        return this.event.request.intent;
    }
}

function getRandomFromArray(array) {
    // the argument is an array [] of words or phrases
    var i = 0;
    i = Math.floor(Math.random() * array.length);
    return (array[i]);
}

function getItem(params) {
    return dynamodb.getItem(params).promise();
}


function scanItem(params) {
    return dynamodb.scan(params).promise();
}

function putItem(params) {
    return dynamodb.putItem(params).promise();
}

function saveLastSession(ctx) {
    ctx.attributes['timeStampp'] = ctx.event.request.timestamp;
    ctx.attributes['cardType'] = 'none';
    if (!ctx.attributes['visits']) {
        ctx.attributes['visits'] = 1;
    }
} 

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }