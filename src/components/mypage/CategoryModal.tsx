import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { FaPen } from 'react-icons/fa6';
import { alcoholCategory, Category, moodsCategory, validNickname } from '../../api/categoryApi';

interface ModalProps {
    closeModal: () => void;
}

function CategoryModal({ closeModal }: ModalProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('홍길동');
    const [selectedMood, setSelectedMood] = useState<Set<number>>(new Set());
    const [selectedAlcohol, setSelectedAlcohol] = useState<Set<number>>(new Set());
    const [moodOptions, setMoodOptions] = useState<Category[]>([]);
    const [alcoholOptions, setAlcoholOptions] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const [moodsData, alcoholData] = await Promise.all([
                    moodsCategory(),
                    alcoholCategory(),
                ])
                setMoodOptions(moodsData);
                setAlcoholOptions(alcoholData);
            }
            catch (error) {
                console.log("fetchCategories error : ", error);
            }
        }
        fetchCategories();
    }, [])

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleBlur = async () => {
        try {
            const message = await validNickname(name);

            // 유효성 검사 메시지 출력
            alert(message);

            // 메시지가 성공적인 경우에만 이름 변경
            if (message === '사용가능한 닉네임입니다.') {
                setIsEditing(false); // 닉네임 유효성 검사 성공 시 닉네임 변경
            }
        } catch (error) {
            console.log("유효성 검사 오류:", error);
            alert("유효성 검사에 실패했습니다.");
        }
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
                    <span className="alcohol"> 주종 </span>
                    <span className="select">
                        {alcoholOptions.map((alcohol) => (
                            <span
                                key={alcohol.id}
                                className={`value ${selectedAlcohol.has(alcohol.id) ? 'selected' : ''}`}
                                onClick={() => handleAlcoholClick(alcohol.id)}
                            >
                                {alcohol.name}
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
