'use strict'

class Message {
  constructor(msg) {
    this.from = msg.from
    this.text = msg.text
    this.channel = msg.channel
  }

  static mapMessage(msg) {
    return {
      from: msg.from,
      text: msg.text,
      channel: msg.from
    }
  }
}

module.exports = Message
