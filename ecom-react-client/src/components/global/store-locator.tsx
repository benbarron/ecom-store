import React, { FC, useState } from 'react';
import { useSearchStores } from '../../utils/hooks';
import * as Spinners from 'react-spinners';

interface Props {
  toggleStoreLocator: () => void;
}

const StoreLocator: FC<Props> = (props: Props) => {
  const [value, setValue] = useState('');
  const query = useSearchStores(value);

  return (
    <div className='modal-page-wrapper'>
      <div className='store-locator-modal'>
        <i
          className='fas fa-times-circle close-icon'
          onClick={props.toggleStoreLocator}
        ></i>
        <div className='modal-title-wrapper'>
          <h4>Stores Locator</h4>
        </div>
        <div className='search-input-wrapper'>
          <input
            type='text'
            placeholder={'Type in a location to search for a store...'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className='load-icon'>
            <Spinners.ClipLoader
              loading={query.isFetching}
              color={'#0076dc'}
              size={25}
            />
          </div>
        </div>
        <div className='search-results-wrapper'>
          {query.isFetched &&
            query.isSuccess &&
            query.data.results.map((store: any) => (
              <div className='store-result' key={store.id.raw}>
                <div>
                  <h6>{store.address.raw}</h6>
                  <small>
                    {store.city.raw}, {store.state.raw} {store.postal_code.raw}
                  </small>
                </div>
                <button
                  onClick={(e) => {
                    window.location.href = `https://www.google.com/maps/search/?api=1&query=${store.address.raw}`;
                  }}
                >
                  <i className='fas fa-chevron-right'></i>
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;
