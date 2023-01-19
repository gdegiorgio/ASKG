import { KGBroker } from "../kg/KGBroker";

export interface Bot{
    nlp_processor:NLPProcessor
    intent_recognizer:IntentRecognizer
    kg_broker:KGBroker
    run():void;
}