import React, { useState } from 'react';
import { styled } from 'styled-components';
import { FaPen } from 'react-icons/fa6';

interface ModalProps {
  closeModal: () => void;
}

function CategoryModal({ closeModal }: ModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('홍길동');
  const [selectedMood, setSelectedMood] = useState<Set<string>>(new Set());
  const [selectedAlcohol, setSelectedAlcohol] = useState<Set<string>>(
    new Set(),
  );

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleMoodClick = (value: string) => {
    setSelectedMood((prev) => {
      const newMood = new Set(prev);
      if (newMood.has(value)) {
        newMood.delete(value);
      } else {
        newMood.add(value);
      }
      return newMood;
    });
  };

  const handleAlcoholClick = (value: string) => {
    setSelectedAlcohol((prev) => {
      const newAlcohol = new Set(prev);
      if (newAlcohol.has(value)) {
        newAlcohol.delete(value);
      } else {
        newAlcohol.add(value);
      }
      return newAlcohol;
    });
  };

  const handleSave = () => {
    const moodValues = Array.from(selectedMood);
    const alcoholValues = Array.from(selectedAlcohol);
    const data = {
      name,
      mood: moodValues,
      alcohol: alcoholValues,
    };
    console.log(data);
    closeModal();
  };

  return (
    <CategoryModalStyle onClick={handleBackgroundClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              onBlur={handleBlur}
              autoFocus
            />
          ) : (
            <>
              <span>{name}</span>
            </>
          )}
          <FaPen className="pen-icon" onClick={handleEditClick} />
        </h2>
        <div className="category-set">
          <span className="mood"> 주제 / 분위기</span>
          <span className="select">
            {[
              '혼술',
              '반주',
              '시끌시끌',
              '조용한',
              '고민상담',
              '레시피공유',
            ].map((value) => (
              <span
                key={value}
                className={`value ${selectedMood.has(value) ? 'selected' : ''}`}
                onClick={() => handleMoodClick(value)}
              >
                {value}
              </span>
            ))}
          </span>
          <span className="alcohol"> 주종 </span>
          <span className="select">
            {[
              '소주',
              '맥주',
              '와인',
              '칵테일',
              '전통주',
              '하이볼',
              '위스키',
            ].map((value) => (
              <span
                key={value}
                className={`value ${selectedAlcohol.has(value) ? 'selected' : ''}`}
                onClick={() => handleAlcoholClick(value)}
              >
                {value}
              </span>
            ))}
          </span>
        </div>
        <div className="button-container">
          <button onClick={handleSave} className="save-btn">
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
  }

  h2 {
    text-align: center;
    margin-bottom: 60px;

    .pen-icon {
      font-size: 20px;
      margin-left: 10px;
      cursor: pointer;
    }

    input {
      font-size: 20px;
      padding: 5px;
      border: 1px solid #ddd;
      border-radius: 5px;
      width: 120px;
      margin-left: 10px;
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
    }
  }
`;

export default CategoryModal;
