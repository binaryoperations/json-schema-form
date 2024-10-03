import { FC, memo } from "react";

const styles = {
    row: {
        flexDirection: "column",
        maxWidth: '100%',
        display: "flex",
    },
    column: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
    }
} as const;

export const Row: FC<JSX.IntrinsicElements['div']> = memo((props) => {
    return <div {...props} style={{...styles.row, ...props.style}}></div>
})

export const Column: FC<JSX.IntrinsicElements['div']> = memo((props) => {
    return <div {...props} style={{...styles.column, ...props.style}}></div>
})