const mockDropRef = jest.fn();
const mockDragRef = jest.fn();

const useDrag = jest.fn().mockImplementation(() => [undefined, mockDragRef]);
const useDrop = jest.fn().mockImplementation(() => [undefined, mockDropRef]);

export {
  useDrag,
  useDrop
}
