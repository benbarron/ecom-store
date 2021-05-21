import React, { FC, Fragment } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { useSearchSuggestions } from '../../utils/hooks';

interface Props extends RouteComponentProps {
  searchValue: string;
}

const SearchSidebar: FC<Props> = (props: Props) => {
  const [products, categories] = useSearchSuggestions(props.searchValue);

  if (products.isFetching || categories.isFetching) {
    return <div className='refine-search-sidebar'></div>;
  }

  return (
    <div className='refine-search-sidebar'>
      <div className='categories-section'>
        <h6>Categories</h6>
        {categories.data.map((category: string, i: number) => (
          <p
            key={`category-${i}`}
            onClick={(e) => {
              e.preventDefault();
              const cat = category.replaceAll(' ', '+');
              const q = props.searchValue.replaceAll(' ', '+');
              props.history.push(`/search?q=${q}&cat=${cat}`);
            }}
          >
            {category}
          </p>
        ))}
      </div>
      <div className='related-search-section'>
        <h6>Related Searches</h6>
        {products.data.map((product: any, i: number) => (
          <p
            key={`product-${i}`}
            onClick={(e) => {
              e.preventDefault();
              const term = product.replaceAll(' ', '+');
              props.history.push(`/search?q=${term}`);
            }}
          >
            {product}
          </p>
        ))}
      </div>
    </div>
  );
};

export default withRouter(SearchSidebar);
