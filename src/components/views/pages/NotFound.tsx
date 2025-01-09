import '../../../style/NotFound.css';
import React from 'react';
function NotFound() {
  return (
    <div className="page">
      <div className="error-page-wrapper">
        <div className="error-content">
          <div className="content">
            <h2 className="header" data-text="404">
              404
            </h2>
            <h4 className="sub-header" data-text="Opps! Page not found">
              페이지가 존재하지 않습니다.
            </h4>

            <div className="button-container">
              <a href="/" className="button">
                홈으로 돌아가기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
