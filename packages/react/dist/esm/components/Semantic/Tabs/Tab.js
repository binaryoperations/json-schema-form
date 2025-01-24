import { useIsActive } from '../../../context/ActiveStateContext';
export const Tab = (props) => {
    return !useIsActive(props.id) ? null : (props.children ?? null);
};
//# sourceMappingURL=Tab.js.map