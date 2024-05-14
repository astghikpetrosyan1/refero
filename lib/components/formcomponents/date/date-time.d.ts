import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { QuestionnaireItem, QuestionnaireResponseItemAnswer, QuestionnaireResponseItem, Questionnaire } from '../../../types/fhir';
import { ValidationProps } from '@helsenorge/form/components/form/validation';
import { NewValueAction } from '../../../actions/newValue';
import { GlobalState } from '../../../reducers';
import { Resources } from '../../../util/resources';
import { Path } from '../../../util/refero-core';
export interface Props {
    item: QuestionnaireItem;
    questionnaire?: Questionnaire;
    responseItem: QuestionnaireResponseItem;
    answer: QuestionnaireResponseItemAnswer;
    resources?: Resources;
    dispatch?: ThunkDispatch<GlobalState, void, NewValueAction>;
    path: Array<Path>;
    pdf?: boolean;
    language?: string;
    promptLoginMessage?: () => void;
    id?: string;
    renderDeleteButton: (className?: string) => JSX.Element | undefined;
    repeatButton: JSX.Element;
    oneToTwoColumn: boolean;
    renderHelpButton: () => JSX.Element;
    renderHelpElement: () => JSX.Element;
    isHelpOpen?: boolean;
    onAnswerChange: (newState: GlobalState, path: Array<Path>, item: QuestionnaireItem, answer: QuestionnaireResponseItemAnswer) => void;
    onRenderMarkdown?: (item: QuestionnaireItem, markdown: string) => string;
}
declare const connectedComponent: import("react-redux").ComponentClass<import("react-redux").Omit<Props & ValidationProps & import("../../with-common-functions").Props & React.RefAttributes<React.Component<{}, {}, any>>, keyof import("../../with-common-functions").Props> & import("../../with-common-functions").Props>;
export default connectedComponent;
