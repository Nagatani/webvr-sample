var isCollision = false;
var t = 0;

AFRAME.registerComponent('collider-check', {
  dependencies: ['raycaster'],
  init: function () {
    this.el.addEventListener('raycaster-intersection', function () { isCollision = true; });
    this.el.addEventListener('raycaster-intersection-cleared', function () { isCollision = false; });
  }
});

function render() {
  t += 0.01;
  var s = 0.05;

  requestAnimationFrame(render);

  (function() {
    if (isCollision) return;

    var position = camera.getAttribute('position');
    var rotation = camera.getAttribute('rotation');
    position.x += -Math.cos((rotation.y - 90) * Math.PI / 180) * s;
    position.z += Math.sin((rotation.y - 90) * Math.PI / 180) * s;
    camera.setAttribute('position', position);
  })();
}
render();
