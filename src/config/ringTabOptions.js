import {
  asscherStone,
  bezelHead,
  blackColor,
  blueColor,
  blueSapphire,
  brownColor,
  cushionStone,
  doubleHaloHead,
  emeraldStone,
  greenColor,
  greenEmerald,
  greenSapphire,
  heartStone,
  hiddenHaloHead,
  knifeEdge,
  marquiseStone,
  moissanite,
  ovalStone,
  orangeColor,
  peachColor,
  pinkColor,
  pinkSapphire,
  pearStone,
  plain,
  plateProng,
  platinum,
  princessStone,
  purpleColor,
  radiantStone,
  redColor,
  redRuby,
  roseGold,
  roundStone,
  singleHaloHead,
  split,
  cathedral,
  channel,
  threeStoneHead,
  twisted,
  widePlain,
  whiteGold,
  yellowGold,
  yellowColor,
  yellowSapphire
} from '../assets'

/** Shank tab definition — duplicated clone lives in NavigationBar state. */
export const ShankTabOptions = [
  {
    name: 'STYLE',
    mainOptionsHasText: false,
    options: [
      { name: 'Plain', img: plain, price: 1500, isSelected: true },
      { name: 'Cathedral', img: cathedral, price: 2500, isSelected: false },
      { name: 'Knife Edge', img: knifeEdge, price: 3500, isSelected: false },
      { name: 'Split', img: split, price: 4500, isSelected: false },
      { name: 'Twisted', img: twisted, price: 5500, isSelected: false },
      { name: 'Wide Plain', img: widePlain, price: 6500, isSelected: false },
      { name: 'Channel', img: channel, price: 7500, isSelected: false },
      { name: 'Plate Prong', img: plateProng, price: 8500, isSelected: false }
    ],
    subHeadingName: 'MATCHING BAND',
    subOptionsHasText: false,
    subOptions: [
      { name: 'Plain', img: plain, price: 0, isSelected: true },
      { name: 'Channel', img: channel, price: 1500, isSelected: false },
      { name: 'Plate Prong', img: plateProng, price: 2500, isSelected: false }
    ]
  },
  {
    name: 'METAL',
    mainOptionsHasText: false,
    options: [
      { name: 'White Gold', img: whiteGold, price: 500, isSelected: true },
      { name: 'Yellow Gold', img: yellowGold, price: 500, isSelected: false },
      { name: 'Rose Gold', img: roseGold, price: 500, isSelected: false },
      { name: 'Platinum', img: platinum, price: 500, isSelected: false }
    ],
    subHeadingName: 'PURITY',
    subOptionsHasText: true,
    subOptions: [
      { name: '9K', price: 0, isSelected: true },
      { name: '14K', price: 800, isSelected: false },
      { name: '18K', price: 1000, isSelected: false }
    ]
  }
]

/**
 * Head STYLE → which stone SHAPE names stay enabled in the Stone tab.
 * `allowedStoneShapes: null` means every shape listed in Stone SHAPE is allowed.
 */
export const HeadTabOptions = [
  {
    name: 'STYLE',
    options: [
      {
        name: 'Plain',
        img: plain,
        price: 100,
        isSelected: true,
        allowedStoneShapes: null
      },
      {
        name: 'Bezel',
        img: bezelHead,
        price: 200,
        isSelected: false,
        allowedStoneShapes: null
      },
      {
        name: 'Hidden Halo',
        img: hiddenHaloHead,
        price: 300,
        isSelected: false,
        allowedStoneShapes: ['Round']
      },
      {
        name: 'Single Halo',
        img: singleHaloHead,
        price: 400,
        isSelected: false,
        allowedStoneShapes: ['Round']
      },
      {
        name: 'Double Halo',
        img: doubleHaloHead,
        price: 500,
        isSelected: false,
        allowedStoneShapes: ['Round']
      },
      {
        name: 'Three Stone',
        img: threeStoneHead,
        price: 600,
        isSelected: false,
        allowedStoneShapes: ['Oval', 'Round', 'Princess']
      }
    ]
  },
  {
    name: 'BI-METAL',
    options: [
      { name: 'White Gold', img: whiteGold, price: 0, isSelected: true },
      { name: 'Yellow Gold', img: yellowGold, price: 0, isSelected: false },
      { name: 'Rose Gold', img: roseGold, price: 0, isSelected: false }
    ],
    hasToggleSwitch: { value: false }
  }
]

export const StoneTabOptions = [
  {
    name: 'SHAPE',
    options: [
      { name: 'Round', img: roundStone, price: 0, isSelected: true },
      { name: 'Princess', img: princessStone, price: 0, isSelected: false },
      { name: 'Cushion', img: cushionStone, price: 0, isSelected: false },
      { name: 'Oval', img: ovalStone, price: 0, isSelected: false },
      { name: 'Radiant', img: radiantStone, price: 0, isSelected: false },
      { name: 'Pear', img: pearStone, price: 0, isSelected: false },
      { name: 'Emerald', img: emeraldStone, price: 0, isSelected: false },
      { name: 'Marquise', img: marquiseStone, price: 0, isSelected: false },
      { name: 'Heart', img: heartStone, price: 0, isSelected: false },
      { name: 'Asscher', img: asscherStone, price: 0, isSelected: false }
    ]
  },
  {
    name: 'CARAT',
    sliderOptions: {
      min: 0.25,
      max: 5,
      step: 0.25,
      value: 0.5,
      minPrice: 655
    }
  },
  {
    name: 'TYPE',
    options: [
      {
        name: 'Colorless'
      },
      {
        name: 'Colored',
        options: [
          { name: 'Blue', img: blueColor, color: '#77B3D4' },
          { name: 'Green', img: greenColor, color: '#88D4B4' },
          { name: 'Pink', img: pinkColor, color: '#F8B5D6' },
          { name: 'Purple', img: purpleColor, color: '#D4B5FF' },
          { name: 'Peach', img: peachColor, color: '#FFDAB9' },
          { name: 'Yellow', img: yellowColor, color: '#FFE699' },
          { name: 'Red', img: redColor, color: '#FFA7A7' },
          { name: 'Orange', img: orangeColor, color: '#FFD1A7' },
          { name: 'Black', img: blackColor, color: '#666666' },
          { name: 'Brown', img: brownColor, color: '#D2B48C' }
        ]
      },
      {
        name: 'Gemstone',
        options: [
          { name: 'Blue Sapphire', img: blueSapphire, color: '#0047AB' },
          { name: 'Green Emerald', img: greenEmerald, color: '#4AE2A1' },
          { name: 'Green Sapphire', img: greenSapphire, color: '#00AB55' },
          { name: 'Moissanite', img: moissanite, color: '#ffffff' },
          { name: 'Pink Sapphire', img: pinkSapphire, color: '#D1008F' },
          { name: 'Red Ruby', img: redRuby, color: '#B71C1C' },
          { name: 'Yellow Sapphire', img: yellowSapphire, color: '#FFA94D' }
        ]
      }
    ]
  }
]

/** Default center-stone carat — keeps slider, context, and pricing aligned with CARAT.sliderOptions. */
export function getDefaultStoneCaratWeight () {
  const caratGroup = StoneTabOptions.find(g => g.name === 'CARAT')
  const opts = caratGroup?.sliderOptions
  if (!opts) return 0.25
  const min = typeof opts.min === 'number' ? opts.min : 0.25
  const max = typeof opts.max === 'number' ? opts.max : min
  const raw =
    typeof opts.value === 'number' && Number.isFinite(opts.value)
      ? opts.value
      : min
  return Math.min(max, Math.max(min, raw))
}
