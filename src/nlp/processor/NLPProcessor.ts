interface NLPProcessor{
    process(question:string):Promise<object[]>
}