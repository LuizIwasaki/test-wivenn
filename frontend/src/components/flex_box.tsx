import { HTMLProps } from "react";

interface IFlexBoxAttributes {
    vertical?: boolean;

    centerMainAxis?: boolean;
    centerSecondaryAxis?: boolean;
    centerBothAxes?: boolean;

    fullWidth?: boolean;
    fullHeight?: boolean;
    fullDimensions?: boolean;

    wrap?: 'nowrap' | 'wrap' | 'reverse';
    justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
}

const FlexBox: React.FC<HTMLProps<{}> & IFlexBoxAttributes> = ({...props}) => {

    let divClassName = ['d-flex', props.className];

    if (props.vertical) divClassName.push('flex-column');

    if (props.centerMainAxis || props.centerBothAxes) divClassName.push('justify-content-center');
    if (props.centerSecondaryAxis || props.centerBothAxes) divClassName.push('align-items-center');

    if (props.fullWidth || props.fullDimensions) divClassName.push('w-100');
    if (props.fullHeight || props.fullDimensions) divClassName.push('h-100');

    if (props.wrap) divClassName.push(`flex-${props.wrap}`);
    if (props.justifyContent) divClassName.push(`justify-content-${props.justifyContent}`);

    return (
        <div className={divClassName.join(' ')} style={props.style} >
            {props.children}
        </div>
    );
}

export default FlexBox