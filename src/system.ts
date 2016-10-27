module AFRAMEGLTF {
  'use strict';

  export function System() {
    function init() {
      this.sceneEl.addEventListener('camera-ready', function () {
        scene = this.sceneEl.object3D;
        camera = this.sceneEl.camera;
      }, true);
    }

    function tick() {
      if (scene && camera) {
        THREE.GLTFLoader.Animations.update();
        THREE.GLTFLoader.Shaders.update(scene, this.mainCamera);
      }
    }

    let camera = null,
        scene = null;

    return {
      init: init,
      tick: tick 
    };
  }
}
