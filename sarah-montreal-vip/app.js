export const WHOP_CONFIG = {
  planId: 'plan_sarah_vip_999',
  priceUsd: 9.99,
  anchorPriceUsd: 49,
  merchantName: 'Sarah Montreal VIP',
  storageKey: 'sarah_vip_access_v1',
  telegramInviteUrl: 'https://t.me/+SarahMontrealVIPVault',
};

export const VAULT_FOLDERS = [
  {
    id: 'bedroom',
    code: '01',
    title: '01. Bedroom Morning Set',
    photos: 28,
    videos: 4,
    total: 32,
    sizeLabel: '1.3 GB ZIP',
    cover: './assets/sarah-12.jpg',
  },
  {
    id: 'cheer',
    code: '02',
    title: '02. Dallas Cheer Edition',
    photos: 22,
    videos: 4,
    total: 26,
    sizeLabel: '1.1 GB ZIP',
    cover: './assets/sarah-9.jpg',
  },
  {
    id: 'studio',
    code: '03',
    title: '03. Studio & Mirror Archive',
    photos: 35,
    videos: 6,
    total: 41,
    sizeLabel: '1.8 GB ZIP',
    cover: './assets/sarah-11.jpg',
  },
];

export const STORY_SLIDES = [
  {
    index: 0,
    caption: 'Free Preview 1 of 4 · Bedroom Morning Set',
    image: './assets/sarah-10.jpg',
    isVideo: false,
  },
  {
    index: 1,
    caption: 'Free Preview 2 of 4 · 0:15 Dallas Cheer Clip',
    image: './assets/sarah-9.jpg',
    isVideo: true,
  },
  {
    index: 2,
    caption: 'Free Preview 3 of 4 · Studio Editorial',
    image: './assets/sarah-7.jpg',
    isVideo: false,
  },
  {
    index: 3,
    caption: 'Preview 4 of 4 · +85 Photos & 14 Videos in Full Archive',
    image: './assets/sarah-12.jpg',
    isVideo: false,
  },
];

export const VAULT_ITEMS = [
  {
    id: 'cheer-video-1',
    folder: 'cheer',
    type: 'video',
    badge: '4K VIDEO · 18:45',
    title: '02. Dallas Cheer Video',
    subtitle: 'Full 4K Feature · 18m 45s · Unlocked',
    cover: './assets/sarah-9.jpg',
    photos: ['./assets/sarah-9.jpg', './assets/sarah-8.jpg'],
  },
  {
    id: 'studio-video-1',
    folder: 'studio',
    type: 'video',
    badge: 'HD VIDEO · 12:10',
    title: '03. Studio Editorial Reel',
    subtitle: 'Full Behind-the-Scenes Reel · 12m 10s · Unlocked',
    cover: './assets/sarah-11.jpg',
    photos: ['./assets/sarah-11.jpg', './assets/sarah-5.jpg'],
  },
  {
    id: 'bedroom-gallery-1',
    folder: 'bedroom',
    type: 'gallery',
    badge: 'PHOTO GALLERY · 28 PICS',
    actionLabel: '🖼️ Open 28 Photos',
    title: '01. Bedroom Morning Set',
    subtitle: '28 Unedited High-Res Photos + 4 Clips',
    cover: './assets/sarah-12.jpg',
    photos: [
      './assets/sarah-12.jpg',
      './assets/sarah-10.jpg',
      './assets/sarah-4.jpg',
      './assets/sarah-6.jpg',
    ],
  },
  {
    id: 'studio-gallery-1',
    folder: 'studio',
    type: 'gallery',
    badge: 'PHOTO GALLERY · 35 PICS',
    actionLabel: '🖼️ Open 35 Photos',
    title: '03. Full Camera Roll',
    subtitle: '35 High-Res Photos + 6 Mirror & Studio Videos',
    cover: './assets/sarah-7.jpg',
    photos: [
      './assets/sarah-7.jpg',
      './assets/sarah-3.jpg',
      './assets/sarah-2.jpg',
      './assets/sarah-1.jpg',
    ],
  },
];

export function validateEmail(rawEmail) {
  if (typeof rawEmail !== 'string') return false;
  const trimmed = rawEmail.trim();
  if (!trimmed) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}

