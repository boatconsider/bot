const express = require('express');
const { Client, middleware } = require('@line/bot-sdk');

const config = {
    channelAccessToken: 'bi8p5DpRwJI2GMvpZG0ip5JMr9rm3bpxzn6xy/yvVRG5bSQbhMocgnfdadxFe/Lt+giR4QsYZvj1qV1fSmymJV4YlVtdh3yx/reKZr1QmGfWjTJVRzAWMiOH78O0Y5/+rrHpfsUMSxuCEiqpaQ5wFwdB04t89/1O/w1cDnyilFU=',
    channelSecret: '2315c87a6452849ad294f3992aa31189'
};

const client = new Client(config);

const app = express();

// Middleware to handle LINE webhook
app.use(middleware(config));

// Webhook handler
app.post('/webhook', (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then(result => res.json(result))
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });
});

function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    if (event.message.text.toLowerCase() === 'hello') {
        const reply = { type: 'text', text: 'hi' };
        return client.replyMessage(event.replyToken, reply);
    }

    return Promise.resolve(null);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
