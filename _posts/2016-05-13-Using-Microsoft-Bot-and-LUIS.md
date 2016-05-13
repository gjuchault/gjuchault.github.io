---
layout: post
title: Using Microsoft Bot and LUIS
categories: [js, ai]
---

During my internship in [BetterCollective](http://bettercollective.com) I've had the chance to try out [Microsoft Bot](https://dev.botframework.com/) during a demo day —a day where everyone can try out anything and make a demo at the end of they day—. I also used [LUIS](https://luis.ai) to recognize sentences.

Here is my review.

## Creating a LUIS application

Even if in all tutorials people start building using Microsoft Bot, I've started by testing out LUIS *Language Understanding Intelligent Service*.
As in all the AI services, you start by creating entities: parameters to every sentences that the user will make. So I started to create a small Ensligh LUIS application from scratch and created an entity "Bookmaker". Then, what you need to do is define "intents". Theses are action that your user can do talking to the bot.

Creating an intent is easy: give it a title, give it an example and there you go. So let's start the new intent: "showBonusCodes" with the exmaple: "Can you list bet365 bonuscodes?". Optionnaly, you can add parameters. I added one, called "bookmaker", which is an entity of my entity "Bookmaker".

Nothing genius here.

[luis1.png]

Alternatively you can add pre-built entities that doesn't need training: RegExps and PreBuilt Entities (number, datetime, dimension, etc.).

Then you start to type possible sentences (called "utterences") and train you bot. If it does not recognize the sentence, just set the intent in the list and select the entity. Then train your bot again and there you go.

[luis2.png]

A few other options are available: review all utterences ever submitted to your bot, filter by the one it didn't recognize, etc.

LUIS exposes a link for testing purposes and answers JSON, which is great.

[luis3.png]

### A few things missing

* You can't add two number prebuilt entities (and you can't add two parameters to the intent with the same entity or prebuilt entity).
* You can't convert a string number to number (if you try a prebuilt entity "number" and input "ten thousand", the API will recognize the number but not convert it to an actual number —which is strange because it does work for dates—).

## Using your LUIS application into Microsoft Bot

Microsoft Bot is a service and a Node (or C#) library that allows you to create a REST API to create a bot. I've not been using this a lot, and I have only been playing with one endpoint (`/`).
I've also not managed to use the LUIS integrated connector, so I went with a request library (the awesome [axios](https://github.com/mzabriskie/axios)) and used the URL LUIS provides.

I also used the Microsoft Bot Connector to have a Facebook Page and Application running and web-hooked to the bot so that users can speak to my bot from Facebook.

Microsoft provides a step-by-step tutorial which is really cool. You're quickly set up.

I also was able to very quickly use an alternative to LUIS: [api.ai](https://api.ai/) so that my company would choose which service they find best.

My project looked like this: `index.js` creates the server, handle the service you want to use through an option, and when the user sends a message, it use a dispatcher (`dispatcher.luis.js` or `dispatcher.apiai.js`) that sends the request, get the answer and extract a JSON like that:

{% highlight json linenos %}
{
    "intent": "showBonusCodes",
    "query": "Can you list bet365 bonuscodes?",
    "parameters": {
        "bookmaker": "bet365"
    }
}
{% endhighlight %}

Or

{% highlight json linenos %}
{
    "intent": "showBonusCodes",
    "query": "Can you list bonuscodes?",
    "parameters": {
        "bookmaker": null
    }
}
{% endhighlight %}

## A few things

I may have not get the point of using endpoints as channels and did not used them. It's actually useful when you're not using LUIS but as I was using it for every request, I did not have to use channels.


You may find the repository on my GitHub'account [here](https://github.com/gjuchault/demoDay-2016-05-13).
