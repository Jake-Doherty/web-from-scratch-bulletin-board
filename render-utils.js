export function renderSticky(sticky) {
    const li = document.createElement('li');
    li.classList.add('sticky-note');

    const h4 = document.createElement('h4');
    h4.textContent = sticky.title;

    const span = document.createElement('span');
    span.classList.add('category');
    span.textContent = getCategoryEmoji(sticky.category);

    const p = document.createElement('p');
    p.classList.add('description');
    p.textContent = sticky.description;

    const img = document.createElement('img');
    img.classList.add('post-image');
    img.src = sticky.image_url;

    h4.append(span);

    li.append(h4, p, img);

    return li;
}

function getCategoryEmoji(category) {
    if (category === 'fluff') return '☁';
    if (category === 'info') return 'ℹ';
    if (category === 'pets') return '🐈';
    if (category === 'art') return '🖼';
    if (category === 'music') return '🎧';
}
