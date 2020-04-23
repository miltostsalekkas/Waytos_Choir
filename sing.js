if (noteglobal.frequency != null && noteglobal.frequency < 440 && noteglobal.frequency > 75) {
    // pinkTromboneElement.start();
    pinkTromboneElement.frequency.value = noteglobal.frequency;
}

function sing(notes) {
    if (notes) {
        setVoiceness(1)
        var singing;
        var frequency = notes.frequency;
        var note = notes.name;

        if (!note) { note = 0; frequency = 0; }

        if (frequency) {
            singing = true;
        }
        else {
            singing = false;
        }
        pinkTromboneElement.frequency.value = frequency;
    }
    return { singing: singing, note: note, frequency: frequency }
}