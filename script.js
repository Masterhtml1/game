document.addEventListener('DOMContentLoaded', () => {
  const player = document.getElementById('player');
  let isJumping = false;
  let isGoingLeft = false;
  let isGoingRight = false;
  let bottom = 0;
  let left = 0;

  function jump() {
    if (isJumping) return;
    isJumping = true;
    let jumpInterval = setInterval(() => {
      if (bottom >= 250) {
        clearInterval(jumpInterval);
        let fallInterval = setInterval(() => {
          if (bottom <= 0) {
            clearInterval(fallInterval);
            isJumping = false;
          }
          bottom -= 5;
          player.style.bottom = bottom + 'px';
        }, 20);
      }
      bottom += 5;
      player.style.bottom = bottom + 'px';
    }, 20);
  }

  function moveLeft() {
    if (left <= 0) return;
    left -= 5;
    player.style.left = left + 'px';
  }

  function moveRight() {
    if (left >= 550) return;
    left += 5;
    player.style.left = left + 'px';
  }

  function control(e) {
    if (e.key === 'ArrowUp' || e.key === ' ') {
      jump();
    } else if (e.key === 'ArrowLeft') {
      isGoingLeft = true;
      moveLeft();
    } else if (e.key === 'ArrowRight') {
      isGoingRight = true;
      moveRight();
    }
  }

  function releaseControl(e) {
    if (e.key === 'ArrowLeft') {
      isGoingLeft = false;
    } else if (e.key === 'ArrowRight') {
      isGoingRight = false;
    }
  }

  function move() {
    if (isGoingLeft) moveLeft();
    if (isGoingRight) moveRight();
    requestAnimationFrame(move);
  }

  document.addEventListener('keydown', control);
  document.addEventListener('keyup', releaseControl);
  move();
});
