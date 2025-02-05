import { http, HttpResponse, delay } from 'msw';

// id name score type price
const moods = {
  status: 'success',
  data: [
    {
      id: 1,
      name: '혼술',
    },
    {
      id: 2,
      name: '반주',
    },
  ],
  message: '술 카테고리 조회',
};
const alcolCategory = {
  status: 'success',
  data: [
    {
      id: 1,
      name: '소주',
    },
    {
      id: 2,
      name: '맥주',
    },
    {
      id: 3,
      name: '위스키',
    },
    {
      id: 4,
      name: '와인',
    },
    {
      id: 5,
      name: '막걸리',
    },
    {
      id: 6,
      name: '기타',
    },
  ],
  message: '술 카테고리 조회',
};
const moodList = [
  '혼술',
  '반주',
  '시끌시끌',
  '조용한',
  '고민상담',
  '레시피공유',
];
function generateDummyRoomData(count: number, category: string) {
  let currentId = 0;
  const maxMember = Math.floor(Math.random() * 10);
  return Array.from({ length: count }, () => ({
    id: ++currentId,
    name: `${category} 채팅방 ${currentId}번`,
    theme: 'theme01.jpg',
    maxParticipants: maxMember,
    participants: Math.floor(Math.random() * 10),
    description: `${category}  ${currentId}번 채팅방`,
  }));
}

function generateDummyData(count: number, category: number) {
  let curr = 0;

  return Array.from({ length: count }, () => ({
    id: ++curr,
    name: `${category}${curr}`,
    imageUrl:
      'https://wineall.co.kr/web/product/big/202204/e0b9cfb8b7e703a4e086f6c2a7f72e28.png',

    scoreAverage: parseFloat((Math.random() * 5).toFixed(1)),
    type: `${category}`,
    price: 20000 + (curr - 1) * 500,
    reviewCount: Math.floor(Math.random() * 100),
    interestCount: Math.floor(Math.random() * 100),
  }));
}
// 전체 카테고리 더미 데이터

const wineData = generateDummyData(30, 1);
const reviews = wineData.sort((a, b) => b.reviewCount - a.reviewCount);
const love = wineData.sort((a, b) => b.interestCount - a.interestCount);
const score = wineData.sort((a, b) => b.scoreAverage - a.scoreAverage);

