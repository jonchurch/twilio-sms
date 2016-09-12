'use strict'

const Promise = require('bluebird')
const logger = require('../utils/logger')

class Casual {
  constructor() {}

  getGreeting(message, bot) {
    console.log('getgreeting!!!!!!!!!!!!!');
    bot.reply(message, 'Well hello there,' + message.from, function(){
      console.log('reply ran');
    })
  }

  getUnrecognized(message, bot) {
    bot.reply(message, 'Sorry I don\'t follow')
  }

  getHelp(message, bot) {
    bot.reply(message, 'Here is what I can do 🤖', {
      reply_markup: {
        keyboard: [
          ['Music recommendation']
        ]
      }
    })
  }
}

module.exports = Casual
