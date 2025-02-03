import React, { useEffect, useRef, useState } from 'react';

import { OpenVidu, Session, Publisher, Subscriber } from 'openvidu-browser';
import StreamComponent from './StreamComponent';
import styled from 'styled-components';
import { URL } from 'url';
const VideoContainer = styled.div`
  position: relative;
  width: 320px;
  height: 240px;
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #1a1a1a;
  display: inline-block;
`;

const VideoControls = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ControlButton = styled.button`
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

interface VideoProps {
  sessionId: string;
  token: string;
  userName: string;
}

function VideoRoom({ sessionId, token, userName }: VideoProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isAudioActive, setIsAudioActive] = useState(true);
  const [isVideoActive, setIsVideoActive] = useState(true);

  const sessionRef = useRef<Session | null>(null);
  useEffect(() => {
    const initSession = async () => {
      try {
        const OV = new OpenVidu();

        const session = OV.initSession();
        setSession(session);
        sessionRef.current = session;

        session.on('streamCreated', (event) => {
          const subscriber = session.subscribe(
            event.stream,
            `subscribers-${event.stream.streamId}`,
            {
              subscribeToAudio: true,
              subscribeToVideo: true,
            },
          );

          console.log('New stream subscribed:', subscriber.stream);

          console.log('New stream subscribed:', event.stream.streamId);

          subscriber.on('streamPlaying', () => {
            console.log('subscriber stream is playing:', event.stream.streamId);
          });
          setSubscribers((prev) => [...prev, subscriber]);
        });

        // Handle stream removals
        session.on('streamDestroyed', (event) => {
          setSubscribers((prev) =>
            prev.filter((sub) => sub.stream.streamId !== event.stream.streamId),
          );
        });

        // Connect to the session
        await session.connect(token, { clientData: userName });
        console.log('Connected to session');

        // Initialize publisher with specific constraints
        const publisher = await OV.initPublisherAsync(undefined, {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: true,
          publishVideo: true,
          resolution: '640x480',
          frameRate: 24,
          insertMode: 'APPEND',
          mirror: false,
        });

        publisher.on('streamPlaying', () =>
          console.log('Publisher stream playing'),
        );
        publisher.on('accessAllowed', () => {
          console.log('accessAllowed');
        });
        // Publish our stream

        session.on('exception', (exception) => {
          console.warn('Exception:', exception);
        });

        await session.publish(publisher);
        setPublisher(publisher);
      } catch (error) {
        console.error('There was an error connecting to the session:', error);
      }
    };

    initSession();

    // Cleanup function
    return () => {
      if (sessionRef.current) {
        try {
          sessionRef.current.disconnect();
        } catch (e) {
          console.warn('Error disconnecting session:', e);
        }
        sessionRef.current = null;
      }

      setPublisher(null);
      setSubscribers([]);
    };
  }, [sessionId, token, userName]);

  const handleVideoToggle = () => {
    if (publisher) {
      const newState = !isVideoActive;
      publisher.publishVideo(newState);
      setIsVideoActive(newState);
    }
  };

  const handleAudioToggle = () => {
    if (publisher) {
      const newState = !isAudioActive;
      publisher.publishAudio(newState);
      setIsAudioActive(newState);
    }
  };

  return (
    <div className="video-container">
      {/* Publisher video */}
      {publisher && (
        <VideoContainer>
          <StreamComponent streamManager={publisher} />
          <VideoControls>
            <ControlButton onClick={handleVideoToggle}>
              {isVideoActive ? '비디오 끄기' : '비디오 켜기'}
            </ControlButton>
            <ControlButton onClick={handleAudioToggle}>
              {isAudioActive ? '마이크 끄기' : '마이크 켜기'}
            </ControlButton>
          </VideoControls>
        </VideoContainer>
      )}

      {/* Subscriber videos */}

      {subscribers.map((sub) => (
        <VideoContainer
          id={`subscribers-${sub.stream.streamId}`}
          key={sub.stream.streamId}
        >
          <StreamComponent streamManager={sub} />
        </VideoContainer>
      ))}
    </div>
  );
}
export default VideoRoom;
