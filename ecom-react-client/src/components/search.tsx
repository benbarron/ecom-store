import axios, { AxiosResponse } from 'axios';
import React, { FC, Fragment } from 'react';
import { useQuery } from 'react-query';
import { RouteComponentProps, withRouter } from 'react-router';
import { Product } from '../utils/interfaces';
import ProductCard from './global/product-card';
import * as Spinners from 'react-spinners';
import { useSearchProducts } from '../utils/hooks';
import SearchSidebar from './global/search-sidebar';

interface Props extends RouteComponentProps {}

const SearchPage: FC<Props> = (props: Props) => {
  const params = new URLSearchParams(props.location.search);
  if (!params.has('size')) {
    params.set('size', '20');
  }
  if (!params.has('page')) {
    params.set('page', '1');
  }
  const query = useSearchProducts(params);

  if (query.isLoading) {
    return (
      <div className='loader-wrapper'>
        <Spinners.ClipLoader size={150} color={'#0076dc'} />
      </div>
    );
  }

  if (query.isError) {
    return (
      <Fragment>
        <div className='d-flex justify-content-center mt-5'>
          <h6>
            We are sorry for the inconvienence, but we enountered an error while
            executing your search query.{' '}
          </h6>
        </div>
        <div className='d-flex justify-content-center mt-5'>
          <button
            onClick={(e) => query.refetch()}
            className='wmt-btn-default-sm mt-4'
          >
            Try again
          </button>
        </div>
      </Fragment>
    );
  }

  const end = query.data.meta.page.size * query.data.meta.page.current;
  const start = end - query.data.meta.page.size + 1;
  const totalDocuments = query.data.meta.page.total_results;
  const totalPages = query.data.meta.page.total_pages;
  const currentPage = query.data.meta.page.current;

  const buildPaginationLinks = (current: number, total: number) => {
    const output: JSX.Element[] = [];
    for (let i = 0; i < totalPages; i++) {
      if (total < 10 || i < 5 || i > total - 5 || i + 1 === current) {
        output.push(
          <button
            key={`link-${i}`}
            className={`page-link rounded-0 text-center ${
              current === i + 1 && 'active'
            }`}
            onClick={(e) => {
              params.set('page', String(i + 1));
              props.history.push(`/search?${params.toString()}`);
            }}
          >
            {i + 1}
          </button>
        );
      }
    }
    return output;
  };

  return (
    <Fragment>
      <div className='search-page-wrapper'>
        <SearchSidebar searchValue={params.get('q') || ''} />
        <div className='results-wrapper'>
          <div className='results-info'>
            <h6>
              Displaying {start} - {end} of {totalDocuments} results for search:
              '{params.get('q')}'
            </h6>
          </div>
          <div className='product-list'>
            {query.data?.products
              .filter((p: Product) => p.name)
              .map((product: Product) => (
                <ProductCard product={product} key={product.id.raw} />
              ))}
          </div>
          <div className='pagination-link'>
            <button
              className='prev-page'
              disabled={params.get('page') === '1'}
              onClick={(e) => {
                params.set('page', String(Number(params.get('page')) - 1));
                props.history.push(`/search?${params.toString()}`);
              }}
            >
              <i className='fas fa-chevron-left'></i>
            </button>
            {buildPaginationLinks(currentPage, totalPages)}
            <button
              className='next-page'
              disabled={params.get('page') === String(totalPages)}
              onClick={(e) => {
                params.set('page', String(Number(params.get('page')) + 1));
                props.history.push(`/search?${params.toString()}`);
              }}
            >
              <i className='fas fa-chevron-right'></i>
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(SearchPage);
