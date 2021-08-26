import { getCookie } from './cookies';

interface Order {
  name: string,
  order: {
    number: number
  },
  success: boolean
}

function getOrder(ingredientIds: string[]): Promise<Order> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  const token = getCookie('token');
  if (token) {
    headers['Authorization'] = token;
  }
  return fetch('https://norma.nomoreparties.space/api/orders', {
    headers,
    method: 'POST',
    body: JSON.stringify({ingredients: ingredientIds})
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response.statusText)
    });
}

export default getOrder;
