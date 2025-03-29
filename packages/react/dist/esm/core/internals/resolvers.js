import isEmpty from 'lodash/isEmpty';
import { extractSegmentsFromPath } from './extractSegmentsFromPath';
function resolvePath(data, path) {
    if (isEmpty(path))
        return data;
    if (!data)
        return data;
    const segments = extractSegmentsFromPath(path);
    return segments.reduce((value, nextSegment) => {
        if (!value || !Object.prototype.hasOwnProperty.call(value, nextSegment))
            return undefined;
        return value[nextSegment];
    }, data);
}
export default {
    resolvePath,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29yZS9pbnRlcm5hbHMvcmVzb2x2ZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXBFLFNBQVMsV0FBVyxDQUFVLElBQVMsRUFBRSxJQUFZO0lBQ25ELElBQUksT0FBTyxDQUFDLElBQUksQ0FBQztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQy9CLElBQUksQ0FBQyxJQUFJO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFFdkIsTUFBTSxRQUFRLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFL0MsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxFQUFFO1FBQzVDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQztZQUNyRSxPQUFPLFNBQVMsQ0FBQztRQUVuQixPQUFPLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM1QixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDWCxDQUFDO0FBRUQsZUFBZTtJQUNiLFdBQVc7Q0FDWixDQUFDIn0=