

import { cast } from '@binaryoperations/json-forms-core/internals/cast';
import resolvers from '@binaryoperations/json-forms-core/internals/resolvers';
import type { ObjectJsonSchema } from '@binaryoperations/json-forms-core/models/ControlSchema';
import {
  type ControlNode,
  type LayoutSchema,
  UiNodeType,
} from '@binaryoperations/json-forms-core/models/LayoutSchema';
import { createRankedTester } from '@binaryoperations/json-forms-core/testers/testers';
import { CheckboxControl } from '@binaryoperations/json-forms-react/components/Controls/Checkbox';
import { createControl } from '@binaryoperations/json-forms-react';
import {
  DateControl,
  DateTimeControl,
  TimeControl,
} from '@binaryoperations/json-forms-react/components/Controls/DateTime';
import {
  Number as NumberInput,
  NumberControl,
} from '@binaryoperations/json-forms-react/components/Controls/Number';
import { RadioControl } from '@binaryoperations/json-forms-react/components/Controls/Radio';
import { TextInputControl } from '@binaryoperations/json-forms-react/components/Controls/TextInput';
import {
  Column,
  Row,
} from '@binaryoperations/json-forms-react/components/Semantic';
import {
  Bootstrap,
  type FormProps,
} from '@binaryoperations/json-forms-react/core/components/Form';
import { useFormDataContext } from '@binaryoperations/json-forms-react/core/context/FormDataContext';
import {
  type ComponentProps,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { regiserControlRenderers, registerLayoutsRenderers } from '@binaryoperations/json-forms-react';
import { useControlSchema } from '@binaryoperations/json-forms-react/core/hooks';

const defaultStyles = {
  gap: 8,
  flex: 1,
};

registerLayoutsRenderers({
  [UiNodeType.COLUMNS]: function LayoutColumn(props: { id: string; }) {
    return <Column data-type="column" style={defaultStyles} {...props} />;
  },
  [UiNodeType.ROWS]: function LayoutRow(props: { id: string; }) {
    return <Row data-type="row" style={defaultStyles} {...props} />;
  },
  [UiNodeType.FIELD_SETS]: function LayoutFieldSets(props: { id: string; }) {
    return <Row data-type="fieldSets" style={defaultStyles} {...props} />;
  },
  [UiNodeType.FIELD_SET]: function LayoutFieldSet(props: { id: string; }) {
    return <Column data-type="fieldSet" style={defaultStyles} {...props} />;
  },
  [UiNodeType.CONTROL]: function LayoutControl(props: { id: string; }) {
    return (
      <Row
        data-type="control"
        style={{
          backgroundColor: '#e5e5e5',
          wordBreak: 'break-all',
          flexDirection: 'column',
          display: 'flex',
          alignItems: 'flex-start',
          flex: 1,
        }}
        {...props}
      />
    );
  },

  testCustomLayout: (props: PropsWithChildren) => {
    return (
      <>
        <h4>I'm a special custom snowflake</h4>
        {props.children}
      </>
    );
  },
})

regiserControlRenderers({
  date: DateControl,
  datetime: DateTimeControl,
  time: TimeControl,
  string: TextInputControl,
  number: NumberControl,
  checkbox: CheckboxControl,
  radio: RadioControl,
  array: createControl.ArrayControl(
    (props) => {
      return(
      <div className='array-control'>
        {props.label}:
        {props.value?.map((v: any, i: number) => {
          return <div key={i}>{v}</div>;
        })}
      </div>
    )},
    () => []
  ),
  computedDate: createControl.create(
    (
      props: ComponentProps<typeof NumberInput> & {
        deriveFrom?: string;
      }
    ) => {
      const { deriveFrom, ...componentProps } = props;
      const [value] = useFormDataContext((data) =>
        deriveFrom ? computeAge(resolvers.resolvePath(data, deriveFrom)) : ''
      );
      return <NumberInput {...componentProps} value={value} />;
    },
    (e) => cast<{ value: string }>(e.target).value,
    createRankedTester((_, uischema) =>
      'deriveFrom' in ((uischema as ControlNode).options ?? {}) ? 100 : -1
    )
  ),
});

function datediff(first: number, second: number) {
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

function computeAge(date: string) {
  const resolvedTime = new Date(date).getTime();
  if (isNaN(resolvedTime)) return '';
  return datediff(resolvedTime, Date.now());
}

function App(props: {
  uiSchema: LayoutSchema;
  schema: ObjectJsonSchema;
  data: object;
}) {
  const [data, setData] = useState(() => Object.fromEntries(Object.entries(props.data).map(([key, value]) => [key, typeof value === 'object' ? Object.freeze(value) : value])));

  const onChange = useCallback((next: object) => {
    setData(next);
  }, []);

  const validatorRef = useRef<Required<FormProps>['ref']['current']>(null);

  useEffect(() => {
    console.log({ validatorRef: validatorRef.current });
  }, []);

  return (
    <Bootstrap
      {...props}
      style={defaultStyles}
      data={data}
      onDataChange={onChange}
      ref={validatorRef}
    >
      {/* <FormDataProvider value={data} onChange={onChange}>
        <UiStoreContextProvider value={context}>
          <Form>
            <Row style={defaultStyles}>
              <RenderChildren id='root' />
            </Row>
          </Form>
        </UiStoreContextProvider>
      </FormDataProvider> */}
    </Bootstrap>
  );
}

export default App;
