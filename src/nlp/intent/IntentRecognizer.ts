interface IntentRecognizer{
    guessIntent(question:string):Promise<string>
}