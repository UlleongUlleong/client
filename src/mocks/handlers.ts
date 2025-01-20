import { http, HttpResponse, delay } from 'msw';

// id name score type price
let currentId = 0;
function generateWineData(count: number) {
  return Array.from({ length: count }, () => ({
    id: ++currentId,
    name: `와인 ${currentId}`,
    image:
      'https://wineall.co.kr/web/product/big/202204/e0b9cfb8b7e703a4e086f6c2a7f72e28.png',

    star: (Math.random() * 5).toFixed(1),
    type: '와인',
    price: 20000 + (currentId - 1) * 500,
    reviewers: Math.floor(Math.random() * 100),
  }));
}

const wineData = generateWineData(30);
console.log(wineData);
export const handlers = [
  http.all('*', async () => {
    await delay(100);
  }),

  http.get('http://localhost:3000/api/alcohol/search', ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const keyword = url.searchParams.get('keyword');
    const sort = url.searchParams.get('sort');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const limit = parseInt(url.searchParams.get('limit') || '4');
    const cursor = parseInt(url.searchParams.get('cursor'));
    // 와인 카테고리에 대한 더미 데이터

    // 카테고리가 와인가 아닌 경우
    if (category && category !== '와인') {
      return new HttpResponse(
        JSON.stringify({
          message: '해당 카테고리의 데이터가 없습니다',
          data: [],
        }),
        { status: 404 },
      );
    }

    // 검색어가 있는 경우 필터링
    let filteredData = [...wineData];
    if (keyword) {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase()),
      );
    }

    // 정렬 적용
    if (sort) {
      switch (sort) {
        case 'name':
          filteredData.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'star':
          // filteredData.sort((a, b) => b.score - a.score);
          break;
        case 'review':
          // filteredData.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
        // recent는 이미 ID 순으로 정렬되어 있다고 가정
      }
    }

    let startIdx = 0;
    let newCursor = 0;
    // cursor가 있는 경우 cursor 이후의 데이터만 반환

    if (cursor > 0) {
      const cursorIndex = filteredData.findIndex((item) => item.id === cursor);
      startIdx = cursorIndex + 1;
      filteredData = filteredData.slice(startIdx, startIdx + limit);
      newCursor = filteredData.length
        ? filteredData[filteredData.length - 1].id
        : cursor;
    } else {
      // offset과 limit 적용
      filteredData = filteredData.slice(offset, offset + limit);
    }
    const hasMore =
      filteredData.length === limit && startIdx + limit < filteredData.length;
    return new HttpResponse(
      JSON.stringify({
        와인: filteredData,
        nextCursor: newCursor,
        // metadata: {
        //   total: wineData.length,
        //   count: filteredData.length,
        //   hasMore,
        //   cursor: newCursor,
      }),
    );
  }),
];
