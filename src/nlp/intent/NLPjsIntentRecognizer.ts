import { dockStart } from '@nlpjs/basic';

export class NLPjsIntentRecognizer implements IntentRecognizer{

    private modelTrained:boolean

    constructor(){
        this.modelTrained=false;
    }
    async guessIntent(question: string):Promise<string> {
        let dock = await dockStart({ use: ['Basic']});
        const nlp = dock.get('nlp');
        if(!this.modelTrained){
            await nlp.addCorpus(process.env.NLPJS_CORPUS_PATH);
            await nlp.train();
            this.modelTrained=true;
        }
        var intentObj = await nlp.process('en', question);
        let bestIntent = intentObj.classifications[0].intent;
        console.log(bestIntent)
        return bestIntent;
    }
}