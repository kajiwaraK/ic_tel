import React from "react";
import { style } from "./style"
export type Props = {

}
const Component: React.FC<Props> = (props) => {
    return <div {...props} >main</div>
}

export default style(Component)