import { getCookie } from './cookies';

interface FeedItem {
  createdAt: string
  ingredients: string[]
  name: string
  number: number
  status: string
  updatedAt: string
  _id: string
}

interface FeedResponse {
  success: boolean;
  orders: FeedItem[];
  total: number;
  totalToday: number;
}

function fetchFeed(): Promise<FeedResponse> {
  return fetch(`${process.env.REACT_APP_API_DOMAIN}/api/orders/all`)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(response.statusText)
    })
    .then(json => {
      if (json.success) {
        return json;
      }
      return Promise.reject()
    })
}

function fetchUserOrders(): Promise<FeedItem[]> {
  return fetch(`${process.env.REACT_APP_API_DOMAIN}/api/orders`, {
    headers: {
      'Authorization': getCookie('token') as string
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(response.statusText)
    })
    .then(json => {
      if (json.success) {
        return json.orders;
      }
      return Promise.reject()
    })
}

export type {
  FeedItem
}

export {
  fetchFeed,
  fetchUserOrders
}
