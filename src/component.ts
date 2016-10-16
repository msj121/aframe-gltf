module AFRAMEGLTF {
  'use strict';

  function init() {
    this.model = null;
  }

  function update() {
    let self = this,
        el = this.el,
        src = this.data.src,
        loop = this.data.loop,
        auto = this.data.auto;

    if (!src) { return; }

    this.remove();

    loader.load(src, function (_gltf) {
      gltf = _gltf;

      self.model = gltf.scene;
      self.animations = gltf.animations || {};

      el.setObject3D('mesh', self.model);
      el.emit('model-loaded', {
        format: 'gltf',
        model: self.model,
        animations: self.animations
      });

      if (gltf.animations && gltf.animations.length) {
        let len = (gltf.animations) ? gltf.animations.length : 0;
        self.data.availableAnimations = ["__all__"];
        while (len--) {
          let animation = gltf.animations[len];
          self.data.availableAnimations.push(animation.name);
          animation.loop = loop;
          if(self.data.duration && self.data.duration.length>0} animation.duration = self.data.duration;
          if ((self.data.animation=="__all__" || self.data.animation == animation.name) && auto) {
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

  let loader = new THREE.glTFLoader(),
      gltf = null;

  export function Component() {
    return {
      schema: {
        src: {type: 'src'},
        loop: {default: true},
        auto: {default: true},
        duration: {default: ""},
        animation: {default: '__all__'}
      },
      init: init,
      update: update,
      remove:remove 
    };
  }
}
