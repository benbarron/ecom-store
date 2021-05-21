export interface Route {
  exact: boolean;
  path: string;
  component: any;
  icon: string | null;
}

export interface RawValue {
  raw: string;
}

export interface Category {
  id: string;
  name: string;
}
export interface Product<T = RawValue> {
  sku: T;
  name: T;
  type: T;
  price: T;
  upc: T;
  category: T;
  shipping: T;
  description: T;
  manufacturer: T;
  model: T;
  url: T;
  image: T;
  id: T;
}

export interface Suggestion {
  suggestion: string;
}

export interface SearchSuggestionsResponse {
  suggestions: Suggestion[];
}
