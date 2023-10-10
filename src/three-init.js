import * as THREE from 'three';
// @ts-ignore
import {OrbitControls} from 'three/addons/controls/OrbitControls';
// @ts-ignore
import TWEEN from 'three/addons/libs/tween.module';

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

const canvas = document.querySelector('.canvas');

export function setupThreeJs() {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        75, sizes.width / sizes.height
    );
    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
    });
    const arrayCommands = [];

    camera.position.z = 8;

    scene.add(camera);

    renderer.setSize(sizes.width, sizes.height);

    renderer.render(scene, camera);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    const clock = new THREE.Clock();
    let isRun = true;
    const tick = () => {
        const delta = clock.getDelta();

        arrayCommands.forEach(c => c(delta));

        controls.update();
        TWEEN.update();

        renderer.render(scene, camera);

        if (isRun) {
            window.requestAnimationFrame(tick);
        }
    };
    tick();

    window.addEventListener('resize', () => {
        // Обновляем размеры
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        // Обновляем соотношение сторон камеры
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        // Обновляем renderer
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.render(scene, camera);
    });

    const stop = () => {
        scene.clear();
        canvas.remove();
        camera.clear();
        renderer.clear();
        isRun = false;
    };

    return {
        scene,
        canvas,
        camera,
        renderer,
        arrayCommands,
        stop
    };
}



