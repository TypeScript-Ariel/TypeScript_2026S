
type emailType = `${string}@${string}.com`

export interface User {
    name: string;
    lastName: string;
    email: emailType;
    password: string;
    userName: string;

}