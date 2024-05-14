/// <reference types="react" />
import { ThunkDispatch } from 'redux-thunk';
import { QuestionnaireItem, QuestionnaireResponseItemAnswer, Attachment, QuestionnaireResponseItem, Questionnaire } from '../../../types/fhir';
import { TextMessage } from '../../../types/text-message';
import { UploadedFile } from '@helsenorge/file-upload/components/dropzone';
import { ValidationProps } from '@helsenorge/form/components/form/validation';
import { NewValueAction } from '../../../actions/newValue';
import { GlobalState } from '../../../reducers';
import { Resources } from '../../../util/resources';
import { Path } from '../../../util/refero-core';
export interface Props {
    dispatch?: ThunkDispatch<GlobalState, void, NewValueAction>;
    path: Array<Path>;
    item: QuestionnaireItem;
    questionnaire?: Questionnaire;
    responseItem: QuestionnaireResponseItem;
    answer: Array<QuestionnaireResponseItemAnswer> | QuestionnaireResponseItemAnswer;
    pdf?: boolean;
    id?: string;
    resources?: Resources;
    renderDeleteButton: () => JSX.Element | undefined;
    repeatButton: JSX.Element;
    attachmentErrorMessage?: string;
    attachmentMaxFileSize?: number;
    attachmentValidTypes?: Array<string>;
    uploadAttachment?: (files: File[], onSuccess: (uploadedFile: UploadedFile, attachment: Attachment) => void, onError: (errorMessage: TextMessage | null) => void) => void;
    onDeleteAttachment?: (fileId: string, onSuccess: () => void, onError: (errorMessage: TextMessage | null) => void) => void;
    onOpenAttachment?: (fileId: string) => void;
    onRequestAttachmentLink?: (file: string) => string;
    renderHelpButton: () => JSX.Element;
    renderHelpElement: () => JSX.Element;
    isHelpOpen?: boolean;
    onAnswerChange: (newState: GlobalState, path: Array<Path>, item: QuestionnaireItem, answer: QuestionnaireResponseItemAnswer) => void;
    onRenderMarkdown?: (item: QuestionnaireItem, markdown: string) => string;
}
declare const connectedComponent: import("react-redux").ComponentClass<import("react-redux").Omit<Props & ValidationProps & import("../../with-common-functions").Props, keyof import("../../with-common-functions").Props> & import("../../with-common-functions").Props>;
export default connectedComponent;
