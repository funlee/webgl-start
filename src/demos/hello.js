window.onload = function () {
  console.log(123)
  var canvas = document.getElementById('webgl');
  // 获取 webgl 绘图上下文
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('不支持webgl');
    return
  }
  gl.clearColor(1.0, 0.0, 1.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT); // 告诉 webgl 清空颜色缓冲区
}