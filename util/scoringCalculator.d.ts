import { Questionnaire, QuestionnaireItem, QuestionnaireResponse } from '../types/fhir';
export declare class ScoringCalculator {
    private sectionScoreCache;
    private totalScoreCache;
    private totalScoreItem;
    private itemCache;
    constructor(questionnaire: Questionnaire);
    private updateQuestionnaire;
    private traverseQuestionnaire;
    private isOfTypeQuestionnaireItem;
    calculate(questionnaireResponse: QuestionnaireResponse): {
        [linkId: string]: number | undefined;
    };
    private calculateSectionScore;
    private valueOf;
    private valueOfQuestionFhirpathScoreItem;
    private valueOfQuestionScoreItem;
    private valueOfSectionScoreItem;
    private getOptionScore;
    private getAnswerMatch;
    getCachedTotalOrSectionItem(linkId: string): QuestionnaireItem | undefined;
}
