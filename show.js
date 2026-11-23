const viewer = document.querySelector('#viewer');
const viewerMedia = document.querySelector('#viewer-media');

function openMedia(item, type) {
  document.querySelector('#viewer-title').textContent = item.title;
  const tag = type === 'photo' ? 'img' : item.embed ? 'iframe' : 'video';
  const element = document.createElement(tag);
  element.src = item.src;

  if (tag === 'img') {
    element.alt = item.alt || item.title;
  } else if (tag === 'iframe') {
    element.title = item.title;
    element.allowFullscreen = true;
    element.allow = 'fullscreen; picture-in-picture; encrypted-media';
  } else {
    element.controls = true;
    element.playsInline = true;
    if (item.poster) element.poster = item.poster;
  }

  viewerMedia.replaceChildren(element);
  viewer.showModal();
}

viewer.addEventListener('close', () => viewerMedia.replaceChildren());
viewer.addEventListener('click', event => {
  if (event.target === viewer) viewer.close();
});

function renderMedia(items, container, type) {
  if (!items.length) return;

  const cards = items.map(item => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'media-card';
    const thumbnail = type === 'photo' ? item.src : item.poster;

    if (thumbnail) {
      const image = document.createElement('img');
      image.src = thumbnail;
      image.alt = '';
      image.loading = 'lazy';
      button.append(image);
    } else {
      const icon = document.createElement('span');
      icon.className = 'icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = '▷';
      button.append(icon);
    }

    const title = document.createElement('h3');
    title.textContent = item.title;
    button.append(title);
    button.addEventListener('click', () => openMedia(item, type));
    return button;
  });
  document.querySelector(container).replaceChildren(...cards);
}

renderMedia(window.dinoMedia.interviews, '#interview-list', 'interview');
renderMedia(window.dinoMedia.photos, '#photo-list', 'photo');
