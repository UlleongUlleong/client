import { styled } from 'styled-components';
import React from 'react';

interface ReviewCardProps {
    imageUrl: string;
    score: number;
    comment: string;
    title?: string;
}

function ReviewCard({ imageUrl, score, comment, title }: ReviewCardProps) {
    return (
        <ReviewCardStyle>
            <div className="image-container">
                <img src={imageUrl} alt={title}></img>
                <div className="rating">{score}점</div>
            </div>
            <div className="review">{comment}</div>
        </ReviewCardStyle>
    )
}

const ReviewCardStyle = styled.div`
    display: flex;
    border: none;
    border-radius: 8px;
    width : 480px;
    height : 100px;
    background-color: white;
    flex-shrink: 0;
    .image-container {
        display: flex;
        flex-direction: column;
        flex-basis: 100px;
        justify-content: center;
        align-items : center;
        gap : 4px;
        img {
            width : 60px;
            border-radius: 50%;
        }
        .rating {
            font-size : 12px;
        }
    }
    .review {
        display: flex;
        padding-top : 16px;
        font-size : 16px;
        font-weight: bold;
    }
`;

export default ReviewCard;