class Utils {
    /**
     * generate a random string with a length equal to the given length argument
     * @param {number} length the length of the generated string 
     * @returns {string} a random string of length {length}
     */
    getRandomString(length: number): string {
        let text: string = "";
        let possible: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!$&#@.";
        for (let i: number = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}

export default new Utils();