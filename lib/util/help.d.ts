import { QuestionnaireItem } from '../types/fhir';
export declare function findHelpItem(parent: QuestionnaireItem): QuestionnaireItem | undefined;
export declare function isHelpItem(item: QuestionnaireItem): boolean;
export declare function getHelpItemType(item: QuestionnaireItem): string | undefined;
export declare enum IExtentionType {
    choiceImage = "https://fhir.medlix.org/fhir/StructureDefinition/choiceImage",
    mainImage = "https://fhir.medlix.org/fhir/StructureDefinition/mainImage",
    image = "https://fhir.medlix.org/fhir/StructureDefinition/image"
}
