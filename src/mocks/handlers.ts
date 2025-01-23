import { http, HttpResponse, delay } from 'msw';
import { alcoholTypeCategories } from '../models/categories';
import { categoryForFetch } from '../models/categories';
// id name score type price
interface data {
  id: number;
  name: string;
  imageUrl: string;
  scoreAverage: number;
  type: string;
  price: number;
  reviewCount: number;
}
function generateDummyData(count: number, category: number) {
  let currentId = 0;
  const cat = categoryForFetch.find((cat) => cat.id === category);
  return Array.from({ length: count }, () => ({
    id: ++currentId,
    name: `${cat.name}${currentId}`,
    imageUrl:
      'https://wineall.co.kr/web/product/big/202204/e0b9cfb8b7e703a4e086f6c2a7f72e28.png',

    scoreAverage: parseFloat((Math.random() * 5).toFixed(1)),
    type: `${cat.name}`,
    price: 20000 + (currentId - 1) * 500,
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
          : cursor;
        console.log('cursor값 response');
        return new HttpResponse(
          JSON.stringify({
            data: filteredData,
            status: 'success',
            message: '성공',
            cursor: newCursor,
          }),
        );
      }
      if (isNaN(cursor)) {
        // offset과 limit 적용
        console.log('limit response');
        filteredData = filteredData.slice(offset, offset + limit);
        return new HttpResponse(
          JSON.stringify({
            data: filteredData,
            status: 'success',
            message: '성공',
            offset: offset + limit,
          }),
        );
      }
    },
  ),
];
