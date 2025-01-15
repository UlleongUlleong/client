import React from 'react';
import styled from 'styled-components';
import SelectTheme from '../../components/create-room/SelecteTheme';
import SelectKeywords from '../../components/create-room/SelectKeywords';
import RoomInfoInput from '../../components/create-room/RoomInfoInput';

const MakeChat = () => {
  return (
    <MakeChatStyle>
      <div className="content">
        <SelectTheme />
        <SelectKeywords title="create-room" />
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