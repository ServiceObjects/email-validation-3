import axios from 'axios';
import { EV3Response } from './ev3_response.js';

/**
 * @constant
 * @type {string}
 * @description The base URL for the live ServiceObjects Email Validation 3 API service.
 */
const LiveBaseUrl = 'https://sws.serviceobjects.com/ev3/api.svc/';

/**
 * @constant
 * @type {string}
 * @description The base URL for the backup ServiceObjects Email Validation 3 API service.
 */
const BackupBaseUrl = 'https://swsbackup.serviceobjects.com/ev3/api.svc/';

/**
 * @constant
 * @type {string}
 * @description The base URL for the trial ServiceObjects Email Validation 3 API service.
 */
const TrialBaseUrl = 'https://trial.serviceobjects.com/ev3/api.svc/';

/**
 * <summary>
 * Checks if a response from the API is valid by verifying that it either has no Error object
 * or the Error.Number is not equal to '3'.
 * </summary>
 * <param name="response" type="Object">The API response object to validate.</param>
 * <returns type="boolean">True if the response is valid, false otherwise.</returns>
 */
const isValid = (response) => !response?.Error || response.Error.TypeCode !== '3';

/**
 * <summary>
 * Constructs a full URL for the ValidateEmailFullNoCorrections API endpoint by combining the base URL
 * with the email address and license key encoded as path parameters, and format as a query parameter.
 * </summary>
 * <param name="input" type="Object">An object containing the input parameters (email address and license key).</param>
 * <param name="baseUrl" type="string">The base URL for the API service (live, backup, or trial).</param>
 * <returns type="string">The constructed URL with path and query parameters.</returns>
 */
const buildUrl = (input, baseUrl) =>
    `${baseUrl}JSON/ValidateEmailInfo/Full/NoCorrections/${encodeURIComponent(input.EmailAddress)}/` +
    `${encodeURIComponent(input.LicenseKey)}?format=json`;

/**
 * <summary>
 * Performs an HTTP GET request to the specified URL with a given timeout.
 * </summary>
 * <param name="url" type="string">The URL to send the GET request to.</param>
 * <param name="timeoutSeconds" type="number">The timeout duration in seconds for the request.</param>
 * <returns type="Promise<EV3Response>">A promise that resolves to an EV3Response object containing the API response data.</returns>
 * <exception cref="Error">Thrown if the HTTP request fails, with a message detailing the error.</exception>
 */
const httpGet = async (url, timeoutSeconds) => {
    try {
        const response = await axios.get(url, { timeout: timeoutSeconds * 1000 });
        return new EV3Response(response.data);
    } catch (error) {
        throw new Error(`HTTP request failed: ${error.message}`);
    }
};

/**
 * <summary>
 * Provides functionality to call the ServiceObjects Email Validation 3 API's ValidateEmailFullNoCorrections endpoint,
 * which validates and verifies an email address via a full suite of tests without attempting any corrections.
 * </summary>
 */
const ValidateEmailFullNoCorrectionsClient = {
    /**
     * <summary>
     * Asynchronously invokes the ValidateEmailFullNoCorrections API endpoint, attempting the primary endpoint
     * first and falling back to the backup if the response is invalid (Error.TypeCode == '3') in live mode.
     * </summary>
     * <param name="emailAddress" type="string">The email address to validate.</param>
     * <param name="licenseKey" type="string">Your license key to use the service.</param>
     * <param name="isLive" type="boolean">Determines whether to use the live or trial service.</param>
     * <param name="timeoutSeconds" type="number">Timeout, in seconds, for the call to the service.</param>
     * <returns type="Promise<EV3Response>">A promise that resolves to an EV3Response object.</returns>
     */
    async invokeAsync(emailAddress, licenseKey, isLive, timeoutSeconds = 15) {
        const input = { EmailAddress: emailAddress, LicenseKey: licenseKey };

        const url = buildUrl(input, isLive ? LiveBaseUrl : TrialBaseUrl);
        let response = await httpGet(url, timeoutSeconds);

        if (isLive && !isValid(response)) {
            const fallbackUrl = buildUrl(input, BackupBaseUrl);
            const fallbackResponse = await httpGet(fallbackUrl, timeoutSeconds);
            return fallbackResponse;
        }

        return response;
    },

    /**
     * <summary>
     * Synchronously invokes the ValidateEmailFullNoCorrections API endpoint by wrapping the async call
     * and awaiting its result immediately.
     * </summary>
     * <param name="emailAddress" type="string">The email address to validate.</param>
     * <param name="licenseKey" type="string">Your license key to use the service.</param>
     * <param name="isLive" type="boolean">Determines whether to use the live or trial service.</param>
     * <param name="timeoutSeconds" type="number">Timeout, in seconds, for the call to the service.</param>
     * <returns type="EV3Response">An EV3Response object with validation details or an error.</returns>
     */
    invoke(emailAddress, licenseKey, isLive, timeoutSeconds = 15) {
        return (async () => await this.invokeAsync(emailAddress, licenseKey, isLive, timeoutSeconds))();
    }
};

export { ValidateEmailFullNoCorrectionsClient, EV3Response };