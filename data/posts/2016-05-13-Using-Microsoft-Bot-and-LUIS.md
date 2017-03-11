---
layout: post
title: Using Microsoft Bot and LUIS
categories: [js, ai]
---

During my internship in [BetterCollective](http://bettercollective.com) I've had the chance to try out [Microsoft Bot](https://dev.botframework.com/) during a demo day —a day where everyone can try out anything and make a demo at the end of they day—. I also used [LUIS](https://luis.ai) to recognize sentences.

Here is my review.

## Context

I'm working in BetterCollective. I'm in the new [BettingExpert](https://bettingexpert.com) team working on the frontend. One of the goals of this website is to list some tips —that others from BettingExpert has made— you can click to be redirected on tipping bookmakers.

## Creating a LUIS application

Even if in all tutorials people start building using Microsoft Bot, I've started by testing out LUIS *Language Understanding Intelligent Service*.
As in all AI services, you start by creating entities: parameters to your sentences that the user will make. So I started to create a small English LUIS application from scratch and created an entity "Bookmaker". Then, what you need to do is define "intents". Theses are action that your user can do talking to the bot.

Creating an intent is easy: give it a title, give it an example and there you go. So let's start the new intent: "showBonusCodes" with the exmaple: "Can you list bet365 bonuscodes?". Optionnaly, you can add parameters. I added one, called "bookmaker", which is an entity of my entity "Bookmaker".

Nothing genius here.

![Adding intent](/dist/luis1.png)

Alternatively you can add pre-built entities that doesn't need training: RegExps and PreBuilt Entities (number, datetime, dimension, etc.).

Then you start to type possible sentences (called "utterences") and train your bot. If it does not recognize the sentence, just set the intent in the list and select the entity. Then train your bot again and there you go.

![Adding utterences](/dist/luis2.png)

A few other options are available: review all utterences ever submitted to your bot, filter by the one it didn't recognize, etc.

LUIS exposes a link for testing purposes and answers JSON, which is great.

![JSON API](/dist/luis3.png)

### A few things

* You can't add two number prebuilt entities (and you can't add two parameters to the intent with the same entity or prebuilt entity).
* You can't convert a string number to number (if you try a prebuilt entity "number" and input "ten thousand", the API will recognize the number but not convert it to an actual number —which is strange because it does work for dates—).

## Using your LUIS application into Microsoft Bot

Microsoft Bot is a service and a Node (or C#) library that allows you to create a REST API to make a bot. I've not been using this a lot, and I have only been playing with one endpoint (`/`). You're supposed to use endpoints for the different usage of your bot.
I've also failed to use the LUIS integrated connector, so I went with a request library (the awesome [axios](https://github.com/mzabriskie/axios)) and used the REST API LUIS provides (a simple GET query).

I also used the Microsoft Bot Connector to make a Facebook Page and Application running the bot using webhooks so that users can speak to my bot from Facebook/Messenger.

Microsoft provides a step-by-step tutorial which is really cool. You're quickly set up.

I also was able to use an alternative artificial intelligence to LUIS: [api.ai](https://api.ai/) so that my company would choose which service they find best. It has the same functionnalities globaly (intents, entities, utterences, etc.).

My project looked like this: *index.js* creates the server, handle the service you want to use through a command option, and when the user sends a message, it use a dispatcher (*dispatcher.luis.js* or *dispatcher.apiai.js*) that sends the request, get the answer and extract a JSON like that:

```json
{
    "intent": "showBonusCodes",
    "query": "Can you list bet365 bonuscodes?",
    "parameters": {
        "bookmaker": "bet365"
    }
}
```

Or

```json
{
    "intent": "showBonusCodes",
    "query": "Can you list bonuscodes?",
    "parameters": {
        "bookmaker": null
    }
}
```

### A few things

I may have not get the point of using endpoints as channels and did not used them. It's actually useful when you're not using LUIS but as I was using it for every request, I did not have to use channels.

## Screenshots of final result

![Facebook bot 1](/dist/bot1.png)
![Facebook bot 2](/dist/bot2.png)
![Facebook bot 3](/dist/bot3.png)

You may find the repository on my GitHub account [here](https://github.com/gjuchault/demoDay-2016-05-13).
