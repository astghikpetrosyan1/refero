"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferoContainer = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const form_1 = require("../actions/form");
const newValue_1 = require("../actions/newValue");
const repeat_button_1 = tslib_1.__importDefault(require("../components/formcomponents/repeat/repeat-button"));
const renderForm_1 = tslib_1.__importDefault(require("./renderForm"));
const stepView_1 = tslib_1.__importDefault(require("./stepView"));
const extensions_1 = tslib_1.__importDefault(require("../constants/extensions"));
const index_1 = tslib_1.__importStar(require("../constants/index"));
const itemType_1 = tslib_1.__importDefault(require("../constants/itemType"));
const presentationButtonsType_1 = require("../constants/presentationButtonsType");
const form_2 = require("../reducers/form");
const actionRequester_1 = require("../util/actionRequester");
const extension_1 = require("../util/extension");
const hacks_1 = require("../util/hacks");
const index_2 = require("../util/index");
const questionnaireInspector_1 = require("../util/questionnaireInspector");
const renderContext_1 = require("../util/renderContext");
const scoringCalculator_1 = require("../util/scoringCalculator");
const refero_core_1 = require("../util/refero-core");
const shouldFormBeDisplayedAsStepView_1 = require("../util/shouldFormBeDisplayedAsStepView");
const getTopLevelElements_1 = require("../util/getTopLevelElements");
class Refero extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = (e) => {
            e.preventDefault();
            const { formData, onSubmit } = this.props;
            if (formData && formData.Content && onSubmit) {
                onSubmit(formData.Content);
            }
        };
        this.onSave = () => {
            if (this.props.onSave && this.props.formData && this.props.formData.Content) {
                this.props.onSave(this.props.formData.Content);
            }
        };
        this.onAnswerChange = (newState, _path, item, answer) => {
            if (this.props.onChange && newState.refero.form.FormDefinition.Content && newState.refero.form.FormData.Content) {
                const actionRequester = new actionRequester_1.ActionRequester(newState.refero.form.FormDefinition.Content, newState.refero.form.FormData.Content);
                const questionnaireInspector = new questionnaireInspector_1.QuestionniareInspector(newState.refero.form.FormDefinition.Content, newState.refero.form.FormData.Content);
                this.props.onChange(item, answer, actionRequester, questionnaireInspector);
                for (const action of actionRequester.getActions()) {
                    this.props.dispatch(action);
                }
            }
            this.runScoringCalculator(newState);
        };
        this.runScoringCalculator = (newState) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            if (!this.scoringCalculator && ((_a = this.props.formDefinition) === null || _a === void 0 ? void 0 : _a.Content)) {
                this.scoringCalculator = new scoringCalculator_1.ScoringCalculator(this.props.formDefinition.Content);
            }
            if (!this.scoringCalculator || !((_d = (_c = (_b = newState.refero) === null || _b === void 0 ? void 0 : _b.form) === null || _c === void 0 ? void 0 : _c.FormData) === null || _d === void 0 ? void 0 : _d.Content) || !((_g = (_f = (_e = newState.refero) === null || _e === void 0 ? void 0 : _e.form) === null || _f === void 0 ? void 0 : _f.FormDefinition) === null || _g === void 0 ? void 0 : _g.Content)) {
                return;
            }
            const scores = this.scoringCalculator.calculate(newState.refero.form.FormData.Content);
            const actions = [];
            for (const linkId in scores) {
                const templateItem = this.scoringCalculator.getCachedTotalOrSectionItem(linkId);
                if (!templateItem)
                    continue;
                const extension = (0, extension_1.getQuestionnaireUnitExtensionValue)(templateItem);
                if (!extension)
                    continue;
                const quantity = {
                    unit: extension.display,
                    system: extension.system,
                    code: extension.code,
                };
                const item = (0, refero_core_1.getQuestionnaireDefinitionItem)(linkId, (_h = newState.refero.form.FormDefinition.Content) === null || _h === void 0 ? void 0 : _h.item);
                const itemsAndPaths = (0, refero_core_1.getResponseItemAndPathWithLinkId)(linkId, newState.refero.form.FormData.Content);
                let value = scores[linkId];
                if (item && value != null && !isNaN(value) && isFinite(value)) {
                    const decimalPlacesExtension = (0, extension_1.getExtension)(extensions_1.default.STEP_URL, item);
                    if (decimalPlacesExtension && decimalPlacesExtension.valueInteger != null) {
                        const places = Number(decimalPlacesExtension.valueInteger);
                        value = Number(value === null || value === void 0 ? void 0 : value.toFixed(places));
                    }
                    quantity.value = value;
                }
                for (const itemAndPath of itemsAndPaths) {
                    actions.push((0, newValue_1.newQuantityValue)(itemAndPath.path, quantity, item));
                }
            }
            for (const a of actions) {
                this.props.dispatch(a);
            }
        };
        this.renderSkjema = (pdf) => {
            const { formDefinition, resources } = this.props;
            if (!formDefinition || !formDefinition.Content || !resources) {
                return null;
            }
            if (pdf) {
                return this.renderFormItems(true);
            }
            const presentationButtonsType = (0, extension_1.getPresentationButtonsExtension)(formDefinition.Content);
            const isStepView = (0, shouldFormBeDisplayedAsStepView_1.shouldFormBeDisplayedAsStepView)(formDefinition);
            return (React.createElement("div", { className: this.getButtonClasses(presentationButtonsType, ['page_refero__content']) },
                React.createElement("div", { className: "page_refero__messageboxes" }),
                this.renderForm(isStepView)));
        };
        this.renderForm = (isStepView) => {
            const { formDefinition, resources, authorized, blockSubmit, onSave, onCancel, onSubmit, loginButton, validationSummaryPlacement, submitButtonDisabled, saveButtonDisabled, onFieldsNotCorrectlyFilledOut, onStepChange, } = this.props;
            if (!formDefinition || !resources) {
                return;
            }
            const referoProps = {
                authorized,
                blockSubmit,
                onSave,
                onCancel,
                onSubmit,
                loginButton,
                validationSummaryPlacement,
                submitButtonDisabled,
                saveButtonDisabled,
                onFieldsNotCorrectlyFilledOut,
                onStepChange,
            };
            return (React.createElement(React.Fragment, null, isStepView ? (React.createElement(stepView_1.default, { isAuthorized: authorized, referoProps: referoProps, resources: resources, formItems: this.renderFormItems(), formDefinition: formDefinition, onSave: this.onSave, onSubmit: this.onSubmit, onStepChange: onStepChange })) : (React.createElement(renderForm_1.default, { isAuthorized: authorized, isStepView: false, referoProps: referoProps, resources: resources, formItemsToBeRendered: this.renderFormItems(), onSave: this.onSave, onSubmit: this.onSubmit }))));
        };
        this.state = {
            valid: true,
            validated: false,
            showCancelLightbox: false,
        };
    }
    componentDidMount() {
        this.props.mount();
    }
    componentDidUpdate() {
        (0, hacks_1.IE11HackToWorkAroundBug187484)();
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.questionnaire && nextProps.questionnaire !== this.props.questionnaire) {
            this.props.updateSkjema(nextProps.questionnaire, nextProps.questionnaireResponse, nextProps.language, nextProps.syncQuestionnaireResponse);
        }
    }
    renderFormItems(pdf) {
        const { formDefinition, resources, formData, promptLoginMessage } = this.props;
        if (!formDefinition || !formDefinition.Content || !formDefinition.Content.item) {
            return undefined;
        }
        const contained = formDefinition.Content.contained;
        const renderedItems = [];
        const isNavigatorEnabled = !!(0, extension_1.getNavigatorExtension)(formDefinition.Content);
        let isNavigatorBlindzoneInitiated = false;
        const questionnaireItemArray = (0, shouldFormBeDisplayedAsStepView_1.shouldFormBeDisplayedAsStepView)(formDefinition)
            ? (0, getTopLevelElements_1.getTopLevelElements)(formDefinition)
            : formDefinition.Content.item;
        questionnaireItemArray === null || questionnaireItemArray === void 0 ? void 0 : questionnaireItemArray.map(item => {
            if ((0, index_2.isHiddenItem)(item))
                return [];
            const Comp = (0, index_2.getComponentForItem)(item.type);
            if (!Comp) {
                return undefined;
            }
            let responseItems;
            if (formData) {
                responseItems = (0, refero_core_1.getRootQuestionnaireResponseItemFromData)(item.linkId, formData);
            }
            if (responseItems && responseItems.length > 0) {
                responseItems.forEach((responseItem, index) => {
                    var _a;
                    const repeatButton = item.repeats && (0, index_2.shouldRenderRepeatButton)(item, responseItems, index) ? (React.createElement("div", { className: "page_refero__repeatbutton-wrapper" },
                        React.createElement(repeat_button_1.default, { key: `item_${item.linkId}_add_repeat_item`, resources: this.props.resources, item: item, responseItems: responseItems, parentPath: this.props.path, renderContext: new renderContext_1.RenderContext(), disabled: item.type !== itemType_1.default.GROUP && !responseItem.answer }))) : undefined;
                    const path = (0, refero_core_1.createPathForItem)(this.props.path, item, responseItem, index);
                    if (isNavigatorEnabled && item.type === itemType_1.default.GROUP && !isNavigatorBlindzoneInitiated) {
                        isNavigatorBlindzoneInitiated = true;
                        renderedItems.push(React.createElement("section", { id: index_1.NAVIGATOR_BLINDZONE_ID }));
                    }
                    renderedItems.push(React.createElement(Comp, { language: (_a = formDefinition.Content) === null || _a === void 0 ? void 0 : _a.language, pdf: pdf, includeSkipLink: isNavigatorEnabled && item.type === itemType_1.default.GROUP, promptLoginMessage: promptLoginMessage, key: `item_${responseItem.linkId}_${index}`, id: 'item_' + responseItem.linkId + (0, refero_core_1.createIdSuffix)(path, index, item.repeats), item: item, questionnaire: formDefinition.Content, responseItem: responseItem, answer: (0, refero_core_1.getAnswerFromResponseItem)(responseItem), resources: resources, containedResources: contained, path: path, headerTag: index_1.default.DEFAULT_HEADER_TAG, visibleDeleteButton: (0, refero_core_1.shouldRenderDeleteButton)(item, index), repeatButton: repeatButton, onRequestAttachmentLink: this.props.onRequestAttachmentLink, onOpenAttachment: this.props.onOpenAttachment, onDeleteAttachment: this.props.onDeleteAttachment, uploadAttachment: this.props.uploadAttachment, onRequestHelpButton: this.props.onRequestHelpButton, onRequestHelpElement: this.props.onRequestHelpElement, attachmentErrorMessage: this.props.attachmentErrorMessage, attachmentMaxFileSize: this.props.attachmentMaxFileSize, attachmentValidTypes: this.props.attachmentValidTypes, validateScriptInjection: this.props.validateScriptInjection, onAnswerChange: this.onAnswerChange, renderContext: new renderContext_1.RenderContext(), onRenderMarkdown: this.props.onRenderMarkdown, fetchValueSet: this.props.fetchValueSet, autoSuggestProps: this.props.autoSuggestProps, fetchReceivers: this.props.fetchReceivers }));
                });
            }
        });
        return renderedItems;
    }
    getButtonClasses(presentationButtonsType, defaultClasses) {
        defaultClasses = defaultClasses !== null && defaultClasses !== void 0 ? defaultClasses : [];
        if (presentationButtonsType === presentationButtonsType_1.PresentationButtonsType.None) {
            defaultClasses.push('page_refero__hidden_buttons');
        }
        if (presentationButtonsType === presentationButtonsType_1.PresentationButtonsType.Sticky || (this.props.sticky && !presentationButtonsType)) {
            defaultClasses.push('page_refero__stickybar');
        }
        return defaultClasses.join(' ');
    }
    render() {
        const { resources } = this.props;
        if (!resources) {
            return null;
        }
        return React.createElement(React.Fragment, null, this.renderSkjema(this.props.pdf));
    }
}
function mapStateToProps(state) {
    return {
        formDefinition: (0, form_2.getFormDefinition)(state),
        formData: (0, form_2.getFormData)(state),
    };
}
function mapDispatchToProps(dispatch, props) {
    return {
        updateSkjema: (questionnaire, questionnaireResponse, language, syncQuestionnaireResponse) => {
            dispatch((0, form_1.setSkjemaDefinition)(questionnaire, questionnaireResponse, language, syncQuestionnaireResponse));
        },
        mount: () => {
            if (props.questionnaire) {
                dispatch((0, form_1.setSkjemaDefinition)(props.questionnaire, props.questionnaireResponse, props.language, props.syncQuestionnaireResponse));
            }
        },
        dispatch,
        path: [],
    };
}
const ReferoContainer = (0, react_redux_1.connect)(mapStateToProps, mapDispatchToProps)(Refero);
exports.ReferoContainer = ReferoContainer;
//# sourceMappingURL=index.js.map