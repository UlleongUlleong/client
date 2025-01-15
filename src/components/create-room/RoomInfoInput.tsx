import React from 'react';
import styled from 'styled-components';

const RoomInfoInput = () => {
  const maxPeopleOptions = Array.from({ length: 9 }, (_, i) => i + 2);

  return (
    <RoomInfoInputStyle>
      <form className="setting" onSubmit={(e) => e.preventDefault()}>
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
            />
          </div>
          <div className="field">
            <div className="description">
              <label htmlFor="max-people">최대 인원 선택</label>
              <span>(최대 10명)</span>
            </div>
            <select>
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
            />
          </div>
        </div>
        <div className="button-group">
          <button type="submit">방 만들기</button>
        </div>
      </form>
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

  .button-group {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;

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

export default RoomInfoInput;
