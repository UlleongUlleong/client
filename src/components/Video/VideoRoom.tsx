import React, { useEffect, useRef, useState } from 'react';
import {
  OpenVidu,
  Session,
  Publisher,
  Subscriber,
  StreamEvent,
  ConnectionEvent,
} from 'openvidu-browser';
import StreamComponent from './StreamComponent';
import styled from 'styled-components';
import { Video, Mic, ChevronDown, MicOff, VideoOff, Check } from 'lucide-react';
import { useSocketStore } from '../create-room/socket/useSocketStore';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoAlert } from 'react-icons/go';
function VideoRoom({ userName }: { userName: string }) {
  const [session, setSession] = useState<Session | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isAudioActive, setIsAudioActive] = useState(true);
  const [isVideoActive, setIsVideoActive] = useState(true);
  const { socket } = useSocketStore();
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string | undefined>(
    undefined,
  );

  const navigate = useNavigate();
  const tokenRef = useRef<string | null>(null);
  const [token, setToken] = useState<string>();
  const location = useLocation();
  const newToken = location?.state?.token;

  const [selectedMic, setSelectedMic] = useState<string | undefined>(undefined);

  // State for dropdown visibility
  const [showCameraDropdown, setShowCameraDropdown] = useState(false);
  const [showMicDropdown, setShowMicDropdown] = useState(false);
  const socketErrorRef = useRef<boolean>(false);
  const sessionRef = useRef<Session | null>(null);

  //디바이스 변경시 재 렌더링

  // useEffect(() => {
  //   sessionStorage.removeItem('userId');
  // }, []);

  useEffect(() => {
    const cleanupSession = () => {
      console.log('🔌 세션 정리');
      if (sessionRef.current) {
        sessionRef.current.disconnect();
        console.log('✅ 세션 정상 종료');
        sessionRef.current = null;
        sessionStorage.removeItem('userId');
        setSession(null);
        setPublisher(null);
        setSubscribers([]);
      }
    };

    // 페이지를 떠날 때 세션 정리
    window.addEventListener('beforeunload', cleanupSession);
    console.log('떠나나요');

    return () => {
      console.log('여기서 떠나나요');
      cleanupSession();

      window.removeEventListener('beforeunload', cleanupSession);
    };
  }, []);

  useEffect(() => {
    if (newToken) {
      console.log('토큰 인가 완료', newToken);
      setToken(newToken);
    }
  }, [newToken]);

  useEffect(() => {
    const fetchDevices = async () => {
      const deviceList = await navigator.mediaDevices.enumerateDevices();
      setDevices(deviceList);
    };

    fetchDevices();
  }, []);
  useEffect(() => {
    if (!socket) return;
    console.log('소켓있음');

    const handleSocketError = (error) => {
      console.error('❌ Socket error:', error);
      socketErrorRef.current = true;

      if (sessionRef.current) {
        sessionRef.current.disconnect();
        console.log('❌ Socket error -> 세션 강제 종료');
        sessionRef.current = null;
      }

      toast.error(error.message, <GoAlert />);
      sessionStorage.removeItem('userId');
      navigate('/');
    };
    const handleRoomJoined = (response) => {
      console.log('✅ room_joined event received:', response);
      tokenRef.current = response.data.token;
      setToken(response.data.token);
    };
    socket.on('error', handleSocketError);

    socket.on('room_joined', handleRoomJoined);

    return () => {
      console.log('🔌 소켓 연결 해제');

      socket.off('room_joined', handleRoomJoined);
      socket.off('error', handleSocketError);
    };
  }, [socket]);

  useEffect(() => {
    if (!session) return;

    session.on('reconnected', async () => {
      console.log('🔄 세션 재연결됨. 스트림 복구 중...');

      try {
        setSubscribers([]);
        setPublisher(null);

        // Ensure session is still active before proceeding
        if (!session || !session.connection) {
          console.warn('⚠️ Session is not active after reconnection.');
          return;
        }

        // Re-publish the local stream (if necessary)
        const OV = new OpenVidu();
        // const devices = await navigator.mediaDevices.enumerateDevices();
        // const hasCamera = devices.some((d) => d.kind === 'videoinput');
        // const hasAudio = devices.some((d) => d.kind === 'audioinput');

        const newPublisher = await OV.initPublisherAsync(undefined, {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: false,
          publishVideo: false,
          resolution: '1280x720',
          frameRate: 30,
          insertMode: 'APPEND',
          mirror: false,
        });

        await session.publish(newPublisher);
        setPublisher(newPublisher);

        console.log('✅ 퍼블리셔가 재연결되었습니다.');
      } catch (error) {
        console.error('❌ 퍼블리셔 재설정 오류:', error);
      }
    });

    const handleStreamDestroyed = (event: StreamEvent) => {
      console.log('🛑 스트림 종료됨:', event.stream.streamId);
      setSubscribers((prevSubscribers) =>
        prevSubscribers.filter(
          (sub) => sub.stream.streamId !== event.stream.streamId,
        ),
      );
    };

    const handleConnectionDestroyed = (event: ConnectionEvent) => {
      console.log('🔌 사용자 연결 종료:', event.connection.connectionId);
      setSubscribers((prevSubscribers) =>
        prevSubscribers.filter(
          (sub) =>
            sub.stream.connection.connectionId !==
            event.connection.connectionId,
        ),
      );
      console.log('🔌 사용자 연결 종료:', event.connection.connectionId);
    };

    session.on('streamDestroyed', handleStreamDestroyed);
    session.on('connectionDestroyed', handleConnectionDestroyed);

    return () => {
      session.off('streamDestroyed', handleStreamDestroyed);
      session.off('connectionDestroyed', handleConnectionDestroyed);
    };
  }, [session]);

  useEffect(() => {
    const initSession = async () => {
      if (!token || socketErrorRef.current) return;

      try {
        if (sessionRef.current) {
          sessionRef.current.disconnect();
          sessionRef.current = null;
          console.log('이전 세션 종료');
        }
        console.log('🔌 Connecting to session');
        const OV = new OpenVidu();
        const newSession = OV.initSession();

        sessionRef.current = newSession;
        setSession(newSession);

        newSession.on('exception', (exception) => {
          console.warn('Exception:', exception);
        });

        newSession.on('streamCreated', (event) => {
          if (!newSession.connection) {
            console.warn(
              '⚠️ Session connection is null! Waiting for connection...',
            );
            return;
          }

          // 내 자신의 스트림이면 구독하지 않음
          if (
            event.stream.connection.connectionId ===
            newSession.connection.connectionId
          ) {
            console.log('내 스트림은 구독하지 않습니다.');
            return;
          }
          // 타인의 스트림인 경우에만 구독
          const subscriber = newSession.subscribe(event.stream, undefined);
          console.log('📡 Subscriber 생성됨:', subscriber);

          subscriber.on('streamPlaying', () => {
            console.log('Subscriber stream is playing:', event.stream.streamId);
          });

          subscriber.on('streamPropertyChanged', (event) => {
            if (event.changedProperty === 'audioActive') {
              console.log('🔊 Audio active changed:', event.newValue);
            }
          });

          setSubscribers((prev) => [...prev, subscriber]);
        });
        newSession.on('streamDestroyed', (event) => {
          setSubscribers((prevSubscribers) =>
            prevSubscribers.filter(
              (sub) => sub.stream.streamId !== event.stream.streamId,
            ),
          );
        });
        await newSession.connect(token, { clientData: userName });
        console.log('✅ Successfully connected to session');
        if (socketErrorRef.current) {
          newSession.disconnect();
          console.log('❌ Socket error 발생으로 세션 연결 취소');
          return;
        }
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasCamera = devices.some((d) => d.kind === 'videoinput');
        const hasAudio = devices.some((d) => d.kind === 'audioinput');

        console.log('🔍 Camera detected:', hasCamera);

        const newPublisher = await OV.initPublisherAsync(undefined, {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: false,
          publishVideo: false,
          resolution: '1280x720',
          frameRate: 30,
          insertMode: 'APPEND',
          mirror: false,
        });

        newPublisher.on('streamPlaying', () =>
          console.log('Publisher stream playing'),
        );
        newPublisher.on('accessAllowed', () => console.log('accessAllowed'));

        await newSession.publish(newPublisher);
        setPublisher(newPublisher);
      } catch (error) {
        console.error('❌ Error connecting to session:', error);
      }
    };

    initSession();

    return () => {
      if (sessionRef.current) {
        sessionRef.current.disconnect();
        console.log('❌ Session disconnected');
        sessionRef.current = null;
      }
      setSession(null);
      setPublisher(null);
      setSubscribers([]);
    };
  }, [token]);

  //장치 재 설정 시 업데이트
  useEffect(() => {
    const updatePublisher = async () => {
      if (!session || !publisher) return;

      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasCamera = devices.some((d) => d.kind === 'videoinput');
        const hasAudio = devices.some((d) => d.kind === 'audioinput');

        const OV = new OpenVidu();
        const newPublisher = await OV.initPublisherAsync(undefined, {
          audioSource: selectedMic || (hasAudio ? undefined : false),
          videoSource: selectedCamera || (hasCamera ? undefined : false),
          publishAudio: false,
          publishVideo: false,
          resolution: '1280x720',
          frameRate: 30,
          insertMode: 'APPEND',
          mirror: false,
        });

        if (session) {
          await session.unpublish(publisher);
          await session.publish(newPublisher);
        }

        setPublisher(newPublisher);
      } catch (error) {
        console.error('❌ Error updating publisher:', error);
      }
    };

    updatePublisher();
  }, [selectedCamera, selectedMic]);

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
  };

  const handleMicSelect = (deviceId: string) => {
    setSelectedMic(deviceId);
    setShowMicDropdown(false);
  };
  return (
    <WholeScreen>
      <VideoArea>
        <MemberList>
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
                      selected={selectedCamera === device.deviceId}
                    >
                      {device.label || `Camera ${device.deviceId}`}
                      {selectedCamera === device.deviceId && (
                        <Check size={16} color="#00aced" />
                      )}
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
                      selected={selectedMic === device.deviceId}
                    >
                      <DeviceLabel>
                        {device.label || `Mic ${device.deviceId}`}
                      </DeviceLabel>
                      {selectedMic === device.deviceId && (
                        <Check size={16} color="#00aced" />
                      )}
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
const VideoArea = styled.div`
  display: grid;
  max-width: 100%;
  max-height: 100%;
  height: calc(100% - 60px);
`;
const MemberList = styled.div`
  display: grid;

  grid-gap: 10px;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  scrollbar-width: none;

  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));

  justify-content: center;
  align-items: center;

  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
`;
const VideoContainer = styled.div`
  position: relative;
  margin: 10px;
  border-radius: 8px;
  aspect-ratio: 4 / 3;
  background-color: black;
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
const DropdownItem = styled.div<{ selected: boolean }>`
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => (props.selected ? '#f5f5f5' : '#fff')};

  &:hover {
    background-color: #eee;
  }
`;

const DeviceLabel = styled.span`
  margin-right: 8px;
  flex: 1;
`;
export default VideoRoom;
