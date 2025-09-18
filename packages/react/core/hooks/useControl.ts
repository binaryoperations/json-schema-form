import { cast } from '@binaryoperations/json-forms-core/internals/cast';
import {
  set,
  shallowCompare,
  noop,
  fastDeepEqual,
} from '@binaryoperations/json-forms-core/internals/object';
import type {
  ControlNodeType,
  ControlSchema,
} from '@binaryoperations/json-forms-core/models';
import type { Selector } from '@binaryoperations/json-forms-core/types/reducers';
import { RefObject, useCallback } from 'react';

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
import type { SchemaNode } from 'json-schema-library';


const useInvariantControl = (message: string) =>
  useInvariantContext(ControlContext, message);

/**
 *
 * Read the UI node for the current control
 *
 */
export function useControl<SelectorOutput = ControlNodeType>(
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
  const [currentControlId] = useInvariantControl(
    'useControlSchema can only be called inside ControlContext'
  );

  const formDataRef = useFormDataRef();

  return useStore((store) => {
    return selector(
      store.uiContext.deriveControlSchema(
        currentControlId,
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
  const storeRef = useUiStoreRef();


  const [value, setFormData] = useFormDataContext(
    (data) => storeRef.current.uiContext.deriveDataAtPointer(data, path),
    shallowCompare
  );


  const validate = useValidateData(path, 'onChange', storeRef);

  return [
    value,
    useCallback(
      (value: V) => {
        setFormData((oldValue) => set(oldValue, path, value));
        storeRef.current.setDirty(path, value);
        validate(value);
      },
      [validate, path, setFormData, storeRef]
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
  const validate = useValidateData(path, 'onBlur', useUiStoreRef());
  const setTouched = useUiStoreRef().current.setTouched;

  const [value, setValue] = useControlValue(path);

  const proxyValue = useValue(value);
  const formDataRef = useFormDataRef();

  const [schema] = useUiStoreContext((state) => {
    const node = state.uiContext.deriveControlSchemaNode(path, formDataRef.current);
    return node?.schema;
  }, fastDeepEqual);

  const [meta] = useUiStoreContext((state) => {
    return {
      touched: state.touchedControlPaths.has(path),
      dirty: state.dirtyControlPaths.has(path),
      error: state.errors.get(path)?.at(0)?.message,
      required: !!state.uiContext.getNodeByPath(path)?.required
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

export function useValidateData(
  path: string,
  validateOn: UiStoreContextType['validationMode'],
  storeRef: RefObject<UiStoreContextType>
) {
  const formDataRef = useFormDataRef();


  const validate = storeRef.current.validationMode === validateOn ? storeRef : undefined;

  return useCallback(
    (value: any, schema?: SchemaNode) => {
      if (!validate) return {
        isValid: true,
        errors: [],
      };

      const shouldReset = validateOn === 'onSubmit';

      const testSchema = schema ?? storeRef.current.uiContext.deriveControlSchemaNode(path, formDataRef.current);

      const validateResult = shouldReset
        ? storeRef.current.validate(value ?? formDataRef.current, testSchema)
        : storeRef.current.validate(value, testSchema);

      storeRef.current.setErrors(
        path,
        validateResult.isValid ? [] : validateResult.errors,
        shouldReset
      );

      return validateResult;
    },
    [path, storeRef, validateOn, formDataRef]
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
