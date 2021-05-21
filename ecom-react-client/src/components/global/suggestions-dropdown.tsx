import React, { FC, Fragment } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { useSearchSuggestions } from '../../utils/hooks';
interface Props extends RouteComponentProps {
  value: string;
  setValue: (value: string) => void;
}

const SuggestionsDropdown: FC<Props> = (props: Props) => {
  const [products, categories] = useSearchSuggestions(props.value);

  if (!props.value || products.isError) {
    return <Fragment />;
  }

  return (
    <div className='suggestions-dropdown-wrapper'>
      {products.isFetching && !products.data && (
        <div className='suggestion-item'>Loading...</div>
      )}
      {categories.isFetched && (
        <Fragment>
          <div
            className='suggestion-item'
            onClick={(e) => {
              const q = props.value.replaceAll(' ', '+');
              props.history.push(`/search?q=${q}&cat=all`);
            }}
          >
            <p>
              <b>{props.value}</b> in All Categories
            </p>
            <i className='fas fa-chevron-right'></i>
          </div>
          {categories.data.slice(0, 4).map((category: string, i: number) => (
            <div
              className='suggestion-item'
              key={'category' + i}
              onClick={(e) => {
                const q = props.value.replaceAll(' ', '+');
                const cat = category.replaceAll(' ', '+');
                props.history.push(`/search?q=${q}&cat=${cat}`);
              }}
            >
              <p>
                <b>{props.value}</b> in {category}
              </p>
              <i className='fas fa-chevron-right'></i>
            </div>
          ))}
        </Fragment>
      )}
      {products.isFetched &&
        products.data
          .filter((s: string) => s !== props.value)
          .slice(0, 6)
          .map((suggestion: any, i: number) => (
            <div
              className='suggestion-item'
              key={'product-' + i}
              onClick={(e) => {
                props.setValue(suggestion);
                props.history.push(
                  `/search?q=${suggestion.replaceAll(' ', '+')}&cat=all`
                );
              }}
            >
              <p>
                {suggestion.split(' ').map((word: string, j: number) => (
                  <span key={j}>
                    {props.value.split(' ').includes(word) ? (
                      <span style={{ fontWeight: 'bold' }}>{word} </span>
                    ) : (
                      word + ' '
                    )}
                  </span>
                ))}
              </p>
              <i className='fas fa-chevron-right'></i>
            </div>
          ))}
    </div>
  );
};

export default withRouter(SuggestionsDropdown);
