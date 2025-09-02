using System.Runtime.Serialization;

namespace email_validation_3_dot_net.REST
{
    /// <summary>
    /// Represents the combined request and response data for performing comprehensive
    /// email address validation using the Email Validation 3 REST API.
    /// </summary>
    [DataContract]
    public class EV3Response
    {
        public string LicenseKey { get; set; }
        public string EmailAddress { get; set; }
        public string AllowCorrections { get; set; }
        public ValidateEmailInfo ValidateEmailInfo { get; set; }
        public Error Error { get; set; }
    }

    /// <summary>
    /// Represents the detailed results of any email validation operation in the Email Validation 3 REST API.
    /// </summary>
    [DataContract]
    public class ValidateEmailInfo
    {
        public int Score { get; set; }
        public string IsDeliverable { get; set; }
        public string EmailAddressIn { get; set; }
        public string EmailAddressOut { get; set; }
        public bool EmailCorrected { get; set; }
        public string Box { get; set; }
        public string Domain { get; set; }
        public string TopLevelDomain { get; set; }
        public string TopLevelDomainDescription { get; set; }
        public string IsSMTPServerGood { get; set; }
        public string IsCatchAllDomain { get; set; }
        public string IsSMTPMailBoxGood { get; set; }
        public string WarningCodes { get; set; }
        public string WarningDescriptions { get; set; }
        public string NotesCodes { get; set; }
        public string NotesDescriptions { get; set; }
        public Error Error { get; set; }
        public override string ToString()
        {
            string error = Error != null ? Error.ToString() : "None";
            return $"ValidateEmailInfo: Score = {Score}, IsDeliverable = {IsDeliverable}, " +
                   $"EmailAddressIn = {EmailAddressIn}, EmailAddressOut = {EmailAddressOut}, " +
                   $"EmailCorrected = {EmailCorrected}, Box = {Box}, Domain = {Domain}, " +
                   $"TopLevelDomain = {TopLevelDomain}, TopLevelDomainDescription = {TopLevelDomainDescription}, " +
                   $"IsSMTPServerGood = {IsSMTPServerGood}, IsCatchAllDomain = {IsCatchAllDomain}, " +
                   $"IsSMTPMailBoxGood = {IsSMTPMailBoxGood}, WarningCodes = {WarningCodes}, " +
                   $"WarningDescriptions = {WarningDescriptions}, NotesCodes = {NotesCodes}, " +
                   $"NotesDescriptions = {NotesDescriptions}, Error = {error}";
        }
    }
    /// <summary>
    /// Represents error information in the Lead Validation International REST API response.
    /// </summary>
    [DataContract]
    public class Error
    {
        public string Type { get; set; }
        public string TypeCode { get; set; }
        public string Desc { get; set; }
        public string DescCode { get; set; }

        public override string ToString()
        {
            return $"Error: Type = {Type}, TypeCode = {TypeCode}, Desc = {Desc}, DescCode = {DescCode}";
        }
    }
}