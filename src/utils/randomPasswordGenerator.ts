/* eslint-disable prettier/prettier */
export function generatePassword(length:number) {
    let password = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++)
        password += possible.charAt(Math.floor(Math.random() * possible.length));

    return password;
}
