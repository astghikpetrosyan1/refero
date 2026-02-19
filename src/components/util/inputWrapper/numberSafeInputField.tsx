import React, { Component } from 'react'
import SafeInputField from '@helsenorge/form/components/safe-input-field'

type Props = React.ComponentProps<typeof SafeInputField>

export default class NumberSafeInputField extends Component<Props> {
    private preventWheel = (e: WheelEvent): void => {
        e.preventDefault()
    }

    private handleFocus = (
        e: React.FocusEvent<HTMLInputElement>
    ): void => {
        e.currentTarget.addEventListener(
            'wheel',
            this.preventWheel,
            { passive: false }
        )

        // Call original onFocus if provided
        this.props.onFocus?.(e, this.props.id)
    }

    private handleBlur = (
        e: React.FocusEvent<HTMLInputElement>
    ): void => {
        e.currentTarget.removeEventListener(
            'wheel',
            this.preventWheel
        )

        // Call original onBlur if provided
        this.props.onBlur?.(e)
    }

    render() {
        return (
            <SafeInputField
                {...this.props}
                type={this.props.type || "number"}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}>
                {this.props.children}
            </SafeInputField>
        )
    }
}