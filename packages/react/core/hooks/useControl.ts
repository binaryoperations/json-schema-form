import { cast } from '@binaryoperations/json-forms-core/internals/cast';
import {
  set,
  shallowCompare,
  noop,
} from '@binaryoperations/json-forms-core/internals/object';
import resolvers from '@binaryoperations/json-forms-core/internals/resolvers';
import type {
  ControlNodeType,
  ControlSchema,
} from '@binaryoperations/json-forms-core/models';
import type { Selector } from '@binaryoperations/json-forms-core/types/reducers';
import { useCallback } from 'react';

import { ControlContext } from '../context/ControlContext';
import { useFormDataContext, useFormDataRef } from '../context/FormDataContext';
import {
  UiStoreContextType,
  useUiStoreContext,
  useUiStoreRef,
} from '../context/StoreContext';
import { useInvariantContext } from './useInvariantContext';
import { useStore } from './useStore';
import useValue from './useValue';

const useInvariantControl = (message: string) =>
  useInvariantContext(ControlContext, message);

/**
 *
 * Read the UI node for the current control
 *
 */
export function useControl<SelectorOutput>(
  selector: Selector<ControlNodeType, SelectorOutput>,
  equalityCheck = Object.is
) {
  const currentControlId = useInvariantControl(
    'useControl can only be called inside ControlContext'
  );

  return useStore((store) => {
    return selector(
      cast<ControlNodeType>(store.uiContext.getNode(currentControlId))
    );
  }, equalityCheck);
}

/**
 *
 * Read the schema of the control
 *
 */
export function useControlSchema<SelectorOutput>(
  selector: Selector<ControlSchema, SelectorOutput>,
  equalityCheck?: typeof Object.is
) {
  const currentControl = useInvariantControl(
    'useControlSchema can only be called inside ControlContext'
  );

  const formDataRef = useFormDataRef();

  return useStore((store) => {
    return selector(
      store.uiContext.deriveSchemaAtPointer(
        currentControl,
        formDataRef.current
      )!
    );
  }, equalityCheck)[0];
}

/**
 *
 * Read the schema of the control
 *
 */
export function useControlValue<V = unknown>(path: string) {
  const [value, setFormData] = useFormDataContext(
    (data) => resolvers.resolvePath<V>(data, path),
    shallowCompare
  );

  const setDirty = useUiStoreRef().current.setDirty;

  const validate = useValidateData(path, 'onChange');

  return [
    value,
    useCallback(
      (value: V) => {
        setFormData((oldValue) => set(oldValue, path, value));
        setDirty(path, value);
        validate(value);
      },
      [validate, path, setFormData, setDirty]
    ),
  ] as [value: V, set: (value: V) => void];
}

type ControlProps = {
  onBlur?: (e: any) => void;
  onFocus?: (e: any) => void;
  value: any;
  setValue: (value: any) => void;
  disabled?: boolean;

  meta?: {
    touched: boolean;
    dirty: boolean;
    error?: string;
  };
};

export function useControlProps<P extends Record<string, any> = {}>(
  path: string,
  props: P & Pick<ControlProps, 'onBlur' | 'onFocus'>
): ControlProps & P {
  const { onBlur, onFocus, ...rest } = props;
  const validate = useValidateData(path, 'onBlur');
  const setTouched = useUiStoreRef().current.setTouched;

  const [value, setValue] = useControlValue(path);

  const proxyValue = useValue(value);

  const [{ pointer, schema, }] = useUiStoreContext((state) => {
    const node = state.uiContext.deriveSchemaNodeAtPointer(path);
    node.evaluationPath
    return {
      pointer: node.evaluationPath,
      schema: node?.schema,
    };
  }, shallowCompare);

  const [meta] = useUiStoreContext((state) => {
    return {
      touched: state.touchedControlPaths.has(pointer),
      dirty: state.dirtyControlPaths.has(pointer),
      error: state.errors.get(pointer)?.at(0)?.message,
    }
  }, shallowCompare);

  const handleOnBlur = useCallback<Required<ControlProps>['onBlur']>(
    (e) => {
      onBlur?.(e);

      validate(proxyValue.value);
    },
    [onBlur, validate, proxyValue]
  );

  const handleOnFocus = useCallback<Required<ControlProps>['onFocus']>(
    (e) => {
      onFocus?.(e);
      setTouched(path);
    },
    [onFocus, setTouched, path]
  );

  const disabled = props.disabled || schema.readOnly;
  schema
  return {
    ...rest as P,
    ...schema.options,
    disabled,
    onBlur: deriveValue(handleOnBlur, onBlur, disabled),
    onFocus: deriveValue(handleOnFocus, onFocus, disabled),
    setValue: deriveValue(setValue, noop, disabled),
    value,

    meta,
  };
}

function useValidateData(
  path: string,
  validateOn: UiStoreContextType['validationMode']
) {
  const formDataRef = useFormDataRef();
  const uiStoreRef = useUiStoreRef();

  const [validate] = useUiStoreContext((state) =>
    state.validationMode === validateOn ? state.validate : undefined
  );

  return useCallback(
    (value: any) => {
      if (!validate) return;

      const shouldReset = validateOn === 'onSubmit';

      const schema =
        uiStoreRef.current.uiContext.deriveSchemaNodeAtPointer(path).schema;

      const validateResult = shouldReset
        ? validate(value ?? formDataRef.current, schema)
        : validate(value, schema);

      uiStoreRef.current.setErrors(
        path,
        validateResult.isValid ? [] : validateResult.errors,
        shouldReset
      );
    },
    [path, validate, uiStoreRef, validateOn, formDataRef]
  );
}

function deriveValue<T>(
  value: T,
  readOnlyValue?: T,
  readOnly?: boolean,
) {
  if (readOnly) {
    return readOnlyValue;
  }

  return value;
}
