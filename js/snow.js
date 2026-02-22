// 自定义雪花飘落效果
function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.innerHTML = '❄';
  snowflake.style.cssText = `
    position: fixed;
    z-index: -1;
    color: #fff;
    text-shadow: 0 0 5px #fff;
    pointer-events: none;
    user-select: none;
    left: ${Math.random() * 100}vw;
    animation: fall ${Math.random() * 5 + 5}s linear infinite;
    opacity: ${Math.random() * 0.5 + 0.5};
    font-size: ${Math.random() * 10 + 10}px;
  `;
  document.body.appendChild(snowflake);
  setTimeout(() => snowflake.remove(), 10000);
}

setInterval(createSnowflake, 200);