import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/NotFound.css';
import { TbMoodSadDizzy } from 'react-icons/tb';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <TbMoodSadDizzy size={150} />
        <h2 className="not-found-title">404</h2>
        <p className="not-found-description">
          요청하신 페이지가 존재하지 않거나 삭제되었습니다.
        </p>
        <button className="not-found-button" onClick={() => navigate('/')}>
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default NotFound;
