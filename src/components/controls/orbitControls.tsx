import { useEffect, useRef } from 'react';
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  AxesHelper,
  GridHelper
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { isNeedResizeRenderer } from 'components/utils/viewport';

const ControlsOrbitControls = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isNeedRenderAnimation = useRef<boolean>(false);

  const render = (
    scene: Scene,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer
  ) => {
    isNeedRenderAnimation.current = false;

    if (isNeedResizeRenderer(renderer)) {
      const { innerWidth, innerHeight } = window;

      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
  };

  const requestRenderAnimation = (
    scene: Scene,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer
  ) => {
    if (!isNeedRenderAnimation.current) {
      isNeedRenderAnimation.current = true;

      requestAnimationFrame(() => {
        render(scene, camera, renderer);
      });
    }
  };

  useEffect(() => {
    if (!!canvasRef.current) {
      const renderer = new WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true
      });

      const { innerWidth, innerHeight } = window;

      renderer.setSize(innerWidth, innerHeight);

      const scene = new Scene();

      const camera = new PerspectiveCamera(
        75,
        innerWidth / innerHeight,
        0.1,
        1000
      );

      camera.position.set(2, 3, 7);

      scene.add(camera);

      // AxesHelper
      const axesHelper = new AxesHelper(3);
      scene.add(axesHelper);

      // GridHelper
      const gridHelper = new GridHelper();
      scene.add(gridHelper);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.maxDistance = 30;
      controls.minDistance = 1;

      // Mesh
      const geometry = new BoxGeometry(1, 1, 1);
      const material = new MeshBasicMaterial({
        color: '#ff0000'
      });

      const mesh = new Mesh(geometry, material);
      scene.add(mesh);

      camera.lookAt(mesh.position);

      renderer.render(scene, camera);

      window.addEventListener('resize', () => {
        render(scene, camera, renderer);
      });

      controls.addEventListener('change', () => {
        requestRenderAnimation(scene, camera, renderer);
      });
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <canvas id='three-canvas' ref={canvasRef} />
    </div>
  );
};

export default ControlsOrbitControls;
