import * as dotenv from 'dotenv';
import { QAnswerProcessor } from './nlp/processor/QAnswerProcessor';
import { ArgsHandler } from './platform/utils/ArgsHandler';


function run(){
    dotenv.config()
    let argsHandler = new ArgsHandler();
    argsHandler.handleArgs();
}



run();