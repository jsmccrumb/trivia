import React, {useState} from 'react';
import Button from './Button';
import Input from './Input';
import Select from './Select';

const NormalRoundSetup = ({dispatch, roundInfo,}) => {
  return Object.entries(roundInfo.questions).map(([question, values]) => {
    return (
      <React.Fragment key={question}>
        <h4>Question {values.number}</h4>
        <Input name={`${question}Category`}
        label='Category'
        value={values.category}
        onChange={(e) => dispatch({type: 'updateQuestion', round: roundInfo.name, question, key: 'category', value: e.target.value})} />
        <Input name={`${question}Question`}
        label='Question'
        value={values.question}
        onChange={(e) => dispatch({type: 'updateQuestion', round: roundInfo.name, question, key: 'question', value: e.target.value})} />
        <Input name={`${question}Answer`}
        label='Answer'
        value={values.answer}
        onChange={(e) => dispatch({type: 'updateQuestion', round: roundInfo.name, question, key: 'answer', value: e.target.value})} />
      </React.Fragment>
    );
    }
  );
};

const SpecialRoundSetup = ({dispatch, roundInfo,}) => {
  return (
    <>
      <Input name='description'
        label='Round Description'
      value={roundInfo.description}
      onChange={(e) => dispatch({type: 'updateRound', round: roundInfo.name, key: 'description', value: e.target.value})} />
    <Input name='question' label='Question' value={roundInfo.question}
    onChange={(e) => dispatch({type: 'updateRound', round: roundInfo.name, key: 'question', value: e.target.value})} />
    <Input name='answer' label='Answer' value={roundInfo.answer}
    onChange={(e) => dispatch({type: 'updateRound', round: roundInfo.name, key: 'answer', value: e.target.value})} />
    </>
  );
};
const RoundSetup = ({gameName, dispatch, roundInfo, nextRound, insertRound, 
    insertSpecialRound, deleteRound,}) => {
  const [specialName, setSpecialName] = useState('');
  if (!roundInfo) return null;
  const RoundComponent = roundInfo.isSpecial ? SpecialRoundSetup : NormalRoundSetup;
  const handleInsertSpecial = () => {
    const newName = specialName;
    if (!!newName) {
      setSpecialName('');
      insertSpecialRound(roundInfo.name, newName);
    }
  };
  return (
    <>
    <Input name='newSpecialRound' label='New Special Round' value={specialName} onChange={(e) => setSpecialName(e.target.value)} />
    <Button onClick={handleInsertSpecial}>Insert Special Round</Button>
    <Button onClick={() => insertRound(roundInfo.name)}>Insert Round</Button>
    <Button onClick={() => deleteRound(roundInfo.name)}>Delete Round</Button>
      <Input name='gameName' label='Game Name' value={gameName} onChange={(e) => dispatch({type: 'setName', name: e.target.value})} />
      <h3>Edit {roundInfo.name}</h3>
      <RoundComponent dispatch={dispatch} roundInfo={roundInfo} />
      {nextRound && <Button onClick={nextRound}>Edit Next Round</Button>}
    </>
  );
};

export default RoundSetup;
