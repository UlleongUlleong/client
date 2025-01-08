import { styled } from 'styled-components';
import React from 'react';

interface ICardProps {
    imageSrc: string;
    title: string;
    description: number;
    review: string;
}

function ProfileCard({ imageSrc, title, description, review }: ICardProps) {
    const fullStars = Math.floor(description);
    const emptyStars = 5 - fullStars;

    return (
        <ProfileCardStyle>
            <div className="cardImage">
                <img src={imageSrc} alt={title} />
            </div>
            <div className="cardContent">
                <div className="cardTitle">{title}</div>
                <div className="cardStars">
                    <div className="stars">
                        {Array(fullStars)
                            .fill(null)
                            .map((_, index) => (
                                <div key={`full-${index}`} className="star full">★</div>
                            ))}
                        {Array(emptyStars)
                            .fill(null)
                            .map((_, index) => (
                                <div key={`empty-${index}`} className="star empty">☆</div>
                            ))}
                    </div>
                    <div className="rating">{description.toFixed(1)}</div>
                </div>
                <div className="review">{review}</div>
            </div>
        </ProfileCardStyle>
    );
}

const ProfileCardStyle = styled.div`
  width: 600px;
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;

  .cardImage {
    width: 200px;
    height: 200px;
    margin : 16px;
    justify-content: center;
    background-size: cover;
    background-position: center;
    flex-shrink: 0;
    img {
        width: 100%;
        height: 100%;
        border-radius: 12px;
    }
  }

  .cardContent {
    padding: 15px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .cardTitle {
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    color: #333;
  }

  .cardStars {
    display: flex;
    align-items: flex-end;
    margin-top: 10px;

    .stars {
      display: flex;
    }

    .star {
      font-size: 20px;
      color: #000;
    }

    .full {
      color: #000; 
    }

    .empty {
      color: #ddd; 
    }
  }

  .rating {
    font-size: 16px;
    font-weight : bold;
    margin-left: 8px;
    color: #333;
  }
  .review {
    margin-top: 10px;
    font-size: 14px;
    color: #666;
    flex-grow: 1;  /* 리뷰가 길어지면 아래로 밀리도록 설정 */
    overflow-wrap: break-word;  /* 긴 단어가 잘리지 않도록 처리 */
  }
`;

export default ProfileCard;
