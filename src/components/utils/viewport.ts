import { WebGLRenderer } from 'three';

export const isNeedResizeRenderer = (renderer: WebGLRenderer) => {
  const { innerWidth, innerHeight } = window;

  const canvas = renderer.domElement;
  const { clientWidth, clientHeight } = canvas;

  const isNeedResize =
    innerWidth !== clientWidth || innerHeight !== clientHeight;

  if (isNeedResize) {
    renderer.setSize(innerWidth, innerHeight);
  }

  return isNeedResize;
};
