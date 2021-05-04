const mouseClickEvents = ['mousedown', 'click', 'mouseup'];

export const simulateMouseClick = (element) => {
  mouseClickEvents.forEach((mouseEventType) =>
    element.dispatchEvent(
      new MouseEvent(mouseEventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        buttons: 1,
      })
    )
  );
};

// with timeout promise
export async function simulateMouseClickV2(el) {
  let opts = { view: window, bubbles: true, cancelable: true, buttons: 1 };
  el.dispatchEvent(new MouseEvent('mousedown', opts));
  await new Promise((r) => setTimeout(r, 50));
  el.dispatchEvent(new MouseEvent('mouseup', opts));
  el.dispatchEvent(new MouseEvent('click', opts));
}
