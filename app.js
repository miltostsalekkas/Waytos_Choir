const Application = function () {
  this.tuner = new Tuner()
  this.notes = new Notes('.notes', this.tuner)
  this.update({ name: 'A', frequency: 440, octave: 4, value: 69, cents: 0 })
}

var noteglobal = {};

Application.prototype.start = function () {
  const self = this

  this.tuner.onNoteDetected = function (note) {
    if (self.notes.isAutoMode) {
      if (self.lastNote === note.name) {
        self.update(note)
      } else {
        self.lastNote = note.name
      }
    }
  }

  document.onmousemove = (function () {
    var onmousestop = function () {

      self.tuner.init()
      self.frequencyData = new Uint8Array(self.tuner.analyser.frequencyBinCount)
    }, thread;

    return function () {
      clearTimeout(thread);
      thread = setTimeout(onmousestop, 500);
    };
  })();

  this.updateFrequencyBars()
}

Application.prototype.updateFrequencyBars = function () {
  if (this.tuner.analyser) {
    this.tuner.analyser.getByteFrequencyData(this.frequencyData)
    this.frequencyBars.update(this.frequencyData)
  }
  requestAnimationFrame(this.updateFrequencyBars.bind(this))
}

Application.prototype.update = function (note) {

  noteglobal = note;

  this.notes.update(note)
}

// noinspection JSUnusedGlobalSymbols
Application.prototype.toggleAutoMode = function () {
  this.notes.toggleAutoMode()
}

const app = new Application()
app.start()
