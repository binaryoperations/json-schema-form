import { useMemo, } from 'react';

import {Parser, UiStore} from "@binaryoperations/json-forms-core/schema/ui.schema";
import { Input } from '@binaryoperations/json-forms-react/components/Input';
// import { Button } from '@binaryoperations/json-forms-react/components/Button';
import { Form } from '@binaryoperations/json-forms-react/components/Form';
import { Radio } from '@binaryoperations/json-forms-react/components/Radio';
import { Date, DateTime, Time } from '@binaryoperations/json-forms-react/components/DateTime';

import { ControlNode, UiNodeType, UiSchema } from '@binaryoperations/json-forms-core/models/UiSchema';

import { createFastContext }  from "@binaryoperations/json-forms-react/contexts/fast-context";
import shallowCompare from "@binaryoperations/json-forms-internals/compare";
import { Column, Row } from '@binaryoperations/json-forms-react/components/Semantic';
import { Checkbox } from '@binaryoperations/json-forms-react/components/Checkbox';

// const onSubmit = (e: FormEvent) => {
//   e?.preventDefault?.();
//   console.log(e, e.target)
// }

const { Provider: UiContextProvider, useContextValue } = createFastContext<UiStore>();
const parseSchema = (uischema: UiSchema) => {
  return new Parser({}).parse(uischema);
}


const defaultStyles = {
  gap: 8
}


const controlTypes = {
  date: Date,
  datetime: DateTime,
  time: Time,
  text: Input,
  checkbox: Checkbox,
  radio: Radio,
}

const RenderVariadicControl = (props: { id: string, type: keyof typeof controlTypes }) => {
  const Component = controlTypes[props.type];
  if (!Component) return null;
  return <Component />;
}



const RenderControl = (props: { id: string }) => {
  const control = useContextValue((store) => {
    return store.getNode(props.id) as ControlNode;
  });

  return <div style={{ backgroundColor: "#e5e5e5", wordBreak: "break-all" }}>
    <RenderVariadicControl id={props.id} type="text" />
    {control.property}
  </div>
}

const RenderRows = (props: { id: string }) => {
  return (
    <Row data-type="row" style={defaultStyles}><RenderChildren id={props.id} /></Row>
  )
}

const RenderColumns = (props: { id: string }) => {
  return (
    <Column data-type="column" style={defaultStyles}><RenderChildren id={props.id} /></Column>
  )
}

const RenderFieldSets = (props: { id: string }) => {
  return (
    <Row data-type="fieldSets" style={defaultStyles}><RenderChildren id={props.id} /></Row>
  )
}

const RenderFieldSet = (props: { id: string }) => {
  return (
    <Column data-type="fieldSet" style={defaultStyles}><RenderChildren id={props.id} /></Column>
  )
}


const types = {
  [UiNodeType.COLUMNS]: RenderColumns,
  [UiNodeType.ROWS]: RenderRows,
  [UiNodeType.CONTROL]: RenderControl,
  [UiNodeType.FIELD_SETS]: RenderFieldSets,
  [UiNodeType.FIELD_SET]: RenderFieldSet,
}


const RenderVariadic = (props: { id: string }) => {
  const nodeType = useContextValue((store) => {
    return store.getNodeType(props.id);
  });

  const Renderer = types[nodeType];
  return <Renderer id={props.id} />
}



const RenderChildren = (props: { id: string }) => {
  const nodes = useContextValue((store) => {
    return store.getChildren(props.id);
  }, shallowCompare).map((node) => {
    return <RenderVariadic key={node} id={node} />
  });

  return <>{nodes}</>;

  // return (
  //   <Form onSubmit={onSubmit}>
  //     <div><Input label='Name' name="name" /></div>
  //     <div><Input label='Last Name' name="last_name" /></div>
  //     <div><Input label='Email' name="email" /></div>
  //     <Button onSubmit={onSubmit}>Hello World</Button>
  //   </Form>
  // )
}


function App(props: { uiSchema: UiSchema }) {
  const store = useMemo(() => parseSchema(props.uiSchema), [props.uiSchema]);
  return (
    <UiContextProvider value={store}>
      <Form>
        <Row style={defaultStyles}>
          <RenderChildren id="root" />
        </Row>
      </Form>
    </UiContextProvider>
  )
}

export default App
