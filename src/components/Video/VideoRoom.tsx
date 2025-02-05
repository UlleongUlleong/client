import React, { useEffect, useRef, useState } from 'react';
import { OpenVidu, Session, Publisher, Subscriber } from 'openvidu-browser';
import StreamComponent from './StreamComponent';
import styled from 'styled-components';
import { Video, Mic, ChevronDown, MicOff, VideoOff } from 'lucide-react';
import { useSocketStore } from '../create-room/socket/useSocketStore';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const [token, setToken] = useState<string>();
  const location = useLocation();
  const newToken = location?.state?.token;

  const [selectedMic, setSelectedMic] = useState<string | undefined>(undefined);

  const [showCameraDropdown, setShowCameraDropdown] = useState(false);
  const [showMicDropdown, setShowMicDropdown] = useState(false);

  const publisherRef = useRef<Publisher | null>(null);
  const tokenRef = useRef<string | null>(null);
  const socketErrorRef = useRef<boolean>(false);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const isComponentMounted = useRef(true);
  const sessionRef = useRef<Session | null>(null);

  if (newToken) {
    tokenRef.current = newToken;
  }

  //디바이스 변경시 재 렌더링

  useEffect(() => {
    isComponentMounted.current = true;
    return () => {
      isComponentMounted.current = false;
      cleanupSession();
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  //세션 정리
  const cleanupSession = async () => {
    if (publisherRef.current) {
      try {
        publisherRef.current.stream?.disposeMediaStream();
        publisherRef.current = null;
      } catch (error) {
        console.error('Error disposing publisher:', error);
      }
    }

    if (sessionRef.current) {
      try {
        await sessionRef.current.disconnect();
        console.log('Session disconnected successfully');
      } catch (error) {
        console.error('Error disconnecting session:', error);
      }
      sessionRef.current = null;
    }

    setSession(null);
    setPublisher(null);
    setSubscribers([]);
  };

  //디바이스 초기화
  const initializeDevices = async () => {
    try {
      const deviceList = await navigator.mediaDevices.enumerateDevices();
      if (isComponentMounted.current) {
        setDevices(deviceList);

        // Set default devices if not already set
        if (!selectedCamera) {
          const defaultCamera = deviceList.find(
            (device) => device.kind === 'videoinput',
          );
          setSelectedCamera(defaultCamera?.deviceId);
        }
        if (!selectedMic) {
          const defaultMic = deviceList.find(
            (device) => device.kind === 'audioinput',
          );
          setSelectedMic(defaultMic?.deviceId);
        }
      }
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };

  const initializeSession = async (token: string) => {
    if (socketErrorRef.current) return;

    try {
      await cleanupSession();

      const OV = new OpenVidu();
      const newSession = OV.initSession();
      sessionRef.current = newSession;

      if (isComponentMounted.current) {
        setSession(newSession);
      }

      // Configure session events
      newSession.on('streamCreated', handleStreamCreated);
      newSession.on('streamDestroyed', handleStreamDestroyed);
      newSession.on('sessionDisconnected', handleSessionDisconnected);
      newSession.on('networkQualityLevelChanged', handleNetworkQualityChange);

      await newSession.connect(token, { clientData: userName });

      if (!isComponentMounted.current) return;

      // Initialize publisher with optimized settings
      const publisher = await createPublisher();
      if (publisher && isComponentMounted.current) {
        publisherRef.current = publisher;
        setPublisher(publisher);
        await newSession.publish(publisher);
      }
    } catch (error) {
      console.error('Error initializing session:', error);
      handleReconnection();
    }
  };

  const createPublisher = async () => {
    const OV = new OpenVidu();
    return await OV.initPublisherAsync(undefined, {
      audioSource: selectedMic,
      videoSource: selectedCamera,
      publishAudio: isAudioActive,
      publishVideo: isVideoActive,
      resolution: '1280x720', // Lower resolution for better performance
      frameRate: 24, // Reduced frame rate
      insertMode: 'APPEND',
      mirror: false,
      videoSimulcast: true, // Enable simulcast for better adaptation
    });
  };

  const handleStreamCreated = (event) => {
    if (
      !sessionRef.current ||
      event.stream.connection.connectionId ===
        sessionRef.current.connection.connectionId
    ) {
      return;
    }

    const subscriber = sessionRef.current.subscribe(event.stream, undefined);
    subscriber.subscribeToAudio(true);
    subscriber.subscribeToVideo(true);

    if (isComponentMounted.current) {
      setSubscribers((prev) => [...prev, subscriber]);
    }
  };
  const handleStreamDestroyed = (event) => {
    if (isComponentMounted.current) {
      setSubscribers((prev) =>
        prev.filter((sub) => sub.stream.streamId !== event.stream.streamId),
      );
    }
  };
  const handleNetworkQualityChange = (event) => {
    const { newValue } = event;
    if (newValue < 3) {
      // Poor network quality
      // Automatically reduce video quality
      if (publisherRef.current) {
        publisherRef.current.publishVideo(false);
        setTimeout(() => {
          if (publisherRef.current && isComponentMounted.current) {
            publisherRef.current.publishVideo(isVideoActive);
          }
        }, 3000);
      }
    }
  };
  const handleReconnection = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    reconnectTimeoutRef.current = setTimeout(() => {
      if (isComponentMounted.current && tokenRef.current) {
        initializeSession(tokenRef.current);
      }
    }, 2000);
  };

  const handleSessionDisconnected = () => {
    handleReconnection();
  };

  useEffect(() => {
    if (!socket) return;

    const handleRoomJoined = (response) => {
      if (!tokenRef.current) {
        tokenRef.current = response.data.token;
        initializeSession(response.data.token);
      }
    };

    const handleSocketError = (error) => {
      console.error('Socket error:', error);
      socketErrorRef.current = true;
      toast.error(error.message, { icon: <GoAlert /> });
      navigate('/');
    };

    const handleUserLeft = () => {
      cleanupSession();
    };

    socket.on('room_joined', handleRoomJoined);
    socket.on('error', handleSocketError);
    socket.on('user_left', handleUserLeft);

    return () => {
      socket.off('room_joined', handleRoomJoined);
      socket.off('error', handleSocketError);
      socket.off('user_left', handleUserLeft);
    };
  }, [socket, navigate]);

  useEffect(() => {
    initializeDevices();
    //디바이스 변경 이벤트를 위한 리스너
    navigator.mediaDevices.ondevicechange = initializeDevices;
    return () => {
      navigator.mediaDevices.ondevicechange = null;
    };
  }, []);

  //디바이스 변경시 업데이트
  useEffect(() => {
    if (session && publisher) {
      const updatePublisher = async () => {
        try {
          const newPublisher = await createPublisher();
          if (session && publisher && isComponentMounted.current) {
            await session.unpublish(publisher);
            await session.publish(newPublisher);
            publisherRef.current = newPublisher;
            setPublisher(newPublisher);
          }
        } catch (error) {
          console.error('Error updating publisher:', error);
        }
      };

      updatePublisher();
    }
  }, [selectedCamera, selectedMic]);

  useEffect(() => {
    return () => {
      if (sessionRef.current) {
        sessionRef.current.disconnect();
        console.log('✅ 세션 정상 종료');
        sessionRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (newToken) {
      console.log('토큰 인가 완료', newToken);
      setToken(newToken);
    }
  }, []);

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
