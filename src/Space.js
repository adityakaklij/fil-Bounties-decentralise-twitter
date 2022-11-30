import React from 'react'
import { useEffect, useRef, useState } from "react";
import reactLogo from "./Assets/react.svg";
import {
    HuddleClientProvider,
    getHuddleClient, 
    useRootStore,
  } from "@huddle01/huddle01-client";
  import PeerVideoAudioElem from "./Assets/PeerVideoAudioElem.tsx";

  function Space() {
    
    const huddleClient = getHuddleClient("1cfcb8adb2489e38a2fa11a87ab8f13bc0bd6aa0a3249e1ca6997b283633816a")
    const stream = useRootStore((state) => state.stream);
    const enableStream = useRootStore((state) => state.enableStream);
    const pauseTracks = useRootStore((state) => state.pauseTracks);
    const isCamPaused = useRootStore((state) => state.isCamPaused);
    const peers = useRootStore((state) => state.peers);
    const peerId = useRootStore((state) => state.peerId);
    const lobbyPeers = useRootStore((state) => state.lobbyPeers);
    const roomState = useRootStore((state) => state.roomState);

    // const videoRef = useRef(null)

    // const getVideo = () =>{
    //   navigator.mediaDevices
    //     .getUserMedia({
    //       video: {width:50, height:100}
    //     })
    //     .then (stream => {
    //       let video = videoRef.current;
    //       video.srcObject
    //     })
    // }

    const handleJoin = async () => {
      try {
        await huddleClient.join("dev ", {
          address: "0x15900c698ee356E6976e5645394F027F0704c8Eb",
          wallet: "",
          ens: "axit.eth",
        });
  
        console.log("joined");
      } catch (error) {
        console.log({ error });
      }
    };

    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }, [stream]);

    return (

  

      <HuddleClientProvider value={huddleClient}>
      <div className="App grid grid-cols-2">
        
          

        <div>
          <div className="card">
            <button onClick={handleJoin}>Join Twitter Space</button>
            <button onClick={() => enableStream()}>Enable Space</button>
            <button onClick={() => pauseTracks()}>Disable Space</button>
            <button onClick={() => huddleClient.enableWebcam()}>
              Enable Webcam
            </button>
            <button onClick={() => huddleClient.disableWebcam()}>
              Disable Webcam
            </button>
            {/* <button onClick={() => huddleClient.allowAllLobbyPeersToJoinRoom()}>
              allowAllLobbyPeersToJoinRoom()
            </button> */}
          </div>
          {isCamPaused && (
            <video
              style={{ width: "50%" }}
              ref={videoRef}
              autoPlay
              muted
            ></video>
          )}

           {lobbyPeers[0] && <h2>Lobby Peers</h2>}
          <div>
            {lobbyPeers.map((peer) => (
              <div>{peer.peerId}</div>
            ))}
          </div> 

           {Object.values(peers)[0] && <h2>Peers</h2>}
          <div className="peers-grid">
            {Object.values(peers).map((peer) => (
              <video ref = {videoRef}> </video>
              
              ))}
              {/* <PeerVideoAudioElem peerIdAtIndex={peer.peerId} /> */}
            
  
        </div>
        </div>
      </div>
    </HuddleClientProvider>
    );
}

export default Space