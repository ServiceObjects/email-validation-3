using EV3Service;
using System.ServiceModel;

namespace email_validation_3_dot_net.SOAP
{
    /// <summary>
    /// Provides functionality to call the ServiceObjects Email Validation SOAP service's ValidateEmailFull operation,
    /// performing a comprehensive validation of an email address with fallback to a backup endpoint for reliability.
    /// which corrects, validates, and verifies an email address via a full suite of tests and real-time SMTP checks.
    /// </summary>
    public class ValidateEmailFullValidation
    {
        private const string LiveBaseUrl = "https://sws.serviceobjects.com/ev3/api.svc/soap";
        private const string BackupBaseUrl = "https://swsbackup.serviceobjects.com/ev3/api.svc/soap";
        private const string TrialBaseUrl = "https://trial.serviceobjects.com/ev3/api.svc/soap";

        private readonly string _primaryUrl;
        private readonly string _backupUrl;
        private readonly int _timeoutMs;
        private readonly bool _isLive;

        /// <summary>
        /// Initializes a new instance of the <see cref="ValidateEmailFull"/> class, configuring primary and backup URLs based on the environment.
        /// </summary>
        /// <param name="isLive">Indicates whether to use live or trial endpoints.</param>
        /// <exception cref="InvalidOperationException">Thrown if primary or backup URLs are not set.</exception>
        public ValidateEmailFullValidation(bool isLive)
        {
            _timeoutMs = 10000; // Default timeout of 10 seconds
            _isLive = isLive;

            _primaryUrl = isLive ? LiveBaseUrl : TrialBaseUrl;
            _backupUrl = isLive ? BackupBaseUrl : TrialBaseUrl;

            if (string.IsNullOrWhiteSpace(_primaryUrl))
                throw new InvalidOperationException("Primary URL not set.");
            if (string.IsNullOrWhiteSpace(_backupUrl))
                throw new InvalidOperationException("Backup URL not set.");
        }

        /// <summary>
        /// Asynchronously calls the ServiceObjects Email Validation SOAP endpoint to perform a comprehensive validation of an email address.
        /// Attempts the primary endpoint first and falls back to the backup endpoint if the primary call fails or returns a fatal error (Error.TypeCode == "3").
        /// Enforces a timeout to prevent hangs.
        /// </summary>
        /// <param name="EmailAddress">The email address to validate (e.g., "example@domain.com").</param>
        /// <param name="LicenseKey">The license key for accessing the service.</param>
        /// <returns>A <see cref="Task{ValidateEmailResponse}"/> containing email validation details or an error.</returns>
        /// <exception cref="Exception">Thrown if both primary and backup endpoints fail.</exception>
        public async Task<ValidateEmailResponse> ValidateEmailFull(string EmailAddress, string LicenseKey)
        {
            EV3LibraryClient clientPrimary = null;
            EV3LibraryClient clientBackup = null;

            try
            {
                clientPrimary = new EV3LibraryClient();
                clientPrimary.Endpoint.Address = new EndpointAddress(_primaryUrl);
                clientPrimary.InnerChannel.OperationTimeout = TimeSpan.FromMilliseconds(_timeoutMs);

                ValidateEmailResponse response = await clientPrimary.ValidateEmailFullAsync(EmailAddress, LicenseKey).ConfigureAwait(false);

                if (_isLive && !IsValid(response))
                {
                    throw new InvalidOperationException("Primary endpoint returned null or a fatal TypeCode=3 error for ValidateEmailFull");
                }
                return response;
            }
            catch (Exception primaryEx)
            {
                try
                {
                    clientBackup = new EV3LibraryClient();
                    clientBackup.Endpoint.Address = new EndpointAddress(_backupUrl);
                    clientBackup.InnerChannel.OperationTimeout = TimeSpan.FromMilliseconds(_timeoutMs);

                    return await clientBackup.ValidateEmailFullAsync(
                        EmailAddress, 
                        LicenseKey
                    ).ConfigureAwait(false);
                }
                catch (Exception backupEx)
                {
                    throw new Exception(
                        $"Both primary and backup endpoints failed for ValidateEmailFull.\n" +
                        $"Primary error: {primaryEx.Message}\n" +
                        $"Backup error: {backupEx.Message}");
                }
                finally
                {
                    clientBackup?.Close();
                }
            }
            finally
            {
                clientPrimary?.Close();
            }
        }
        private static bool IsValid(ValidateEmailResponse response) => response?.Error == null || response.Error.TypeCode != "3";
    }
}