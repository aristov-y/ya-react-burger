interface Order {
  name: string,
  order: {
    number: number
  },
  success: boolean
}

function getOrder(ingredientIds: string[]): Promise<Order> {
  return fetch('https://norma.nomoreparties.space/api/orders', {
    headers: {
      'Content-Type': 'application/json'
    },
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
