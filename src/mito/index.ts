import { pack } from '../packer';
import record from '../record';
import { getMitoGlobalVar, variableTypeDetection } from './helper';
import { worker } from './webWork';

export const isBrowserEnv = variableTypeDetection.isWindow(
  typeof window !== 'undefined' ? window : 0,
);
if (isBrowserEnv && Worker) {
  webWorkTestCpu(init);
}

function webWorkTestCpu(callback: Function) {
  worker.onmessage = function (e) {
    if (e.data) {
      setTimeout(() => {
        callback();
      }, 100);
    }
  };
  worker.postMessage(25);
}

function init() {
  let __MITO__ = getMitoGlobalVar();
  if (__MITO__) {
    __MITO__.record = [];
    startRecord(__MITO__);
  }
}

function startRecord(mitoObj: { record: any[] }) {
  console.log('mito record start');
  let endNum = 0;
  let checkoutNum = 0;
  record({
    emit(event, isCheckout) {
      if (isCheckout) {
        checkoutNum++;
        if (checkoutNum > 1) {
          mitoObj.record = mitoObj.record.slice(endNum);
        }
        endNum = mitoObj.record.length;
      }
      mitoObj.record.push(event);
    },
    // packFn: pack,
    checkoutEveryNms: 10 * 1000,
    // recordCanvas: true,
    sampling: {
      mouseInteraction: {
        MouseUp: false,
        MouseDown: false,
        Click: true,
        ContextMenu: false,
        DblClick: false,
        Focus: false,
        Blur: false,
        TouchStart: false,
        TouchEnd: false,
      },
    },
  });
}
