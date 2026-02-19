import React, { Component } from 'react';
import SafeInputField from '@helsenorge/form/components/safe-input-field';
declare type Props = React.ComponentProps<typeof SafeInputField>;
export default class NumberSafeInputField extends Component<Props> {
    private preventWheel;
    private handleFocus;
    private handleBlur;
    render(): JSX.Element;
}
export {};
