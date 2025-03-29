import { jsx as _jsx } from "react/jsx-runtime";
import { styles } from './styles';
export const Row = function Row(props) {
    const { reverse = false, ...divProps } = props;
    const style = {
        ...styles.row,
        ...(reverse ? styles.rowReverse : {}),
        ...props.style,
    };
    return _jsx("div", { ...divProps, style: style });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29tcG9uZW50cy9TZW1hbnRpYy9Sb3cudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBU2xDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBUSxTQUFTLEdBQUcsQ0FBQyxLQUFLO0lBQ3hDLE1BQU0sRUFBRSxPQUFPLEdBQUcsS0FBSyxFQUFFLEdBQUcsUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDO0lBRS9DLE1BQU0sS0FBSyxHQUFHO1FBQ1osR0FBRyxNQUFNLENBQUMsR0FBRztRQUNiLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNyQyxHQUFHLEtBQUssQ0FBQyxLQUFLO0tBQ2YsQ0FBQztJQUVGLE9BQU8saUJBQVMsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEdBQVEsQ0FBQztBQUNqRCxDQUFDLENBQUMifQ==