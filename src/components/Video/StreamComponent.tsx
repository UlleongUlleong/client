import React, { useEffect } from 'react';
import { StreamManager } from 'openvidu-browser';
import styled from 'styled-components';
const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StreamComponent: React.FC<{ streamManager: StreamManager }> = ({
  streamManager,
}) => {
  const videoRef = React.createRef<HTMLVideoElement>();

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return <StyledVideo autoPlay ref={videoRef} />;
};

export default StreamComponent;
