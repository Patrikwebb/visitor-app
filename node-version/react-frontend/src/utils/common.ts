/**
 * Debouce function that controls how often you can call another function
 * @param fn Add function you want to call
 * @param ms Add how often you want to call the function
 */
function debounce(fn: any, ms: number) {
  let timer: any;
  return () => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

export { debounce };
