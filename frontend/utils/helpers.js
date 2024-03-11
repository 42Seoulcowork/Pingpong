export const customEventEmitter = (eventType, detail) => {
  document.dispatchEvent(
    new CustomEvent(eventType, {
      detail,
    })
  );
};
