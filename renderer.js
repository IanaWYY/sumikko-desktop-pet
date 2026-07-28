/**
 * Sumikko Gurashi Desktop Pet - Renderer Logic & Interaction Engine (Pixel Art & English UI)
 */

class SumikkoPet {
  constructor() {
    this.currentCharacterKey = 'shirokuma';
    this.state = 'idle'; // idle | hover | click | drag | corner
    this.isCornerMode = false;
    this.soundEnabled = true;
    this.isTinySize = true; // true = 1/4th (68px), false = Normal (96px)

    // Drag tracking
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.clickTimer = null;

    // DOM Elements
    this.container = document.getElementById('character-container');
    this.svgWrapper = document.getElementById('svg-wrapper');
    this.bubble = document.getElementById('dialogue-bubble');
    this.bubbleText = document.getElementById('bubble-text');
    this.contextMenu = document.getElementById('context-menu');
    this.selectorModal = document.getElementById('selector-modal');
    this.characterGrid = document.getElementById('character-grid');
    this.canvas = document.getElementById('particle-canvas');
    this.ctx = this.canvas.getContext('2d');

    // Particle System
    this.particles = [];
    
    // Audio Context
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    this.init();
  }

  init() {
    this.setupCanvas();
    this.renderCharacter();
    this.setupEventListeners();
    this.populateModalGrid();
    this.startIdleTimer();
    this.startParticleLoop();
    this.setupMouseEventsForwarding();
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
    this.container.className = `character-container ${actionState} ${sizeClass}`;
    this.svgWrapper.innerHTML = charDef.svg(actionState);
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
    if (!this.soundEnabled || !this.audioCtx) return;
    try {
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
  }

  startParticleLoop() {
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
      requestAnimationFrame(render);
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
    this.container.addEventListener('mouseenter', () => {
      if (!this.isDragging) {
        this.container.classList.add('hover');
      }
    });

    this.container.addEventListener('mouseleave', () => {
      this.container.classList.remove('hover');
    });

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

    document.getElementById('btn-trigger-action').addEventListener('click', () => {
      this.hideContextMenu();
      this.triggerAction();
    });

    document.getElementById('btn-toggle-size').addEventListener('click', () => {
      this.isTinySize = !this.isTinySize;
      document.getElementById('text-pet-size').innerText = `Size: ${this.isTinySize ? 'Tiny (1/4th)' : 'Normal'}`;
      this.renderCharacter();
      this.showDialogue(`Switched size to ${this.isTinySize ? 'Tiny' : 'Normal'}!`, 3000);
      this.hideContextMenu();
    });

    document.getElementById('btn-corner-mode').addEventListener('click', () => {
      this.hideContextMenu();
      this.toggleCornerMode();
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
    this.state = 'click';
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

  toggleCornerMode() {
    this.isCornerMode = !this.isCornerMode;
    const btnText = document.getElementById('text-corner-mode');
    btnText.innerText = this.isCornerMode ? 'Unstick Corner' : 'Stick to Corner';

    if (this.isCornerMode) {
      this.showDialogue('Stuck to the corner tight!', 3000);
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
    Object.keys(window.SumikkoCharacters).forEach((key) => {
      const char = window.SumikkoCharacters[key];
      const card = document.createElement('div');
      card.className = `grid-card ${key === this.currentCharacterKey ? 'active' : ''}`;
      card.innerHTML = `
        <div class="grid-card-svg">${char.svg('idle')}</div>
        <span class="grid-card-name">${char.name.split(' ')[0]}</span>
      `;
      card.addEventListener('click', () => {
        this.switchCharacter(key);
        this.hideModal();
      });
      this.characterGrid.appendChild(card);
    });
  }

  switchCharacter(key) {
    if (!window.SumikkoCharacters[key]) return;
    this.currentCharacterKey = key;
    this.renderCharacter('idle');
    this.populateModalGrid();
    
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
