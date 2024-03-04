import { create } from "zustand";
import axios from "axios";

type State = {
  listCrypto: any;
  listSlug: any;
  dataChart: any;
  setListCrypto: (value: any) => void;
  errors: any;
  setError: (value: any) => void;
  loading: boolean;
  loadingSearch: boolean;
  loadingSlug: boolean;
  loadingChart: boolean;
  setLoading: (value: boolean) => void;
  fetchData: (page: number | string) => Promise<void>;
  searchData: (value: string) => Promise<void>;
  fetchSlug: (value: any) => Promise<void>;
  fetchChart: (value: any) => Promise<void>;
  listData: any;
};

const useStore = create<State>((set) => ({
  dataChart: null,
  listData: null,
  listSlug: null,
  loading: false,
  loadingChart: false,
  loadingSlug: false,
  loadingSearch: false,
  setLoading: (loading: boolean) => set({ loading }),
  listCrypto: null,
  setListCrypto: (listCrypto: any) => set({ listCrypto }),
  errors: null,
  setError: (errors: any) => set({ errors }),
  fetchData: async (page: number | string) => {
    set({ loading: true });
    try {
      const response = await axios.get(
        `/api/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en`,
        {
          headers: {
            "x-cg-api-key": process.env.REACT_APP_API_KEY,
          },
        }
      );
      set({ listCrypto: response, loading: false });
    } catch (error) {
      set({ errors: error, loading: false });
    }
  },
  searchData: async (value: any) => {
    set({ loadingSearch: true });
    try {
      const { data } = await axios.get(`/api/search?query=${value}`, {
        headers: {
          "x-cg-api-key": process.env.REACT_APP_API_KEY,
        },
      });
      set({ listData: data?.coins, loadingSearch: false });
    } catch (error) {
      set({ errors: error, loadingSearch: false });
    }
  },
  fetchSlug: async (value: string) => {
    set({ loadingSlug: true });
    try {
      const { data } = await axios.get(`/api/coins/${value}?tickers=true&market_data=true&community_data=true&developer_data=true`, {
        headers: {
          "x-cg-api-key": process.env.REACT_APP_API_KEY,
        },
      });
      set({ listSlug: data, loadingSlug: false });
    } catch (error) {
      set({ errors: error, loadingSlug: false });
    }
  },
  fetchChart: async (value: string) => {
    set({ loadingChart: true });
    try {
      const { data } = await axios.get(`/api/coins/${value}/market_chart/range?vs_currency=usd&from=1392577232&to=1422577232&precision=full`, {
        headers: {
          "x-cg-api-key": process.env.REACT_APP_API_KEY,
        },
      });
      set({ dataChart: data, loadingChart: false });
    } catch (error) {
      set({ errors: error, loadingChart: false });
    }
  },
}));

export default useStore;
