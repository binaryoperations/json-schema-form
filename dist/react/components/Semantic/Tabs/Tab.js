import { useIsActive } from '@binaryoperations/json-forms-react/context/ActiveStateContext';
export const Tab = (props) => {
    return !useIsActive(props.id) ? null : (props.children ?? null);
};
