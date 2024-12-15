import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const AppContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

const Overlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  pointer-events: none;
  svg {
    width: 150px;
    height: 150px;
    opacity: 0.6; /* Adjust transparency here */
  }
`;

const App = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Request camera access
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: { ideal: "environment" }, aspectRatio: { exact: 1.7777777778 }} })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((error) => {
        console.error("Error accessing the camera:", error);
      });

    // Cleanup
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <AppContainer>
      <Video ref={videoRef} autoPlay playsInline muted />
      <Overlay>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="3" fill="none" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="black" strokeWidth="3" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="black" strokeWidth="3" />
        </svg>
      </Overlay>
    </AppContainer>
  );
};

export default App;
