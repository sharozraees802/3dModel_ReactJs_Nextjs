import React, { Component } from "react";
import * as THREE from "three";
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
import OrbitControls from "three-orbitcontrols";

class ThreeScene extends Component {
  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.scene = new THREE.Scene();

    //Add Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("#263238");
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    //add Camera
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 20;
    this.camera.position.y = 5;

    //Camera Controls
    //const controls = new OrbitControls(this.camera, this.renderer.domElement);
    new OrbitControls(this.camera, this.renderer.domElement);

    //LIGHTS
    var lights = [];
    lights[0] = new THREE.PointLight(0x304ffe, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);
    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);
    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);

    //Simple Box with WireFrame
    this.addModels();

    this.renderScene();
    //start animation
    this.start();
  }

  addModels() {
    var mtlLoader = new MTLLoader();

    //mtlLoader.load("./assets/IronMan.mtl", (materials) => {
    mtlLoader.load("./assets1/TeddyBear.mtl", (materials) => {
      materials.preload();
      console.log("Material loaded");
      //Load Object Now and Set Material
      var objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load(
        "./assets1/TeddyBear.obj",
        (object) => {
          this.freedomMesh = object;
          this.freedomMesh.position.setY(3); //or  this
          this.freedomMesh.scale.set(0.02, 0.02, 0.02);
          this.scene.add(this.freedomMesh);
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        // called when loading has errors
        (error) => {
          console.log("An error happened" + error);
        }
      );
    });
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };
  stop = () => {
    cancelAnimationFrame(this.frameId);
  };
  animate = () => {
    if (this.freedomMesh) this.freedomMesh.rotation.y += 0.0;

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };
  renderScene = () => {
    if (this.renderer) this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      // <div
      //   style={{ width: "1000px", height: "1000px" }}
      //   ref={(mount) => {
      //     this.mount = mount;
      //   }}
      // />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{ width: "1000px", height: "1000px" }}
          ref={(mount) => {
            this.mount = mount;
          }}
        ></div>
      </div>
    );
  }
}
export default ThreeScene;
