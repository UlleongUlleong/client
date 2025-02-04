import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SelectTheme from '../../components/create-room/SelecteTheme';
// import SelectKeywords from '../../components/create-room/SelectKeywords';
import RoomInfoInput from '../../components/create-room/RoomInfoInput';
import { useNavigate } from 'react-router-dom';
import { useSocketStore } from '../../components/create-room/socket/useSocketStore';
import SelectKeywords from '../../components/create-room/SelectKeywords';

const CreateRoom = () => {
  const socket = useSocketStore((state) => state.socket);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [maxParticipants, setMaxParticipants] = useState<number>(2);
  const [description, setDescription] = useState<string>('');
  const [themeId, setThemeId] = useState<number>(1);
  const [moods, setMoods] = useState<number[]>([]);
  const [alcohols, setAlcohols] = useState<number[]>([]);

  useEffect(() => {
    if (!socket) return;

    socket.on('room_created', (response) => {
      console.log('✅ 방 생성 응답:', response);
      console.log(socket.id);
      if (response?.message) {
        navigate(`/chat/${response.roomId}`);
        console.log(response);
      } else {
        alert('방 생성 실패');
      }
      setLoading(false);
    });

    return () => {
      socket.off('room_created'); // 이벤트 리스너 정리
    };
  }, [socket]);

  const handleCreateRoom = () => {
    if (!socket) {
      alert('소켓 연결 중');
      return;
    }

    // console.log('🛠️ 현재 등록된 리스너:', socket.listeners('create_room'));

    setLoading(true);

    const roomData = {
      name,
      maxParticipants,
      description,
      themeId,
      moods,
      alcohols,
    };

    socket.emit('create_room', roomData); // 방만들기 요청
    console.log('📤 방 만들기 요청 전송:', roomData);
  };

  return (
    <CreateRoomStyle>
      <div className="content">
        <SelectTheme themeId={themeId} setThemeId={setThemeId} />
        <SelectKeywords
          title="create-room"
          moods={moods}
          setMoods={setMoods}
          alcohols={alcohols}
          setAlcohols={setAlcohols}
        />
        <RoomInfoInput
          name={name}
          setName={setName}
          maxParticipants={maxParticipants}
          setMaxParticipants={setMaxParticipants}
          description={description}
          setDescription={setDescription}
        />
        <div className="button-group">
          <button type="button" onClick={handleCreateRoom}>
            방 만들기
          </button>
        </div>
      </div>
    </CreateRoomStyle>
  );
};

const CreateRoomStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2% 0;
  box-sizing: border-box;
  overflow: auto;

  .content {
    height: 100%;
    max-height: 100%;
  }

  .button-group {
    position: relative;
    left: -10%;
    display: flex;
    justify-content: flex-end;
    padding-bottom: 30px;

    button {
      padding: 10px 20px;
      font-size: 1rem;
      background-color: #273ec2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #1a2a89;
      }

      &:active {
        background-color: #142062;
      }
    }
  }
`;

export default CreateRoom;
