/// <reference types="react" />
import { ThunkDispatch } from 'redux-thunk';
import { QuestionnaireItem, QuestionnaireResponseItemAnswer, QuestionnaireResponseItem, Questionnaire } from '../../../types/fhir';
import { ValidationProps } from '@helsenorge/form/components/form/validation';
import { NewValueAction } from '../../../actions/newValue';
import { GlobalState } from '../../../reducers';
import { Resources } from '../../../util/resources';
import { Path } from '../../../util/refero-core';
export interface Props {
    value?: string;
    answer: QuestionnaireResponseItemAnswer;
    item: QuestionnaireItem;
    questionnaire?: Questionnaire;
    responseItem: QuestionnaireResponseItem;
    resources?: Resources;
    dispatch?: ThunkDispatch<GlobalState, void, NewValueAction>;
    path: Array<Path>;
    pdf?: boolean;
    promptLoginMessage?: () => void;
    id?: string;
    renderFieldset?: boolean;
    className?: string;
    enable?: boolean;
    renderDeleteButton: (className?: string) => JSX.Element | undefined;
    repeatButton: JSX.Element;
    renderHelpButton: () => JSX.Element;
    renderHelpElement: () => JSX.Element;
    isHelpOpen?: boolean;
    onAnswerChange: (newState: GlobalState, path: Array<Path>, item: QuestionnaireItem, answer: QuestionnaireResponseItemAnswer) => void;
    onRenderMarkdown?: (item: QuestionnaireItem, markdown: string) => string;
}
declare const connectedComponent: import("react-redux").ComponentClass<import("react-redux").Omit<Props & ValidationProps & import("../../with-common-functions").Props, keyof import("../../with-common-functions").Props> & import("../../with-common-functions").Props>;
export default connectedComponent;