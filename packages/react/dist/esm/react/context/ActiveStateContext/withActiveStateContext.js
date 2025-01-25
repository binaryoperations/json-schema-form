import { jsx as _jsx } from "react/jsx-runtime";
import { cast } from '../../../core/internals/cast';
import { memo } from 'react';
import useSafeCallback from '../../core/hooks/useSafeCallback';
import { ActiveStateProvider, useActiveStateChange, } from './ActiveStateContext';
import { usePrepareContextValue } from './hooks';
export default function withActiveStateContext(Component) {
    return Object.assign(memo(function WithActiveStateContext(props) {
        const { onChange: onChangeProp, value: __, defaultValue: ___, ...restProps } = cast(props);
        const multiple = restProps.multiple;
        const onChange = useSafeCallback((nextValue) => {
            if (multiple) {
                cast(props).onChange?.(nextValue.activeState);
                return;
            }
            cast(props).onChange?.(nextValue.activeState[0]);
        });
        return (_jsx(ActiveStateProvider, { value: usePrepareContextValue({ ...props, multiple }), onChange: onChangeProp && onChange, children: _jsx(RenderComponentInContext, { ...props }) }));
    }), Component.displayName ? { displayName: Component.displayName } : {});
    function RenderComponentInContext(props) {
        const onActivate = useActiveStateChange();
        return _jsx(Component, { ...cast(props), onChange: onActivate });
    }
}
//# sourceMappingURL=withActiveStateContext.js.map