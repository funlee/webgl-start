var camera;
var scene;
var renderer;

function init() {
  var stats = initStats()
  // 定义场景
  scene = new THREE.Scene();
  // 定义摄像机
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  // 定义渲染器对象:设置背景色 和 场景大小
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMapEnabled = true; // 开启阴影

  // 添加一个平面
  var planeGeometry = new THREE.PlaneGeometry(60, 20); // 定义平面的大小
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff
  }); // 通过创建材质对象来设置平面的外观
  var plane = new THREE.Mesh(planeGeometry, planeMaterial); // 合并到网格对象中
  plane.receiveShadow = true; // 平面接受印象
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;
  scene.add(plane);

  // 添加一个立方体
  var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xff0000
  });
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true; // 立方体往平面（地面）投射阴影
  cube.position.x = -4;
  cube.position.y = 3;
  cube.position.z = 0;
  scene.add(cube);

  // 添加一个球体
  var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  var sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x7777ff
  });
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.castShadow = true; // 球体往地面投射阴影
  sphere.position.x = 20;
  sphere.position.y = 4;
  sphere.position.z = 2;
  scene.add(sphere);

  // 设置摄像机的位置
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position); // 指向场景的中心

  // 添加一个光源
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true; // 投射阴影
  scene.add(spotLight);

  // 将渲染救过添加在 HTML
  document.getElementById("WebGL-output").appendChild(renderer.domElement);
  var step = 0;

  // 添加 GUI 控制
  var controls = new function () {
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;
  };

  var gui = new dat.GUI();
  gui.add(controls, 'rotationSpeed', 0, 0.5);
  gui.add(controls, 'bouncingSpeed', 0, 0.5);

  renderScene();

  function renderScene() {
    stats.update();
    // 立方体围绕它的每个轴进行旋转
    cube.rotation.x += controls.rotationSpeed;
    cube.rotation.y += controls.rotationSpeed;
    cube.rotation.z += controls.rotationSpeed;

    // 让球体沿着一条曲线跳动
    step += controls.bouncingSpeed;
    sphere.position.x = 20 + (10 * (Math.cos(step)));
    sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

    // 开启动画 requestAnimationFrame
    requestAnimationFrame(renderScene);
    // 告诉渲染器，用指定的相机来渲染场景
    renderer.render(scene, camera);
  }

  // 检测动画运行的帧数
  function initStats() {
    var stats = new Stats();
    stats.setMode(0); // 0: fps（检测画面每秒传输帧数）, 1: ms（检测画面渲染时间）
    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.getElementById("Stats-output").appendChild(stats.domElement);

    return stats;
  }

  // 实现页面自适应
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener('resize', onResize, false);
  console.log(scene.children)
}
window.onload = init;