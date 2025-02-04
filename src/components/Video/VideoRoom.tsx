import React, { useEffect, useRef, useState } from 'react';
import { OpenVidu, Session, Publisher, Subscriber } from 'openvidu-browser';
import StreamComponent from './StreamComponent';

import styled from 'styled-components';
import { Video, Mic, ChevronDown, MicOff, VideoOff } from 'lucide-react';
const VideoContainer = styled.div`
  position: relative;
  width: 320px;
  height: 240px;
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #1a1a1a;
  display: inline-block;

  @media (max-width: 468px) {
    width: 100px;
    height: 80px;
  }

  @media (max-width: 468px) {
    width: 100px;
    height: 80px;
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

  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string | undefined>(
    undefined,
  );
  const [selectedMic, setSelectedMic] = useState<string | undefined>(undefined);

  // State for dropdown visibility
  const [showCameraDropdown, setShowCameraDropdown] = useState(false);
  const [showMicDropdown, setShowMicDropdown] = useState(false);

  const sessionRef = useRef<Session | null>(null);
  //디바이스 변경시 재 렌더링
  useEffect(() => {
    const fetchDevices = async () => {
      const deviceList = await navigator.mediaDevices.enumerateDevices();
      setDevices(deviceList);
    };

    fetchDevices();
  }, []);

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
  }, [sessionId, token, userName, selectedCamera, selectedMic]);

  const handleVideoOnOff = () => {
    if (publisher) {
      const newState = !isVideoActive;
      publisher.publishVideo(newState);
      setIsVideoActive(newState);
    }
  };

  const handleAudioOnOff = () => {
    if (publisher) {
      const newState = !isAudioActive;
      publisher.publishAudio(newState);
      setIsAudioActive(newState);
    }
  };

  const toggleCameraDropdown = () => {
    setShowCameraDropdown((prev) => !prev);
    setShowMicDropdown(false);
  };

  const toggleMicDropdown = () => {
    setShowMicDropdown((prev) => !prev);
    setShowCameraDropdown(false);
  };

  const handleCameraSelect = (deviceId: string) => {
    setSelectedCamera(deviceId);
    setShowCameraDropdown(false);
    // In a real-world scenario you might need to reinitialize the publisher
    // to apply the new video device.
  };

  const handleMicSelect = (deviceId: string) => {
    setSelectedMic(deviceId);
    setShowMicDropdown(false);
    // Similarly, reinitialize the publisher to apply the new audio device if needed.
  };
  return (
    <WholeScreen>
      <VideoArea>
        <MemberList>
          <VideoContainer>
            <StreamComponent streamManager={publisher} />
          </VideoContainer>
          <VideoContainer>
            <StreamComponent streamManager={publisher} />
          </VideoContainer>
          <VideoContainer>
            <StreamComponent streamManager={publisher} />
          </VideoContainer>
          <VideoContainer>
            <StreamComponent streamManager={publisher} />
          </VideoContainer>
          <VideoContainer>
            <StreamComponent streamManager={publisher} />
          </VideoContainer>
          <VideoContainer>
            <StreamComponent streamManager={publisher} />
          </VideoContainer>
          <VideoContainer>
            <StreamComponent streamManager={publisher} />
          </VideoContainer>

          {publisher && (
            <VideoContainer>
              <StreamComponent streamManager={publisher} />
            </VideoContainer>
          )}

          {subscribers.map((sub) => (
            <VideoContainer key={sub.stream.streamId}>
              <StreamComponent streamManager={sub} />
            </VideoContainer>
          ))}
        </MemberList>
      </VideoArea>
      <ControlBar>
        <Controller>
          {/* Camera Icon Button with Dropdown */}
          <IconButton>
            {isVideoActive ? (
              <Video
                className="icon-button"
                size={24}
                onClick={handleVideoOnOff}
              />
            ) : (
              <VideoOff
                className="icon-button"
                size={24}
                onClick={handleVideoOnOff}
              />
            )}

            <ChevronDown
              className="icon-button"
              size={16}
              onClick={toggleCameraDropdown}
            />
            {showCameraDropdown && (
              <Dropdown>
                {devices
                  .filter((device) => device.kind === 'videoinput')
                  .map((device) => (
                    <DropdownItem
                      key={device.deviceId}
                      onClick={() => handleCameraSelect(device.deviceId)}
                    >
                      {device.label || `Camera ${device.deviceId}`}
                    </DropdownItem>
                  ))}
              </Dropdown>
            )}
          </IconButton>

          {/* Microphone Icon Button with Dropdown */}
          <IconButton>
            {isAudioActive ? (
              <Mic
                className="icon-button"
                size={24}
                onClick={handleAudioOnOff}
              />
            ) : (
              <MicOff
                className="icon-button"
                size={24}
                onClick={handleAudioOnOff}
              />
            )}

            <ChevronDown
              className="icon-button"
              size={16}
              onClick={toggleMicDropdown}
            />
            {showMicDropdown && (
              <Dropdown>
                {devices
                  .filter((device) => device.kind === 'audioinput')
                  .map((device) => (
                    <DropdownItem
                      key={device.deviceId}
                      onClick={() => handleMicSelect(device.deviceId)}
                    >
                      {device.label || `Mic ${device.deviceId}`}
                    </DropdownItem>
                  ))}
              </Dropdown>
            )}
          </IconButton>
        </Controller>
      </ControlBar>
    </WholeScreen>
  );
}

const WholeScreen = styled.div`
  width: 100%;
  height: 100%;
`;

const MemberList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const VideoArea = styled.div`
  display: flex;
  height: calc(100% - 60px);
`;

const ControlBar = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Controller = styled.div`
  background-color: #2d2d2d;
  width: 200px;
  height: 50px;
  border-radius: 25px;
  display: flex;
  gap: 40px;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 4px;
  position: relative;
  font-size: 16px;
  padding: 4px;

  .icon-button:hover {
    color: #00aced;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  bottom: 40px;
  left: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  z-index: 100;
  min-width: 200px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  color: #333;

  &:hover {
    background-color: #eee;
  }
`;

export default VideoRoom;
