const images = document.querySelectorAll('.avatar-name img');
const viewer = document.getElementById('imageViewer');
const viewerImage = document.getElementById('viewerImage');
const imageArray = Array.from(images);
let currentIndex = 0;

images.forEach((img, index) => {
  img.addEventListener('click', () => {
    viewerImage.src = img.src;
    viewer.style.display = 'flex';
    currentIndex = index;
  });
});

function closeImageViewer() {
  viewer.style.display = 'none';
  viewerImage.style.transform = 'scale(1)';
}

function navigateImage(direction) {
  currentIndex = (currentIndex + direction + imageArray.length) % imageArray.length;
  viewerImage.src = imageArray[currentIndex].src;
  viewerImage.style.transform = 'scale(1)';
}

let initialDistance = null;
let scale = 1;

viewer.addEventListener('touchstart', (e) => {
  if (e.touches.length === 2) {
    e.preventDefault();
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    initialDistance = Math.sqrt(dx * dx + dy * dy);
  }
}, { passive: false });

viewer.addEventListener('touchmove', (e) => {
  if (e.touches.length === 2 && initialDistance) {
    e.preventDefault();
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    const newDistance = Math.sqrt(dx * dx + dy * dy);
    scale = newDistance / initialDistance;
    viewerImage.style.transform = `scale(${Math.max(1, scale)})`;
  }
}, { passive: false });

viewer.addEventListener('touchend', () => {
  initialDistance = null;
  if (scale <= 1.1) {
    scale = 1;
    viewerImage.style.transform = 'scale(1)';
  }
});

const cards = document.querySelectorAll('.card');
const dotContainer = document.getElementById('dotContainer');
let currentCard = 0;

function showCard(index) {
  cards.forEach((card, i) => {
    card.classList.toggle('show', i === index);
  });
  updateDots(index);
}

function updateDots(index) {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function nextCard() {
  currentCard = (currentCard + 1) % cards.length;
  showCard(currentCard);
}

cards.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  dot.addEventListener('click', () => {
    currentCard = index;
    showCard(currentCard);
  });
  dotContainer.appendChild(dot);
});

document.getElementById('nextBtn').addEventListener('click', nextCard);

showCard(currentCard);
setInterval(nextCard, 7000);
