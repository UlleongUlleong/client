import React from 'react';
import { styled } from 'styled-components';
import ProfileCard from '../../components/ProfileCard';

function ProfileReview() {

    const reviewedCards = [
        { imageSrc: "https://picsum.photos/200", title: "마루나 동백 양주", description: 4.0, review: "리뷰랍니다.리뷰랍니다.리뷰랍니다.리뷰랍니다.리뷰랍니다.리뷰랍니다.리뷰랍니다.리뷰랍니다.리뷰랍니다.리뷰랍니다.리뷰랍니다.리뷰랍니다." },
        { imageSrc: "https://picsum.photos/200", title: "서울 100리 18", description: 3.2, review: "리뷰랍니다." },
        { imageSrc: "https://picsum.photos/200", title: "극락", description: 5.0, review: "리뷰랍니다." },
        { imageSrc: "https://picsum.photos/200", title: "디아블로 카베르네 소비뇽", description: 2.5, review: "리뷰랍니다." },
        { imageSrc: "https://picsum.photos/200", title: "발디비에스 까베르네 소비뇽", description: 4.7, review: "리뷰랍니다." },
        { imageSrc: "https://picsum.photos/200", title: "발디비에스 까베르네 소비뇽", description: 4.7, review: "리뷰랍니다." },
        { imageSrc: "https://picsum.photos/200", title: "발디비에스 까베르네 소비뇽", description: 4.7, review: "리뷰랍니다." },
    ];
    return (
        <ProfileReviewStyle>
            <div className="content">
                <h1>내가 리뷰한 술</h1>
                <div className="container">
                    {reviewedCards.map((card, index) => (
                        <ProfileCard
                            key={`reviewed-${index}`}
                            imageSrc={card.imageSrc}
                            title={card.title}
                            description={card.description}
                            review={card.review}
                        />
                    ))}
                </div>
            </div>
        </ProfileReviewStyle>
    )
}

const ProfileReviewStyle = styled.div`
    width: 94%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: auto;

    h1 {
        margin-top:20px;
        margin-bottom: 20px;
    }
    .container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
        grid-gap: 20px;
    }

    .content {
        height: 100%;
        max-height: 100%;
    }
`;

export default ProfileReview;