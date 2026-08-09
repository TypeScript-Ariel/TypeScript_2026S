//JSON = JAVA SCRIPT OBJECT NOTATION (each time we create {} we have a new object)
//JSON - can be assigned to a class or to an interface
//but in both - we have to implement all the properties and functions inside the json



//-----------------------interface---------------------------
interface TODO1 {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
    getContent(): string;
}

let t1: TODO1 = {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false,
    "getContent": function (): string {return "I am json content";}
};


//-----------------------class---------------------------
class TODO2 {
    userId: number;
    id: number;
    title: string;
    completed: boolean;

    public getContent(): string {
        return "I am class content";
    }
}

let t2: TODO2 = {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false,
    "getContent": function (): string {return "I am json content";}
};

