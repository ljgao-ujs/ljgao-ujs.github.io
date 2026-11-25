// Playback-only task illustrations. No microphone, uploads, or model inference.
(() => {
  const audio = document.querySelector('#detection-audio');
  const timeline = document.querySelector('#event-timeline');
  const status = document.querySelector('#detection-status');
  const blocks = [...timeline.querySelectorAll('.event-block')];
  function updateTimeline() {
    const time = audio.currentTime || 0;
    timeline.style.setProperty('--playback', `${Math.min(100, time / 6 * 100)}%`);
    const active = new Set();
    blocks.forEach(block => {
      const on = time >= Number(block.dataset.start) && time < Number(block.dataset.end);
      block.classList.toggle('is-active', on);
      if (on) active.add(block.classList.contains('event-tone') ? '提示音' : '节奏声');
    });
    let text;
    if (audio.ended) text = '播放结束，可以拖动音频进度条重新试听。';
    else if (audio.paused) text = time ? '已暂停，可拖动音频进度条对照标注。' : '点击播放，对照声音与时间标注。';
    else text = active.size ? `当前预设事件：${[...active].join(' + ')}` : '当前区间：无预设声音事件';
    if (status.textContent !== text) status.textContent = text;
  }
  ['timeupdate', 'play', 'pause', 'seeked', 'ended', 'loadedmetadata'].forEach(event => audio.addEventListener(event, updateTimeline));
  // Keep comparisons clear: a new playback pauses the other demo tracks.
  const players = [...document.querySelectorAll('#demos audio')];
  players.forEach(player => {
    player.addEventListener('play', () => players.forEach(other => { if (other !== player) other.pause(); }));
    player.addEventListener('error', () => {
      let message = player.nextElementSibling;
      if (!message?.classList.contains('audio-error')) {
        message = document.createElement('p');
        message.className = 'audio-error';
        message.setAttribute('role', 'status');
        player.after(message);
      }
      message.textContent = '音频暂时无法加载，请刷新页面后重试。';
    });
  });
})();
