# Lecture Buddy
Frictionless realtime audience feedback

## Inspiration
Sitting in a 400 person lecture sucks. There is no ability to create consensus as to which parts of the lecture make sense and which don't. And this again and again leads to presenters lacking the audience feedback they need to deliver an engaging presentation. We wanted to provide presenters with an "at a glance" view of how many people couldn't understand the concept, or couldn't hear, or just like the presenter's hair today. A quick way to gain consensus information over time in a large audience, while keeping the audience engaged, Better presentations for everyone!!!


## What it does
The presenter creates a lecture and defines a set of "buttons". Each "button" is used to track a certain audience metric over small intervals of time. The lecturer is given a short numeric id for the lecture.

Then the audience signs in with the lecture id. They see the list of buttons defined by the presenter. If they click a button, the metric is sent in real time to the presenter. Audience members can also submit questions to be answered in lecture.


## How we built it
We used the React starter from Hootsuite. Then we rolled in a Node.js, Express, and Socket.io backend. The backend just statically serves the React app and exposes websocket endpoints. The application runs entirely over websockets, so all communication is real-time, and audience member screens will instantly sync changes.

## Challenges we ran into
It was our first time using React. And that was **hard**. It took us several hours to understand how to get basic routing working. But we got through that, and know we know quite a bit about React.

## Accomplishments that we're proud of
* Learning React.
* Effectively iterating on our design and development process.
* Not sleeping.
* Teamwork.
* Deploying successfully first try!!!!!

## What we learned
We have mixed feelings about React, but look forward to trying it again sometime. Not sleeping is a bad idea.

## What's next for Lecture Buddy
* In class questions (think iClicker)
* Survey based questions.
* Alternate analysis views for the presenter (eg: bar graph).
* Geolocation based presentations (so no codes required).

## "#Hackharrasment"
If a student submits a question with profanity (from a defined list), they will be kicked and shown a message telling them not to send profanity because it is hurtful.
