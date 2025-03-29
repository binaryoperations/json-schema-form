import { jsx as _jsx } from "react/jsx-runtime";
import { styles } from './styles';
export const Column = function Column(props) {
    const { reverse = false, ...divProps } = props;
    const style = {
        ...styles.column,
        ...(reverse ? styles.columnReverse : {}),
        ...props.style,
    };
    return _jsx("div", { ...divProps, style: style });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sdW1uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY29tcG9uZW50cy9TZW1hbnRpYy9Db2x1bW4udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBUWxDLE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBVyxTQUFTLE1BQU0sQ0FBQyxLQUFLO0lBQ2pELE1BQU0sRUFBRSxPQUFPLEdBQUcsS0FBSyxFQUFFLEdBQUcsUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDO0lBRS9DLE1BQU0sS0FBSyxHQUFHO1FBQ1osR0FBRyxNQUFNLENBQUMsTUFBTTtRQUNoQixHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDeEMsR0FBRyxLQUFLLENBQUMsS0FBSztLQUNmLENBQUM7SUFFRixPQUFPLGlCQUFTLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxHQUFRLENBQUM7QUFDakQsQ0FBQyxDQUFDIn0=