from dataclasses import dataclass
from typing import Optional


@dataclass
class Error:
    Type: Optional[str] = None
    TypeCode: Optional[str] = None
    Desc: Optional[str] = None
    DescCode: Optional[str] = None
    Number: Optional[str] = None

    def __str__(self) -> str:
        return (f"Error: Type={self.Type}, TypeCode={self.TypeCode}, "
                f"Desc={self.Desc}, DescCode={self.DescCode}")


@dataclass
class ValidateEmailInfo:
    Score: Optional[str] = None
    IsDeliverable: Optional[str] = None
    EmailAddressIn: Optional[str] = None
    EmailAddressOut: Optional[str] = None
    EmailCorrected: Optional[str] = None
    Box: Optional[str] = None
    Domain: Optional[str] = None
    TopLevelDomain: Optional[str] = None
    TopLevelDomainDescription: Optional[str] = None
    IsSMTPServerGood: Optional[str] = None
    IsCatchAllDomain: Optional[str] = None
    IsSMTPMailBoxGood: Optional[str] = None
    WarningCodes: Optional[str] = None
    WarningDescriptions: Optional[str] = None
    NotesCodes: Optional[str] = None
    NotesDescriptions: Optional[str] = None
    Error: Optional['Error'] = None

    def __str__(self) -> str:
        error = str(self.Error) if self.Error else "None"
        return (f"ValidateEmailInfo: Score={self.Score}, IsDeliverable={self.IsDeliverable}, "
                f"EmailAddressIn={self.EmailAddressIn}, EmailAddressOut={self.EmailAddressOut}, "
                f"EmailCorrected={self.EmailCorrected}, Box={self.Box}, Domain={self.Domain}, "
                f"TopLevelDomain={self.TopLevelDomain}, TopLevelDomainDescription={self.TopLevelDomainDescription}, "
                f"IsSMTPServerGood={self.IsSMTPServerGood}, IsCatchAllDomain={self.IsCatchAllDomain}, "
                f"IsSMTPMailBoxGood={self.IsSMTPMailBoxGood}, WarningCodes={self.WarningCodes}, "
                f"WarningDescriptions={self.WarningDescriptions}, NotesCodes={self.NotesCodes}, "
                f"NotesDescriptions={self.NotesDescriptions}, Error={error}")


@dataclass
class EV3Response:
    LicenseKey: Optional[str] = None
    EmailAddress: Optional[str] = None
    AllowCorrections: Optional[str] = None
    ValidateEmailInfo: Optional['ValidateEmailInfo'] = None
    Error: Optional['Error'] = None

    def __str__(self) -> str:
        validate_email_info = str(self.ValidateEmailInfo) if self.ValidateEmailInfo else "None"
        error = str(self.Error) if self.Error else "None"
        return (f"EV3Response: LicenseKey={self.LicenseKey}, EmailAddress={self.EmailAddress}, "
                f"AllowCorrections={self.AllowCorrections}, ValidateEmailInfo={validate_email_info}, Error={error}")
