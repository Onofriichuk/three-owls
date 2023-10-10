import './style.css';
import {setupThreeJs} from './three-init';
import {decoratorInvisible, getLight, getRandomModel, sleep} from "./three-utils";
import {applyAppear, applyDisappear, applyInfinityHalfRotate} from "./animation";

(async () => {
    const { scene, stop } = setupThreeJs();

    while (true) {
        const model = decoratorInvisible(await getRandomModel());

        scene.add(model);
        scene.add(getLight('front'));
        scene.add(getLight('back'));

        applyInfinityHalfRotate(model);
        await applyAppear(model);
        await sleep(2000);
        await applyDisappear(model);

        scene.clear()
    }
})();
