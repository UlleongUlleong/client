import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { FaCog, FaPlus, FaRegUserCircle } from 'react-icons/fa';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from '../../components/mypage/Card';
import CategoryModal from '../../components/mypage/CategoryModal';
import { ProfileType } from '../../models/profile';
import { getProfile } from '../../api/profileApi';

function Mypage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.log('fetchProfile : ', error);
      }
    };
    fetchProfile();
    console.log(profile);
  }, []);

  const likedCards = [
    {
      id: 1,
      imageSrc: 'https://picsum.photos/200',
      title: '마루나 동백 양주',
      description: 4.5,
    },
    {
      id: 2,
      imageSrc: 'https://picsum.photos/200',
      title: '서울 100리 18',
      description: 3.6,
    },
    {
      id: 3,
      imageSrc: 'https://picsum.photos/200',
      title: '극락',
      description: 4.0,
    },
    {
      id: 4,
      imageSrc: 'https://picsum.photos/200',
      title: '디아블로 카베르네 소비뇽',
      description: 2.8,
    },
    {
      id: 5,
      imageSrc: 'https://picsum.photos/200',
      title: '발디비에스 까베르네 소비뇽',
      description: 3.9,
    },
  ];

  const reviewedCards = [
    {
      id: 1,
      imageSrc: 'https://picsum.photos/200',
      title: '마루나 동백 양주',
      description: 4.5,
    },
    {
      id: 2,
      imageSrc: 'https://picsum.photos/200',
      title: '서울 100리 18',
      description: 3.6,
    },
    {
      id: 3,
      imageSrc: 'https://picsum.photos/200',
      title: '극락',
      description: 4.0,
    },
    {
      id: 4,
      imageSrc: 'https://picsum.photos/200',
      title: '디아블로 카베르네 소비뇽',
      description: 2.8,
    },
    {
      id: 5,
      imageSrc: 'https://picsum.photos/200',
      title: '발디비에스 까베르네 소비뇽',
      description: 3.9,
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 880,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <MypageStyle>
        <div className="mypage">
          <div className="profile-container">
            <div className="profile-image-wrapper">
              <div className="profile-image">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" />
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
                  <li>회원 탈퇴</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="liked">
          <div className="title">
            <h1>좋아하는 술</h1>
            <Link className="link" to="/profile/like">
              전체 보기
            </Link>
          </div>
          <div className="container">
            <Slider {...sliderSettings}>
              {likedCards.map((card) => (
                <Card
                  key={card.id}
                  id={card.id}
                  imageSrc={card.imageSrc}
                  title={card.title}
                  description={card.description}
                />
              ))}
            </Slider>
          </div>
        </div>
        <div className="review">
          <div className="title">
            <h1>리뷰한 술</h1>
            <Link className="link" to="/profile/review">
              전체 보기
            </Link>
          </div>
          <div className="container">
            <Slider {...sliderSettings}>
              {reviewedCards.map((card) => (
                <Card
                  key={card.id}
                  id={card.id}
                  imageSrc={card.imageSrc}
                  title={card.title}
                  description={card.description}
                />
              ))}
            </Slider>
          </div>
        </div>
        {isModalOpen && <CategoryModal closeModal={toggleModal} />}
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
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 2px solid black;
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
    display: flex;
    justify-content: center;
  }

  .slick-slide {
    display: flex;
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
`;

export default Mypage;
