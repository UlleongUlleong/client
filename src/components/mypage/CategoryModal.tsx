import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { FaPen, FaCheck, FaArrowLeft } from 'react-icons/fa6';
import {
  alcoholCategory,
  Category,
  moodsCategory,
} from '../../api/categoryApi';
import { modifyProfile, validNickname } from '../../api/profileApi';
import { ProfileType } from '../../models/profile';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
  closeModal: () => void;
  onUpdateComplete: () => void;
  profile: ProfileType;
}

function CategoryModal({ closeModal, onUpdateComplete, profile }: ModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(profile.nickname);
  const [tempNickname, setTempNickname] = useState(profile.nickname);
  const [selectedMood, setSelectedMood] = useState<Set<number>>(new Set());
  const [selectedAlcohol, setSelectedAlcohol] = useState<Set<number>>(new Set());
  const [moodOptions, setMoodOptions] = useState<Category[]>([]);
  const [alcoholOptions, setAlcoholOptions] = useState<Category[]>([]);
  const [isValidNickname, setIsValidNickname] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [moodsData, alcoholData] = await Promise.all([
          moodsCategory(),
          alcoholCategory(),
        ]);
        setMoodOptions(moodsData);
        setAlcoholOptions(alcoholData);
      } catch (error) {
        console.log('fetchCategories error : ', error);
      }
    };
    fetchCategories();
  }, []);

  const handleEditClick = () => {
    setTempNickname(nickname);
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempNickname(e.target.value);
  };

  const handleValidateClick = async () => {
    try {
      const message = await validNickname(tempNickname);
      alert(message);

      if (message === '사용가능한 닉네임입니다.') {
        setNickname(tempNickname);
        setIsEditing(false);
        setIsValidNickname(true);
      } else {
        setIsValidNickname(false);
      }
    } catch (error) {
      console.log('유효성 검사 오류:', error);
      alert('유효하지 않은 닉네임입니다. 다시 시도해주세요');
      setIsValidNickname(false);
    }
  };

  const handleBackClick = () => {
    setTempNickname(nickname);
    setIsEditing(false);
    setIsValidNickname(true);
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleMoodClick = (id: number) => {
    setSelectedMood((prev) => {
      const newMood = new Set(prev);
      if (newMood.has(id)) {
        newMood.delete(id);
      } else {
        newMood.add(id);
      }
      return newMood;
    });
  };

  const handleAlcoholClick = (id: number) => {
    setSelectedAlcohol((prev) => {
      const newAlcohol = new Set(prev);
      if (newAlcohol.has(id)) {
        newAlcohol.delete(id);
      } else {
        newAlcohol.add(id);
      }
      return newAlcohol;
    });
  };

  const handleSave = async () => {
    try {
      const moodValues = Array.from(selectedMood);
      const alcoholValues = Array.from(selectedAlcohol);
      const data = {
        nickname,
        moodCategory: moodValues,
        alcoholCategory: alcoholValues,
      };

      await modifyProfile(data);
      onUpdateComplete();
    } catch (error) {
      console.error('회원 정보 수정 실패:', error);
      alert('회원 정보를 저장하는 데 실패했습니다. 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    if (profile.moodCategory) {
      setSelectedMood(
        new Set(profile.moodCategory.map((category) => category.id)),
      );
    }
    if (profile.alcoholCategory) {
      setSelectedAlcohol(
        new Set(profile.alcoholCategory.map((category) => category.id)),
      );
    }
  }, [profile]);

  return (
    <CategoryModalStyle onClick={handleBackgroundClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeModal}>
          <FaTimes />
        </button>
        <h2>
          {isEditing ? (
            <div className="edit-container">
              <input
                type="text"
                value={tempNickname}
                onChange={handleNameChange}
                autoFocus
              />
              <div className="edit-buttons">
                <FaCheck className="check-icon" onClick={handleValidateClick} />
                <FaArrowLeft className="back-icon" onClick={handleBackClick} />
              </div>
            </div>
          ) : (
            <>
              <span>{nickname}</span>
              <FaPen className="pen-icon" onClick={handleEditClick} />
            </>
          )}        </h2>
        <div className="category-set">
          <span className="mood">주제 / 분위기</span>
          <span className="select">
            {moodOptions.map((mood) => (
              <span
                key={mood.id}
                className={`value ${selectedMood.has(mood.id) ? 'selected' : ''}`}
                onClick={() => handleMoodClick(mood.id)}
              >
                {mood.name}
              </span>
            ))}
          </span>
          <span className="alcohol">주종</span>
          <span className="select">
            {alcoholOptions.map((alcohol) => (
              <span
                key={alcohol.id}
                className={`value ${selectedAlcohol.has(alcohol.id) ? 'selected' : ''
                  }`}
                onClick={() => handleAlcoholClick(alcohol.id)}
              >
                {alcohol.name}
              </span>
            ))}
          </span>
        </div>
        <div className="button-container">
          <button
            onClick={handleSave}
            className="save-btn"
            disabled={isEditing || !isValidNickname}
          >
            저장
          </button>
        </div>
      </div>
    </CategoryModalStyle>
  );
}
const CategoryModalStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);

  .modal-content {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    width: 50%;
    padding: 60px;
    position: relative; 
  }

  .close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    background: none;
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease;

    &:hover {
      color: #000;
    }
  }

  h2 {
    text-align: center;
    margin-bottom: 60px;
    display: flex;
    justify-content: center;
    align-items: center;

    .pen-icon {
      font-size: 20px;
      margin-left: 10px;
      cursor: pointer;
    }

    .edit-container {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row; 

      input {
        font-size: 20px;
        padding: 5px;
        border: 1px solid #ddd;
        border-radius: 5px;
        width: 120px;
        margin-right: 8px; 
      }

      .edit-buttons {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-left: 0; 

        .check-icon,
        .back-icon {
          cursor: pointer;
          font-size: 20px;
        }

        .check-icon {
          color: #4caf50;
        }

        .back-icon {
          color: #666;
        }
      }
    }
  }

  .category-set {
    display: grid;
    grid-template-columns: 120px 1fr;
    grid-template-rows: auto auto;
    grid-gap: 20px;
    margin-bottom: 60px;

    .select {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 10px;

      .value {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: clamp(12px, 3vw, 16px);
        padding: 4px 16px;
        background-color: #f7f7f7;
        border-radius: 20px;
        border: 1px solid #ddd;
        margin: 4px;
        cursor: pointer;
        text-align: center;
        white-space: nowrap;

        &.selected {
          border: 1px solid #007bff;
        }
      }
    }
  }

  .button-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    
    .save-btn {
      font-size: 16px;
      padding: 12px 40px;
      background-color: #000000;
      border-radius: 20px;
      color: white;
      border: 1px solid #ddd;

      &:disabled {
        background-color: #ccc;
        color: #888;
        cursor: not-allowed;
      }
    }
  }
`;

export default CategoryModal;