const dummy = {
  statusCode: 200,
  message: '술 메인페이지',
  data: [
    {
      id: 112,
      name: '진로',
      alcoholCategory: {
        id: 1,
        name: '소주',
      },
      scoreAverage: 5,
      reviewCount: 1,
      imageUrl: 'alcohol-images/ba62caf4-7781-4566-afef-532e77068c78.jpg',
    },
    {
      id: 141,
      name: '조니워커 레드',
      alcoholCategory: {
        id: 4,
        name: '위스키',
      },
      scoreAverage: 5,
      reviewCount: 1,
      imageUrl: 'alcohol-images/2aeda260-e137-47a8-b94c-a8c3f9d8e028.jpg',
    },
    {
      id: 120,
      name: '진로골드',
      alcoholCategory: {
        id: 1,
        name: '소주',
      },
      scoreAverage: 5,
      reviewCount: 1,
      imageUrl: 'alcohol-images/77b397b9-e62d-43ee-9008-7ac990dd8902.jpg',
    },
    {
      id: 123,
      name: 'OB',
      alcoholCategory: {
        id: 2,
        name: '맥주',
      },
      scoreAverage: 5,
      reviewCount: 1,
      imageUrl: 'alcohol-images/29312a7a-beae-4a4e-825d-755eff925d3a.jpg',
    },
    {
      id: 122,
      name: '카스',
      alcoholCategory: {
        id: 2,
        name: '맥주',
      },
      scoreAverage: 5,
      reviewCount: 1,
      imageUrl: 'alcohol-images/19051037-6a80-4019-a3aa-03c8bfbca711.jpg',
    },
    {
      id: 117,
      name: '한라산',
      alcoholCategory: {
        id: 1,
        name: '소주',
      },
      scoreAverage: 4.5,
      reviewCount: 2,
      imageUrl: 'alcohol-images/bc95eb07-844e-465d-92e0-169611e61d83.jpg',
    },
    {
      id: 113,
      name: '안동소주',
      alcoholCategory: {
        id: 1,
        name: '소주',
      },
      scoreAverage: 3.5,
      reviewCount: 2,
      imageUrl: 'alcohol-images/49d916bc-54fa-464a-8e2f-73f2b8b6cd43.jpg',
    },
    {
      id: 115,
      name: '처음처럼',
      alcoholCategory: {
        id: 1,
        name: '소주',
      },
      scoreAverage: 3,
      reviewCount: 1,
      imageUrl: 'alcohol-images/e25e807d-b283-4aac-9d52-8e7f88159f62.jpg',
    },
    {
      id: 111,
      name: '참이슬',
      alcoholCategory: {
        id: 1,
        name: '소주',
      },
      scoreAverage: 2.3,
      reviewCount: 4,
      imageUrl: 'alcohol-images/2b9debfc-d361-4b3f-9777-8727b0f64182.jpg',
    },
    {
      id: 118,
      name: '참이슬 후레쉬',
      alcoholCategory: {
        id: 1,
        name: '소주',
      },
      scoreAverage: 1,
      reviewCount: 1,
      imageUrl: 'alcohol-images/431dde0f-e57c-4a10-9cfd-a1f5d81a718a.jpg',
    },
  ],
  path: '/api/alcohol?limit=10&sort=scoreAverage&category=0',
  pagination: {
    hasNext: true,
    nextCursor: 114,
  },
};
export const handlers = [
  http.all('*', async () => {
    await delay(100);
  }),

  http.get('https://api.sulleong.coderoom.site/api/alcohol', ({ request }) => {
    const url = new URL(request.url);
    console.log('들어옴');

    const category = parseInt(url.searchParams.get('category'));
    const keyword = url.searchParams.get('keyword');
    const sort = parseInt(url.searchParams.get('sort'));
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const limit = parseInt(url.searchParams.get('limit') || '4');
    const cursorParam = url.searchParams.get('cursor');
    const cursor = cursorParam ? parseInt(cursorParam) : NaN;
    console.log(
      'category',
      category,
      'cursor',
      cursor,
      isNaN(cursor),
      'sort',
      sort,
      'limit',
      limit,
      'searchText',
      keyword,
    );
    if (category === 0 && isNaN(cursor)) {
      console.log('데이터 들어옴 ');
      return new HttpResponse(JSON.stringify(dummy));
    }
    if (category) {
      console.log('category response');
      return new HttpResponse(
        JSON.stringify({
          data: generateDummyData(10, category),
        }),
      );
    }
    if (isNaN(category) && isNaN(cursor)) {
      console.log('popular response');
      return new HttpResponse(
        JSON.stringify({
          data: generateDummyData(10, 0),
        }),
      );
    }
    // 검색어가 있는 경우 필터링

    let filteredData = generateDummyData(30, category);
    if (keyword) {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase()),
      );
    }
    if (category && limit && isNaN(cursor)) {
      const slicedData = wineData.slice(0, limit);
      return new HttpResponse(
        JSON.stringify({
          category: slicedData,
        }),
      );
    }

    // 정렬 적용
    if (sort) {
      switch (sort) {
        case 0:
          filteredData = wineData;
          break;
        case 2:
          filteredData = reviews;
          break;
        case 3:
          filteredData = score;
          break;
        case 4:
          filteredData = love;
          break;
      }
    }

    let startIdx = 0;
    let newCursor = 0;
    // cursor가 있는 경우 cursor 이후의 데이터만 반환

    if (!isNaN(cursor)) {
      const cursorIndex = filteredData.findIndex((item) => item.id === cursor);
      startIdx = cursorIndex + 1;
      filteredData = filteredData.slice(startIdx, startIdx + limit);
      newCursor = filteredData.length
        ? filteredData[filteredData.length - 1].id
        : null; // 데이터가 없을 경우 null로 종료를 명시

      console.log('cursor값 response', newCursor !== cursor);
      return new HttpResponse(
        JSON.stringify({
          data: filteredData,
          status: 'success',
          message: '성공',
          pagination: {
            nextCursor: newCursor,
            hasNext: newCursor !== cursor,
          },
        }),
      );
    }
    if (isNaN(cursor)) {
      // offset과 limit 적용
      filteredData = filteredData.slice(offset, offset + limit);
      return new HttpResponse(
        JSON.stringify({
          data: filteredData,
          status: 'success',
          message: '성공',
          pagination: {
            total: 6,
            pageSize: limit,
            page: offset + limit,
            totalPages: 2,
          },
        }),
      );
    }
  }),
  http.get('https://api.sulleong.coderoom.site/api/users/me/profile', () => {
    const profile = {
      statusCode: 200,
      message: '내 프로필을 가져왔습니다.',
      data: {
        nickname: '동동동',
        moodCategory: [
          {
            id: 1,
            name: '혼술',
          },
          {
            id: 2,
            name: '반주',
          },
        ],
        alcoholCategory: [
          {
            id: 2,
            name: '맥주',
          },
          {
            id: 4,
            name: '와인',
          },
        ],
      },
      path: '/api/users/me/profile',
    };
    return new HttpResponse(JSON.stringify(profile));
  }),

  http.get('https://api.sulleong.coderoom.site/api/categories/alcohol', () => {
    return new HttpResponse(JSON.stringify(alcolCategory));
  }),
  http.get('https://api.sulleong.coderoom.site/api/categories/moods', () => {
    return new HttpResponse(JSON.stringify(moods));
  }),
  // http.get(
  //   'https://api.sulleong.coderoom.site/api/chat/rooms/offset',
  //   ({ request }) => {
  //     const url = new URL(request.url);
  //     const page = parseInt(url.searchParams.get('page'));
  //     const pageSize = parseInt(url.searchParams.get('pageSize') || '6');
  //     if (page && pageSize) {
  //       const start = (page - 1) * pageSize;
  //       const end = start + pageSize;
  //       const recent = generateDummyRoomData(30, '최신 순');
  //       const data = recent.slice(start, end);
  //       console.log('최신순 챗룸 데이터', data);
  //       return new HttpResponse(
  //         JSON.stringify({
  //           data,
  //           pagination: {
  //             page,
  //             pageSize,
  //             totalPages: Math.ceil(dummy.length / pageSize),
  //           },
  //         }),
  //       );
  //     }
  //   },
  // ),
  http.get(
    'https://api.sulleong.coderoom.site/api/chat/rooms/cursor',
    ({ request }) => {
      const url = new URL(request.url);
      const sort = parseInt(url.searchParams.get('sort'));
      const moodCategory = url.searchParams.get('moodCategory');
      const alcoholCategory = url.searchParams.get('alcoholCategory');
      const cursor = parseInt(url.searchParams.get('cursor'));
      const limit = parseInt(url.searchParams.get('limit') || '6');
      const keyword = url.searchParams.get('keyword');
      console.log(
        'moodCategory:',
        moodCategory,
        'alcohol: ',
        alcoholCategory,
        'sort: ',
        sort,
        'cursor: ',
        cursor,
        'limit:',
        limit,
        keyword,
      );
      console.log(keyword);
      if (keyword) {
        let searchData = generateDummyRoomData(30, '시끌시끌');
        searchData = searchData.filter((item) =>
          item.name.toLowerCase().includes(keyword.toLowerCase()),
        );
        const cursorIndex = searchData.findIndex((item) => item.id === cursor);
        const startIdx = cursorIndex + 1;
        searchData = searchData.slice(startIdx, startIdx + limit);
        const newCursor = searchData.length
          ? searchData[searchData.length - 1].id
          : null; // 데이터가 없을 경우 null로 종료를 명시
        JSON.stringify({
          status: 'success',
          message: '성공',
          data: searchData,
          pagination: {
            nextCursor: newCursor,
            hasNext: newCursor !== cursor,
          },
        });
      }

      if (moodCategory == null && !isNaN(cursor)) {
        let recent = generateDummyRoomData(30, '최신 순');
        const cursorIndex = recent.findIndex((item) => item.id === cursor);
        const startIdx = cursorIndex + 1;
        recent = recent.slice(startIdx, startIdx + limit);
        const newCursor = recent.length ? recent[recent.length - 1].id : null; // 데이터가 없을 경우 null로 종료를 명시
        return new HttpResponse(
          JSON.stringify({
            status: 'success',
            message: '성공',
            data: recent,
            pagination: {
              nextCursor: newCursor,
              hasNext: newCursor !== cursor,
            },
          }),
        );
      }
      let filteredData = [];
      if (moodCategory != null) {
        const moodCategoryIds = moodCategory
          ? moodCategory.split(',').map((id) => parseInt(id, 10))
          : [];

        moodCategoryIds.forEach((categoryId) => {
          const name = moodList[categoryId - 1];
          const dummyData = generateDummyRoomData(10, name);

          // 각 categoryId에 대해 호출
          filteredData.push(...dummyData); // 반환된 데이터를 filteredData에 추가
        });
      } else {
        filteredData = generateDummyRoomData(30, '최신 순');
      }

      if (keyword) {
        filteredData = filteredData.filter((item) =>
          item.name.toLowerCase().includes(keyword.toLowerCase()),
        );
      }

      if (sort) {
        switch (sort) {
          case 0:
            filteredData = generateDummyRoomData(30, '인기');
            break;
          case 1:
            filteredData = filteredData.sort(
              (a, b) => b.participantCount - a.participantCount,
            );
            break;
          case 2:
            filteredData = love;
            break;
        }
      }
      let startIdx = 0;
      let newCursor = 0;

      if (!isNaN(cursor)) {
        const cursorIndex = filteredData.findIndex(
          (item) => item.id === cursor,
        );
        startIdx = cursorIndex + 1;
        filteredData = filteredData.slice(startIdx, startIdx + limit);
        newCursor = filteredData.length
          ? filteredData[filteredData.length - 1].id
          : null; // 데이터가 없을 경우 null로 종료를 명시

        console.log('cursor값 챗룸 데이터', newCursor);
        return new HttpResponse(
          JSON.stringify({
            data: filteredData,
            status: 'success',
            message: '성공',
            pagination: {
              nextCursor: newCursor,
              hasNext: newCursor !== cursor,
            },
          }),
        );
      }
      return new HttpResponse(
        JSON.stringify({
          error: 'Bad Request',
          message: '데이터를 전송하지 못함.',
          status: 400,
        }),
      );
    },
  ),
];
