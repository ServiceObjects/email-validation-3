import requests  # HTTP client for RESTful API calls
from ev3_response import EV3Response, Error, ValidateEmailInfo

# Endpoint URLs for EV3 ValidateEmailAddress REST API
primary_url = "https://sws.serviceobjects.com/ev3/web.svc/JSON/ValidateEmailAddress?"
backup_url = "https://swsbackup.serviceobjects.com/ev3/web.svc/JSON/ValidateEmailAddress?"
trial_url = "https://trial.serviceobjects.com/ev3/web.svc/JSON/ValidateEmailAddress?"


def validate_email_address(
    email_address: str,
    allow_corrections: str,
    license_key: str,
    timeout: str,
    is_live: bool = True,
    timeout_seconds: int = 15,
) -> EV3Response:
    """
    Call EV3 ValidateEmailAddress API to validate an email address.

    Parameters:
        email_address: Email address to validate.
        allow_corrections: "true" or "false" - whether the API can return a corrected email.
        license_key: Your ServiceObjects license key.
        timeout: Timeout value (in milliseconds) passed to the API.
        is_live: Value to determine whether to use the live or trial servers.
        timeout_seconds: Timeout, in seconds, for the call to the service.

    Returns:
        EV3Response: Parsed JSON response with validation results or error details.
    """

    params = {
        "EmailAddress": email_address,
        "AllowCorrections": allow_corrections,
        "TIMEOUT": timeout,
        "LicenseKey": license_key,
    }

    # Select the base URL: production vs trial
    url = primary_url if is_live else trial_url

    # Attempt primary (or trial) endpoint first
    try:
        response = requests.get(url, params=params, timeout=timeout_seconds)
        response.raise_for_status()
        data = response.json()

        # If API returned an error in JSON payload, trigger fallback
        error = getattr(response, 'Error', None)
        if not (error is None or getattr(error, 'TypeCode', None) != "3"):
            if is_live:
                # Try backup URL
                response = requests.get(backup_url, params=params, timeout=timeout_seconds)
                response.raise_for_status()
                data = response.json()
               
               # If still error, propagate exception
                if "Error" in data:
                    raise RuntimeError(f"EV3 service error: {data['Error']}")
            else:
                # Trial mode error is terminal
                raise RuntimeError(f"EV3 trial error: {data['Error']}")

        # Convert JSON response to EV3Response for structured access
        error = Error(**data.get("Error", {})) if data.get("Error") else None
        validate_info = (
            ValidateEmailInfo(**data.get("ValidateEmailInfo", {}))
            if data.get("ValidateEmailInfo")
            else None
        )

        return EV3Response(
            LicenseKey=data.get("LicenseKey"),
            EmailAddress=data.get("EmailAddress"),
            AllowCorrections=data.get("AllowCorrections"),
            ValidateEmailInfo=validate_info,
            Error=error,
        )

    except requests.RequestException as req_exc:
        # Network or HTTP-level error occurred
        if is_live:
            try:
                # Fallback to backup URL on network failure
                response = requests.get(backup_url, params=params, timeout=timeout_seconds)
                response.raise_for_status()
                data = response.json()
                if "Error" in data:
                    raise RuntimeError(f"EV3 backup error: {data['Error']}") from req_exc

                error = Error(**data.get("Error", {})) if data.get("Error") else None
                validate_info = (
                    ValidateEmailInfo(**data.get("ValidateEmailInfo", {}))
                    if data.get("ValidateEmailInfo")
                    else None
                )

                return EV3Response(
                    LicenseKey=data.get("LicenseKey"),
                    EmailAddress=data.get("EmailAddress"),
                    AllowCorrections=data.get("AllowCorrections"),
                    ValidateEmailInfo=validate_info,
                    Error=error,
                )
            except Exception as backup_exc:
                raise RuntimeError("EV3 service unreachable on both endpoints") from backup_exc
        else:
            raise RuntimeError(f"EV3 trial error: {str(req_exc)}") from req_exc

