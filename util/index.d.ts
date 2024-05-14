import { Questionnaire, QuestionnaireResponseItem, QuestionnaireItem, QuestionnaireResponseItemAnswer } from '../types/fhir';
import { Resources } from '../util/resources';
export declare function getComponentForItem(type: string): import("react-redux").ComponentClass<import("react-redux").Omit<import("../components/with-common-functions").Props, keyof import("../components/with-common-functions").Props> & import("../components/with-common-functions").Props> | undefined;
export declare function isStringEmpty(string: string | undefined): boolean;
export declare function isReadOnly(item: QuestionnaireItem): boolean;
export declare function isRequired(item: QuestionnaireItem): boolean;
export declare function isRepeat(item: QuestionnaireItem): boolean;
export declare function isDataReceiver(item: QuestionnaireItem): boolean;
export declare function isHiddenItem(item: QuestionnaireItem): boolean | undefined;
export declare function getId(id?: string): string;
export declare function renderPrefix(item: QuestionnaireItem): string;
export declare function getSublabelText(item: QuestionnaireItem, onRenderMarkdown?: (item: QuestionnaireItem, markdown: string) => string, questionnaire?: Questionnaire | null, resources?: Resources): string;
export declare function getText(item: QuestionnaireItem, onRenderMarkdown?: (item: QuestionnaireItem, markdown: string) => string, questionnaire?: Questionnaire | null, resources?: Resources): string;
export declare function getChildHeaderTag(item?: QuestionnaireItem, headerTag?: number): number;
export declare function getLinkId(item: QuestionnaireItem): string;
export declare function getStringValue(answer: QuestionnaireResponseItemAnswer | Array<QuestionnaireResponseItemAnswer>): string;
export declare function getPDFStringValue(answer: QuestionnaireResponseItemAnswer | Array<QuestionnaireResponseItemAnswer>, resources?: Resources): string;
export declare function getMaxLength(item: QuestionnaireItem): number | undefined;
export declare function repeats(item: QuestionnaireItem): boolean;
export declare function shouldRenderRepeatButton(item: QuestionnaireItem, response: Array<QuestionnaireResponseItem> | undefined, index?: number): boolean;
export declare function validateText(value: string, validateScriptInjection: boolean): boolean;
export declare function getTextValidationErrorMessage(value: string, validateScriptInjection: boolean, item: QuestionnaireItem, resources?: Resources): string;
export declare function getDecimalPattern(item: QuestionnaireItem): string | undefined;
export declare function isIE11(): boolean;