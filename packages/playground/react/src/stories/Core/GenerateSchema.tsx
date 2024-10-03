import {  FormEvent,  useMemo, useReducer, } from 'react';

import {Generate} from "@binaryoperations/json-forms-core/schema/logical.schema";
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';

const onSubmit = (e: FormEvent) => {
  e?.preventDefault?.();
  console.log(e, e.target)
}


const reducer = (state: NonNullable<object>, action: { type: string, payload: unknown }) => {
  state = {
    ...state,
    [action.type]: action.payload,
  }
  return state
};

const makeSchema = (values: unknown) => {
  return new Generate(() => {
    return () => {
      return undefined
    };
  }).parse(values);
}

function App() {
  const [ values, dispatch ] = useReducer(reducer, {});

  const schema = useMemo(() => makeSchema(values), [values]);

  const otherFormats = useMemo(() => {
    return {
      string: makeSchema("s"),
      number: makeSchema(11),
      boolean: makeSchema(true),
      null: makeSchema(null),
      array: makeSchema([11]),
      objectArray: makeSchema([{name: "shashank"}, {name: "Agarwal"}]),
      mixedArray: makeSchema([{id: 20}, "hello", true, 1]),
    }
  }, []);


  console.log({schema, otherFormats})


  const handleChange = (name: string, value: unknown ) => {
    dispatch({
      type: name,
      payload: value
    })
  }

  return (
    <Form onSubmit={onSubmit}>
      <div><Input label='Name' name="name" onChange={(e) => handleChange(e.target.name, e.target.value)} /></div>
      <div><Input label='Last Name' name="last_name" onChange={(e) => handleChange(e.target.name, e.target.value)}  /></div>
      <div><Input label='Email' name="email" onChange={(e) => handleChange(e.target.name, e.target.value)}  /></div>
      <Button onSubmit={onSubmit}>Hello World</Button>
    </Form>
  )
}

export default App
