/// <reference types="react" />
import { QuestionnaireItem, QuestionnaireResponseItemAnswer, Resource } from '../types/fhir';
import { Options } from '@helsenorge/form/components/radio-group';
import { Resources } from './resources';
export declare function hasCanonicalValueSet(item: QuestionnaireItem): boolean;
export declare function hasOptions(resources: Resources | undefined, item: QuestionnaireItem, containedResources?: Resource[]): boolean;
export declare function getOptions(resources: Resources | undefined, item: QuestionnaireItem, containedResources?: Resource[]): Array<Options> | undefined;
export declare function getSystem(item: QuestionnaireItem, code: string, containedResources?: Resource[]): string | undefined;
export declare function getDisplay(options: Array<Options> | undefined, value: string | undefined): string | undefined;
export declare function renderOptions(item: QuestionnaireItem, containedResources: Resource[] | undefined, renderRadio: (o: Array<Options> | undefined) => JSX.Element, renderCheckbox: (o: Array<Options> | undefined) => JSX.Element, renderDropdown: (o: Array<Options> | undefined) => JSX.Element, resources: Resources | undefined, renderAutosuggest: () => JSX.Element, renderReceiverComponent?: () => JSX.Element): JSX.Element | null;
export declare function getItemControlValue(item: QuestionnaireItem): string | undefined;
export declare function getErrorMessage(item: QuestionnaireItem, value: string, resources: Resources | undefined, containedResources: Resource[] | undefined): string;
export declare function isAllowedValue(item: QuestionnaireItem, value: string | undefined, containedResources: Resource[] | undefined, resources: Resources | undefined): boolean;
export declare function validateInput(item: QuestionnaireItem, value: string | undefined, containedResources: Resource[] | undefined, resources: Resources | undefined): boolean;
export declare function getIndexOfAnswer(code: string, answer: Array<QuestionnaireResponseItemAnswer> | QuestionnaireResponseItemAnswer): number;
export declare function shouldShowExtraChoice(answer: Array<QuestionnaireResponseItemAnswer> | QuestionnaireResponseItemAnswer): boolean;
