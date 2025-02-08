
<img src="https://github.com/user-attachments/assets/a5baf122-2d73-4dbb-aeb2-e7f25f5d7279" width="100" height="100"/>

# **술렁술렁 (SlleongSlleong)**
*실시간으로 술에 관한 대화를 하며, 같이 술을 즐기는 서비스*
<br><br><img src="https://github.com/user-attachments/assets/04c6cd10-2680-464a-840d-4d05487e77b9" width="500" height="500"/>

## 🚀 프로젝트 소개

술은 마시고 싶은데 친구들은 시간이 안맞고<br> 사람들이랑 부대끼며 마시고 싶진 않은데 혼자는 심심하고,<br> 편한 집에서 마시고 싶은데 사람들이랑 대화하고 싶고, <br>새로운 술 친구를 찾으신다면 술렁술렁을 이용해보시는 건 어떤가요?
<br><br>
🍷<strong>테마별 공간</strong>: 이자카야, 바, 펍 등 원하는 테마를 골라 다양한 분위기를 연출할 수 있어요. <br>
🏠<strong>취향별 공간</strong>: 맥주 마실 사람하고만 대화하고 싶다면 카테고리를 사용해보세요! 혼술, 왁자지껄 등 다양한 분위기와 맥주, 와인 등 특정 술 카테고리로 그날그날 원하는 분위기로 대화해요.  <br>
💬<strong>실시간 & 화상 채팅</strong>: 실시간으로 채팅하거나 얼굴을 보며 함께께 술을 마시면 술 맛도 2배! 술을 자유롭게 마시면서 대화할 수 있어요.<br>
👍🏼<strong>술 리뷰 공유</strong>: 술에 관한 얘기를 나누고 싶은 데 마땅하게 대화나눌 사람이 없다면 리뷰 서비스를 이용해보세요! 마셨던 술을 평가하고, 취향이 비슷한 사람들과 이야기를 나눠봐요. 사람들의 리뷰를 참고하여 나의 최애 술을 찾아봐요.

## 🛠️ 기술 스택

- **프레임워크**: React + Vite
- **언어**: TypeScript
- **상태 관리**: Zustand, React Query
- **네트워크 요청**: Axios
- **라우팅**: React Router
- **스타일링**: Styled Components, MUI
- **코드 품질**: ESLint, Prettier
- **테스트**: MSW (Mock Service Worker)
- **배포**: Cloudflare

## ⚙️ 주요 기능
### 채팅방
- socket io를 이용한 실시간 채팅
- webRTC를 이용한 화상 채팅 (openVidu)
- 채팅방 카테고리 설정을 통해 원하는 분위기와 주류 채팅방 검색, 참여
- 최신순, 참여자 순으로 정렬
### 회원
- 회원가입
- 소셜 로그인 
- 사용자 맞춤 카테고리 설정 
- 사용자 프로필 사진 업로드 
### 리뷰
- 여러 종류의 술에 대한 평점, 리뷰를 보고 남기기
- 술 종류별로 검색
- 북마크하거나 리뷰한 술만 모아보기

## ⚙️ 시스템 아키텍처 
![image](https://github.com/user-attachments/assets/7eb8d920-a38d-4d24-9fcb-1d405a68f363)


## 📂 프로젝트 구조

```
/ulleongulleong
├── src
│   ├── components  # 재사용 가능한 UI 컴포넌트
│   ├── api         # 네트워크 요청
│   ├── views       # 페이지 라우트
│   ├── hooks       # 커스텀 훅
│   ├── store       # Zustand 상태 관리 스토어
│   ├── models      # 데이터 타입, 인터페이스 정의
│   ├── mocks       # msw 핸들러
│   ├── contexts    # Context API 제공자
│   ├── utils       # 유틸리티 함수
│   ├── assets      # 정적 자산
│   ├── styles      # 전역 스타일
│   ├── main.tsx    # 앱 엔트리 포인트
│   └── App.tsx     # 메인 앱 컴포넌트
│
├── public          # 정적 퍼블릭 자산
├── .eslintrc       # ESLint 설정
├── .prettierrc     # Prettier 설정
├── vite.config.ts  # Vite 설정
├── tsconfig.json   # TypeScript 설정
└── package.json    # 프로젝트 의존성
```

## 👥 울렁울렁 팀

<table>
  <tr>
    <!-- 김철수 -->
    <td align="center">
      <a href="https://github.com/Yubeenpark">
        <img src="https://github.com/Yubeenpark.png" width="100" style="border-radius:50%"><br>
        <b>박유빈</b><br>
        <sub>Frontend Developer</sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/schxo99">
        <img src="https://github.com/schxo99.png" width="100" style="border-radius:50%"><br>
        <b>신찬휘  </b><br>
        <sub>Backend Developer</sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/bomii1">
        <img src="https://github.com/bomii1.png" width="100" style="border-radius:50%"><br>
        <b>정보미</b><br>
        <sub>Frontend Developer</sub>
      </a>
    </td>
    <!-- 정수빈 -->
    <td align="center">
      <a href="https://github.com/subinggrae">
        <img src="https://github.com/subinggrae.png" width="100" style="border-radius:50%"><br>
        <b>차수빈  </b><br>
        <sub>Frontend Developer</sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/ces1225">
        <img src="https://github.com/ces1225.png" width="100" style="border-radius:50%"><br>
        <b>최은석 </b><br>
        <sub>Frontend Developer</sub>
      </a>
    </td>
  </tr>
</table>


### 🖥️ frontend 소개 및 역할
공동: UI 컴포넌트 개발, API 연동
| 이름 | 역할 | 담당 업무 |
| --- | --- | --- |
| 박유빈<br>[@Yubeenpark](https://github.com/Yubeenpark) | 프론트엔드 개발,<br>UI/UX 디자인, <br>로고 디자인 | WebRTC 화상 통신, 메인과 리뷰 페이지 기능, 무한 스크롤과 전역 상태 관리 |
| 정보미<br>[@bomii1](https://github.com/bomii1) | 프론트엔드 개발, <br> UI/UX 디자인 | socket.io 채팅, 로그인 및  oauth 소셜 로그인 전체 기능, 로그아웃|
| 최은석<br>[@ces1225](https://github.com/ces1225) | 프론트엔드 개발, <br> UI/UX 디자인 |  북마크, 개인 페이지 전체 기능, 채팅 |

## 🚀 시작하기

```bash
# Clone the repository
git clone https://github.com/UlleongUlleong/client.git
cd client
npm install  # 또는 yarn install

# Start the development server
npm run dev

# Build for production
npm run build
```

