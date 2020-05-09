const scoringStyles = [
  {
    name: 'Fixed Value',
    id: 'fixedValue',
    description: 'Each question will be worth a predetermined number of points. No penalty for wrong answers',
  },
  {
    name: 'Limited Choice',
    id: 'limitedChoice',
    description: 'Each round will have a limited choice of point options, each option will be chosen once per round. No penalty for wrong answers',
  },
  {
    name: 'Wager',
    id: 'wager',
    description: 'Teams will wager a number of points, losing their wager if they are wrong',
  }
];

export const wagerStyles = [
  {
    name: 'Maximum Value',
    id: 'maxiumValue',
    description: 'Players can wager up to a maximum value',
    requiresMax: true,
    limtedByTotal: false,
  },
  {
    name: 'Total Points',
    id: 'totalPoints',
    description: 'Players can wager up to their current total',
    requiresMax: false,
    limitedByTotal: true,
  },
];

export default scoringStyles;
