if (noteglobal.frequency != null && noteglobal.frequency < 440 && noteglobal.frequency > 75) {
    // pinkTromboneElement.start();
    pinkTromboneElement.frequency.value = noteglobal.frequency;
}

var selectedNote = [];
var TimeStamps = [];
var time = 0.01;
var lastTime = 0;
var lastnote = "";
var timestarted = true;
var start = 0;
var end = 0;
var Lastnote = [];
var Note;
var Octave;
var Time;

function sing(notes) {
    if (notes) {
        var singing;
        var frequency = notes.frequency;
        var note = notes.name;
        var octave = notes.octave;




        if (!note) { note = 0; frequency = 0; }
        else {
            note = note.replace("♯", "#");
            if (frequency) {
                singing = true;

            }
            else {
                singing = false;
                time = 0.1;
            }
            if (singing && timestarted) {
                start = new Date().getTime();
                timestarted = false;
            }
            if (singing) {
                if (note !== lastnote && selectedNote !== null) {
                    selectedNote.push(note);

                    time = new Date().getTime() - start;
                    time = time - end + 3;

                    if (note && time) {

                        synth.triggerAttackRelease(note + octave, time / 500);
                        Note = note;
                        Octave = octave;
                        Time = time;
                    }
                }
                else {
                    end = new Date().getTime() - start;
                }

                lastnote = note;
            }
            lastTime = time;
        }
    }

}

function UserSing(Users, note, octave, time, i) {


    if (note !== Lastnote[i] && note !== nul) {
        console.log(UserVoice[i]);
        UserVoice[i].triggerAttackRelease(note + octave, time / 500);
       
        Lastnote[i] = note;


    }

}