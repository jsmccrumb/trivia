import React, {useState} from 'react';
import Button from './Button';
import Input from './Input';
import Select from './Select';

import {templates} from './../hooks/useGameCreation';

const TemplateDropdown = ({dispatch}) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const selectTemplate = () => {
    const template = templates.find(t => t.name === selectedTemplate)
    template && dispatch({type: 'loadTemplate', template});
  };
  return (
    <div className='flex'>
      <Select name='template'
        value={selectedTemplate}
        onChange={(e) => setSelectedTemplate(e.target.value)}
      >
        <option value=''>Select a Template</option>
        {templates.map(t => <option key={t.name} value={t.name} title={t.description}>{t.name}</option>)}
      </Select>
      <Button onClick={selectTemplate}>Load Template</Button>
    </div>
  );
};

const GameSetup = ({name, totalRounds, dispatch, questionsPerRound,
    defaultWagerStyle, defaultScoringStyle, isInitialized: readOnly, nextRound }) => {
  const hasDraft = !readOnly && !!localStorage.getItem('gameDraft');
  return (
    <>
      {hasDraft && <Button onClick={() => dispatch({type: 'loadDraft'})}>Load Saved Draft</Button>}
      <form onSubmit={(e) => {e.preventDefault(); !readOnly && totalRounds > 0 && questionsPerRound > 0 && dispatch({type: 'initializeRounds'})}}> 
        {!readOnly && <TemplateDropdown dispatch={dispatch} />}
        <Input name='name' label='Game Name' value={name} onChange={(e) => dispatch({type: 'setName', name: e.target.value})} />
        <Input name='totalRounds' label='Rounds' value={totalRounds} onChange={(e) => dispatch({type: 'setTotalRounds', totalRounds: e.target.value})} readOnly={readOnly} />
        <Input name='questionsPerRound' label='Questions per Round' value={questionsPerRound} 
            onChange={(e) => dispatch({type: 'setQuestionsPerRound', questionsPerRound: e.target.value})} readOnly={readOnly} />
        <p>Have a special round in mind like a half-time, final, or some sort of puzzle round? These can be inserted after any round when you are filling out the questions for a round</p>
        {!readOnly && <Button type='submit' onClick={() => {/*handled by form onSubmit*/}}>Initialize Game</Button>}
        {nextRound && <Button onClick={nextRound}>Edit First Round</Button>}
      </form>
    </>
  );
};

export default GameSetup;
