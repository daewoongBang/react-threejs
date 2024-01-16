import { useEffect, useRef } from 'react';
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  GridHelper
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

import { isNeedResizeRenderer } from 'components/utils/viewport';

const ControlsTransformControls = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isNeedRenderAnimation = useRef<boolean>(false);

  const render = (
    scene: Scene,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer,
    controls: OrbitControls
  ) => {
    isNeedRenderAnimation.current = false;

    if (isNeedResizeRenderer(renderer)) {
      const { innerWidth, innerHeight } = window;

      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    }

    controls.update();

    renderer.render(scene, camera);
  };

  const requestRenderAnimation = (
    scene: Scene,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer,
    controls: OrbitControls
  ) => {
    if (!isNeedRenderAnimation.current) {
      isNeedRenderAnimation.current = true;

      requestAnimationFrame(() => {
        render(scene, camera, renderer, controls);
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

      // GridHelper
      const gridHelper = new GridHelper();
      scene.add(gridHelper);

      const orbitControls = new OrbitControls(camera, renderer.domElement);
      orbitControls.maxDistance = 30;
      orbitControls.minDistance = 1;

      // Mesh
      const geometry = new BoxGeometry(1, 1, 1);
      const material = new MeshBasicMaterial({
        color: '#ff0000'
      });

      const mesh = new Mesh(geometry, material);
      scene.add(mesh);

      const transformControls = new TransformControls(
        camera,
        renderer.domElement
      );
      transformControls.attach(mesh);
      scene.add(transformControls);

      camera.lookAt(mesh.position);

      renderer.render(scene, camera);

      window.addEventListener('resize', () => {
        render(scene, camera, renderer, orbitControls);
      });

      orbitControls.addEventListener('change', () => {
        requestRenderAnimation(scene, camera, renderer, orbitControls);
      });

      transformControls.addEventListener('change', () => {
        requestRenderAnimation(scene, camera, renderer, orbitControls);
      });

      transformControls.addEventListener('dragging-changed', event => {
        orbitControls.enabled = !event.value;
      });

      window.addEventListener('keydown', (event: KeyboardEvent) => {
        switch (event.code) {
          case 'KeyT':
            transformControls.setMode('translate');
            break;

          case 'KeyR':
            transformControls.setMode('rotate');
            break;

          case 'KeyS':
            transformControls.setMode('scale');
            break;
        }
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

export default ControlsTransformControls;
