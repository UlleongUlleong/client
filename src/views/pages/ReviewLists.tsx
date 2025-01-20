import React, { useEffect, useState } from 'react';
import Dropdown from '../../components/Dropdown';
import { sortReviewOptions } from '../../models/dropDownOption';
import { useLocation } from 'react-router-dom';
import { ReviewsMainContainer } from '../../styles/Reviews';
import SearchBar from '../../components/SearchBar';
import AlocholGrid from '../../components/AlocholGrid';
import { GridTopBar } from './Home';
import { CategoryTitle } from '../../styles/ChatRoomGrid';
import { IAlcohol } from '../../models/alcohol';
import { useInView } from 'react-intersection-observer';
import { useAlcoholsQuery } from '../../hooks/getAlcoholsByCategory';
import { Loading } from '../../styles/Home';
import { dummyData } from './Reviews';

interface LocationState {
  alcoholsData: IAlcohol[];
  categoryName: string;
  sort: string;
}

function ReviewLists() {
  const location = useLocation();
  const {
    alcoholsData: initialAlcohols,
    categoryName,
    sort: initialSort,
  } = location.state as LocationState;

  const [sort, setSort] = useState(initialSort);
  const { ref, inView } = useInView();
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useAlcoholsQuery(categoryName);
  console.log('data 있나요: ', data);
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  const handleSort = (value: string) => {
    setSort(value);
  };

  if (status === 'error') {
    return <p>Error: {error.message}</p>;
  }
  const allAlcohols =
    data?.pages.flatMap((page) => page[categoryName]) ?? initialAlcohols;
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
