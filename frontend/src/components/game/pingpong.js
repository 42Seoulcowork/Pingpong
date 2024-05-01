import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { socketHandler } from "./gameEventHandler.js";
import { getState } from "../../state/store.js";

const paddle = (position_x, position_z, color) => {
  const geometry = new THREE.BoxGeometry(1, 3, 5);
  const material = new THREE.MeshPhongMaterial({
    color: color,
    shininess: 150,
    specular: 0x333333,
  });

  const pad = new THREE.Mesh(geometry, material);
  pad.castShadow = true;
  pad.position.set(position_x, 1.2, position_z);
  return pad;
};

export const pingpong = (gameMode) => {
  try {
    // WEBGL 호환성 확인
    if (WebGL.isWebGLAvailable() === false) throw new Error("WebGL Error");

    // 오브젝트를 놓을 공간
    const scene = new THREE.Scene();

    // 정보를 화면에 그려줄 렌더러
    const renderer = new THREE.WebGLRenderer({
      alpha: true, // 투명한 배경을 가진 캔버스 사용 가능
      antialias: true, // 렌더링 된 이미지 품질을 향상시키는 안티앨리어싱 활성화
    });
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;
    renderer.setSize(WIDTH, HEIGHT);
    document.getElementById("container").appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;

    // 카메라
    const FOV = 45; // 카메라 시야각, 커질 수록 시야각 넓어짐 단위 degree
    const ASPECT = WIDTH / HEIGHT; // 시야의 가로세로비 -> 컨테이너 가로세로비와 같은 크기로 해주는 게 좋음
    const NEAR = 1; // 렌더링 할 물체 거리의 하한값, 카메라로부터 거리가 이 값보다 작은 물체는 화면에 그리지 않음 0보다 크고 FAR보다 작은 값을 가질 수 있다.
    const FAR = 10000; // 렌더링 할 물체 거리의 상한값, 너무 멀리 있는 물체를 그리지 않는 것, 카메라로부터 거리가 이 값보다 큰 물체는 화면에 그리지 않음
    const camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
    camera.position.set(0, 15, 35); // 0 40, 0 // 0 15 35
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // 광원
    scene.add(new THREE.AmbientLight(0x404040, 3)); // 강도 3의 주변광

    // const spotLight = new THREE.SpotLight(0xffffff, 500); // 하얀색, 강도 500의 점 광원 생성하고 설정한 뒤 추가
    // spotLight.name = "Spot Light"; // Spot Ligth로 이름 설정
    // spotLight.angle = Math.PI / 5; // 광원이 비추는 각도 설정 Math.Pi / 5는 36도 정도이다.
    // spotLight.penumbra = 0.3; // 펜엄브라(반영역) 값을 0.3으로 설정함. 이 값이 커질수록 광원 가장자리 그림자가 부드러워짐
    // spotLight.position.set(10, 10, 5); // 광원의 위치
    // spotLight.castShadow = true; // 광원이 그림자를 생성할 수 있도록 설정합니다.
    // spotLight.shadow.camera.near = 8; // 그림자 맵의 near과 far 클리핑 평면을 각각 8과 30으로 설정합니다.
    // spotLight.shadow.camera.far = 30; // 광원에서 가까운 8보다 가까운 거리 30보다 먼 거리는 그림자를 랜더링 하지 않음 그 이유는 그림자를 계산하는 게 성능이 저하될 수 있음
    // spotLight.shadow.mapSize.width = 1024; // 그림자 맵의 해상도를 가로 세로 1024픽셀로 설정
    // spotLight.shadow.mapSize.height = 1024;
    // scene.add(spotLight);

    // scene.add( new THREE.CameraHelper( spotLight.shadow.camera ));

    const lightColor = { day: 0xffffff, night: 0x404040 };
    const dirLight = new THREE.DirectionalLight(
      lightColor[getState().appearance],
      3
    );
    dirLight.name = "Dir. Light";
    dirLight.position.set(0, 10, 0);
    dirLight.castShadow = true;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 10;
    dirLight.shadow.camera.right = 15;
    dirLight.shadow.camera.left = -15;
    dirLight.shadow.camera.top = 15;
    dirLight.shadow.camera.bottom = -15;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    // scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

    // 탁구대 피사체
    let geometry = new THREE.BoxGeometry(10, 0.15, 10);
    let material = new THREE.MeshPhongMaterial({
      color: 0xa0adaf, // 색상
      shininess: 150, // 광택 0 ~ 1000
      specular: 0x111111, // 반사광
    });
    const table = new THREE.Mesh(geometry, material);
    table.scale.multiplyScalar(3);
    table.castShadow = false;
    table.receiveShadow = true;
    scene.add(table);

    const ballColor = { red: 0xff0000, yellow: 0xffff00, purple: 0x800080 };
    geometry = new THREE.SphereGeometry(1, 32, 32);
    material = new THREE.MeshPhongMaterial({
      color: ballColor[getState().ballColor],
      shininess: 150,
      specular: 0x222222,
    });

    const ball = new THREE.Mesh(geometry, material);
    ball.position.set(0, 5, 0);
    ball.castShadow = true;
    ball.receiveShadow = true;
    scene.add(ball);

    const paddle1 = paddle(-13, 0, 0xff0000);
    const paddle2 = paddle(13, 0, 0x0000ff);
    scene.add(paddle1);
    scene.add(paddle2);
    // const dirLightShadowMapViewer = new ShadowMapViewer(dirLight)

    function animate() {
      requestAnimationFrame(animate); // https://inpa.tistory.com/entry/%F0%9F%8C%90-requestAnimationFrame-%EA%B0%80%EC%9D%B4%EB%93%9C
      renderer.render(scene, camera);
    }

    socketHandler(animate, ball, paddle1, paddle2, gameMode);
  } catch (e) {
    console.log(e);
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById("container").appendChild(warning);
  }
};
