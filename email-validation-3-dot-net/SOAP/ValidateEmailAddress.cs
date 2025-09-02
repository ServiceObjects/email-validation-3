using EV3Service;
using System.ServiceModel;

namespace email_validation_3_dot_net.SOAP
{
    /// <summary>
    /// Provides functionality to call the ServiceObjects Email Validation SOAP service's ValidateEmailAddress operation,
    /// validating an email address with options for corrections and timeout, with fallback to a backup endpoint for reliability.
    /// </summary>
    public class ValidateEmailAddressValidation
    {
        private const string LiveBaseUrl = "https://sws.serviceobjects.com/ev3/api.svc/soap";
        private const string BackupBaseUrl = "https://swsbackup.serviceobjects.com/ev3/api.svc/soap";
        private const string TrialBaseUrl = "https://trial.serviceobjects.com/ev3/api.svc/soap";

        private readonly string _primaryUrl;
        private readonly string _backupUrl;
        private readonly int _timeoutMs;
        private readonly bool _isLive;

        /// <summary>
        /// Initializes a new instance of the <see cref="ValidateEmailAddress"/> class, configuring primary and backup URLs based on the environment.
        /// </summary>
        /// <param name="isLive">Indicates whether to use live or trial endpoints.</param>
        /// <exception cref="InvalidOperationException">Thrown if primary or backup URLs are not set.</exception>
        public ValidateEmailAddressValidation(bool isLive)
        {
            _timeoutMs = 10000;
            _isLive = isLive;

            _primaryUrl = isLive ? LiveBaseUrl : TrialBaseUrl;
            _backupUrl = isLive ? BackupBaseUrl : TrialBaseUrl;

            if (string.IsNullOrWhiteSpace(_primaryUrl))
                throw new InvalidOperationException("Primary URL not set.");
            if (string.IsNullOrWhiteSpace(_backupUrl))
                throw new InvalidOperationException("Backup URL not set.");
        }

        /// <summary>
        /// Asynchronously calls the ServiceObjects Email Validation SOAP endpoint to validate an email address.
        /// Attempts the primary endpoint first and falls back to the backup endpoint if the primary call fails or returns a fatal error (Error.TypeCode == "3").
        /// Enforces a timeout to prevent hangs.
        /// </summary>
        /// <param name="emailAddress">The email address to validate (e.g., "example@domain.com").</param>
        /// <param name="allowCorrections">Whether to allow corrections to the email address (e.g., "true" or "false").</param>
        /// <param name="timeout">The timeout duration for the validation request in milliseconds.</param>
        /// <param name="licenseKey">The license key for accessing the service.</param>
        /// <returns>A <see cref="Task{ValidateEmailResponse}"/> containing email validation details or an error.</returns>
        /// <exception cref="Exception">Thrown if both primary and backup endpoints fail.</exception>
        public async Task<ValidateEmailResponse> ValidateEmailAddress(string EmailAddress, string AllowCorrections, string Timeout, string LicenseKey)
        {
            EV3LibraryClient clientPrimary = null;
            EV3LibraryClient clientBackup = null;

            try
            {
                clientPrimary = new EV3LibraryClient();
                clientPrimary.Endpoint.Address = new EndpointAddress(_primaryUrl);
                clientPrimary.InnerChannel.OperationTimeout = TimeSpan.FromMilliseconds(_timeoutMs);

                ValidateEmailResponse response = await clientPrimary.ValidateEmailAddressAsync(
                    EmailAddress, AllowCorrections, Timeout, LicenseKey).ConfigureAwait(false);

                if (_isLive && !IsValid(response))
                {
                    throw new InvalidOperationException("Primary endpoint returned null or a fatal TypeCode=1 error for ValidateEmailAddress");
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

                    return await clientBackup.ValidateEmailAddressAsync(
                        EmailAddress, 
                        AllowCorrections, 
                        Timeout, 
                        LicenseKey
                    ).ConfigureAwait(false);
                }
                catch (Exception backupEx)
                {
                    throw new Exception(
                        $"Both primary and backup endpoints failed for ValidateEmailAddress.\n" +
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