export function filterVaultItems(folderId = 'all') {
  if (!folderId || folderId === 'all') {
    return [...VAULT_ITEMS];
  }
  return VAULT_ITEMS.filter((item) => item.folder === folderId);
}

export function createVaultReceipt(email, method = 'card', baseUrl = 'https://sarahmontreal.vip/') {
  const cleanEmail = (email || '').trim() || 'vip.buyer@sarahmontreal.vip';
  const token = Math.random().toString(36).slice(2, 10);
  const receiptId = `whop_${token}`;
  let magicUrl = `${baseUrl}?vault=unlocked&receipt=${receiptId}`;
  try {
    const u = new URL(baseUrl);
    u.searchParams.set('vault', 'unlocked');
    u.searchParams.set('receipt', receiptId);
    magicUrl = u.toString();
  } catch {
    // Fallback string concatenation already set
  }

  return {
    unlocked: true,
    email: cleanEmail,
    method,
    amountUsd: WHOP_CONFIG.priceUsd,
    statementDescriptor: WHOP_CONFIG.merchantName,
    receiptId,
    unlockedAt: new Date().toISOString(),
    magicUrl,
  };
}

export function initSarahVipApp(doc = globalThis.document, win = globalThis.window) {
  if (!doc) return null;

  const landingView = doc.getElementById('landing-view');
  const vaultView = doc.getElementById('vault-view');
  const storyLightbox = doc.getElementById('story-lightbox');
  const checkoutSheet = doc.getElementById('checkout-sheet');
  const restoreModal = doc.getElementById('restore-modal');
  const mediaViewerModal = doc.getElementById('media-viewer-modal');

  const openCheckoutBtn = doc.getElementById('open-checkout-btn');
  const closeCheckoutBtn = doc.getElementById('close-checkout-btn');
  const applePayBtn = doc.getElementById('apple-pay-btn');
  const cashappPayBtn = doc.getElementById('cashapp-pay-btn');
  const checkoutForm = doc.getElementById('checkout-form');
  const checkoutEmailInput = doc.getElementById('checkout-email');
  const checkoutError = doc.getElementById('checkout-error');

  const restoreAccessBtn = doc.getElementById('restore-access-btn');
  const closeRestoreBtn = doc.getElementById('close-restore-btn');
  const restoreEmailInput = doc.getElementById('restore-email-input');
  const restoreSubmitBtn = doc.getElementById('restore-submit-btn');
  const restoreError = doc.getElementById('restore-error');

  const closeStoryBtn = doc.getElementById('close-story-btn');
  const storyPrevBtn = doc.getElementById('story-prev-btn');
  const storyNextBtn = doc.getElementById('story-next-btn');
  const storyUnlockBtn = doc.getElementById('story-unlock-btn');
  const storySlideImg = doc.getElementById('story-slide-img');
  const storySlideCaption = doc.getElementById('story-slide-caption');
  const storyVideoBadge = doc.getElementById('story-video-badge');
  const storyProgressBars = doc.getElementById('story-progress-bars');

  const copyVaultLinkBtn = doc.getElementById('copy-vault-link-btn');
  const downloadZipBtn = doc.getElementById('download-zip-btn');
  const vaultEmailDisplay = doc.getElementById('vault-email-display');
  const vaultFilterBar = doc.getElementById('vault-filter-bar');
  const vaultGrid = doc.getElementById('vault-grid');

  const closeMediaModalBtn = doc.getElementById('close-media-modal-btn');
  const mediaModalTitle = doc.getElementById('media-modal-title');
  const mediaModalSubtitle = doc.getElementById('media-modal-subtitle');
  const mediaModalImg = doc.getElementById('media-modal-img');
  const mediaModalActions = doc.getElementById('media-modal-actions');

  let currentStoryIndex = 0;
  let currentFolderFilter = 'all';
  let activeReceipt = null;

  function renderStorySlide(index) {
    const total = STORY_SLIDES.length;
    currentStoryIndex = ((index % total) + total) % total;
    const slide = STORY_SLIDES[currentStoryIndex];
    if (storySlideImg) storySlideImg.src = slide.image;
    if (storySlideCaption) storySlideCaption.textContent = slide.caption;
    if (storyVideoBadge) storyVideoBadge.hidden = !slide.isVideo;
    if (storyProgressBars) {
      const bars = storyProgressBars.querySelectorAll('.story-bar');
      bars.forEach((bar, idx) => {
        bar.classList.toggle('active', idx <= currentStoryIndex);
      });
    }
  }

  function openStoryLightbox(startIndex = 0) {
    renderStorySlide(startIndex);
    if (storyLightbox) storyLightbox.hidden = false;
  }

  function closeStoryLightbox() {
    if (storyLightbox) storyLightbox.hidden = true;
  }

  function openCheckoutSheet() {
    closeStoryLightbox();
    if (checkoutError) {
      checkoutError.hidden = true;
      checkoutError.textContent = '';
    }
    if (checkoutSheet) checkoutSheet.hidden = false;
  }

  function closeCheckoutSheet() {
    if (checkoutSheet) checkoutSheet.hidden = true;
  }

  function openRestoreModal() {
    if (restoreError) {
      restoreError.hidden = true;
      restoreError.textContent = '';
    }
    if (restoreModal) restoreModal.hidden = false;
  }

  function closeRestoreModal() {
    if (restoreModal) restoreModal.hidden = true;
  }

  function closeMediaModal() {
    if (mediaViewerModal) mediaViewerModal.hidden = true;
  }

  function openMediaItemModal(item) {
    if (!mediaViewerModal) return;
    let photoIdx = 0;
    const photos = item.photos && item.photos.length ? item.photos : [item.cover];

    if (mediaModalTitle) mediaModalTitle.textContent = item.title;
    if (mediaModalSubtitle) mediaModalSubtitle.textContent = item.subtitle;
    if (mediaModalImg) mediaModalImg.src = photos[0];

    if (mediaModalActions) {
      mediaModalActions.innerHTML = '';
      if (photos.length > 1) {
        const nextPhotoBtn = doc.createElement('button');
        nextPhotoBtn.type = 'button';
        nextPhotoBtn.className = 'delivery-btn btn-telegram';
        nextPhotoBtn.style.flex = '1';
        nextPhotoBtn.textContent = `Next Photo (1/${photos.length}) →`;
        nextPhotoBtn.addEventListener('click', () => {
          photoIdx = (photoIdx + 1) % photos.length;
          if (mediaModalImg) mediaModalImg.src = photos[photoIdx];
          nextPhotoBtn.textContent = `Next Photo (${photoIdx + 1}/${photos.length}) →`;
        });
        mediaModalActions.appendChild(nextPhotoBtn);
      }

      const saveBtn = doc.createElement('a');
      saveBtn.href = photos[0];
      saveBtn.download = `${item.id}.jpg`;
      saveBtn.className = 'delivery-btn btn-zip';
      saveBtn.style.flex = '1';
      saveBtn.textContent = item.type === 'video' ? '📥 Save 4K Video' : '📥 Save Full Folder ZIP';
      mediaModalActions.appendChild(saveBtn);
    }

    mediaViewerModal.hidden = false;
  }

  function openZipDownloadModal() {
    if (!mediaViewerModal) return;
    if (mediaModalTitle) mediaModalTitle.textContent = '📥 Download VIP Archive (.ZIP)';
    if (mediaModalSubtitle) {
      mediaModalSubtitle.textContent = 'Choose full 4.2 GB master archive or individual mobile-friendly folders';
    }
    if (mediaModalImg) mediaModalImg.src = './assets/sarah-12.jpg';

    if (mediaModalActions) {
      mediaModalActions.innerHTML = '';
      VAULT_FOLDERS.forEach((folder) => {
        const link = doc.createElement('a');
        link.href = folder.cover;
        link.download = `Sarah-Montreal-${folder.code}-${folder.id}.jpg`;
        link.className = 'delivery-btn btn-zip';
        link.style.width = '100%';
        link.textContent = `📁 ${folder.title} (${folder.sizeLabel})`;
        mediaModalActions.appendChild(link);
      });
    }

    mediaViewerModal.hidden = false;
  }

  function renderVaultGrid(folderId = 'all') {
    currentFolderFilter = folderId;
    if (!vaultGrid) return;
    const items = filterVaultItems(folderId);
    vaultGrid.innerHTML = '';

    items.forEach((item) => {
      const card = doc.createElement('button');
      card.type = 'button';
      card.className = 'vault-media-card';
      card.setAttribute('data-item-id', item.id);
      card.setAttribute('data-folder-id', item.folder);
      card.setAttribute('data-media-type', item.type);

      const centerControl =
        item.type === 'video'
          ? '<div class="vault-play-circle" aria-hidden="true">▶</div>'
          : `<div class="vault-gallery-pill">${item.actionLabel || '🖼️ Open Photos'}</div>`;

      card.innerHTML = `
        <img src="${item.cover}" alt="${item.title}" />
        <div class="vault-card-overlay">
          <span class="vault-type-badge ${item.type === 'video' ? 'badge-video' : 'badge-gallery'}">${item.badge}</span>
          ${centerControl}
          <div class="vault-card-title">${item.title}</div>
        </div>
      `;

      card.addEventListener('click', () => openMediaItemModal(item));
      vaultGrid.appendChild(card);
    });

    if (vaultFilterBar) {
      const pills = vaultFilterBar.querySelectorAll('.filter-pill');
      pills.forEach((pill) => {
        const isMatch = pill.getAttribute('data-folder') === folderId;
        pill.classList.toggle('active', isMatch);
        pill.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });
    }
  }

  function unlockVault(email, method = 'card') {
    const href = win && win.location ? win.location.href : 'https://sarahmontreal.vip/';
    const receipt = createVaultReceipt(email, method, href);
    activeReceipt = receipt;

    try {
      if (win && win.localStorage) {
        win.localStorage.setItem(WHOP_CONFIG.storageKey, JSON.stringify(receipt));
      }
      if (win && win.history && typeof win.history.replaceState === 'function') {
        const url = new URL(win.location.href);
        url.searchParams.set('vault', 'unlocked');
        url.searchParams.set('receipt', receipt.receiptId);
        win.history.replaceState({ vault: 'unlocked' }, '', url.toString());
      }
    } catch {
      // Ignore storage or history errors in restricted environments
    }

    closeCheckoutSheet();
    closeRestoreModal();
    closeStoryLightbox();

    if (landingView) landingView.hidden = true;
    if (vaultView) vaultView.hidden = false;
    if (vaultEmailDisplay) {
      vaultEmailDisplay.textContent = `Emailed to ${receipt.email}`;
    }

    renderVaultGrid('all');
    return receipt;
  }

  // Bind Teaser Cards
  const teaserCards = doc.querySelectorAll('.teaser-card');
  teaserCards.forEach((card) => {
    card.addEventListener('click', () => {
      const type = card.getAttribute('data-teaser');
      if (type === 'locked-vault') {
        openCheckoutSheet();
      } else {
        const idx = Number(card.getAttribute('data-slide-index') || 0);
        openStoryLightbox(idx);
      }
    });
  });

  // Bind Story Lightbox Controls
  if (closeStoryBtn) closeStoryBtn.addEventListener('click', closeStoryLightbox);
  if (storyPrevBtn) storyPrevBtn.addEventListener('click', () => renderStorySlide(currentStoryIndex - 1));
  if (storyNextBtn) storyNextBtn.addEventListener('click', () => renderStorySlide(currentStoryIndex + 1));
  if (storyUnlockBtn) storyUnlockBtn.addEventListener('click', openCheckoutSheet);

  // Bind Checkout Sheet Controls
  if (openCheckoutBtn) openCheckoutBtn.addEventListener('click', openCheckoutSheet);
  if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', closeCheckoutSheet);

  if (applePayBtn) {
    applePayBtn.addEventListener('click', () => {
      const typedEmail = checkoutEmailInput ? checkoutEmailInput.value.trim() : '';
      const finalEmail = validateEmail(typedEmail) ? typedEmail : 'applepay.vip@sarahmontreal.vip';
      unlockVault(finalEmail, 'apple_pay');
    });
  }

  if (cashappPayBtn) {
    cashappPayBtn.addEventListener('click', () => {
      const typedEmail = checkoutEmailInput ? checkoutEmailInput.value.trim() : '';
      const finalEmail = validateEmail(typedEmail) ? typedEmail : 'cashapp.vip@sarahmontreal.vip';
      unlockVault(finalEmail, 'cash_app_pay');
    });
  }

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailVal = checkoutEmailInput ? checkoutEmailInput.value : '';
      if (!validateEmail(emailVal)) {
        if (checkoutError) {
          checkoutError.textContent = 'Please enter a valid email address for your backup ZIP & Telegram link.';
          checkoutError.hidden = false;
        }
        return;
      }
      if (checkoutError) checkoutError.hidden = true;
      unlockVault(emailVal.trim(), 'card');
    });
  }

  // Bind Restore Access Modal
  if (restoreAccessBtn) restoreAccessBtn.addEventListener('click', openRestoreModal);
  if (closeRestoreBtn) closeRestoreBtn.addEventListener('click', closeRestoreModal);
  if (restoreSubmitBtn) {
    restoreSubmitBtn.addEventListener('click', () => {
      const emailVal = restoreEmailInput ? restoreEmailInput.value : '';
      if (!validateEmail(emailVal)) {
        if (restoreError) {
          restoreError.textContent = 'Please enter the valid email address used during checkout.';
          restoreError.hidden = false;
        }
        return;
      }
      if (restoreError) restoreError.hidden = true;
      unlockVault(emailVal.trim(), 'restored');
    });
  }

  // Bind Copy Link Button (Upgrade #4: Instagram Webview Survival)
  if (copyVaultLinkBtn) {
    copyVaultLinkBtn.addEventListener('click', async () => {
      copyVaultLinkBtn.textContent = '✓ Link Copied!';
      const linkToCopy =
        (activeReceipt && activeReceipt.magicUrl) ||
        (win && win.location ? `${win.location.origin}${win.location.pathname}?vault=unlocked` : 'https://sarahmontreal.vip/?vault=unlocked');
      try {
        if (win && win.navigator && win.navigator.clipboard && win.navigator.clipboard.writeText) {
          await win.navigator.clipboard.writeText(linkToCopy);
        }
      } catch {
        // Fallback if clipboard API restricted
      }
    });
  }

  // Bind ZIP Download Button & Media Modal Close
  if (downloadZipBtn) downloadZipBtn.addEventListener('click', openZipDownloadModal);
  if (closeMediaModalBtn) closeMediaModalBtn.addEventListener('click', closeMediaModal);

  // Bind Folder Filter Pills
  if (vaultFilterBar) {
    const pills = vaultFilterBar.querySelectorAll('.filter-pill');
    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        const folder = pill.getAttribute('data-folder') || 'all';
        renderVaultGrid(folder);
      });
    });
  }

  // Backdrop tap & Escape key dismissal
  [storyLightbox, checkoutSheet, restoreModal, mediaViewerModal].forEach((backdrop) => {
    if (!backdrop) return;
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.hidden = true;
      }
    });
  });

  if (doc.addEventListener) {
    doc.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeStoryLightbox();
        closeCheckoutSheet();
        closeRestoreModal();
        closeMediaModal();
      }
    });
  }

  // Boot check: auto-restore if URL has ?vault=unlocked or localStorage has receipt
  try {
    const search = win && win.location ? win.location.search : '';
    const params = new URLSearchParams(search);
    const savedRaw = win && win.localStorage ? win.localStorage.getItem(WHOP_CONFIG.storageKey) : null;
    if (params.get('vault') === 'unlocked' || params.get('status') === 'succeeded' || savedRaw) {
      const parsed = savedRaw ? JSON.parse(savedRaw) : null;
      unlockVault((parsed && parsed.email) || 'vip.fan@gmail.com', (parsed && parsed.method) || 'persisted');
    } else {
      renderVaultGrid('all');
    }
  } catch {
    renderVaultGrid('all');
  }

  return {
    openStoryLightbox,
    closeStoryLightbox,
    openCheckoutSheet,
    closeCheckoutSheet,
    openRestoreModal,
    closeRestoreModal,
    unlockVault,
    renderVaultGrid,
    getCurrentStoryIndex: () => currentStoryIndex,
    getCurrentFolderFilter: () => currentFolderFilter,
  };
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  initSarahVipApp(document, window);
}
