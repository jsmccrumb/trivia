import React, {useState, useEffect,} from 'react';
import GridLayout from './../GridLayout';
import GameSetup from './../GameSetup';
import RoundSetup from './../RoundSetup';

import useGameCreation from './../../hooks/useGameCreation';

const SETUP = 'setup';

const CreateGame = () => {
  const [gameState, dispatch] = useGameCreation();
  const [currentTab, setCurrentTab] = useState(SETUP);
  const [tabs, setTabs] = useState([]);
  useEffect(() => {
    setTabs(Object.values(gameState.rounds)
      .sort((a, b) => a.number - b.number)
      .map(round => round.name));
  }, [gameState.isInitialized, gameState.totalRounds, gameState.totalSpecialRounds]);
  const getNextRoundFunc = () => {
    const currentIndex = tabs.indexOf(currentTab);
    if (currentIndex === tabs.length - 1) return false;
    return () => {
      setCurrentTab(tabs[currentIndex + 1]);
      dispatch({type: 'saveDraft'});
    };
  };
  const navAction = (name) => {
    return (e) => {
      e.preventDefault();
      if (name !== currentTab) {
        setCurrentTab(name);
        dispatch({type: 'saveDraft'});
      }
    };
  };
  const previousTab = () => {
    const currentIndex = tabs.indexOf(currentTab);
    if (currentIndex <= 0) {
      setCurrentTab(SETUP);
    } else {
      setCurrentTab(tabs[currentIndex - 1]);
    }
  };
  const deleteRound = (round) => {
    previousTab();
    dispatch({type: 'deleteRound', round});
  };
  const insertRound = (round) => {
    setCurrentTab(`Round ${Math.floor(gameState.rounds[round].number + 1)}`);
    dispatch({type: 'insertRound', round});
  };
  const insertSpecialRound = (round, name) => {
    setCurrentTab(name);
    dispatch({type: 'insertSpecialRound', round, name});
  };

  return (
    <GridLayout 
      rows='fit-content(50vh) auto'
      columns='1fr'
      areas="'tabs' 'main'"
      rowGap='0'
      columnGap='0'
    >
      <div style={{gridArea: 'tabs'}}>
        <nav>
          <a onClick={navAction('setup')}>Game Setup</a>
          {tabs.map(name => <a onClick={navAction(name)} key={name}>{name}</a>)}
        </nav>
      </div>
      <div style={{gridArea: 'main'}}>
        {currentTab === SETUP ?
          <GameSetup {...gameState} dispatch={dispatch} nextRound={getNextRoundFunc()} /> :
          <RoundSetup gameName={gameState.name}
            dispatch={dispatch}
            roundInfo={gameState.rounds[currentTab]}
            nextRound={getNextRoundFunc()} 
            insertRound={insertRound}
            insertSpecialRound={insertSpecialRound}
            deleteRound={deleteRound} />
        }
      </div>
    </GridLayout>
  );
};

export default CreateGame;
