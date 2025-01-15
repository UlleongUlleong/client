import { styled } from 'styled-components';
import React, { useState } from 'react';
import { FaRegBookmark, FaRegStar } from "react-icons/fa";

interface DetailCardProps {
    id: number;
    imageSrc: string;
    title: string;
    rating: number;
    reviewCount: number;
    interestCount: number;
    toggleModal: () => void;
}

function DetailCard({ imageSrc, title, rating, reviewCount, interestCount, toggleModal }: DetailCardProps) {
    const [isStarClicked, setisStarClicked] = useState(false);
    const [isBookmarkClicked, setisBookmarkClicked] = useState(false);

    const handleStarClick = () => {
        setisStarClicked(!isStarClicked)
    }
    const handleBookmarkClick = () => {
        setisBookmarkClicked(!isBookmarkClicked)
    }

    return (
        <DetailCardStyle>
            <div className="cardImage">
                <img src={imageSrc} alt={title} />
            </div>
            <div className="cardTitle">{title}</div>
            <div className={`rating ${isStarClicked ? "active" : ""}`}
                onClick={toggleModal}>
                <FaRegStar />
                {rating}점({reviewCount}명)
            </div>
            <div className={`bookmark ${isBookmarkClicked ? "active" : ""}`}
                onClick={handleBookmarkClick}>
                <FaRegBookmark />
                {interestCount}
            </div>
        </DetailCardStyle>
    )
}

const DetailCardStyle = styled.div`
    width : 600px;
    height: 600px;
    border : none;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap :16px;

    .cardImage {
        width : 300px;
        height: 300px;
        margin-top : 40px;
        margin-bottom: 40px;
        img {
            border-radius: 12px;
            width : 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .cardTitle {
        font-size : 32px;
        font-weight : bold;
    }
    .rating,
    .bookmark {
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid black;
        border-radius: 4px;
        padding: 8px;
        gap: 4px;
        cursor: pointer;
        transition: color 0.3s ease, background-color 0.3s ease;

        svg {
            font-size: 32px;
            width: 32px;
            height: 32px;
        }
    }

    .rating.active svg,
    .bookmark.active svg {
        color: #ff9500; /* Star 색깔: 금색 */
    }
`;

export default DetailCard;