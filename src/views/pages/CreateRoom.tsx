import React, { useState } from 'react';
import styled from 'styled-components';
import SelectTheme from '../../components/create-room/SelecteTheme';
import SelectKeywords from '../../components/create-room/SelectKeywords';
import RoomInfoInput from '../../components/create-room/RoomInfoInput';
import { useNavigate } from 'react-router-dom';

const CreateRoom = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [maxParticipants, setMaxParticipants] = useState<number>(2);
  const [description, setDescription] = useState<string>('');
  const [themeId, setThemeId] = useState<number>(1);
  const [moods, setMoods] = useState<number[]>([]);
  const [alcohols, setAlcohols] = useState<number[]>([]);

  const handleCreateRoom = () => {
    const roomData = {
      name,
      maxParticipants,
      description,
      themeId,
      moods,
      alcohols,
    };

    // console.log('📤 방 만들기 요청 전송:', roomData);
    // socket.on('connect', () => {
    //   console.log('연결 성공');
    // });

    // socket.emit('create_room', roomData);

    // socket.on('room_create', (res) => {
    //   console.log(res);
    // });
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
