import React, { useEffect, useState } from 'react';

import { OpenVidu, Session, Publisher, Subscriber } from 'openvidu-browser';
import StreamComponent from './StreamComponent';

interface VideoProps {
  sessionId: string;
  token: string;
  userName: string;
}

function VideoRoom({ roomId, sessionId, token, userName }: VideoProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
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
    session
      .connect(token, { clientData: userName })
      .then(async () => {
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
        session.publish(publisher);
        setPublisher(publisher);
      })
      .catch((error) => {
        console.error('There was an error connecting to the session:', error);
      });
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
    <div className="video-room">
      <div className="video-container">
        {publisher && (
          <div className="publisher">
            <StreamComponent streamManager={publisher} />
          </div>
        )}
        {subscribers.map((sub, i) => (
          <div key={i} className="subscriber">
            <StreamComponent streamManager={sub} />
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={handleVideoToggle}>
          카메라 {publisher?.stream.videoActive ? '끄기' : '켜기'}
        </button>
        <button onClick={handleAudioToggle}>
          마이크 {publisher?.stream.audioActive ? '끄기' : '켜기'}
        </button>
      </div>
    </div>
  );
}

export default VideoRoom;
