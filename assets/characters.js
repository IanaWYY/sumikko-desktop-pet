/**
 * Sumikko Gurashi Official 1:1 Pixel-Art Character Engine
 * All text and dialogues in English.
 */

window.SumikkoCharacters = {
  // 1. Shirokuma (Polar Bear)
  shirokuma: {
    id: 'shirokuma',
    name: 'Shirokuma (Bear)',
    desc: 'A shy polar bear who hates the cold. Loves warm tea & furoshiki cloth.',
    color: '#ffffff',
    bgTheme: '#eef6ff',
    dialogues: {
      idle: ['The corner is so cozy...', 'I wish I had warm tea~', 'Staying safe here.'],
      click: ['Sip sip... Hot tea is so soothing! ☕', 'Warm and happy~'],
      drag: ['Brrr! So cold! Don\'t drop me!', 'Clinging to my cloth!'],
      corner: ['The corner is my favorite place!']
    },
    svg: (state = 'idle') => `
      <svg viewBox="0 0 32 32" width="100%" height="100%" shape-rendering="crispEdges">
        <!-- Shadow -->
        <rect x="7" y="29" width="18" height="2" fill="#D6D0C4"/>
        
        <!-- Main Body -->
        <rect x="8" y="10" width="16" height="19" fill="#FFFFFF"/>
        <rect x="6" y="14" width="20" height="13" fill="#FFFFFF"/>
        <rect x="10" y="8" width="12" height="2" fill="#FFFFFF"/>

        <!-- Outline -->
        <rect x="10" y="7" width="12" height="1" fill="#5A524C"/>
        <rect x="8" y="8" width="2" height="2" fill="#5A524C"/>
        <rect x="22" y="8" width="2" height="2" fill="#5A524C"/>
        <rect x="6" y="10" width="2" height="4" fill="#5A524C"/>
        <rect x="24" y="10" width="2" height="4" fill="#5A524C"/>
        <rect x="5" y="14" width="1" height="13" fill="#5A524C"/>
        <rect x="26" y="14" width="1" height="13" fill="#5A524C"/>
        <rect x="8" y="29" width="16" height="1" fill="#5A524C"/>

        <!-- Bear Ears -->
        <rect x="7" y="6" width="3" height="3" fill="#FFFFFF"/>
        <rect x="22" y="6" width="3" height="3" fill="#FFFFFF"/>
        <rect x="7" y="5" width="3" height="1" fill="#5A524C"/>
        <rect x="22" y="5" width="3" height="1" fill="#5A524C"/>
        <rect x="6" y="6" width="1" height="3" fill="#5A524C"/>
        <rect x="25" y="6" width="1" height="3" fill="#5A524C"/>

        <!-- Pink Blush -->
        <rect x="8" y="7" width="1" height="1" fill="#FFB6C1"/>
        <rect x="23" y="7" width="1" height="1" fill="#FFB6C1"/>
        <rect x="9" y="18" width="2" height="2" fill="#FFB6C1"/>
        <rect x="21" y="18" width="2" height="2" fill="#FFB6C1"/>

        <!-- Face Pixels -->
        <rect x="11" y="15" width="2" height="2" fill="#3D352E"/>
        <rect x="19" y="15" width="2" height="2" fill="#3D352E"/>
        <rect x="15" y="17" width="2" height="1" fill="#3D352E"/>

        ${state === 'click' ? `
          <!-- Hot Tea Cup -->
          <rect x="13" y="20" width="6" height="5" fill="#F0F4F8"/>
          <rect x="12" y="20" width="8" height="1" fill="#8D6E63"/>
          <rect x="12" y="21" width="1" height="4" fill="#5A524C"/>
          <rect x="19" y="21" width="1" height="4" fill="#5A524C"/>
          <rect x="13" y="25" width="6" height="1" fill="#5A524C"/>
          <!-- Steam -->
          <rect x="14" y="17" width="1" height="2" fill="#B0BEC5"/>
          <rect x="17" y="16" width="1" height="2" fill="#B0BEC5"/>
        ` : state === 'drag' ? `
          <!-- Furoshiki Sack -->
          <rect x="11" y="21" width="10" height="7" fill="#FFB74D"/>
          <rect x="13" y="23" width="2" height="2" fill="#FFFFFF"/>
          <rect x="17" y="24" width="2" height="2" fill="#FFFFFF"/>
        ` : `
          <!-- Side Furoshiki Bag -->
          <rect x="22" y="22" width="5" height="5" fill="#FFB74D"/>
          <rect x="23" y="23" width="1" height="1" fill="#FFFFFF"/>
          <rect x="25" y="25" width="1" height="1" fill="#FFFFFF"/>
        `}

        <rect x="10" y="28" width="3" height="1" fill="#D6D0C4"/>
        <rect x="19" y="28" width="3" height="1" fill="#D6D0C4"/>
      </svg>
    `
  },

  // 2. Penguin? (Kappa/Penguin)
  penguin: {
    id: 'penguin',
    name: 'Penguin?',
    desc: 'Unsure if he is a real penguin (might be a Kappa). Loves cucumbers & reading.',
    color: '#C5E1A5',
    bgTheme: '#f0f9eb',
    dialogues: {
      idle: ['Am I really a penguin...?', 'I want a crunchy cucumber.', 'Books & music are nice.'],
      click: ['Crunch crunch! Cucumbers are delicious! 🥒', 'Reading keeps me calm.'],
      drag: ['Whoa! Don\'t shake off my head plate!', 'Am I a Kappa after all?'],
      corner: ['Quiet reading time in the corner.']
    },
    svg: (state = 'idle') => `
      <svg viewBox="0 0 32 32" width="100%" height="100%" shape-rendering="crispEdges">
        <rect x="7" y="29" width="18" height="2" fill="#C0C9B0"/>

        <!-- Green Body -->
        <rect x="8" y="10" width="16" height="19" fill="#9CCC65"/>
        <rect x="6" y="14" width="20" height="13" fill="#9CCC65"/>
        <rect x="10" y="8" width="12" height="2" fill="#9CCC65"/>

        <!-- White Belly -->
        <rect x="11" y="17" width="10" height="11" fill="#DCEDC8"/>

        <!-- Outline -->
        <rect x="10" y="7" width="12" height="1" fill="#33691E"/>
        <rect x="8" y="8" width="2" height="2" fill="#33691E"/>
        <rect x="22" y="8" width="2" height="2" fill="#33691E"/>
        <rect x="5" y="14" width="1" height="13" fill="#33691E"/>
        <rect x="26" y="14" width="1" height="13" fill="#33691E"/>
        <rect x="8" y="29" width="16" height="1" fill="#33691E"/>

        <!-- Yellow Beak -->
        <rect x="14" y="16" width="4" height="2" fill="#FFCA28"/>

        <!-- Eyes -->
        <rect x="11" y="14" width="2" height="2" fill="#1B5E20"/>
        <rect x="19" y="14" width="2" height="2" fill="#1B5E20"/>

        <!-- Head Dish -->
        <rect x="13" y="7" width="6" height="1" fill="#AED581"/>

        ${state === 'click' ? `
          <!-- Cucumber -->
          <rect x="10" y="19" width="12" height="3" fill="#388E3C"/>
          <rect x="11" y="20" width="10" height="1" fill="#81C784"/>
          <rect x="17" y="19" width="2" height="2" fill="#9CCC65"/>
        ` : state === 'drag' ? `
          <!-- Question Mark -->
          <rect x="22" y="5" width="4" height="2" fill="#33691E"/>
          <rect x="24" y="7" width="2" height="2" fill="#33691E"/>
          <rect x="24" y="10" width="2" height="1" fill="#33691E"/>
        ` : ``}

        <rect x="10" y="29" width="4" height="1" fill="#FFCA28"/>
        <rect x="18" y="29" width="4" height="1" fill="#FFCA28"/>
      </svg>
    `
  },

  // 3. Tonkatsu (Pork Cutlet)
  tonkatsu: {
    id: 'tonkatsu',
    name: 'Tonkatsu (Pork Cutlet)',
    desc: 'Made of 99% fat & 1% meat. Leftover cutlet edge hoping to be eaten.',
    color: '#E6C280',
    bgTheme: '#fff8ec',
    dialogues: {
      idle: ['Is anyone hungry...?', 'Ebifurai is my best buddy!', 'Crispy breadcrumbs~'],
      click: ['Mustard topping added! Eat me please! ✨', 'Am I delicious now?'],
      drag: ['Don\'t leave me behind!', 'Shaking off oil droplets~'],
      corner: ['Safe in the corner where no one leaves me behind.']
    },
    svg: (state = 'idle') => `
      <svg viewBox="0 0 32 32" width="100%" height="100%" shape-rendering="crispEdges">
        <rect x="7" y="29" width="18" height="2" fill="#D7CCC8"/>

        <!-- Fried Texture Body -->
        <rect x="8" y="10" width="16" height="19" fill="#D79A5B"/>
        <rect x="6" y="14" width="20" height="13" fill="#D79A5B"/>
        <rect x="10" y="8" width="12" height="2" fill="#D79A5B"/>

        <!-- Breadcrumb Dots -->
        <rect x="9" y="12" width="1" height="1" fill="#8D5524"/>
        <rect x="21" y="11" width="1" height="1" fill="#8D5524"/>
        <rect x="7" y="20" width="1" height="1" fill="#8D5524"/>
        <rect x="23" y="23" width="1" height="1" fill="#8D5524"/>

        <!-- Outline -->
        <rect x="10" y="7" width="12" height="1" fill="#5D4037"/>
        <rect x="8" y="8" width="2" height="2" fill="#5D4037"/>
        <rect x="22" y="8" width="2" height="2" fill="#5D4037"/>
        <rect x="5" y="14" width="1" height="13" fill="#5D4037"/>
        <rect x="26" y="14" width="1" height="13" fill="#5D4037"/>
        <rect x="8" y="29" width="16" height="1" fill="#5D4037"/>

        <!-- Eyes -->
        <rect x="11" y="15" width="2" height="2" fill="#3E2723"/>
        <rect x="19" y="15" width="2" height="2" fill="#3E2723"/>

        <!-- 1% Red Meat Nose -->
        <rect x="15" y="17" width="2" height="2" fill="#E53935"/>

        ${state === 'click' ? `
          <!-- Mustard Top -->
          <rect x="13" y="6" width="6" height="3" fill="#FDD835"/>
          <rect x="14" y="5" width="4" height="1" fill="#FDD835"/>
          <rect x="4" y="8" width="2" height="2" fill="#FFD700"/>
          <rect x="26" y="8" width="2" height="2" fill="#FFD700"/>
        ` : ``}

        <rect x="10" y="29" width="3" height="1" fill="#8D5524"/>
        <rect x="19" y="29" width="3" height="1" fill="#8D5524"/>
      </svg>
    `
  },

  // 4. Neko (Cat)
  neko: {
    id: 'neko',
    name: 'Neko (Cat)',
    desc: 'Shy and gentle cat. Self-conscious about her shape, loves wall scratching.',
    color: '#FFF3C4',
    bgTheme: '#fffde7',
    dialogues: {
      idle: ['Scratching in the corner feels great...', 'Did I gain weight again?', 'Craving fish snacks~'],
      click: ['Scratching wall: Scratch scratch! 🐾', 'Eating dried fish treats~ Meow!'],
      drag: ['Meow! Too high, scary!', 'Curling up into a cat ball!'],
      corner: ['Facing the corner wall gives me peace... Meow']
    },
    svg: (state = 'idle') => `
      <svg viewBox="0 0 32 32" width="100%" height="100%" shape-rendering="crispEdges">
        <rect x="7" y="29" width="18" height="2" fill="#E6EE9C"/>

        <rect x="8" y="10" width="16" height="19" fill="#FFF3C4"/>
        <rect x="6" y="14" width="20" height="13" fill="#FFF3C4"/>
        <rect x="10" y="8" width="12" height="2" fill="#FFF3C4"/>

        <!-- Cat Ears -->
        <rect x="7" y="6" width="3" height="3" fill="#FFF3C4"/>
        <rect x="22" y="6" width="3" height="3" fill="#FFF3C4"/>
        <rect x="8" y="7" width="1" height="2" fill="#FFCDD2"/>
        <rect x="23" y="7" width="1" height="2" fill="#FFCDD2"/>

        <!-- Calico Patch -->
        <rect x="20" y="9" width="4" height="4" fill="#F8D7A0"/>

        <!-- Outline -->
        <rect x="10" y="7" width="12" height="1" fill="#5D4037"/>
        <rect x="5" y="14" width="1" height="13" fill="#5D4037"/>
        <rect x="26" y="14" width="1" height="13" fill="#5D4037"/>
        <rect x="8" y="29" width="16" height="1" fill="#5D4037"/>

        <!-- Face -->
        <rect x="11" y="15" width="2" height="2" fill="#3E2723"/>
        <rect x="19" y="15" width="2" height="2" fill="#3E2723"/>
        <rect x="15" y="17" width="2" height="1" fill="#E57373"/>

        <!-- Whiskers -->
        <rect x="7" y="16" width="3" height="1" fill="#5D4037"/>
        <rect x="22" y="16" width="3" height="1" fill="#5D4037"/>

        ${state === 'click' ? `
          <!-- Fish Snack -->
          <rect x="12" y="20" width="8" height="4" fill="#81C784"/>
          <rect x="18" y="21" width="3" height="2" fill="#66BB6A"/>
        ` : `
          <!-- Tail -->
        <rect x="25" y="22" width="3" height="2" fill="#FFF3C4"/>
        `}
      </svg>
    `
  },

  // 5. Tokage (Dino)
  tokage: {
    id: 'tokage',
    name: 'Tokage (Dino)',
    desc: 'Secretly a surviving dinosaur pretending to be a lizard. Loves fish & swimming.',
    color: '#B8E3F2',
    bgTheme: '#e1f5fe',
    dialogues: {
      idle: ['Shhh... My dinosaur secret is safe with you!', 'Catching fish and swimming is fun~', 'Nisetsumuri is my best friend.'],
      click: ['Splish splash! Swimming around~ 🐟', 'Caught a delicious fish!'],
      drag: ['Eek! Is my secret identity exposed?!', 'Paddling fast!'],
      corner: ['Corner swimming pool is peaceful...']
    },
    svg: (state = 'idle') => `
      <svg viewBox="0 0 32 32" width="100%" height="100%" shape-rendering="crispEdges">
        <rect x="7" y="29" width="18" height="2" fill="#B2EBF2"/>

        <rect x="8" y="10" width="16" height="19" fill="#B8E3F2"/>
        <rect x="6" y="14" width="20" height="13" fill="#B8E3F2"/>
        <rect x="10" y="8" width="12" height="2" fill="#B8E3F2"/>

        <rect x="11" y="17" width="10" height="11" fill="#FFF1C7"/>

        <!-- Back Fins -->
        <rect x="25" y="12" width="2" height="2" fill="#FFF1C7"/>
        <rect x="25" y="17" width="2" height="2" fill="#FFF1C7"/>

        <!-- Outline -->
        <rect x="10" y="7" width="12" height="1" fill="#01579B"/>
        <rect x="5" y="14" width="1" height="13" fill="#01579B"/>
        <rect x="26" y="14" width="1" height="13" fill="#01579B"/>
        <rect x="8" y="29" width="16" height="1" fill="#01579B"/>

        <!-- Eyes -->
        <rect x="11" y="14" width="2" height="2" fill="#01579B"/>
        <rect x="19" y="14" width="2" height="2" fill="#01579B"/>

        ${state === 'click' ? `
          <!-- Fish & Water -->
          <rect x="12" y="21" width="8" height="3" fill="#FF8A80"/>
          <rect x="18" y="20" width="3" height="5" fill="#FF8A80"/>
          <rect x="5" y="10" width="2" height="2" fill="#B3E5FC"/>
        ` : ``}
      </svg>
    `
  },

  // 6. Ebifurai (Shrimp)
  ebifurai: {
    id: 'ebifurai',
    name: 'Ebifurai (Shrimp)',
    desc: 'Leftover fried shrimp tail. Best friends with Tonkatsu!',
    color: '#FFD09A',
    bgTheme: '#fff3e0',
    dialogues: {
      idle: ['Tonkatsu and I are best pals!', 'Stay happy today!', 'Crispy & aromatic~'],
      click: ['High jump pose! Ta-da! 🍤', 'Wiggling my red tail~'],
      drag: ['Am I getting dipped in ketchup?!', 'Tail shaking!'],
      corner: ['Snuggled in the corner with Tonkatsu~']
    },
    svg: (state = 'idle') => `
      <svg viewBox="0 0 32 32" width="100%" height="100%" shape-rendering="crispEdges">
        <rect x="7" y="29" width="18" height="2" fill="#FFE0B2"/>

        <rect x="12" y="4" width="3" height="5" fill="#FF9E9E"/>
        <rect x="17" y="4" width="3" height="5" fill="#FF9E9E"/>

        <rect x="8" y="10" width="16" height="19" fill="#FFD09A"/>
        <rect x="6" y="14" width="20" height="13" fill="#FFD09A"/>
        <rect x="10" y="8" width="12" height="2" fill="#FFD09A"/>

        <rect x="10" y="7" width="12" height="1" fill="#A66B48"/>
        <rect x="5" y="14" width="1" height="13" fill="#A66B48"/>
        <rect x="26" y="14" width="1" height="13" fill="#A66B48"/>
        <rect x="8" y="29" width="16" height="1" fill="#A66B48"/>

        <rect x="11" y="15" width="2" height="2" fill="#3E2723"/>
        <rect x="19" y="15" width="2" height="2" fill="#3E2723"/>
        <rect x="15" y="17" width="2" height="1" fill="#FF9E9E"/>
      </svg>
    `
  },

  // 7. Tapioca (Boba)
  tapioca: {
    id: 'tapioca',
    name: 'Tapioca (Boba)',
    desc: 'Leftover boba pearls from milk tea. Cute multi-colored balls.',
    color: '#F48FB1',
    bgTheme: '#fce4ec',
    dialogues: {
      idle: ['We are the Boba Squad!', 'Boing boing~', 'Too big to be sucked by the straw!'],
      click: ['Triple bounce! So chewy! 🧋', 'Stacking up! 1-2-3!'],
      drag: ['Bouncing away like rubber balls!', 'Squishy wobble!'],
      corner: ['Gathered at the bottom corner of the cup.']
    },
    svg: (state = 'idle') => `
      <svg viewBox="0 0 32 32" width="100%" height="100%" shape-rendering="crispEdges">
        <rect x="7" y="28" width="18" height="2" fill="#F8BBD0"/>

        <rect x="9" y="12" width="14" height="16" fill="#F48FB1"/>
        <rect x="7" y="14" width="18" height="12" fill="#F48FB1"/>

        <rect x="11" y="10" width="10" height="2" fill="#880E4F"/>
        <rect x="7" y="14" width="2" height="12" fill="#880E4F"/>
        <rect x="23" y="14" width="2" height="12" fill="#880E4F"/>
        <rect x="11" y="27" width="10" height="2" fill="#880E4F"/>

        <rect x="12" y="17" width="2" height="2" fill="#333"/>
        <rect x="18" y="17" width="2" height="2" fill="#333"/>
        <rect x="15" y="19" width="2" height="1" fill="#333"/>

        ${state === 'click' ? `
          <!-- Mini Stacked Blue Boba -->
          <rect x="5" y="5" width="8" height="8" fill="#80DEEA"/>
          <rect x="6" y="4" width="6" height="10" fill="#80DEEA"/>
        ` : ``}
      </svg>
    `
  },

  // 8. Nisetsumuri (Snail)
  nisetsumuri: {
    id: 'nisetsumuri',
    name: 'Nisetsumuri (Snail)',
    desc: 'Actually a slug carrying a shell to pretend to be a snail.',
    color: '#A5D6A7',
    bgTheme: '#e8f5e9',
    dialogues: {
      idle: ['The shell is heavy... But I am a snail!', 'Crawling slowly... No rush.', 'Only Tokage knows my secret.'],
      click: ['Oops! My shell fell off! Putting it back on! 🐌', 'Shell protection~'],
      drag: ['My shell is going to drop! Frantic!', 'Holding tight!'],
      corner: ['Hiding with my shell in the corner, perfect camouflage!']
    },
    svg: (state = 'idle') => `
      <svg viewBox="0 0 32 32" width="100%" height="100%" shape-rendering="crispEdges">
        <rect x="5" y="28" width="22" height="2" fill="#C8E6C9"/>

        <rect x="5" y="22" width="22" height="6" fill="#A5D6A7"/>
        <rect x="5" y="18" width="8" height="8" fill="#A5D6A7"/>
        
        <rect x="5" y="14" width="2" height="4" fill="#2E7D32"/>
        <rect x="9" y="14" width="2" height="4" fill="#2E7D32"/>

        <rect x="14" y="12" width="12" height="12" fill="#F8BBD0"/>
        <rect x="16" y="14" width="8" height="8" fill="#F48FB1"/>

        <rect x="6" y="20" width="2" height="2" fill="#1B5E20"/>
      </svg>
    `
  },

  // 9. Zassou (Grass)
  zassou: {
    id: 'zassou',
    name: 'Zassou (Grass)',
    desc: 'A positive & energetic weed grass. Dreams of joining a bouquet!',
    color: '#81C784',
    bgTheme: '#f1f8e9',
    dialogues: {
      idle: ['Another energetic day!', 'My dream is to be in a bouquet! 🌸', 'Photosynthesis feels great~'],
      click: ['Look! A flower bloomed on my head! 🌸✨', 'Keep growing upwards!'],
      drag: ['Strong wind! Swaying in the breeze~', 'Roots hold tight!'],
      corner: ['Growing happily even in the corner!']
    },
    svg: (state = 'idle') => `
      <svg viewBox="0 0 32 32" width="100%" height="100%" shape-rendering="crispEdges">
        <rect x="8" y="28" width="16" height="2" fill="#DCEDC8"/>

        <rect x="11" y="10" width="10" height="18" fill="#81C784"/>
        <rect x="8" y="16" width="16" height="10" fill="#81C784"/>

        <rect x="11" y="17" width="2" height="2" fill="#1B5E20"/>
        <rect x="19" y="17" width="2" height="2" fill="#1B5E20"/>
        <rect x="13" y="20" width="6" height="2" fill="#E57373"/>

        ${state === 'click' ? `
          <rect x="13" y="4" width="6" height="6" fill="#FF4081"/>
          <rect x="15" y="6" width="2" height="2" fill="#FFEB3B"/>
        ` : ``}
      </svg>
    `
  },

  // 10. Hokori (Dust)
  hokori: {
    id: 'hokori',
    name: 'Hokori (Dust)',
    desc: 'Tiny fluff dust accumulating happily in corners.',
    color: '#B0BEC5',
    bgTheme: '#eceff1',
    dialogues: {
      idle: ['So many dust buddies in the corner!', 'Floating floating~ Puff...', 'Love dust piles!'],
      click: ['Puff! Scattering and reuniting!', 'Dust family forever!'],
      drag: ['Blown away by broom wind!', 'Puffing away...'],
      corner: ['This corner is Dust HQ!']
    },
    svg: (state = 'idle') => `
      <svg viewBox="0 0 32 32" width="100%" height="100%" shape-rendering="crispEdges">
        <rect x="7" y="28" width="18" height="2" fill="#CFD8DC"/>
        
        <rect x="8" y="12" width="16" height="15" fill="#B0BEC5"/>
        <rect x="6" y="15" width="20" height="10" fill="#B0BEC5"/>

        <rect x="11" y="17" width="2" height="2" fill="#263238"/>
        <rect x="19" y="17" width="2" height="2" fill="#263238"/>
      </svg>
    `
  },

  // 11. Obake (Ghost)
  obake: {
    id: 'obake',
    name: 'Obake (Ghost)',
    desc: 'Friendly attic ghost who loves cleaning with a tiny broom.',
    color: '#E0E0E0',
    bgTheme: '#f5f5f5',
    dialogues: {
      idle: ['Hiding so I don\'t scare anyone...', 'Sweeping clean!', 'Diligent ghost today!'],
      click: ['Broom time! Screen polished shiny clean! 🧹✨', 'All clean now!'],
      drag: ['Whoosh~ Becoming semi-transparent!', 'Don\'t be scared of me!'],
      corner: ['Corner is spotless clean!']
    },
    svg: (state = 'idle') => `
      <svg viewBox="0 0 32 32" width="100%" height="100%" shape-rendering="crispEdges">
        <rect x="8" y="8" width="16" height="18" fill="#FAFAFA" opacity="0.95"/>
        <rect x="6" y="12" width="20" height="14" fill="#FAFAFA" opacity="0.95"/>

        <rect x="11" y="14" width="2" height="2" fill="#333"/>
        <rect x="19" y="14" width="2" height="2" fill="#333"/>
        <rect x="15" y="17" width="2" height="2" fill="#FF4081"/>

        ${state === 'click' ? `
          <rect x="20" y="18" width="8" height="2" fill="#795548"/>
          <rect x="25" y="20" width="5" height="5" fill="#FFE082"/>
        ` : ``}
      </svg>
    `
  },

  // 12. Yama (Mt. Fuji)
  yama: {
    id: 'yama',
    name: 'Yama (Mt. Fuji)',
    desc: 'A small mountain admiring Mt. Fuji. Loves hot springs.',
    color: '#90CAF9',
    bgTheme: '#e3f2fd',
    dialogues: {
      idle: ['I am a mighty little mountain!', 'Dreaming of becoming Mt. Fuji!', 'Hot springs are nice~'],
      click: ['Red face & hot steam! Hot Spring Mt. Fuji! ♨️', 'So hot & relaxing!'],
      drag: ['Steadfast as a mountain!', 'Mountain wobble!'],
      corner: ['Guarding this corner as a landmark!']
    },
    svg: (state = 'idle') => `
      <svg viewBox="0 0 32 32" width="100%" height="100%" shape-rendering="crispEdges">
        <path d="M 16 6 L 4 28 L 28 28 Z" fill="${state === 'click' ? '#EF5350' : '#64B5F6'}"/>
        <path d="M 16 6 L 11 15 L 14 13 L 16 15 L 18 13 L 21 15 Z" fill="#FFFFFF"/>

        <rect x="12" y="19" width="2" height="2" fill="#0D47A1"/>
        <rect x="18" y="19" width="2" height="2" fill="#0D47A1"/>
      </svg>
    `
  },

  // 13. Chicken (Stardew Valley)
  chicken: {
    id: 'chicken',
    category: 'Stardew Valley',
    name: 'Chicken',
    desc: 'A cheerful little farm chicken who loves fresh grass and cozy coops.',
    color: '#FFF3C4',
    bgTheme: '#fff8e1',
    dialogues: {
      idle: ['Cluck cluck!', 'The coop is cozy today~', 'Looking for fresh grass.'],
      click: ['A fresh egg for you! 🥚', 'Happy chicken noises!'],
      drag: ['Careful with my feathers!', 'Flap flap! Back to the farm!'],
      corner: ['A quiet corner makes a cozy coop.']
    },
    svg: (state = 'idle') => `
      <svg viewBox="0 0 32 32" width="100%" height="100%" shape-rendering="crispEdges">
        <rect x="7" y="28" width="18" height="2" fill="#D7CCC8"/>
        <rect x="8" y="11" width="16" height="17" fill="#FFF8E1"/>
        <rect x="6" y="16" width="20" height="10" fill="#FFF8E1"/>
        <rect x="10" y="8" width="12" height="10" fill="#FFF8E1"/>
        <rect x="9" y="7" width="10" height="1" fill="#5D4037"/>
        <rect x="7" y="9" width="2" height="3" fill="#5D4037"/>
        <rect x="21" y="9" width="2" height="3" fill="#5D4037"/>
        <rect x="5" y="16" width="1" height="10" fill="#5D4037"/>
        <rect x="26" y="16" width="1" height="10" fill="#5D4037"/>
        <rect x="11" y="13" width="2" height="2" fill="#3E2723"/>
        <rect x="19" y="13" width="2" height="2" fill="#3E2723"/>
        <rect x="15" y="15" width="4" height="2" fill="#F57C00"/>
        <rect x="14" y="7" width="4" height="2" fill="#E53935"/>
        <rect x="15" y="5" width="2" height="2" fill="#E53935"/>
        ${state === 'click' ? `<rect x="12" y="20" width="8" height="6" fill="#FFFFFF"/><rect x="12" y="20" width="8" height="1" fill="#5D4037"/><rect x="15" y="21" width="2" height="2" fill="#F48FB1"/>` : ``}
        <rect x="10" y="28" width="3" height="1" fill="#F57C00"/>
        <rect x="19" y="28" width="3" height="1" fill="#F57C00"/>
      </svg>
    `
  },

  // 14. Junimo (Stardew Valley)
  junimo: {
    id: 'junimo',
    category: 'Stardew Valley',
    name: 'Junimo',
    desc: 'A tiny forest spirit with a bright green apple and a happy little dance.',
    color: '#9CCC65',
    bgTheme: '#f1f8e9',
    dialogues: {
      idle: ['Junimo junimo!', 'The forest is humming~', 'A little apple, a big smile.'],
      click: ['Apple delivery! 🍏', 'Dance dance dance!'],
      drag: ['Wheee! Spirit zoom!', 'Hold on to my little leaf!'],
      corner: ['A magical corner for a tiny spirit.']
    },
    svg: (state = 'idle') => `
      <svg viewBox="0 0 32 32" width="100%" height="100%" shape-rendering="crispEdges">
        <rect x="7" y="28" width="18" height="2" fill="#C5E1A5"/>
        <rect x="9" y="11" width="14" height="17" fill="#8BC34A"/>
        <rect x="7" y="15" width="18" height="10" fill="#8BC34A"/>
        <rect x="11" y="9" width="10" height="4" fill="#8BC34A"/>
        <rect x="10" y="8" width="12" height="1" fill="#33691E"/>
        <rect x="6" y="15" width="1" height="10" fill="#33691E"/>
        <rect x="25" y="15" width="1" height="10" fill="#33691E"/>
        <rect x="11" y="16" width="2" height="2" fill="#263238"/>
        <rect x="19" y="16" width="2" height="2" fill="#263238"/>
        <rect x="15" y="19" width="2" height="1" fill="#E91E63"/>
        <rect x="14" y="6" width="5" height="3" fill="#7CB342"/>
        <rect x="18" y="4" width="5" height="3" fill="#43A047"/>
        ${state === 'click' ? `<rect x="13" y="21" width="6" height="5" fill="#9CCC65"/><rect x="14" y="20" width="4" height="1" fill="#7CB342"/>` : ``}
        <rect x="10" y="28" width="3" height="1" fill="#558B2F"/>
        <rect x="19" y="28" width="3" height="1" fill="#558B2F"/>
      </svg>
    `
  }
};
