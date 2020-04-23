async function getConnectedDevices(type) {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device => device.kind === type)
}

const videoCameras = getConnectedDevices('videoinput');
console.log('Cameras found:', videoCameras);

socket = io();
async function playVideoFromCamera(audioOn) {
    try {
        const constraints = {
            'video': false,
            'audio': true
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const audioElement = document.querySelector('video#localVideo');
        stream.getAudioTracks()[0].enabled = audioOn;
        audioElement.srcObject = stream;

    } catch (error) {
        console.error('Error opening video camera.', error);
    }
}
playVideoFromCamera();


async function makeCall() {
    const configuration = {
        iceServers: [{ url: 'stun:stun2.1.google.com:19302' }]
    }
    connection = new RTCPeerConnection(configuration);

    socket.on('message', async message => {
        if (message.answer) {
            const remoteDesc = new RTCSessionDescription(message.answer);
            await connection.setRemoteDescription(remoteDesc);
        }
    });
    const offer = await connection.createOffer();
    await connection.setLocalDescription(offer);
    socket.emit( 'offer', offer );

}

