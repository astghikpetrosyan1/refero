import * as React from 'react';
import { QuestionnaireItem, Questionnaire } from '../../../types/fhir';
import { Resources } from '../../../util/resources';
interface Props {
    options?: Array<{
        type: string;
        label: string;
        disabled?: boolean;
        image?: string;
        extension?: {
            url: string;
            valueSting?: string;
            valueBoolean?: boolean;
        }[];
    }>;
    item: QuestionnaireItem;
    questionnaire?: Questionnaire;
    id?: string;
    showChoiceImage?: boolean;
    handleChange: (radioButton: string) => void;
    selected?: Array<string | undefined>;
    resources?: Resources;
    repeatButton: JSX.Element;
    renderDeleteButton: (className?: string) => JSX.Element | undefined;
    renderHelpButton: () => JSX.Element;
    renderHelpElement: () => JSX.Element;
    onRenderMarkdown?: (item: QuestionnaireItem, markdown: string) => string;
}
declare const CheckboxView: React.SFC<Props>;
export default CheckboxView;
