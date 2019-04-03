window.onload = function() {
  // 顶点着色器程序:设置坐标和尺寸

  var VSHADER_SOURCE = `void main(){ 
    gl_Position = vec4(0.0, 1.0, 1.0, 1.0);
    gl_PointSize = 50.0;
  }`

  // 片元着色器程序
  var FSHADER_SOURCE = `void main(){
    gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
  }`

  var canvas = document.getElementById('webgl');

  var gl = getWebGLContext(canvas);

  if(!gl) {
    return;
  }

  if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    return
  }

  // 设置 canvas 画布背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // 清空 canvas
  gl.clear(gl.COLOR_BUFFER_BIT)

  // 绘制一个点
  gl.drawArrays(gl.POINT, 0, 1)
}
 