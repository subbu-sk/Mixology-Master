export const MOODS = [
    { id: 'happy', label: 'Happy', emoji: '😊', description: 'Bright, celebratory cocktails' },
    { id: 'relaxed', label: 'Relaxed', emoji: '😌', description: 'Smooth, easy-going drinks' },
    { id: 'energetic', label: 'Energetic', emoji: '⚡', description: 'Bold, invigorating flavors' },
    { id: 'romantic', label: 'Romantic', emoji: '💕', description: 'Elegant, sophisticated sips' },
    { id: 'adventurous', label: 'Adventurous', emoji: '🎪', description: 'Unique, experimental mixes' },
    { id: 'sophisticated', label: 'Sophisticated', emoji: '🎩', description: 'Classic, refined cocktails' }
];

export const INGREDIENTS = {
    spirits: [
        { id: 'whiskey', name: 'Whiskey', type: 'spirits', img: '/ingredients/whiskey.jpg', desc: 'Aged & Smooth' },
        { id: 'gin', name: 'Gin', type: 'spirits', img: '/ingredients/gin.webp', desc: 'Botanical & Dry' },
        { id: 'vodka', name: 'Vodka', type: 'spirits', img: '/ingredients/vodka.jpg', desc: 'Clean & Neutral' },
        { id: 'rum', name: 'Rum', type: 'spirits', img: '/ingredients/rum.jpg', desc: 'Sweet & Warm' },
        { id: 'tequila', name: 'Tequila', type: 'spirits', img: '/ingredients/tequila.jpg', desc: 'Earthy & Sharp' }
    ],
    liqueurs: [
        { id: 'triple_sec', name: 'Triple Sec', type: 'liqueurs', img: '/ingredients/triple-sec.jpg', desc: 'Orange Liqueur' },
        { id: 'campari', name: 'Campari', type: 'liqueurs', img: '/ingredients/campari.png', desc: 'Bitter & Herbal' },
        { id: 'vermouth', name: 'Vermouth', type: 'liqueurs', img: '/ingredients/vermouth.jpg', desc: 'Fortified Wine' }
    ],
    mixers: [
        { id: 'simple_syrup', name: 'Simple Syrup', type: 'mixers', img: '/ingredients/simple-syrup.jpg', desc: 'Sweet Balance' },
        { id: 'lemon_juice', name: 'Lemon Juice', type: 'mixers', img: '/ingredients/lemon-juice.jpg', desc: 'Citrus Fresh' },
        { id: 'soda', name: 'Soda Water', type: 'mixers', img: '/ingredients/soda.jpg', desc: 'Fizzy Lift' },
        { id: 'tonic', name: 'Tonic Water', type: 'mixers', img: '/ingredients/tonic.jpg', desc: 'Bitter Bubbles' }
    ],
    garnishes: [
        { id: 'mint', name: 'Fresh Mint', type: 'garnishes', img: '/ingredients/mint.jpg', desc: 'Aromatic Herb' },
        { id: 'lemon_twist', name: 'Lemon Twist', type: 'garnishes', img: '/ingredients/lemon-twist.jpg', desc: 'Zesty Oil' },
        { id: 'olive', name: 'Olive', type: 'garnishes', img: '/ingredients/olive.jpg', desc: 'Salty Kick' }
    ],
    bitters: [
        { id: 'angostura', name: 'Angostura', type: 'bitters', img: '/ingredients/angostura.jpg', desc: 'Aromatic Spice' },
        { id: 'orange_bitters', name: 'Orange Bitters', type: 'bitters', img: '/ingredients/orange-bitters.jpg', desc: 'Citrus Depth' }
    ]
};
