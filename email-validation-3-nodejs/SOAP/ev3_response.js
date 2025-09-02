export class ErrorModel {
    constructor(data = {}) {
        this.Type = data.Type || null;
        this.TypeCode = data.TypeCode || null;
        this.Desc = data.Desc || null;
        this.DescCode = data.DescCode || null;
        this.Number = data.Number || null;
    }

    toString() {
        return `Error: Type = ${this.Type}, TypeCode = ${this.TypeCode}, Desc = ${this.Desc}, DescCode = ${this.DescCode}`;
    }
}

export class ValidateEmailInfo {
    constructor(data = {}) {
        this.Score = data.Score || null;
        this.IsDeliverable = data.IsDeliverable || null;
        this.EmailAddressIn = data.EmailAddressIn || null;
        this.EmailAddressOut = data.EmailAddressOut || null;
        this.EmailCorrected = data.EmailCorrected || null;
        this.Box = data.Box || null;
        this.Domain = data.Domain || null;
        this.TopLevelDomain = data.TopLevelDomain || null;
        this.TopLevelDomainDescription = data.TopLevelDomainDescription || null;
        this.IsSMTPServerGood = data.IsSMTPServerGood || null;
        this.IsCatchAllDomain = data.IsCatchAllDomain || null;
        this.IsSMTPMailBoxGood = data.IsSMTPMailBoxGood || null;
        this.WarningCodes = data.WarningCodes || null;
        this.WarningDescriptions = data.WarningDescriptions || null;
        this.NotesCodes = data.NotesCodes || null;
        this.NotesDescriptions = data.NotesDescriptions || null;
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
        this.LicenseKey = data.LicenseKey || null;
        this.EmailAddress = data.EmailAddress || null;
        this.AllowCorrections = data.AllowCorrections || null;
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