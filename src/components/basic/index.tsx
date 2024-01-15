import { useEffect, useRef } from 'react';
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh
} from 'three';

const Basic = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const setSize = (
    scene: Scene,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer
  ) => {
    const { innerWidth, innerHeight } = window;
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
    renderer.render(scene, camera);
  };

  useEffect(() => {
    if (!!canvasRef.current) {
      const renderer = new WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true
      });

      const { innerWidth, innerHeight, devicePixelRatio } = window;

      renderer.setSize(innerWidth, innerHeight);
      renderer.setPixelRatio(devicePixelRatio > 1 ? 2 : 1);

      const scene = new Scene();

      const camera = new PerspectiveCamera(
        75,
        innerWidth / innerHeight,
        0.1,
        1000
      );

      camera.position.set(1, 2, 5);

      scene.add(camera);

      const geometry = new BoxGeometry(1, 1, 1);
      const material = new MeshBasicMaterial({
        color: '#ff0000'
      });

      const mesh = new Mesh(geometry, material);
      scene.add(mesh);

      renderer.render(scene, camera);

      window.addEventListener('resize', () => {
        setSize(scene, camera, renderer);
      });
    }
  }, []);

  return (
    <div>
      <canvas id='three-canvas' ref={canvasRef} />
    </div>
  );
};

export default Basic;
