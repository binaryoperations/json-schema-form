import {
  ComponentProps,
  FC,
  memo,
  useCallback,
  useMemo,
  useState,
} from 'react';

import UiSchemaPrepare from '@binaryoperations/json-forms-core/schema/ui.schema';
import { UiStoreContextProvider } from '@binaryoperations/json-forms-react/core/context/StoreContext';
import {
  FormDataProvider,
  useFormDataContext,
} from '@binaryoperations/json-forms-react/core/context/FormDataContext';

import { Input } from '@binaryoperations/json-forms-react/components/Input';
import { Number as NumberComponent } from '@binaryoperations/json-forms-react/components/Number';
// import { Button } from '@binaryoperations/json-forms-react/components/Button';
import { Form } from '@binaryoperations/json-forms-react/components/Form';
import { Radio } from '@binaryoperations/json-forms-react/components/Radio';
import {
  Date as DateComponent,
  DateTime,
  Time,
} from '@binaryoperations/json-forms-react/components/DateTime';

import {
  ControlNode,
  UiNodeType,
  UiSchema,
} from '@binaryoperations/json-forms-core/models/UiSchema';

import { shallowCompare } from '@binaryoperations/json-forms-internals/object';
import resolvers from '@binaryoperations/json-forms-internals/resolvers';
import {
  Column,
  Row,
} from '@binaryoperations/json-forms-react/components/Semantic';
import { Checkbox } from '@binaryoperations/json-forms-react/components/Checkbox';
import { Schema } from '@binaryoperations/json-forms-core/models/ControlSchema';
import { cast } from '@binaryoperations/json-forms-internals/cast';
import createControl from '@binaryoperations/json-forms-core/controls/createControl';
import { createRankedTester } from '@binaryoperations/json-forms-core/testers/testers';
import {
  useStore,
  useControlValue,
} from '@binaryoperations/json-forms-react/core/hooks';

// const onSubmit = (e: FormEvent) => {
//   e?.preventDefault?.();
//   console.log(e, e.target)
// }

const parseUISchema = (uischema: UiSchema) => {
  return UiSchemaPrepare.parse(uischema);
};

const defaultStyles = {
  gap: 8,
};

const controlTypes = {
  date: DateComponent,
  datetime: DateTime,
  time: Time,
  string: Input,
  number: NumberComponent,
  checkbox: Checkbox,
  radio: Radio,
  computedDate: createControl(
    (
      props: ComponentProps<typeof NumberComponent.Control> & {
        deriveFrom?: string;
      }
    ) => {
      const { deriveFrom, ...componentProps } = props;
      const value = useFormDataContext((data) =>
        deriveFrom ? computeAge(resolvers.resolvePath(data, deriveFrom)) : ''
      );
      return <NumberComponent.Control {...componentProps} value={value} />;
    },
    createRankedTester((_, uischema) =>
      'deriveFrom' in ((uischema as ControlNode).options ?? {}) ? 100 : -1
    )
  ),
};

const Unhandled = (props: { path: string }) => {
  const [value] = useControlValue(props.path);
  return (
    <div style={{ backgroundColor: '#e5e5e5', wordBreak: 'break-all' }}>
      value: {JSON.stringify(value)} <br />
      scope: {JSON.stringify(props.path)} <br />
    </div>
  );
};

const RenderControl = (props: { id: string }) => {
  const Control = useStore((store) => {
    const ranked = Object.values(controlTypes).reduce(
      (lastControl, control) => {
        const node = store.uiContext.deriveNodeSchema(props.id)!;
        const rank = control.is(
          store.uiContext.deriveNodeSchema(props.id)!,
          store.uiContext.getNode(props.id),
          { rootSchema: node }
        );

        if (!rank) return lastControl;

        if (lastControl && rank in lastControl) return lastControl;

        return {
          ...lastControl,
          ...Object.fromEntries([[rank, control.Control]]),
        };
      },
      cast<null | Record<string, FC>>(null)
    );

    if (!ranked) return;

    const maxRank = Math.max(...Object.keys(ranked).map(Number));
    return ranked?.[maxRank];
  }, shallowCompare);

  const control = useStore((store) => {
    return store.uiContext.getNode(props.id) as ControlNode;
  }, shallowCompare);

  const path = control.path;
  const [value, setValue] = useControlValue(path);

  if (!Control) return <Unhandled path={path} />;

  return (
    <div style={{ backgroundColor: '#e5e5e5', wordBreak: 'break-all' }}>
      <Control
        {...control.options}
        label={path}
        value={(value ?? '') as any}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

const RenderRows = (props: { id: string }) => {
  return (
    <Row data-type='row' style={defaultStyles}>
      <RenderChildren id={props.id} />
    </Row>
  );
};

const RenderColumns = (props: { id: string }) => {
  return (
    <Column data-type='column' style={defaultStyles}>
      <RenderChildren id={props.id} />
    </Column>
  );
};

const RenderFieldSets = (props: { id: string }) => {
  return (
    <Row data-type='fieldSets' style={defaultStyles}>
      <RenderChildren id={props.id} />
    </Row>
  );
};

const RenderFieldSet = (props: { id: string }) => {
  return (
    <Column data-type='fieldSet' style={defaultStyles}>
      <RenderChildren id={props.id} />
    </Column>
  );
};

const types = {
  [UiNodeType.COLUMNS]: RenderColumns,
  [UiNodeType.ROWS]: RenderRows,
  [UiNodeType.CONTROL]: RenderControl,
  [UiNodeType.FIELD_SETS]: RenderFieldSets,
  [UiNodeType.FIELD_SET]: RenderFieldSet,
};

const RenderVariadic = memo((props: { id: string }) => {
  const nodeType = useStore((store) => {
    return store.uiContext.getNodeType(props.id);
  });

  const Renderer = types[nodeType];
  return <Renderer id={props.id} />;
});

const RenderChildren = memo((props: { id: string }) => {
  const nodes = useStore((store) => {
    return store.uiContext.getChildren(props.id);
  }, shallowCompare).map((node) => {
    return <RenderVariadic key={node} id={node} />;
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
});

function datediff(first: number, second: number) {
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

function computeAge(date: string) {
  const resolvedTime = new Date(date).getTime();
  if (isNaN(resolvedTime)) return '';
  return datediff(resolvedTime, Date.now());
}
function App(props: { uiSchema: UiSchema; schema: Schema; data: object }) {
  const [data, setData] = useState(props.data);

  const uiContext = useMemo(() => {
    return parseUISchema(JSON.parse(JSON.stringify(props.uiSchema)));
  }, [props.uiSchema]);

  const onChange = useCallback((next: object) => {
    setData(next);
  }, []);

  const context = useMemo(() => ({ uiContext }), [uiContext]);

  return (
    <FormDataProvider value={data} onChange={onChange}>
      <UiStoreContextProvider value={context}>
        <Form>
          <Row style={defaultStyles}>
            <RenderChildren id='root' />
          </Row>
        </Form>
      </UiStoreContextProvider>
    </FormDataProvider>
  );
}

export default App;
