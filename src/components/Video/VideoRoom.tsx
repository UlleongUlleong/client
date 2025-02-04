import React, { useEffect, useRef, useState } from 'react';
import { OpenVidu, Session, Publisher, Subscriber } from 'openvidu-browser';
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
      if (!token) return;
      try {
        const OV = new OpenVidu();
        const session = OV.initSession();

        sessionRef.current = session;

        session.on('exception', (exception) => {
          console.warn('Exception:', exception);
        });

        session.on('streamCreated', (event) => {
          const subscriber = session.subscribe(event.stream, undefined);
          console.log('New stream subscribed:', subscriber.stream.streamId);

          subscriber.on('streamPlaying', () => {
            console.log('Subscriber stream is playing:', event.stream.streamId);
          });

          setSubscribers((prev) => [...prev, subscriber]);
        });

        session.on('streamDestroyed', (event) => {
          setSubscribers((prev) =>
            prev.filter((sub) => sub.stream.streamId !== event.stream.streamId),
          );
        });
        // 세션 연결 후 setSession 호출
        await session.connect(token, { clientData: userName });
        console.log('Connected to session');

        setSession(session);

        // 📌 카메라 장치 확인 후 퍼블리셔 초기화
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasCamera = devices.some(
          (device) => device.kind === 'videoinput',
        );
        const hasAudio = devices.some((device) => device.kind === 'audioinput');

        console.log('카메라 감지됨:', hasCamera);

        const publisher = await OV.initPublisherAsync(undefined, {
          audioSource: hasAudio ? undefined : false,
          videoSource: hasCamera ? undefined : false,
          publishAudio: hasAudio,
          publishVideo: hasCamera,
          resolution: '1280x720',
          frameRate: 30,
          insertMode: 'REPLACE',
          mirror: false,
        });

        publisher.on('streamPlaying', () =>
          console.log('Publisher stream playing'),
        );
        publisher.on('accessAllowed', () => console.log('accessAllowed'));

        await session.publish(publisher);
        setPublisher(publisher);
      } catch (error) {
        console.error('Error connecting to session:', error);
      }
    };

    initSession();

    return () => {
      if (sessionRef.current) {
        sessionRef.current.disconnect();
        console.log('Session disconnected');
        sessionRef.current = null;
      }
      setSession(null);
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

      {subscribers.map((sub) => (
        <VideoContainer key={sub.stream.streamId}>
          <StreamComponent streamManager={sub} />
        </VideoContainer>
      ))}
    </div>
  );
}

export default VideoRoom;
