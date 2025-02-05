import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { FaCog, FaPlus, FaRegUserCircle } from 'react-icons/fa';
import Slider from 'react-slick';
import { Link, useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from '../../components/mypage/Card';
import CategoryModal from '../../components/mypage/CategoryModal';
import {
  LikeAlcoholType,
  ProfileType,
  ReviewAlcoholType,
} from '../../models/profile';
import {
  AddProfileImage,
  getInterestAlcohol,
  getProfile,
  getReviewAlcohol,
  RemoveProfileImage,
} from '../../api/profileApi';
import ImageModal from '../../components/mypage/ImageModal';
import WithDrawModal from '../../components/mypage/WithdrawModal';
import { logoutApi } from '../../api/users/loginApi';

function Mypage() {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [likeAlcohol, setLikeAlcohol] = useState<LikeAlcoholType[]>([]);
  const [reviewAlcohol, setReviewAlcohol] = useState<ReviewAlcoholType[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleWithdrawModal = () => setIsWithdrawModalOpen((prev) => !prev);
  const navigate = useNavigate();
  const isAlertShown = useRef(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('profile_image', file);

      try {
        const response = await AddProfileImage(formData);
        console.log('성공', response);
        alert('프로필 사진이 변경되었습니다!');
      } catch (error) {
        console.log('실패', error);
      }
    }
  };
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileInputClick = () => {
    setIsImageModalOpen(true);
  };

  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    setIsImageModalOpen(false);
  };

  const handleRemoveImage = async () => {
    try {
      await RemoveProfileImage();
      setProfileImage(null);
      alert('프로필 사진이 삭제되었습니다!');
    } catch (error) {
      console.error('프로필 사진 삭제 실패:', error);
    }
    setIsImageModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsImageModalOpen(false);
  }

  const handleWithdrawConfirm = async () => {
    alert("회원 탈퇴가 완료되었습니다. 계정은 일주일 동안 유지되고, 로그인 시에 다시 활성화됩니다. 탈퇴 후 일주일이 지나면 계정은 복구할 수 없습니다.");

    try {
      await logoutApi();
      navigate("/");
    } catch (error) {
      console.log("로그아웃 실패:", error);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
        setProfileImage(data.imageUrl);
      } catch (error) {
        console.log('fetchProfile : ', error);
        if (!isAlertShown.current) {
          alert("로그인이 필요합니다!");
          isAlertShown.current = true;
          navigate("/");
        }
      }
    };
    const fetchInterestAlcohol = async () => {
      try {
        const data = await getInterestAlcohol();
        setLikeAlcohol(data.data);
      } catch (error) {
        console.log('fetchInterestAlcohol:', error);
      }
    };
    const fetchReviewAlcohol = async () => {
      try {
        const data = await getReviewAlcohol();
        setReviewAlcohol(data.data);
      } catch (error) {
        console.log('fetchReviewAlcohol:', error);
      }
    };
    fetchProfile();
    fetchInterestAlcohol();
    fetchReviewAlcohol();
  }, []);

  const sliderSettings = (itemsLength: number) => ({
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(5, itemsLength),
    slidesToScroll: 1,
    arrows: true,
    centerMode: itemsLength < 5,
    centerPadding: itemsLength < 5 ? '0px' : '50px',
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: Math.min(3, itemsLength),
          centerMode: itemsLength < 3,
        },
      },
      {
        breakpoint: 880,
        settings: {
          slidesToShow: Math.min(2, itemsLength),
          centerMode: itemsLength < 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });


  return (
    <>
      <MypageStyle>
        <div className="mypage">
          <div className="profile-container">
            <div className="profile-image-wrapper">
              <div className="profile-image">
                {profileImage ? (
                  <img src={`https://ulleong-bucket.s3.ap-northeast-2.amazonaws.com/${profile.imageUrl}`} alt={profile.imageUrl} />
                ) : (
                  <FaRegUserCircle size={200} />
                )}
              </div>

              <div className="plus-icon" onClick={handleFileInputClick}>
                <FaPlus size={16} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                />
              </div>
            </div>
            <div className="profile-details">
              <h2 className="name">{profile?.nickname || '이름 없음'}</h2>
              <div className="keywords">
                <div className="keyword">
                  <span className="topLabel">나의 키워드</span>
                  <span className="label">주제 / 분위기: </span>
                  <span className="category-container">
                    {profile?.moodCategory.map((mood) => (
                      <span key={mood.id} className="value">
                        {mood.name}
                      </span>
                    ))}
                  </span>
                  <span className="label">주종: </span>
                  <span className="category-container">
                    {profile?.alcoholCategory.map((alcohol) => (
                      <span key={alcohol.id} className="value">
                        {alcohol.name}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            </div>
            <div className="settings-icon" onClick={toggleDropdown}>
              <FaCog />
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li
                    onClick={() => {
                      toggleModal();
                      setIsDropdownOpen(false);
                    }}
                  >
                    회원정보 수정
                  </li>
                  <li onClick={() => {
                    toggleWithdrawModal();
                    setIsDropdownOpen(false);
                  }}>회원 탈퇴</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="liked">
          <div className="title">
            <h1>좋아하는 술</h1>
            <Link className="link" to="/profile/like" state={{ likeAlcohol }}>
              전체 보기
            </Link>
          </div>
          <div className="container">
            <Slider {...sliderSettings(likeAlcohol.length)}>
              {likeAlcohol.map((card) => (
                <Card
                  key={card.id}
                  id={card.id}
                  imageUrl={card.imageUrl}
                  name={card.name}
                  scoreAverage={card.scoreAverage}
                />
              ))}
            </Slider>
          </div>
        </div>
        <div className="review">
          <div className="title">
            <h1>리뷰한 술</h1>
            <Link
              className="link"
              to="/profile/review"
              state={{ reviewAlcohol }}
            >
              전체 보기
            </Link>
          </div>
          <div className="container">
            <Slider {...sliderSettings(reviewAlcohol.length)}>
              {reviewAlcohol.map((card) => (
                <Card
                  key={card.id}
                  id={card.alcoholId}
                  imageUrl={card.alcohol.imageUrl}
                  name={card.alcohol.name}
                  scoreAverage={card.score}
                />
              ))}
            </Slider>
          </div>
        </div>
        {isModalOpen && profile && (
          <CategoryModal
            closeModal={toggleModal}
            onUpdateComplete={() => window.location.reload()}
            profile={profile}
          />
        )}
        {isImageModalOpen && (
          <ImageModal
            isImageModalOpen={isImageModalOpen}
            handleCloseModal={handleCloseModal}
            handleImageUploadClick={handleImageUploadClick}
            handleRemoveImage={handleRemoveImage}
          />
        )}
        {isWithdrawModalOpen && (
          <WithDrawModal
            isOpen={isWithdrawModalOpen}
            onClose={toggleWithdrawModal}
            onConfirm={handleWithdrawConfirm}
          />
        )}
      </MypageStyle>
      ;
    </>
  );
}

const MypageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 94%;
  overflow-y: auto;

  .mypage {
    display: flex;
    padding: 100px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    width: 80%;
    position: relative;
    margin-top: 100px;

    @media (max-width: 768px) {
      flex-direction: column;
      padding: 20px;
      width: 80%;
    }
  }

  .profile-container {
    display: flex;
    align-items: center;
    position: relative;
    flex-wrap: wrap;
    width: 100%;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .profile-image-wrapper {
    position: relative;
    width: 200px;
    height: 200px;

    @media (max-width: 768px) {
      width: 150px;
      height: 150px;
    }
  }

  .profile-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #706c6c;
    border: 5px solid #706c6c;
    overflow: hidden;
  }
  .profile-image img {
    border: 2px solid black;
    object-fit: cover;
  }

  .plus-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: #ffffff;
    border: 2px solid #ccc;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    cursor: pointer;
  }

  .profile-details {
    margin-left: 20px;
    @media (max-width: 768px) {
      margin-left: 0;
      text-align: center;
    }
  }

  .name {
    font-size: 32px;
    margin-bottom: 40px;
  }

  .keyword {
    display: grid;
    grid-template-columns: 120px 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 20px;
    font-size: 16px;
    text-align: left;
  }

  .topLabel {
    grid-column: span 2;
    font-weight: bold;
  }

  .label {
    font-weight: bold;
  }
  .category-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  .value {
    font-size: 16px;
    padding: 4px 20px;
    background-color: #f7f7f7;
    border-radius: 20px;
    border: 1px solid #ddd;
    text-align: center;
  }

  .settings-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 32px;
    color: #000000;
    cursor: pointer;
  }

  .liked,
  .review {
    width: 80%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
  }

  .liked .title,
  .review .title {
    font-weight: bold;
    margin-top: 40px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .h1 {
      font-size: 24px;
      @media (max-width: 424px) {
        font-size: 16px;
      }
    }
    .link {
      font-size: 16px;
      margin-right: 40px;
      text-decoration: underline;
      color: black;
      cursor: pointer;
    }
    .link:hover {
      color: gray;
    }
  }

  .liked .container,
  .review .container {
    width: 100%;
    padding: 20px;
    margin: 20px auto;
  }

  .slick-prev,
  .slick-next {
    display: block !important;
    z-index: 1;
    color: black;
  }

  .slick-prev::before,
  .slick-next::before {
    font-size: 20px;
    color: black;
  }

  .slick-track {
    margin-left: 0;
    display: flex;
    justify-content: center;
  }

  .slick-slide {
    display: flex !important;
    justify-content: center;
    align-items: center;
  }

  .dropdown-menu {
    position: absolute;
    top: 50px;
    right: 10px;
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 150px;
    border-radius: 8px;
    z-index: 10;

    ul {
      list-style: none;
      margin: 0;
      padding: 10px;
    }

    li {
      padding: 10px;
      cursor: pointer;
      border-bottom: 1px solid #ccc;
      &:hover {
        background-color: #f0f0f0;
      }
    }

    li:last-child {
      border-bottom: none;
    }
  }
  
  .image-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  .modal-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export default Mypage;
