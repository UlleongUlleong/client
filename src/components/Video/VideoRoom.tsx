import React, { useEffect, useRef, useState } from 'react';

import {
  OpenVidu,
  Session,
  Publisher,
  Subscriber,
  Stream,
} from 'openvidu-browser';
import StreamComponent from './StreamComponent';
import styled from 'styled-components';
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

        const session = OV.initSession(); //새 세션 생성
        setSession(session);
        sessionRef.current = session;
        session.on('streamCreated', (event) => {
          setTimeout(() => {
            const subscriber = session.subscribe(event.stream, undefined);
            setSubscribers((prev) => [...prev, subscriber]);
            console.log('New stream subscribed:', event.stream.streamId);
          }, 100); // delay of 500ms
        });

        session.on('streamDestroyed', (event) => {
          setSubscribers(
            (prev) =>
              prev.filter(
                (sub) => sub.stream.streamId !== event.stream.streamId,
              ), //스트림 제거 시 구독자에서 제거
          );
        });

        await session.connect(token, { clientData: userName });
        console.log('Connected to session');

        const publisher = await OV.initPublisher(undefined, {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: true,
          publishVideo: true,
          resolution: '640x480',
          frameRate: 30,
          insertMode: 'APPEND',
          mirror: false,
        });

        await session.publish(publisher);
        setPublisher(publisher);

        session.streamManagers.forEach((streamManager) => {
          if (
            streamManager.stream.connection.connectionId !==
            session.connection.connectionId
          ) {
            setTimeout(() => {
              const subscriber = session.subscribe(
                streamManager.stream,
                undefined,
              );

              setSubscribers((prev) => [...prev, subscriber]);
              console.log(
                'Subscribed to pre-existing stream:',
                streamManager.stream.streamId,
              );
            }, 100); // delay of 500ms
          }
        });
      } catch (error) {
        console.error('There was an error connecting to the session:', error);
      }
    };
    initSession();
    return () => {
      if (sessionRef.current) {
        sessionRef.current.disconnect();
        sessionRef.current = null;
      }
      if (publisher) {
        setPublisher(null);
      }
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
    <>
      {/* 본인 비디오 */}
      <div className="video-container">
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
        {/* 다른 참가자 비디오 */}
        <div id="subscribers" className="video-container">
          {subscribers.map((sub, i) => (
            <VideoContainer key={i}>
              <StreamComponent streamManager={sub} />
            </VideoContainer>
          ))}
        </div>
      </div>
    </>
  );
}

export default VideoRoom;
