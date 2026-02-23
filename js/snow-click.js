// 【隔离版】真实雪花点击效果 - 避免与现有雪花掉落冲突
(function() {
  // 自定义配置（可调整）
  const CONFIG = {
    // 真实雪花图片（推荐用透明PNG，也可改用CSS绘制的雪花）
    snowImg: "https://img.icons8.com/fluency/96/ffffff/snowflake.png", // 透明雪花PNG
    // 雪花尺寸范围（真实感更强）
    sizeMin: 10,
    sizeMax: 25,
    // 动画时长（秒）
    duration: 2,
    // 飘落距离（像素）
    fallDistance: 100,
    // 层级（低于现有雪花/内容，避免遮挡）
    zIndex: 8888 
  };

  // 生成随机数工具（隔离变量，避免冲突）
  const getRandom = (min, max) => Math.random() * (max - min) + min;

  // 点击事件（独立监听，不覆盖现有事件）
  document.addEventListener('click', function(e) {
    // 1. 创建独立的雪花元素（加唯一前缀，避免冲突）
    const snowEl = document.createElement('div');
    snowEl.className = "click-snowflake"; // 专属类名，和现有雪花区分
    snowEl.style.cssText = `
      position: absolute;
      top: ${e.clientY}px;
      left: ${e.clientX}px;
      width: ${getRandom(CONFIG.sizeMin, CONFIG.sizeMax)}px;
      height: ${getRandom(CONFIG.sizeMin, CONFIG.sizeMax)}px;
      background: url(${CONFIG.snowImg}) no-repeat center center;
      background-size: 100% 100%;
      z-index: ${CONFIG.zIndex};
      pointer-events: none; // 不拦截点击，不影响现有效果
      opacity: 0;
      transform: translate(-50%, -50%);
      transition: all ${CONFIG.duration}s cubic-bezier(0.16, 1, 0.3, 1);
    `;

    // 2. 添加到页面（独立节点，不干扰现有雪花）
    document.body.appendChild(snowEl);

    // 3. 触发真实雪花动画（上飘+旋转+左右摇摆+渐变消失）
    setTimeout(() => {
      const rotate = getRandom(-180, 180); // 随机旋转
      const swing = getRandom(-30, 30);    // 左右摇摆
      snowEl.style.opacity = '1';
      snowEl.style.transform = `
        translate(calc(-50% + ${swing}px), calc(-50% - ${CONFIG.fallDistance}px)) 
        rotate(${rotate}deg)
      `;
    }, 10);

    // 4. 动画结束后清理（避免内存占用，不影响现有雪花）
    setTimeout(() => {
      snowEl.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(snowEl)) {
          document.body.removeChild(snowEl);
        }
      }, CONFIG.duration * 1000);
    }, CONFIG.duration * 1000);
  });
})();