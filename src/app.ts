import * as dotenv from 'dotenv';
import { ArgsHandler } from './platform/utils/ArgsHandler';


function run(){
    dotenv.config()
    let argsHandler = new ArgsHandler();
    argsHandler.handleArgs();
}



run();