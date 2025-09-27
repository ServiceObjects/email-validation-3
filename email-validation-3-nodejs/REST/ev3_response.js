export class ErrorModel {
    constructor(data = {}) {
        this.Type = data.Type;
        this.TypeCode = data.TypeCode;
        this.Desc = data.Desc;
        this.DescCode = data.DescCode;
        this.Number = data.Number;
    }

    toString() {
        return `Error: Type = ${this.Type}, TypeCode = ${this.TypeCode}, Desc = ${this.Desc}, DescCode = ${this.DescCode}`;
    }
}

export class ValidateEmailInfo {
    constructor(data = {}) {
        this.Score = data.Score;
        this.IsDeliverable = data.IsDeliverable;
        this.EmailAddressIn = data.EmailAddressIn;
        this.EmailAddressOut = data.EmailAddressOut;
        this.EmailCorrected = data.EmailCorrected;
        this.Box = data.Box;
        this.Domain = data.Domain;
        this.TopLevelDomain = data.TopLevelDomain;
        this.TopLevelDomainDescription = data.TopLevelDomainDescription;
        this.IsSMTPServerGood = data.IsSMTPServerGood;
        this.IsCatchAllDomain = data.IsCatchAllDomain;
        this.IsSMTPMailBoxGood = data.IsSMTPMailBoxGood;
        this.WarningCodes = data.WarningCodes;
        this.WarningDescriptions = data.WarningDescriptions;
        this.NotesCodes = data.NotesCodes;
        this.NotesDescriptions = data.NotesDescriptions;
        this.Error = data.Error ? new Error(data.Error) : null;
    }

    toString() {
        const error = this.Error ? this.Error.toString() : "None";
        return `ValidateEmailInfo: Score = ${this.Score}, IsDeliverable = ${this.IsDeliverable}, ` +
            `EmailAddressIn = ${this.EmailAddressIn}, EmailAddressOut = ${this.EmailAddressOut}, ` +
            `EmailCorrected = ${this.EmailCorrected}, Box = ${this.Box}, Domain = ${this.Domain}, ` +
            `TopLevelDomain = ${this.TopLevelDomain}, TopLevelDomainDescription = ${this.TopLevelDomainDescription}, ` +
            `IsSMTPServerGood = ${this.IsSMTPServerGood}, IsCatchAllDomain = ${this.IsCatchAllDomain}, ` +
            `IsSMTPMailBoxGood = ${this.IsSMTPMailBoxGood}, WarningCodes = ${this.WarningCodes}, ` +
            `WarningDescriptions = ${this.WarningDescriptions}, NotesCodes = ${this.NotesCodes}, ` +
            `NotesDescriptions = ${this.NotesDescriptions}, Error = ${error}`;
    }
}

export class EV3Response {
    constructor(data = {}) {
        this.LicenseKey = data.LicenseKey;
        this.EmailAddress = data.EmailAddress;
        this.AllowCorrections = data.AllowCorrections;
        this.ValidateEmailInfo = data.ValidateEmailInfo ? new ValidateEmailInfo(data.ValidateEmailInfo) : null;
        this.Error = data.Error ? new Error(data.Error) : null;
    }

    toString() {
        const validateEmailInfo = this.ValidateEmailInfo ? this.ValidateEmailInfo.toString() : "None";
        const error = this.Error ? this.Error.toString() : "None";
        return `EV3Response: LicenseKey = ${this.LicenseKey}, EmailAddress = ${this.EmailAddress}, ` +
            `AllowCorrections = ${this.AllowCorrections}, ValidateEmailInfo = ${validateEmailInfo}, Error = ${error}`;
    }
}

export default EV3Response;