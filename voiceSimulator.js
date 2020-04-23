const pinkTromboneElement = document.querySelector("pink-trombone");

pinkTromboneElement.addEventListener("load", event => {
  pinkTromboneElement.setAudioContext()
    .then(pinkTrombone => {
      //  pinkTromboneElement.enableUI();
      //  pinkTromboneElement.startUI();

      pinkTromboneElement.tongue.index=36;
      pinkTromboneElement.tongue.diameter=0.6;

      pinkTromboneElement.connect(pinkTromboneElement.audioContext.destination);


      pinkTromboneElement.vibrato.wobble.value = 0;



    });
});

function setVoiceness(voiceness) {
  const tenseness = 1 - Math.cos((voiceness) * Math.PI * 0.5);
  const loudness = Math.pow(tenseness, 0.25);

  pinkTromboneElement.tenseness.value = tenseness;
  pinkTromboneElement.loudness.value = loudness;
}