// Copyright 2014 Flávio Ribeiro <flavio@bem.tv>.
// All rights reserved.
// Use of this source code is governed by a Apache
// license that can be found in the LICENSE file.

var Settings = require("./settings")
var _ = require("underscore")

class UploadHandler {
  constructor() {
    this.maxUploadSlots = Settings.maxUploadSlots
    this.slots = {}
  }

  getSlot(peerId) {
    this.checkAndFreeSlots()
    if (_.contains(this.slots.keys, peerId) || (_.size(this.slots) < this.maxUploadSlots)) {
      this.slots[peerId] = Date.now()
      return true
    } else {
      return false
    }
  }

  checkAndFreeSlots() {
    var now = Date.now() - Settings.uploadSlotTimeout
    _.each(this.slots, function (timestamp, peerId) {
      if (timestamp <= now) {
        delete this.slots[peerId]
      }
    }, this)
  }
}

module.exports = UploadHandler
