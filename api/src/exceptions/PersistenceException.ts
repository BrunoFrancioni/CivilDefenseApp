export default class PersistenceException extends Error {
    constructor(message: string) {
        super(message);
    }
}