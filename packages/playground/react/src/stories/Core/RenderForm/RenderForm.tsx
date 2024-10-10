import { FC, memo, useCallback, useMemo, useState } from 'react';

import UiSchemaPrepare, {
  UiStore,
} from '@binaryoperations/json-forms-core/schema/ui.schema';
import JsonSchemaPrepare from '@binaryoperations/json-forms-core/schema/logical.schema';
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

import { createFastContext } from '@binaryoperations/json-forms-react/contexts/fast-context';

import {
  set,
  shallowCompare,
} from '@binaryoperations/json-forms-internals/object';
import resolvers from '@binaryoperations/json-forms-internals/resolvers';
import {
  Column,
  Row,
} from '@binaryoperations/json-forms-react/components/Semantic';
import { Checkbox } from '@binaryoperations/json-forms-react/components/Checkbox';
import { JsonSchema } from '@binaryoperations/json-forms-core/models/JsonSchema';
import { cast } from '@binaryoperations/json-forms-internals/cast';

// const onSubmit = (e: FormEvent) => {
//   e?.preventDefault?.();
//   console.log(e, e.target)
// }

const {
  Provider: FormDataProvider,
  useStoreRef: useStoreContextRef,
  useContextValue: useFormDataContext,
} = createFastContext<object>();

const { Provider: UiStoreContextProvider, useContextValue: useUiStoreContext } =
  createFastContext<{
    uiContext: UiStore;
    schema: JsonSchema;
  }>();

const parseUISchema = (uischema: UiSchema) => {
  return UiSchemaPrepare.parse(uischema);
};

const parseSchema = (schema: JsonSchema) => {
  return JsonSchemaPrepare.parse(schema);
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
};

function useControlValue(path: string) {
  const value = useFormDataContext(
    (data) => resolvers.resolvePath(data, path),
    shallowCompare
  );

  const store = useStoreContextRef();

  return [
    value,
    useCallback(
      (value: unknown) => {
        store.set((oldValue) => {
          return set(oldValue, path, value);
        });
      },
      [path, store]
    ),
  ];
}

const Unhandled = (props: { scope: string }) => {
  const [value] = useControlValue(props.scope);
  return (
    <div style={{ backgroundColor: '#e5e5e5', wordBreak: 'break-all' }}>
      value: {JSON.stringify(value)} <br />
      scope: {JSON.stringify(props.scope)} <br />
    </div>
  );
};

const RenderControl = (props: { id: string }) => {
  const Control = useUiStoreContext((store) => {
    const ranked = Object.values(controlTypes).reduce(
      (lastControl, control) => {
        const rank = control.is(
          store.uiContext.deriveNodeSchema(store.schema, props.id)!,
          store.uiContext.getNode(props.id),
          { rootSchema: store.schema }
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

  const control = useUiStoreContext((store) => {
    return store.uiContext.getNode(props.id) as ControlNode;
  }, shallowCompare);

  const path = control.path ?? control.scope;
  const [value, setValue] = useControlValue(path);

  if (!Control) return <Unhandled scope={control.scope} />;

  return (
    <div style={{ backgroundColor: '#e5e5e5', wordBreak: 'break-all' }}>
      <Control
        {...control.options}
        label={control.scope}
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
  const nodeType = useUiStoreContext((store) => {
    return store.uiContext.getNodeType(props.id);
  });

  const Renderer = types[nodeType];
  return <Renderer id={props.id} />;
});

const RenderChildren = memo((props: { id: string }) => {
  const nodes = useUiStoreContext((store) => {
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

function App(props: { uiSchema: UiSchema; schema: JsonSchema; data: object }) {
  const [lastUpdatedAt, setLastUpdatedAt] = useState(() => Date.now());
  const schema = useMemo(() => {
    console.log(lastUpdatedAt);
    return parseSchema(JSON.parse(JSON.stringify(props.schema)));
  }, [props.schema, lastUpdatedAt]);
  const uiContext = useMemo(() => {
    console.log(lastUpdatedAt);
    return parseUISchema(JSON.parse(JSON.stringify(props.uiSchema)));
  }, [props.uiSchema, lastUpdatedAt]);

  const onChange = useCallback(() => {
    setLastUpdatedAt(Date.now());
  }, []);

  const context = useMemo(
    () => ({
      schema,
      uiContext,
    }),
    [schema, uiContext]
  );

  return (
    <FormDataProvider value={props.data} onChange={onChange}>
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
