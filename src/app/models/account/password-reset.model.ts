export class PasswordResetModel {
    constructor(public NewPassword: string, public ConfirmPassword: string, public Key: string, public Email: string, public Ticks: string) {
    }
}