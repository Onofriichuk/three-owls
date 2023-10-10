// @ts-ignore
import {STLLoader} from 'three/addons/loaders/STLLoader';
import * as THREE from 'three';

export function getRandomModel() {
    const numberOfFile = randomIntFromInterval(1, 3);
    const randomMaterial = getRandomMaterial();
    const loader = new STLLoader();

    return new Promise((resolve, reject) => {
        loader.load(
            `models/model${numberOfFile}.stl`,
            (geometry) => {
                const mesh = new THREE.Mesh(geometry, randomMaterial);

                mesh.scale.x = 0.02;
                mesh.scale.y = 0.02;
                mesh.scale.z = 0.02;

                mesh.numberOfFile = numberOfFile;

                resolve(mesh);
            },
            () => {},
            reject
        );
    });
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function decoratorInvisible(model) {
    model.scale.x = 0;
    model.scale.y = 0;
    model.scale.z = 0;

    return model;
}

export function getRandomMaterial() {
    const textureLoader = new THREE.TextureLoader();
    const metalTexture = textureLoader.load(
        `textures/texture7.png`
    );

    let material;
    switch (randomIntFromInterval(1, 3)) {
        case 1:
            material = new THREE.MeshStandardMaterial({ map: metalTexture });

            material.metalness = 0.7;
            material.roughness = 0.2;
            break;

        case 2:
            material = new THREE.MeshPhongMaterial({ map: metalTexture });

            material.shininess = 10;
            material.specular = new THREE.Color('rgba(166,120,203,0.32)');
            break;

        case 3:
            material = new THREE.MeshLambertMaterial({map: metalTexture});
            break;
    }

    return material;
}

export function getLight(side) {
    const pointLight = new THREE.PointLight(0xffffff, 2);

    pointLight.position.x = 2;
    pointLight.position.y = 3;
    pointLight.position.z = side === 'front' ? 4 : -4;

    return pointLight;
}

export function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}
