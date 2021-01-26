// Build a worker from an anonymous function body
const blobURL = URL.createObjectURL(
  new Blob(
    [
      '(',
      function () {
        //Long-running work here
        onmessage = function (e) {
          const mockPerformance = (base: number) => {
            const start = new Date().getTime();
            let i = 0;
            let j = 0;
            let p = 0;
            let b = false;
            while (new Date().getTime() - start < 1e3) {
              for (let k = 0; k < 1e7; k++) {
                p += ((b = !b) ? 1 : -1) / (2 * j++ + 1);
              }
              i++;
            }
            return base < i;
          };
          const isOk = mockPerformance(e.data);
          postMessage(isOk);
        };
      }.toString(),

      ')()',
    ],
    { type: 'application/javascript' },
  ),
);
export const worker = new Worker(blobURL);

URL.revokeObjectURL(blobURL);
