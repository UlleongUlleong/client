import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SelectTheme from '../../components/create-room/SelecteTheme';
import SelectKeywords from '../../components/create-room/SelectKeywords';
import RoomInfoInput from '../../components/create-room/RoomInfoInput';
import { useNavigate } from 'react-router-dom';
import { useSocketStore } from '../../components/create-room/socket/useSocketStore';

const CreateRoom = () => {
  const { socket, connectSocket } = useSocketStore();
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [maxParticipants, setMaxParticipants] = useState<number>(2);
  const [description, setDescription] = useState<string>('');
  const [themeId, setThemeId] = useState<number>(1);
  const [moods, setMoods] = useState<number[]>([]);
  const [alcohols, setAlcohols] = useState<number[]>([]);

  useEffect(() => {
    if (!socket) {
      connectSocket();
      return;
    }

    const handleRoomCreated = (response: any) => {
      console.log('✅ 방 생성 응답:', response);
      if (response?.data?.roomId) {
        navigate(`/chat/${response.data.roomId}`, {
          state: { token: response.data.token },
        });
        sessionStorage.setItem('userId', response.data.userId);
      } else {
        alert('방 생성 실패');
      }
    };

    socket.on('room_created', handleRoomCreated);

    return () => {
      socket.off('room_created', handleRoomCreated);
    };
  }, [socket, navigate, connectSocket]);

  const handleCreateRoom = () => {
    if (!socket) {
      alert('소켓 연결 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    const roomData = {
      name,
      maxParticipants,
      description,
      themeId,
      alcohols,
      moods,
    };

    socket.emit('create_room', roomData);
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
  overflow-y: auto;

  .content {
    height: 100%;
    max-height: 100%;
    width: 50%;
    min-width: 600px;
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
