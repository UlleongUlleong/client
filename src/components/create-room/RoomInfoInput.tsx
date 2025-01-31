import React from 'react';
import styled from 'styled-components';

interface RoomInfoInputProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  maxParticipants: number;
  setMaxParticipants: React.Dispatch<React.SetStateAction<number>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const RoomInfoInput = ({
  name,
  setName,
  maxParticipants,
  setMaxParticipants,
  description,
  setDescription,
}: RoomInfoInputProps) => {
  const maxPeopleOptions = Array.from({ length: 9 }, (_, i) => i + 2);

  return (
    <RoomInfoInputStyle>
      <div className="setting">
        <div className="input-group">
          <div className="field">
            <div className="description">
              <label htmlFor="room-title">방 제목</label>
              <span>(최대 10자)</span>
            </div>
            <input
              id="room-title"
              type="text"
              placeholder="방 제목을 입력하세요"
              maxLength={10}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="field">
            <div className="description">
              <label htmlFor="max-people">최대 인원 선택</label>
              <span>(최대 10명)</span>
            </div>
            <select
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(Number(e.target.value))}
            >
              {maxPeopleOptions.map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="input-group">
          <div className="field">
            <div className="description">
              <label htmlFor="room-description">설명</label>
              <span>(최대 20자)</span>
            </div>
            <input
              id="room-description"
              type="text"
              placeholder="방에 대한 설명을 입력하세요"
              maxLength={20}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
    </RoomInfoInputStyle>
  );
};

const RoomInfoInputStyle = styled.div`
  position: relative;
  width: 80%;
  margin: 0 auto;
  padding: 10px 0;

  .setting {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-bottom: 20px;
  }

  .input-group {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
  }

  .field {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .field:nth-child(1) {
    flex: 6;
  }

  .field:nth-child(2) {
    flex: 4;
  }

  label {
    font-weight: bold;
    font-size: 1rem;
  }

  .description {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 4px;

    span {
      font-size: 0.8rem;
      color: #b3b3b3;
    }
  }

  input,
  select {
    padding: 8px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
  }

  input:focus,
  select:focus {
    outline: none;
    border-color: #273ec2;
  }
`;

export default RoomInfoInput;
