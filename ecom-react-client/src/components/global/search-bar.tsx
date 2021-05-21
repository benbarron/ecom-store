import React, { FC, Fragment, useRef, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import SuggestionsDropdown from './suggestions-dropdown';

interface Props extends RouteComponentProps {}

const SearchBar: FC<Props> = (props: Props) => {
  const params = new URLSearchParams(props.location.search);

  const [value, setValue] = useState(params.get('q') || '');
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const inputRef: any = useRef(null);

  return (
    <Fragment>
      <form
        className={`search-wrapper ${
          value && isInputFocused && 'show-suggestions'
        }`}
        onSubmit={(e) => {
          e.preventDefault();
          props.history.push(`/search?q=${value.replaceAll(' ', '+')}&cat=all`);
          inputRef.current.blur();
        }}
      >
        <input
          onFocus={(e) => setIsInputFocused(true)}
          onBlur={(e) => setTimeout(() => setIsInputFocused(false), 300)}
          ref={inputRef}
          onChange={(e) => setValue(e.target.value)}
          placeholder={'Search products...'}
          value={value}
          type='text'
        />
        <div className='clear-icon-wrapper'>
          {value && (
            <i className='fas fa-times' onClick={(e) => setValue('')}></i>
          )}
        </div>
        <div className='input-icon-wrapper'>
          <i className='search-icon fas fa-search'></i>
        </div>
        {isInputFocused && (
          <SuggestionsDropdown setValue={setValue} value={value} />
        )}
      </form>
    </Fragment>
  );
};

export default withRouter(SearchBar);
