import axios, { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const computeTotal = (cart: any) => {
  return Math.round((cart.subTotal + Number.EPSILON) * 100) / 100;
};

export const useFetchedLikedProducts = () => {
  return useQuery(['FetchLikes'], () => {
    const url = `${process.env.REACT_APP_BACKEND_URI}/api/likes`;
    return axios.get(url).then((res: AxiosResponse) => res.data.likes);
  });
};

export const useUnlikeProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (productId: string) => {
      const url = `${process.env.REACT_APP_BACKEND_URI}/api/likes/remove?id=${productId}`;
      return axios.delete(url).then((res: AxiosResponse) => res.data.likes);
    },
    {
      onSuccess: (res: any, variables: any) => {
        res.total = computeTotal(res);
        queryClient.setQueryData(['FetchLikes'], res);
      },
    }
  );
};

export const useLikeProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (productId: string) => {
      const url = `${process.env.REACT_APP_BACKEND_URI}/api/likes/add?id=${productId}`;
      return axios.post(url).then((res: AxiosResponse) => res.data.likes);
    },
    {
      onSuccess: (res: any, variables: any) => {
        res.total = computeTotal(res);
        queryClient.setQueryData(['FetchLikes'], res);
      },
    }
  );
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (productId: string) => {
      const url = `${process.env.REACT_APP_BACKEND_URI}/api/cart/add?id=${productId}`;
      return axios.put(url).then((res: AxiosResponse) => res.data.cart);
    },
    {
      onSuccess: (res: any, variables: any) => {
        res.total = computeTotal(res);
        queryClient.setQueryData(['FetchCart'], res);
      },
    }
  );
};

export const useFindSingleProduct = (productId: string) => {
  return useQuery(['SingleProduct', productId], () => {
    const url = `${process.env.REACT_APP_BACKEND_URI}/api/products/find?id=${productId}`;
    return axios.get(url).then((res: AxiosResponse) => res.data);
  });
};

export const useSearchProducts = (params: URLSearchParams) => {
  return useQuery(['SearchProducts', params.toString()], () => {
    const url = `${
      process.env.REACT_APP_BACKEND_URI
    }/api/products/search?${params.toString()}`;
    return axios.get(url).then((res: AxiosResponse) => res.data);
  });
};

export const useSearchSimilarProducts = (productId: string) => {
  return useQuery(['SimilarProducts', productId], (): any => {
    const url = `${process.env.REACT_APP_BACKEND_URI}/api/products/similar?id=${productId}`;
    return axios.get(url).then((res: AxiosResponse) => res.data.products);
  });
};

export const useSearchSuggestions = (q: string) => [
  useQuery(['SearchSuggestions:Products', q], () => {
    const url = `${process.env.REACT_APP_BACKEND_URI}/api/products/suggestions?q=${q}`;
    return axios.get(url).then((res: AxiosResponse) => res.data.suggestions);
  }),
  useQuery(['SearchSuggestions:Categories', q], () => {
    const url = `${process.env.REACT_APP_BACKEND_URI}/api/products/category/suggestions?q=${q}`;
    return axios.get(url).then((res: AxiosResponse) => res.data.suggestions);
  }),
];

export const useSearchStores = (term: string) => {
  return useQuery(['SearchStores', term], (): any => {
    const url = `${process.env.REACT_APP_BACKEND_URI}/api/stores/search?q=${term}`;
    return axios.get(url).then((res: AxiosResponse) => res.data.stores);
  });
};

export const useFetchCart = () => {
  return useQuery(['FetchCart'], async () => {
    const url = `${process.env.REACT_APP_BACKEND_URI}/api/cart`;
    return axios.get(url).then((res: AxiosResponse) => {
      res.data.cart.total = computeTotal(res.data.cart);
      return res.data.cart;
    });
  });
};

export const useUpdateCartQty = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ productId, qty }) => {
      const url = `${process.env.REACT_APP_BACKEND_URI}/api/cart/update?id=${productId}&qty=${qty}`;
      return axios.put(url).then((res: AxiosResponse) => res.data.cart);
    },
    {
      onSuccess: (res: any, variables: any) => {
        res.total = computeTotal(res);
        queryClient.setQueryData(['FetchCart'], res);
      },
    }
  );
};

export const useDeleteFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (productId: string) => {
      const url = `${process.env.REACT_APP_BACKEND_URI}/api/cart?id=${productId}`;
      return axios.delete(url).then((res: AxiosResponse) => res.data.cart);
    },
    {
      onSuccess: (res: any, variables: any) => {
        res.total = computeTotal(res);
        queryClient.setQueryData(['FetchCart'], res);
      },
    }
  );
};
