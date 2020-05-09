import {useReducer} from 'react';
import scoringStyles, {wagerStyles} from './../constants/scoring_styles';

const INITIAL_STATE = {
  name: '',
  rounds: {},
  totalRounds: 0,
  defaultWagerStyle: wagerStyles[0],
  defaultScoringStyle: scoringStyles[0],
  questionsPerRound: 3,
  isInitialized: false,
};

const createQuestion = ({category = '', question = '', answer = '', number = 1, points = number}) => {
  return {category, question, answer, points, number};
};

const createRound = ({currentRounds = 0, questionsPerRound = 3, name = null}) => {
  // by default, just use setting from dc team trivia
  const pointOptions = currentRounds < 3 ?
      Array.from({length: questionsPerRound}).map((_, idx) => 1 + idx * 2) :
      Array.from({length: questionsPerRound}).map((_, idx) => (1 + idx) * 2);
  const questions = Array.from({length: questionsPerRound}).reduce((acc, _, idx) => {
    const newQ = createQuestion({number: idx + 1});
    acc[`question${newQ.number}`] = newQ;
    return acc;
  }, {});
  if (name === null) {
    name = `Round ${currentRounds + 1}`;
  }
  return {name, pointOptions, questions, number: currentRounds + 1};
};

export const templates = [
  {
    name: 'DC Team Trivia',
    description: 'Two halves of three rounds each with three questions per round. Halftime and Final questions.',
    totalRounds: 6,
    totalSpecialRounds: 2,
    questionsPerRound: 3,
    defaultWagerStyle: wagerStyles[0], // Maximum Value
    defaultScoringStyle: scoringStyles[1], // Limited Choice
    rounds: Array.from({length: 6}).reduce((acc, curr, idx) => {
      const newRound = createRound({currentRounds: idx, questionsPerRound: 3});
      acc[newRound.name] = newRound;
      return acc;
    }, { // initial accumulator for reducer are the special rounds
      Halftime: {
        name: 'Halftime',
        scoringStyle: scoringStyles[0], // Fixed Value
        description: 'Optional description to display',
        question: '',
        answer: '',
        number: 3.5, // after round 3 before round 4
        isSpecial: true,
      },
      Final: {
        name: 'Final',
        scoringStyle: scoringStyles[2], // Wager
        wagerStyle: wagerStyles[0], // max value
        max: 15,
        description: 'Wager between 0 and 15 points, if you are incorrect you lose your wager',
        question: '',
        answer: '',
        number: 6.5, // after round 6
        isSpecial: true
      }
    }),
  },
  {
    name: 'District Trivia',
    description: 'Five rounds of 10 questions plus a bonus question, with special rounds in between each round.',
    totalRounds: 5,
    totalSpecialRounds: 4,
    questionsPerRound: 11,
    defaultScoringStyle: scoringStyles[0], // Fixed Value
    defaultWagerStyle: wagerStyles[0], // max value
    rounds: Array.from({length: 5}).reduce((acc, curr, idx) => {
      const newRound = createRound({currentRounds: idx, questionsPerRound: 11})
      newRound.questions.question11.max = idx === 4 ? 20 : 10;
      newRound.questions.question11.scoringStyle = scoringStyles[2]; // wager
      acc[newRound.name] = newRound;
      return acc;
    }, { // initial accumulator for reducer is the special rounds
      'Puzzle Round': {
        name: 'Puzzle Round',
        description: 'Figure out the puzzle, two points per corrent answer',
        question: '',
        answer: '',
        number: 1.5, // after round 1
      },
      'Picture Round': {
        name: 'Picture Round',
        description: 'Figure out the picture, two points per correct answer',
        question: '',
        answer: '',
        number: 2.5, // after round 2
      },
      'Fill in the Blank': {
        name: 'Fill in the Blank',
        description: 'Fill in the blank, two points per correct answer',
        question: '',
        answer: '',
        number: 3.5, // after round 3
      },
      'Music Round': {
        name: 'Music Round',
        description: 'Identify the song and artist, one point for each correct song and one point for each correct artist. Identify the theme for 5 bonus points and the secret phrase for 5 more points',
        question: '',
        answer: '',
        number: 4.5, // after round 4
      },
    }),
  }
];

const reducer = (state, action) => {
  if (action.type === 'setName') {
    return {...state, name: action.name};
  } else if (action.type === 'setTotalRounds') {
    return {...state, totalRounds: action.totalRounds};
  } else if (action.type === 'setQuestionsPerRound') {
    return {...state, questionsPerRound: action.questionsPerRound};
  } else if (action.type === 'initializeRounds') {
    // can't re-init
    if (state.isInitialized) {
      return state;
    }
    const missingRounds = state.totalRounds;
    const rounds = Array.from({length: missingRounds}).reduce((acc, _, idx) => {
      const newRound = createRound({
        currentRounds: idx,
        questionsPerRound: state.questionsPerRound
      });
      acc[newRound.name] = newRound;
      return acc;
    }, {});
    return {...state, rounds, isInitialized: true};
  } else if (action.type === 'reset') {
    return {...INITIAL_STATE};
  } else if (action.type === 'loadTemplate') {
    return {...action.template, isInitialized: true};
  } else if (action.type === 'saveDraft') {
    localStorage.setItem('gameDraft', JSON.stringify(state));
    return state;
  } else if (action.type === 'loadDraft') {
    try {
      const draftState = JSON.parse(localStorage.getItem('gameDraft'));
      return draftState;
    } catch {
      return state;
    }
  } else if (action.type === 'updateRound') {
    const updatedRounds = {
      ...state.rounds,
      [action.round]: {
        ...state.rounds[action.round],
        [action.key]: action.value,
      },
    };
    return {...state, rounds: updatedRounds};
  } else if (action.type === 'updateQuestion') {
    const updatedRounds = {
      ...state.rounds,
      [action.round]: {
        ...state.rounds[action.round],
        questions: {
          ...state.rounds[action.round].questions,
          [action.question]: {
            ...state.rounds[action.round].questions[action.question],
            [action.key]: action.value,
          },
        },
      },
    };
    return {...state, rounds: updatedRounds};
  } else {
    return state;
  }
};


const useGameCreation = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return [state, dispatch];
};

export default useGameCreation;
