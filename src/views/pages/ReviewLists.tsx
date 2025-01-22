import React, { useEffect, useState } from 'react';
import Dropdown from '../../components/Dropdown';
import { sortReviewOptions } from '../../models/dropDownOption';
import { useParams } from 'react-router-dom';
import { ReviewsMainContainer } from '../../styles/Reviews';
import SearchBar from '../../components/SearchBar';
import AlocholGrid from '../../components/AlocholGrid';
import { GridTopBar } from './Home';
import { CategoryTitle } from '../../styles/ChatRoomGrid';

import { useInView } from 'react-intersection-observer';
import { useAlcoholsQuery } from '../../hooks/getAlcoholsByCategory';
import { Loading } from '../../styles/Home';
import { categoryForIndex } from '../../models/categories';

function ReviewLists() {
  const { id } = useParams();
  const categoryId = Number(id) || 0;
  const [sort, setSort] = useState('scoreAverage');
  const { ref, inView } = useInView();
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useAlcoholsQuery(categoryId, 5, sort);
  const categoryName = categoryForIndex[categoryId];

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleSort = (value: string) => {
    setSort(value);
  };
  if (status === 'pending') {
    return <Loading />;
  }
  if (status === 'error') {
    return <p>Error: {error.message}</p>;
  }

  const allAlcohols = data?.pages.flatMap((page) => page.data);
  return (
    <ReviewsMainContainer>
      <SearchBar isMoodCategories={false} />
      <GridTopBar>
        <CategoryTitle>{categoryName}</CategoryTitle>
        <Dropdown onSelect={handleSort} sortOptions={sortReviewOptions} />
      </GridTopBar>
      <AlocholGrid alcohols={allAlcohols} />
      {isFetchingNextPage && <Loading />}
      {isError && <div>{error}</div>}
      {hasNextPage && <div ref={ref} style={{ height: '20px' }} />}
    </ReviewsMainContainer>
  );
}
// status === 'loading' ? (
//     <p>Loading...</p>
//   ) : status === 'error' ? (
//     <span>Error:</span>
//   ) :(
//   {data.pages.map((group, i) => (
//       <React.Fragment key={i}>
//         {group.data.map((project) => (
//           <p key={project.id}>{project.name}</p>
//         ))}
//       </React.Fragment>
//     ))}
//     {data.pages.map((group) => (
//       {group.data.map((alcohol) => (
//         <>
//       {/* <ReviewsMainContainer>
//       <SearchBar isMoodCategories={false} />
//       <GridTopBar>
//         <CategoryTitle>{categoryName}</CategoryTitle>
//         <Dropdown onSelect={handleSort} sortOptions={sortReviewOptions} />
//       </GridTopBar>
//       <AlocholGrid alcohols={alcoholsData}/>
//       {hasNextPage && <div ref={ref} style={{ height: '20px' }} />}
//     </ReviewsMainContainer> */}
//     </>
//     ))}
//   ))}
// )

export default ReviewLists;
