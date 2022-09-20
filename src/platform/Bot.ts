interface Bot{
    nlp_processor:NLPProcessor
    intent_recognizer:IntentRecognizer
    run():void;
}