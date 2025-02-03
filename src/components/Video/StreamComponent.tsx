import React, { useEffect, useRef } from 'react';
import { StreamManager } from 'openvidu-browser';
import styled from 'styled-components';
const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const StreamComponent: React.FC<{ streamManager: StreamManager }> = ({
  streamManager,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // const vidoeRef = useRef(null);
  const [name, setName] = React.useState('');
  useEffect(() => {
    if (streamManager && videoRef) {
      streamManager.addVideoElement(videoRef.current);
      videoRef.current.muted = true;
    }
    try {
      const data = JSON.parse(streamManager.stream.connection.data);
      setName(data.clientData || 'Unknown User');
    } catch (error) {
      console.error('Error parsing user data:', error);
      setName('Unknown User');
    }
  }, [streamManager]);

  return (
    <div style={{ position: 'relative' }}>
      <video autoPlay ref={videoRef} muted></video>

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          padding: '4px 8px',
          fontSize: '15px',
        }}
      >
        {name}
      </div>
    </div>
  );
};

export default StreamComponent;
