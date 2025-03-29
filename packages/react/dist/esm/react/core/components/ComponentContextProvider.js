import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { UiNodeType } from '../../../core/models';
import { memo, useMemo } from 'react';
import { RendererContextProvider, } from '../context/RendererContext';
import { createCustomLayoutRenderer } from '../hoc/createRenderer';
const CustomLayoutRenderer = createCustomLayoutRenderer(function CustomLayoutRendererRoot(props) {
    return _jsx(_Fragment, { children: props.children });
});
export const ComponentContextProvider = memo(function ComponentContextProvider(props) {
    const contextValue = useMemo(() => {
        const layout = UiNodeType['CUSTOM'] in props.layout
            ? props.layout
            : { ...props.layout, [UiNodeType['CUSTOM']]: CustomLayoutRenderer };
        return {
            layout,
            controls: props.controls,
        };
    }, [props.controls, props.layout]);
    return (_jsx(RendererContextProvider, { value: contextValue, children: props.children }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tcG9uZW50Q29udGV4dFByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29yZS9jb21wb25lbnRzL0NvbXBvbmVudENvbnRleHRQcm92aWRlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN0RSxPQUFPLEVBQWlCLElBQUksRUFBcUIsT0FBTyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBRXhFLE9BQU8sRUFDTCx1QkFBdUIsR0FFeEIsTUFBTSw0QkFBNEIsQ0FBQztBQUNwQyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQVFuRSxNQUFNLG9CQUFvQixHQUFHLDBCQUEwQixDQUNyRCxTQUFTLHdCQUF3QixDQUFDLEtBQXdCO0lBQ3hELE9BQU8sNEJBQUcsS0FBSyxDQUFDLFFBQVEsR0FBSSxDQUFDO0FBQy9CLENBQUMsQ0FDRixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sd0JBQXdCLEdBQTZCLElBQUksQ0FDcEUsU0FBUyx3QkFBd0IsQ0FBQyxLQUFLO0lBQ3JDLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUU7UUFDaEMsTUFBTSxNQUFNLEdBQ1YsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNO1lBQ2xDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUNkLENBQUMsQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLG9CQUFvQixFQUFFLENBQUM7UUFFeEUsT0FBTztZQUNMLE1BQU07WUFDTixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7U0FDekIsQ0FBQztJQUNKLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFFbkMsT0FBTyxDQUNMLEtBQUMsdUJBQXVCLElBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVEsR0FBSSxDQUMzRSxDQUFDO0FBQ0osQ0FBQyxDQUNGLENBQUMifQ==