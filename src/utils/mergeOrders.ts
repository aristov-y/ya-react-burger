import { FeedItem } from './orders';

function mergeOrders(newOrders: FeedItem[], oldItems: FeedItem[]): FeedItem[] {
  const temp = [...oldItems];
  newOrders.forEach((val: FeedItem) => {
    const id = val._id;
    const idx = temp.findIndex(e => e._id === id);
    if (idx === -1) {
      temp.splice(0, 0, val);
    } else {
      temp.splice(idx, 1, { ...val });
    }
  });
  return temp;
}

export default mergeOrders;
