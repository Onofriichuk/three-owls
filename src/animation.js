import TWEEN from 'three/addons/libs/tween.module';

export const applyAppear = (model, duration = 3000) => {
    const newScale = {
        1: { x: 0.017, y: 0.017, z: 0.017 },
        2: { x: 0.06, y: 0.06, z: 0.06 },
        3: { x: 0.015, y: 0.015, z: 0.015 },
        4: { x: 0.03, y: 0.03, z: 0.03 },
        5: { x: 0.06, y: 0.06, z: 0.06 },
        6: { x: 0.03, y: 0.03, z: 0.03 },
        7: { x: 0.06, y: 0.06, z: 0.06 },
    }[model.numberOfFile];

    return new Promise((res) => {
        new TWEEN.Tween(model.scale)
            .to(newScale, duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start()
            .onComplete(res);
    });
};

export const applyDisappear = (model, duration = 3000) => {
    return new Promise((res) => {
        new TWEEN.Tween(model.scale)
            .to({
                y: 0, x: 0, z: 0,
            }, duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start()
            .onComplete(res);
    });
};

export const applyInfinityHalfRotate = (model, rotation = -0.5) => {
    const during = Math.random() * 1000 + 3000;

    new TWEEN.Tween(model.rotation)
        .to({y: rotation}, during)
        .start()
        .onComplete(() => applyInfinityHalfRotate(model, rotation * -1));
};

