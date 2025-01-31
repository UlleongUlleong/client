import React, { useEffect } from 'react';
import { StreamManager } from 'openvidu-browser';
const StreamComponent: React.FC<{ streamManager: StreamManager }> = ({
  streamManager,
}) => {
  const videoRef = React.createRef<HTMLVideoElement>();

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return <video autoPlay ref={videoRef} />;
};

export default StreamComponent;
