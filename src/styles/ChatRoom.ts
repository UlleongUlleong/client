import styled from 'styled-components';

export const ChatRoomContainer = styled.div`
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  display: flex;
  margin: 0 auto;
`;
export const ChatImage = styled.div`
  height: 200px;
  width: 300px;
  margin: 0 auto;

  @media (max-width: 468px) {
    height: 150px;
    width: 225px;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
`;

export const ChatRoomParty = styled.div<{ isFull: boolean }>`
  position: relative;
  display: flex;
  padding: 5px 10px;
  right: ${(props) => (props.isFull ? '95px' : '110px')};
  top: 45px;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  gap: 3px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  .number {
    font-family: 'Noto Sans KR', serif;
    color: white;
    font-weight: 600;
    font-size: 16px;
    position: relative;
  }

  @media (max-width: 468px) {
    right: 80px;
    top: 40px;
  }
`;

export const ChatTitleBox = styled.div`
  width: 290px;
  margin: 5px auto;
  height: 20px;
  text-align: left;

  @media (max-width: 468px) {
    width: 210px;
  }
`;

export const Title = styled.span`
  font-family: 'Noto Sans KR', serif;
  font-weight: 600;
  font-size: 14px;
  color: #000000;
  @media (max-width: 468px) {
    font-size: 13px;
  }
`;

export const ChatDescription = styled.div`
  width: 290px;
  margin: 0 auto;
  @media (max-width: 468px) {
    width: 210px;
  }
`;

export const Text = styled.span`
  font-family: 'Noto Sans KR', serif;
  font-size: 12px;
  color: #000000;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: 468px) {
    font-size: 11px;
  }
`;
