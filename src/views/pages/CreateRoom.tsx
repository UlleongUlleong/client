import React, { useState } from 'react';
import styled from 'styled-components';
import SelectTheme from '../../components/create-room/SelecteTheme';
import SelectKeywords from '../../components/create-room/SelectKeywords';
import RoomInfoInput from '../../components/create-room/RoomInfoInput';

const MakeChat = () => {
  const [moods, setMoods] = useState<number[]>([]);
  const [alcohols, setAlcohols] = useState<number[]>([]);

  return (
    <MakeChatStyle>
      <div className="content">
        <SelectTheme />
        <SelectKeywords
          title="create-room"
          moods={moods}
          setMoods={setMoods}
          alcohols={alcohols}
          setAlcohols={setAlcohols}
        />
        <RoomInfoInput />
      </div>
    </MakeChatStyle>
  );
};

const MakeChatStyle = styled.div`
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
`;

export default MakeChat;
