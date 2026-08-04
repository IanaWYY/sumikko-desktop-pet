/**
 * Sumikko Gurashi Desktop Pet - Renderer Logic & Interaction Engine (Pixel Art & English UI)
 */

class SumikkoPet {
  constructor() {
    this.currentCharacterKey = 'shirokuma';
    this.state = 'idle'; // idle | hover | click | drag
    this.soundEnabled = true;
    this.isTinySize = true; // true = 1/4th (68px), false = Normal (96px)
    this.opacity = Number(localStorage.getItem('sumikko-opacity') || 1);
    this.clickCounts = JSON.parse(localStorage.getItem('sumikko-click-counts') || '{}');
    this.opacityEditing = false;
    this.opacityConfirmTimer = null;

    // Drag tracking
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.clickTimer = null;

    // DOM Elements
    this.container = document.getElementById('character-container');
    this.petApp = document.getElementById('pet-app');
    this.svgWrapper = document.getElementById('svg-wrapper');
    this.bubble = document.getElementById('dialogue-bubble');
    this.bubbleText = document.getElementById('bubble-text');
    this.contextMenu = document.getElementById('context-menu');
    this.opacityEditor = document.getElementById('opacity-editor');
    this.opacityEditorSlider = document.getElementById('opacity-editor-slider');
    this.opacityEditorValue = document.getElementById('opacity-editor-value');
    this.selectorModal = document.getElementById('selector-modal');
    this.characterGrid = document.getElementById('character-grid');
    this.canvas = document.getElementById('particle-canvas');
    this.ctx = this.canvas.getContext('2d');

    // Particle System
    this.particles = [];
    
    // Audio Context
    this.audioCtx = null;
    this.particleFrameId = null;
    this.particleLoopRunning = false;

    this.init();
  }

  init() {
    this.setupCanvas();
    this.applyOpacity();
    this.renderCharacter();
    this.setupEventListeners();
    this.populateModalGrid();
    this.startIdleTimer();
    this.setupMouseEventsForwarding();
    this.updateClickCountLabel();
    this.junimoVariantTimer = setInterval(() => {
      if (this.currentCharacterKey !== 'junimo') return;
      window.SumikkoCharacters.junimo.variant = Math.floor(Math.random() * 4);
      this.renderCharacter();
    }, 7000);
  }

  setupCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });
  }

  // Pass mouse events through transparent canvas when not hovering interactive items
  setupMouseEventsForwarding() {
    if (!window.electronAPI || !window.electronAPI.setIgnoreMouseEvents) return;
    
    const setIgnore = (ignore) => {
      window.electronAPI.setIgnoreMouseEvents(ignore, { forward: true });
    };

    this.container.addEventListener('mouseenter', () => setIgnore(false));
    this.contextMenu.addEventListener('mouseenter', () => setIgnore(false));
    this.selectorModal.addEventListener('mouseenter', () => setIgnore(false));
  }

  renderCharacter(actionState = this.state) {
    const charDef = window.SumikkoCharacters[this.currentCharacterKey];
    if (!charDef) return;

    const sizeClass = this.isTinySize ? 'size-tiny' : 'size-normal';
    const hoverMotion = this.getHoverMotionClass();
    this.container.className = `character-container ${actionState} ${sizeClass} ${hoverMotion}`;
    this.svgWrapper.innerHTML = charDef.svg(actionState);
    this.svgWrapper.style.transform = this.currentCharacterKey === 'junimo' ? 'scale(0.72)' : 'scale(1)';
  }

  getHoverMotionClass() {
    const motionMap = {
      shirokuma: 'hover-hop', penguin: 'hover-expression', tonkatsu: 'hover-roll',
      neko: 'hover-expression', tokage: 'hover-hop', ebifurai: 'hover-hop',
      tapioca: 'hover-roll', nisetsumuri: 'hover-roll', zassou: 'hover-hop',
      hokori: 'hover-expression', obake: 'hover-roll', yama: 'hover-hop',
      junimo: 'hover-expression', hoe: 'hover-roll', axe: 'hover-hop', wateringCan: 'hover-expression',
      scythe: 'hover-roll', pickaxe: 'hover-hop', fishingRod: 'hover-expression', chest: 'hover-hop', mushroomTree: 'hover-hop', fish: 'hover-expression', luckyPurpleShorts: 'hover-roll', strawberry: 'hover-hop', fiddleheadFern: 'hover-expression'
    };
    return motionMap[this.currentCharacterKey] || 'hover-hop';
  }

  applyOpacity() {
    this.container.style.opacity = this.opacity;
    this.bubble.style.opacity = this.opacity;
    if (this.opacityEditorSlider) this.opacityEditorSlider.value = Math.round(this.opacity * 100);
    if (this.opacityEditorValue) this.opacityEditorValue.innerText = `${Math.round(this.opacity * 100)}%`;
  }

  showOpacityEditor() {
    this.hideContextMenu();
    this.opacityEditing = true;
    this.opacityEditor.classList.remove('opacity-editor-hidden');
    this.applyOpacity();
    this.resetOpacityConfirmTimer();
  }

  resetOpacityConfirmTimer() {
    if (this.opacityConfirmTimer) clearTimeout(this.opacityConfirmTimer);
    this.opacityConfirmTimer = setTimeout(() => {
      this.opacityEditing = false;
      this.opacityEditor.classList.add('opacity-editor-hidden');
      this.opacityConfirmTimer = null;
    }, 3000);
  }

  updateClickCountLabel() {
    const count = this.clickCounts[this.currentCharacterKey] || 0;
    const label = document.getElementById('text-click-count');
    if (label) label.innerText = `Clicks: ${count}`;
  }

  showDialogue(text, duration = 3000) {
    if (!text) return;
    this.bubbleText.innerText = text;
    this.bubble.classList.remove('bubble-hidden');

    if (this.bubbleTimer) clearTimeout(this.bubbleTimer);
    this.bubbleTimer = setTimeout(() => {
      this.bubble.classList.add('bubble-hidden');
    }, duration);
  }

  // --- Sound Effects Synthesizer ---
  playSound(type = 'pop') {
    if (!this.soundEnabled) return;
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      if (type === 'pop') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.exponentialRampToValueAtTime(700, now + 0.06);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === 'crunch') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(500, now);
        osc.frequency.setValueAtTime(350, now + 0.04);
        osc.frequency.setValueAtTime(600, now + 0.08);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'drink') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.1);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'sparkle') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(1400, now + 0.15);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch (e) {}
  }

  // --- Particles Engine ---
  spawnParticles(type = 'stars') {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    for (let i = 0; i < 8; i++) {
      this.particles.push({
        x: cx + (Math.random() - 0.5) * 30,
        y: cy + (Math.random() - 0.5) * 30,
        vx: (Math.random() - 0.5) * 3,
        vy: -Math.random() * 2 - 1,
        size: Math.random() * 4 + 2,
        color: type === 'hearts' ? '#FF69B4' : type === 'stars' ? '#FFD700' : '#81D4FA',
        alpha: 1,
        life: 0.03 + Math.random() * 0.02
      });
    }
    this.startParticleLoop();
  }

  startParticleLoop() {
    if (this.particleLoopRunning) return;
    this.particleLoopRunning = true;

    const render = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.life;

        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.globalAlpha = p.alpha;
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(p.x, p.y, p.size, p.size);
        this.ctx.restore();
      }
      if (this.particles.length > 0) {
        this.particleFrameId = requestAnimationFrame(render);
      } else {
        this.particleFrameId = null;
        this.particleLoopRunning = false;
      }
    };
    render();
  }

  // --- Event Handling ---
  setupEventListeners() {
    // 1. Mouse Drag & Click Handling
    this.container.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      this.hideContextMenu();

      this.isDragging = false;
      this.dragStartX = e.screenX;
      this.dragStartY = e.screenY;

      this.clickTimer = setTimeout(() => {
        this.isDragging = true;
        this.state = 'drag';
        this.renderCharacter('drag');
        const charDef = window.SumikkoCharacters[this.currentCharacterKey];
        if (charDef.dialogues.drag) {
          this.showDialogue(charDef.dialogues.drag[Math.floor(Math.random() * charDef.dialogues.drag.length)]);
        }
      }, 150);

      const onMouseMove = (moveEvt) => {
        const deltaX = moveEvt.screenX - this.dragStartX;
        const deltaY = moveEvt.screenY - this.dragStartY;

        if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
          this.isDragging = true;
          this.state = 'drag';
          this.renderCharacter('drag');
          if (window.electronAPI) {
            window.electronAPI.moveWindow({ mouseX: deltaX, mouseY: deltaY });
          }
          this.dragStartX = moveEvt.screenX;
          this.dragStartY = moveEvt.screenY;
        }
      };

      const onMouseUp = () => {
        clearTimeout(this.clickTimer);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);

        if (!this.isDragging) {
          this.triggerAction();
        } else {
          this.state = 'idle';
          this.renderCharacter('idle');
          this.checkCornerPosition();
        }
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });

    // Hover states
    const startHover = () => {
      if (!this.isDragging) {
        this.container.classList.add('hover', 'hover-active');
        const charDef = window.SumikkoCharacters[this.currentCharacterKey];
        if (charDef.dialogues.hover && Math.random() > 0.35) {
          this.showDialogue(charDef.dialogues.hover[0], 1800);
        }
      }
    };

    const endHover = () => this.container.classList.remove('hover', 'hover-active');
    this.container.addEventListener('pointerenter', startHover);
    this.container.addEventListener('pointerleave', endHover);
    this.container.addEventListener('mouseenter', startHover);
    this.container.addEventListener('mouseleave', endHover);

    // Right-Click Context Menu
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.showContextMenu(e.clientX, e.clientY);
    });

    window.addEventListener('click', (e) => {
      if (!this.contextMenu.contains(e.target)) {
        this.hideContextMenu();
      }
    });

    // Context Menu Buttons
    document.getElementById('btn-select-char').addEventListener('click', () => {
      this.hideContextMenu();
      this.showModal();
    });

    document.getElementById('btn-toggle-size').addEventListener('click', () => {
      this.isTinySize = !this.isTinySize;
      document.getElementById('text-pet-size').innerText = `Size: ${this.isTinySize ? 'Tiny (1/4th)' : 'Normal'}`;
      this.renderCharacter();
      this.showDialogue(`Switched size to ${this.isTinySize ? 'Tiny' : 'Normal'}!`, 3000);
      this.hideContextMenu();
    });

    document.getElementById('btn-opacity').addEventListener('click', () => {
      this.showOpacityEditor();
    });

    this.opacityEditorSlider.addEventListener('input', (event) => {
      this.opacity = Number(event.target.value) / 100;
      localStorage.setItem('sumikko-opacity', String(this.opacity));
      this.applyOpacity();
      this.resetOpacityConfirmTimer();
    });

    document.getElementById('btn-sound-toggle').addEventListener('click', () => {
      this.soundEnabled = !this.soundEnabled;
      document.getElementById('text-sound').innerText = `Sound: ${this.soundEnabled ? 'ON' : 'OFF'}`;
      document.getElementById('icon-sound').innerText = this.soundEnabled ? '🔊' : '🔇';
      this.hideContextMenu();
    });

    document.getElementById('btn-hide-pet').addEventListener('click', () => {
      this.hideContextMenu();
      if (window.electronAPI) window.electronAPI.hideWindow();
    });

    // Clean Quit Pet
    document.getElementById('btn-quit-pet').addEventListener('click', () => {
      this.hideContextMenu();
      if (window.electronAPI) window.electronAPI.quitApp();
    });

    document.getElementById('modal-close-btn').addEventListener('click', () => {
      this.hideModal();
    });
  }

  triggerAction() {
    this.clickCounts[this.currentCharacterKey] = (this.clickCounts[this.currentCharacterKey] || 0) + 1;
    localStorage.setItem('sumikko-click-counts', JSON.stringify(this.clickCounts));
    this.updateClickCountLabel();
    this.state = 'click';
    if (this.currentCharacterKey === 'junimo') {
      const junimo = window.SumikkoCharacters.junimo;
      junimo.variant = (junimo.variant + 1) % 4;
    }
    if (this.currentCharacterKey === 'fish') {
      const fish = window.SumikkoCharacters.fish;
      fish.variant = (fish.variant + 1) % 5;
    }
    this.renderCharacter('click');

    const charDef = window.SumikkoCharacters[this.currentCharacterKey];
    if (charDef && charDef.dialogues.click) {
      const dialogue = charDef.dialogues.click[Math.floor(Math.random() * charDef.dialogues.click.length)];
      this.showDialogue(dialogue, 3000);
    }

    if (this.currentCharacterKey === 'shirokuma') {
      this.playSound('drink');
      this.spawnParticles('bubble');
    } else if (this.currentCharacterKey === 'penguin') {
      this.playSound('crunch');
      this.spawnParticles('stars');
    } else {
      this.playSound('sparkle');
      this.spawnParticles('stars');
    }

    setTimeout(() => {
      if (this.state === 'click') {
        this.state = 'idle';
        this.renderCharacter('idle');
      }
    }, 2500);
  }

  checkCornerPosition() {
    const charDef = window.SumikkoCharacters[this.currentCharacterKey];
    if (charDef.dialogues.corner && Math.random() > 0.4) {
      this.showDialogue(charDef.dialogues.corner[0], 3000);
    }
  }

  showContextMenu(x, y) {
    const menuWidth = 175;
    const menuMaxHeight = 185;

    let posX = Math.min(x, window.innerWidth - menuWidth - 5);
    let posY = Math.min(y, window.innerHeight - menuMaxHeight - 5);

    posX = Math.max(5, posX);
    posY = Math.max(5, posY);

    this.contextMenu.style.left = `${posX}px`;
    this.contextMenu.style.top = `${posY}px`;
    this.contextMenu.scrollTop = 0;
    this.contextMenu.classList.remove('menu-hidden');
  }

  hideContextMenu() {
    this.contextMenu.classList.add('menu-hidden');
  }

  populateModalGrid() {
    this.characterGrid.innerHTML = '';
    const groups = {};
    Object.keys(window.SumikkoCharacters).forEach((key) => {
      const char = window.SumikkoCharacters[key];
      const category = char.category || 'Sumikko Gurashi';
      if (!groups[category]) groups[category] = [];
      groups[category].push({ key, char });
    });
    Object.keys(groups).forEach((category) => {
      const section = document.createElement('section');
      section.className = 'character-category';
      section.innerHTML = `<h4 class="character-category-title">${category}</h4><div class="character-category-grid"></div>`;
      const grid = section.querySelector('.character-category-grid');
      groups[category].forEach(({ key, char }) => {
        const card = document.createElement('div');
        card.className = `grid-card ${key === this.currentCharacterKey ? 'active' : ''}`;
        card.innerHTML = `<div class="grid-card-svg">${char.svg('idle')}</div><span class="grid-card-name">${char.name.split(' ')[0]}</span>`;
        card.addEventListener('click', () => {
          this.switchCharacter(key);
          this.hideModal();
        });
        grid.appendChild(card);
      });
      this.characterGrid.appendChild(section);
    });
  }

  switchCharacter(key) {
    if (!window.SumikkoCharacters[key]) return;
    this.currentCharacterKey = key;
    if (key === 'junimo') {
      window.SumikkoCharacters.junimo.variant = Math.floor(Math.random() * 4);
    }
    this.renderCharacter('idle');
    this.populateModalGrid();
    this.updateClickCountLabel();
    
    const char = window.SumikkoCharacters[key];
    this.showDialogue(`Hello! I'm ${char.name}~`, 3000);
    this.playSound('pop');
    this.spawnParticles('stars');
  }

  showModal() {
    this.selectorModal.classList.remove('modal-hidden');
  }

  hideModal() {
    this.selectorModal.classList.add('modal-hidden');
  }

  startIdleTimer() {
    setInterval(() => {
      if (this.state === 'idle' && Math.random() < 0.35) {
        const charDef = window.SumikkoCharacters[this.currentCharacterKey];
        if (charDef && charDef.dialogues.idle) {
          const dialogue = charDef.dialogues.idle[Math.floor(Math.random() * charDef.dialogues.idle.length)];
          this.showDialogue(dialogue, 3000);
        }
      }
    }, 10000);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.petApp = new SumikkoPet();
});
