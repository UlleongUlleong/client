import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    const initSession = async () => {
      try {
        const OV = new OpenVidu();

        const session = OV.initSession(); //새 세션 생성
        setSession(session);

        session.on('streamCreated', (event) => {
          const subscriber = session.subscribe(event.stream, undefined);
          setSubscribers((prev) => [...prev, subscriber]); //스트림 생성 시 구독자 추가
        });

        session.on('streamDestroyed', (event) => {
          setSubscribers(
            (prev) => prev.filter((sub) => sub !== event.stream.streamManager), //스트림 제거 시 구독자에서 제거
          );
        });

        await session.connect(token, { clientData: userName });

        const publisher = await OV.initPublisherAsync(undefined, {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: true,
          publishVideo: true,
          resolution: '640x480',
          frameRate: 30,
          insertMode: 'APPEND',
          mirror: false,
        });

        session.publish(publisher);
        setSession(session);
        setPublisher(publisher);
      } catch (error) {
        console.error('There was an error connecting to the session:', error);
      }
    };
    initSession();
    return () => {
      if (session) {
        session.disconnect();
      }
    };
  }, [sessionId, token, userName]);

  const handleVideoToggle = () => {
    if (publisher) {
      publisher.publishVideo(!publisher.stream.videoActive); //비디오 스트림을 on/off
    }
  };
  const handleAudioToggle = () => {
    if (publisher) {
      publisher.publishAudio(!publisher.stream.audioActive); //오디오 스트림을 on/off
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
                {publisher?.stream.videoActive ? '비디오 끄기' : '비디오 켜기'}
              </ControlButton>
              <ControlButton onClick={handleAudioToggle}>
                {publisher?.stream.audioActive ? '마이크 끄기' : '마이크 켜기'}
              </ControlButton>
            </VideoControls>
          </VideoContainer>
        )}
        {/* 다른 참가자 비디오 */}
        {subscribers.map((sub, i) => (
          <VideoContainer key={i}>
            <StreamComponent streamManager={sub} />
          </VideoContainer>
        ))}
      </div>
    </>
  );
}

export default VideoRoom;
