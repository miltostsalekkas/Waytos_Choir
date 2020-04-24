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

