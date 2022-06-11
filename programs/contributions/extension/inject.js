ws = new WebSocket("ws://127.0.0.1:8999");
const iceServers = [
  // Test some STUN server
  {
    urls: "stun:stun.l.google.com:19302",
  },
  // Test some TURN server
  {
    urls: "turn:numb.viagenie.ca:3478",
    username: "usamawizard@gmail.com",
    credential: "pa55w0rd",
  },
];
peer = new RTCPeerConnection(iceServers);
peer.ontrack = (event) => {
  if (event.track.kind == "video") {
    ele = document.createElement("video");
    //ele.setAttribute("class", "Gv1mTb-aTv5jf");
    videodiv = document.getElementsByClassName("p2hYe TPpRNe");
    ele.srcObject = event.streams[0];
    videodiv.appendChild(ele);
    ele.play();
    console.log(event.streams);
  }
  if (event.track.kind == "audio") {
    ele = document.createElement("audio");
    ele.srcObject = event.streams[0];
    document.body.appendChild(ele);
    ele.play();
    console.log(event.streams);
  }
  console.log(event);
};
peer.onicecandidate = (event) => {
  if (event.candidate == null) return;
  console.log("Sending ICE candidate out: " + JSON.stringify(event.candidate));
  ws.send(
    JSON.stringify({
      type: "ice",
      to: window.otherpeer,
      candidate: event.candidate.candidate,
      sdpMLineIndex: event.candidate.sdpMLineIndex,
    })
  );
};

var myid = "10";
//Math.floor(Math.random() * (900 - 1 + 1)) + 1;
console.log(myid);
ws.onopen = function () {
  console.log("connected");
  ws.send(JSON.stringify({ type: "registerme", id: myid }));
};
ws.onmessage = async function (message) {
  console.log(message.data);
  message = JSON.parse(message.data);
  switch (message.type) {
    case "offer":
      window.otherpeer = message.from;
      console.log("offer", message.sdp);
      await peer.setRemoteDescription(new RTCSessionDescription(message));
      // navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream)=>{
      //peer.addStream(stream);
      peer.createAnswer().then((answer) => {
        peer.setLocalDescription(answer);
        ws.send(
          JSON.stringify({
            type: answer.type,
            sdp: answer.sdp,
            to: message.from,
          })
        );
      });
      // })
      break;
    case "ice":
      console.log("ice", message);

      peer.addIceCandidate(new RTCIceCandidate(message.data));
      break;
  }
};
ws.onclose = function () {
  console.log("disconnected");
};
