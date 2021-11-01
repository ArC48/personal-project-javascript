import { ErrorMessage, SuccessMessage } from "./shared/interfaces/log.interface";
import { Scenario } from "./shared/interfaces/scenarios.interface";
import {validate} from "./shared/validations/validations";
import { messages } from "./shared/enums/messages.enum";
import { storeType } from "./shared/types/types";


class Transaction{
    constructor(
        public store: storeType = {},
        public logs: Array<ErrorMessage | SuccessMessage> = [],
        public rollbackBool: boolean | null = null
    ){}
    async dispatch(scenario: Scenario[]){
            scenario.forEach((step) => { //validations of scenario objects
                validate(step);
            });
        scenario.sort((a: Scenario, b: Scenario) => a.index - b.index); //sorting indexes of scenario objects
        this.store = {};
        this.logs = [];
        for(let step of scenario){
            try{
                let callingCall = await step.call();
                //creating objects with index, meta, storeBefore objects.
                //creating call obj
                let myObject = {
                index: step.index,
                meta: step.meta,
                storeBefore: step,
                storeAfter: callingCall,
                error: null,
                };
                this.logs.push(myObject); 
                this.store = {};
                // let currentStep = scenario[key];
            }catch(err: any){
                try{
                    //creating object with error property:
                    let errorObj ={
                        index: step.index,
                        meta: step.meta,
                        error: {
                        name: err.name,
                        message: err.message,
                        stack: err.stack,
                        },
                    };
                    //in catch (not scope), available everywhere:
                    this.store = {};
                    this.logs.push(<ErrorMessage>errorObj);
                    if(step.restore){
                        const rollback = await step.restore();
                        let logRollbacked = {
                            index: step.index,
                            meta: step.meta,
                            storeBefore: step,
                            storeAfter: rollback,
                            error: null,
                        };
                        this.store = null;
                        this.logs.push(logRollbacked);
                        let mes = messages.restoreComplete;
                        }
                }catch(error: any){
                    let logRollbacked = {
                    index: step.index,
                    meta: step.meta,
                    error: {
                    name: error.name,
                    message: error.message,
                    stack: error.stack,
                    },
                    };
                    this.store = {};
                    this.logs.push(<ErrorMessage>logRollbacked);
                    this.rollbackBool = true; 
                    break;
                }
            }
        }
        if(this.rollbackBool){
            const lastObj = this.logs[this.logs.length - 1].index;
            for (let i = lastObj - 2; i >= 0; i--) {
            let step = scenario[i];
            try{
                if (!step.restore) {
                    throw new Error("step has no restore function!"); // throwing error in obj has no restore function
                }
                let rollback = await step.restore();
                //call object with bef && aft stores
                let logObj = {
                index: step.index,
                meta: step.meta,
                storeBefore: step,
                storeAfter: rollback,
                error: null,
                };
                this.store = {}; ////
                this.logs.push(logObj);
            }catch(error: any){
                //error object with error property
                let rollbackLog = {
                    index: step.index,
                    meta: step.meta,
                    error: {
                    name: error.name,
                    message: error.message,
                    stack: error.stack,
                    },
                };
                this.store = {};
                this.logs.push(<ErrorMessage>rollbackLog);
                }
            }
        }
    }
}



const scenario = [
    {
        index: 2,
        meta: {
            title: 'Read popular customers',
            description: 'This action is responsible for reading the most popular customers'
        },
				// callback for main execution
        call: async (store: object) => {throw new Error('call not working :()')},
				// callback for rollback
        restore: async (store: object) => {return 'This Step Restored Successfully!'}
    },
    {
        index: 3,
        meta: {
            title: 'Delete customer',
            description: 'This action is responsible for deleting customer'
        },
				// callback for main execution
        call: async (store: object) => {throw new Error('errr')},
				// callback for rollback
        restore: async (store: object) => {throw new Error('errr')} 
    },
    {
    index: 1,
    meta: {
        title: 'Delete customer',
        description: 'This action is responsible for deleting customer'
    },
            // callback for main execution
    call: async (store: object) => {},
            // callback for rollback
    restore: async (store: object) => {return 'Task Restored Successfully!'}
}
];

const transaction = new Transaction();

(async() => {
    try {
			await transaction.dispatch(scenario);
			const store = transaction.store; // {} | null
			const logs = transaction.logs; // []
            console.log(logs) // []
            console.log(store) // {} | null

    } catch (err: any) {
			// log detailed error
                const e = {
                    name: err.name,
                    message: err.message,
                    stack: err.stack,
                };
    // console.log(e);
    }
})();