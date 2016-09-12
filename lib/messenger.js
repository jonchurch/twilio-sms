'use strict'

const TwilioSMSBot = require('botkit-sms')
const config = require('../config')
const Message = require('./message')
const handlers = require('../handlers')
const store = require('../store')
const Promise = require('bluebird')
const InputParser = require('./inputParser')
const logger = require('../utils/logger')
const inputParser = new InputParser()
const controller = new TwilioSMSBot({
    account_sid: config.TWILIO_ACCOUNT_SID,
    auth_token: config.TWILIO_AUTH_TOKEN,
    twilio_number: config.TWILIO_NUMBER
})

const bot = controller.spawn({})

//Create Webhook Endpoints for twilio sms
controller.setupWebserver(process.env.PORT, function(err, webserver) {
    controller.createWebhookEndpoints(webserver, bot, function() {
        console.log('TwilioSMSBot is online!')
    })
})

/**
 * ## Messenger
 * inteface for bot APIs
 */
class Messenger {
    constructor() {
        // const self = this

        this.bot = bot



    }

    listen() {
        controller.on('message_received', this.handleText.bind(this))

        return Promise.resolve()
    }



    handleText(bot, msg) {
        const message = new Message(Message.mapMessage(msg))
        console.log('Raw message', msg);
        console.log('Mapped Message', message);
        const text = message.text

        logger.info('message received: ' + message.text)

        if (inputParser.isGreeting(text)) {
            return handlers.casual.getGreeting(message, this.bot);
        }

        // default
        if (inputParser.isHelp(text)) {
            return handlers.casual.getHelp(message, this.bot)
        }

        return handlers.casual.getUnrecognized(message, this.bot)
    }
}

module.exports = Messenger
