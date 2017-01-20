/// <reference path='../node_modules/@types/three/index.d.ts' />

/// <reference path='component' />
/// <reference path='system' />

module AFRAMEGLTF {
  'use strict';

  window.AFRAME.registerSystem('gltf-model', System());
  window.AFRAME.registerComponent('gltf-model', Component());
}
