import '@binaryoperations/json-forms-react';

import createControl from '@binaryoperations/json-forms-core/controls/createControl';
import { Schema } from '@binaryoperations/json-forms-core/models/ControlSchema';
import {
  ControlNode,
  UiNodeType,
  UiSchema,
} from '@binaryoperations/json-forms-core/models/UiSchema';
import { createRankedTester } from '@binaryoperations/json-forms-core/testers/testers';
import resolvers from '@binaryoperations/json-forms-core/internals/resolvers';
import { CheckboxControl } from '@binaryoperations/json-forms-react/components/Controls/Checkbox';
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
import { Bootstrap } from '@binaryoperations/json-forms-react/core/components/Form';
import { useFormDataContext } from '@binaryoperations/json-forms-react/core/context/FormDataContext';
import { createLayoutRenderer } from '@binaryoperations/json-forms-react/core/hoc/createRenderer';
import { ComponentProps, useCallback, useState } from 'react';
import { cast } from '@binaryoperations/json-forms-core/internals/cast';

const defaultStyles = {
  gap: 8,
  flex: 1,
};

const controlTypes = {
  date: DateControl,
  datetime: DateTimeControl,
  time: TimeControl,
  string: TextInputControl,
  number: NumberControl,
  checkbox: CheckboxControl,
  radio: RadioControl,
  computedDate: createControl(
    (
      props: ComponentProps<typeof NumberInput> & {
        deriveFrom?: string;
      }
    ) => {
      const { deriveFrom, ...componentProps } = props;
      const value = useFormDataContext((data) =>
        deriveFrom ? computeAge(resolvers.resolvePath(data, deriveFrom)) : ''
      );
      return <NumberInput {...componentProps} value={value} />;
    },
    (e) => cast<{ value: string }>(e.target).value,
    createRankedTester((_, uischema) =>
      'deriveFrom' in ((uischema as ControlNode).options ?? {}) ? 100 : -1
    )
  ),
};

const controls = Object.values(controlTypes);

const types = {
  [UiNodeType.COLUMNS]: createLayoutRenderer(function LayoutColumn(props: {
    id: string;
  }) {
    return <Column data-type="column" style={defaultStyles} {...props} />;
  }),
  [UiNodeType.ROWS]: createLayoutRenderer(function LayoutRow(props: {
    id: string;
  }) {
    return <Row data-type="row" style={defaultStyles} {...props} />;
  }),
  [UiNodeType.CONTROL]: createLayoutRenderer(function LayoutControl(props: {
    id: string;
  }) {
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
  }),
  [UiNodeType.FIELD_SETS]: createLayoutRenderer(
    function LayoutFieldSets(props: { id: string }) {
      return <Column data-type="fieldSet" style={defaultStyles} {...props} />;
    }
  ),
  [UiNodeType.FIELD_SET]: createLayoutRenderer(function LayoutFieldSet(props: {
    id: string;
  }) {
    return <Column data-type="fieldSet" style={defaultStyles} {...props} />;
  }),
};

function datediff(first: number, second: number) {
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

function computeAge(date: string) {
  const resolvedTime = new Date(date).getTime();
  if (isNaN(resolvedTime)) return '';
  return datediff(resolvedTime, Date.now());
}

function App(props: { uiSchema: UiSchema; schema?: Schema; data: object }) {
  const [data, setData] = useState(props.data);

  const onChange = useCallback((next: object) => {
    setData(next);
  }, []);

  return (
    <Bootstrap
      {...props}
      layout={types}
      controls={controls}
      style={defaultStyles}
      data={data}
      onDataChange={onChange}
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
