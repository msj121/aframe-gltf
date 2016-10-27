module AFRAMEGLTF {
  'use strict';

  export function Component() {
    function init() {
      this.model = null;
			this.loader = new THREE.GLTFLoader();
    }

    function update() {
      let self = this,
          el = this.el,
          asset = this.data.asset,
          loop = this.data.loop,
          auto = this.data.auto;

      if (!asset) { return; }

      this.remove();

      this.loader.load(asset, function (gltf) {
        self.model = gltf.scene;
        self.animations = gltf.animations || {};
				self.cameras = gltf.cameras || {};

        el.setObject3D('mesh', self.model);
        el.emit('model-loaded', {
          format: 'gltf',
          model: self.model,
          animations: self.animations,
					cameras: self.cameras
        });

        if (gltf.animations && gltf.animations.length) {
          let len = (gltf.animations) ? gltf.animations.length : 0;
          while (len--) {
            let animation = gltf.animations[len];
            animation.loop = loop;
            if (auto) {
              animation.play();
            }
          }
        }
      });
    }

    function remove() {
      if (!this.model) { return; }
      this.el.removeObject3D('mesh');
    }

    let loader = null;

    return {
      schema: {
        asset: {type: 'asset'},
        loop: {default: true},
        auto: {default: true}
      },
      init: init,
      update: update,
      remove:remove 
    };
  }
}
