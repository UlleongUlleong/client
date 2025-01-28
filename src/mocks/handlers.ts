import { http, HttpResponse, delay } from 'msw';
import { alcoholTypeCategories } from '../models/categories';
import { categoryForFetch } from '../models/categories';

// id name score type price

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
  const cat = categoryForFetch.find((cat) => cat.id === category);
  return Array.from({ length: count }, () => ({
    id: ++curr,
    name: `${cat.name}${curr}`,
    imageUrl:
      'https://wineall.co.kr/web/product/big/202204/e0b9cfb8b7e703a4e086f6c2a7f72e28.png',

    scoreAverage: parseFloat((Math.random() * 5).toFixed(1)),
    type: `${cat.name}`,
    price: 20000 + (curr - 1) * 500,
    reviewCount: Math.floor(Math.random() * 100),
    interestCount: Math.floor(Math.random() * 100),
  }));
}
// 전체 카테고리 더미 데이터
const dummy = [];
dummy.push({ popular: generateDummyData(10, 0) });

alcoholTypeCategories.forEach((category) => {
  dummy.push({ [category.name]: generateDummyData(10, category.id) });
});

const wineData = generateDummyData(30, 1);
const reviews = wineData.sort((a, b) => b.reviewCount - a.reviewCount);
const love = wineData.sort((a, b) => b.interestCount - a.interestCount);
const score = wineData.sort((a, b) => b.scoreAverage - a.scoreAverage);

export const handlers = [
  http.all('*', async () => {
    await delay(100);
  }),
  http.get(
    'https://ulleong-idbiv.run.goorm.site/api/chat/rooms/offset',
    ({ request }) => {
      const url = new URL(request.url);
      const page = parseInt(url.searchParams.get('page'));
      const pageSize = parseInt(url.searchParams.get('pageSize') || '6');
      if (page && pageSize) {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const recent = generateDummyRoomData(30, '최신 순');
        const data = recent.slice(start, end);
        console.log('최신순 챗룸 데이터', data);
        return new HttpResponse(
          JSON.stringify({
            data,
            pagination: {
              page,
              pageSize,
              totalPages: Math.ceil(dummy.length / pageSize),
            },
          }),
        );
      }
    },
  ),
  http.get(
    'https://ulleong-idbiv.run.goorm.site/api/chat/rooms/cursor',
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

  http.get(
    'https://ulleong-idbiv.run.goorm.site/api/alcohol/search',
    ({ request }) => {
      const url = new URL(request.url);
      const category = parseInt(url.searchParams.get('category'));
      const keyword = url.searchParams.get('keyword');
      const sort = parseInt(url.searchParams.get('sort'));
      const offset = parseInt(url.searchParams.get('offset') || '0');
      const limit = parseInt(url.searchParams.get('limit') || '4');
      const cursor = parseInt(url.searchParams.get('cursor'));
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

      if (category && isNaN(cursor)) {
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
        const cursorIndex = filteredData.findIndex(
          (item) => item.id === cursor,
        );
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
    },
  ),
];
