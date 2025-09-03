![Service Objects Logo](https://www.serviceobjects.com/wp-content/uploads/2021/05/SO-Logo-with-TM.gif "Service Objects Logo")

# EV3 - Email Validation 3

DOTS Email Validation 3 (EV3) is a web service that provides validity and metadata information about an email address. The service provides common data elements such as syntax validity along with more refined data such as SMTP failures and deliverability flags.

EV3 can help provide instant email data verification to websites or enhancement to contact lists.

## [Service Objects Website](https://serviceobjects.com)
## [Developer Guide/Documentation](https://www.serviceobjects.com/docs/)

# EV3 - ValidateEmailAddress

ValidateEmailAddress: Validates and verifies an email address via a full suite of tests and real-time SMTP checks. This operation performs real-time server-to-server verification via SMTP communication. This operation allows the user to specify a timeout value, in milliseconds, for how long it can take to perform SMTP level checks. A minimum of 200 milliseconds is required to perform these checks. However, results are dependent on the network speed of an email’s host, which may require several seconds to verify. Average mail server response times are approximately between 2-3 seconds, but some slower mail servers may take 15 seconds or more to verify.

## [ValidateEmailAddress Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-email-validation-3/ev3-operations/ev3-validateemailaddress-recommended/)

## ValidateEmailAddress Request URLs (Query String Parameters)

### JSON
#### Trial

https://trial.serviceobjects.com/ev3/web.svc/json/ValidateEmailAddress?EmailAddress=jrehorik%40serviceobjects.com&AllowCorrections=false&Timeout=4000&LicenseKey={LicenseKey}

#### Production

https://sws.serviceobjects.com/ev3/web.svc/json/ValidateEmailAddress?EmailAddress=jrehorik%40serviceobjects.com&AllowCorrections=false&Timeout=4000&LicenseKey={LicenseKey}

#### Production Backup

https://swsbackup.serviceobjects.com/ev3/web.svc/json/ValidateEmailAddress?EmailAddress=jrehorik%40serviceobjects.com&AllowCorrections=false&Timeout=4000&LicenseKey={LicenseKey}

### XML
#### Trial

https://trial.serviceobjects.com/ev3/web.svc/xml/ValidateEmailAddress?EmailAddress=jrehorik%40serviceobjects.com&AllowCorrections=false&Timeout=4000&LicenseKey={LicenseKey}

#### Production

https://sws.serviceobjects.com/ev3/web.svc/xml/ValidateEmailAddress?EmailAddress=jrehorik%40serviceobjects.com&AllowCorrections=false&Timeout=4000&LicenseKey={LicenseKey}

#### Production Backup

https://swsbackup.serviceobjects.com/ev3/web.svc/xml/ValidateEmailAddress?EmailAddress=jrehorik%40serviceobjects.com&AllowCorrections=false&Timeout=4000&LicenseKey={LicenseKey}

# EV3 - ValidateEmailFull

Corrects, validates and verifies an email address via a full suite of tests and real-time SMTP checks. Since this operation performs real-time verification via SMTP communication the response time is dependent on the network speed of an email’s host and may take several seconds. The average response time for this operation is approximately 2 seconds, but the operation can take as long as 10 seconds.

## [ValidateEmailFull Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-email-validation-3/ev3-operations/ev3-validateemailfull/)

## ValidateEmailFull Request URLs (Query String Parameters)

### JSON
#### Trial

https://trial.serviceobjects.com/ev3/api.svc/ValidateEmailInfo/Full/jrehorik%40serviceobjects.com/{LicenseKey}/?format=json

#### Production

https://sws.serviceobjects.com/ev3/api.svc/ValidateEmailInfo/Full/jrehorik%40serviceobjects.com/{LicenseKey}/?format=json

#### Production Backup

https://swsbackup.serviceobjects.com/ev3/api.svc/ValidateEmailInfo/Full/jrehorik%40serviceobjects.com/{LicenseKey}/?format=json

### XML
#### Trial

https://trial.serviceobjects.com/ev3/api.svc/ValidateEmailInfo/Full/jrehorik%40serviceobjects.com/{LicenseKey}/?format=xml

#### Production

https://sws.serviceobjects.com/ev3/api.svc/ValidateEmailInfo/Full/jrehorik%40serviceobjects.com/{LicenseKey}/?format=xml

#### Production Backup

https://swsbackup.serviceobjects.com/ev3/api.svc/ValidateEmailInfo/Full/jrehorik%40serviceobjects.com/{LicenseKey}/?format=xml

# EV3 - ValidateEmailFast

This operation has the same inputs and outputs as ValidateEmailFull. This check will not perform any real-time SMTP level checks, however it may still provide SMTP level information via one of our other mechanisms.

## [ValidateEmailFast Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-email-validation-3/ev3-operations/ev3-validateemailfast/)

## ValidateEmailFast Request URLs (Query String Parameters)

### JSON
#### Trial

https://trial.serviceobjects.com/ev3/api.svc/ValidateEmailInfo/Fast/jrehorik%40serviceobjects.com/{LicenseKey}/?format=json

#### Production

https://sws.serviceobjects.com/ev3/api.svc/ValidateEmailInfo/Fast/jrehorik%40serviceobjects.com/{LicenseKey}/?format=json

#### Production Backup

https://swsbackup.serviceobjects.com/ev3/api.svc/ValidateEmailInfo/Fast/jrehorik%40serviceobjects.com/{LicenseKey}/?format=json

### XML
#### Trial

https://trial.serviceobjects.com/ev3/api.svc/ValidateEmailInfo/Fast/jrehorik%40serviceobjects.com/{LicenseKey}/?format=xml

#### Production

https://sws.serviceobjects.com/ev3/api.svc/ValidateEmailInfo/Fast/jrehorik%40serviceobjects.com/{LicenseKey}/?format=xml

#### Production Backup

https://swsbackup.serviceobjects.com/ev3/api.svc/ValidateEmailInfo/Fast/jrehorik%40serviceobjects.com/{LicenseKey}/?format=xml

# EV3 - ValidateEmailFullNoCorrections

The same as ValidateEmailFull but the service will not attempt to correctthe email address.

## [ValidateEmailFullNoCorrections Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-email-validation-3/ev3-operations/ev3-validateemailfullnocorrections/)

## ValidateEmailFullNoCorrections Request URLs (Query String Parameters)

### JSON
#### Trial

https://trial.serviceobjects.com/ev3/api.svc/ValidateEmailInfo/Full/NoCorrections/jrehorik%40serviceobjects.com/{LicenseKey}/?format=json

#### Production

https://sws.serviceobjects.com/ev3/api.svc/ValidateEmailInfo/Full/NoCorrections/jrehorik%40serviceobjects.com/{LicenseKey}/?format=json

#### Production Backup

https://swsbackup.serviceobjects.com/ev3/api.svc/ValidateEmailInfo/Full/NoCorrections/jrehorik%40serviceobjects.com/{LicenseKey}/?format=json

### XML
#### Trial

https://trial.serviceobjects.com/ev3/api.svc/ValidateEmailInfo/Full/NoCorrections/jrehorik%40serviceobjects.com/{LicenseKey}/?format=xml

#### Production

https://sws.serviceobjects.com/ev3/api.svc/ValidateEmailInfo/Full/NoCorrections/jrehorik%40serviceobjects.com/{LicenseKey}/?format=xml

#### Production Backup

https://swsbackup.serviceobjects.com/ev3/api.svc/ValidateEmailInfo/Full/NoCorrections/jrehorik%40serviceobjects.com/{LicenseKey}/?format=xml

# EV3 - ValidateEmailFastNoCorrections

The same as ValidateEmailFast but the service will not attempt to correct the email address.

## [ValidateEmailFastNoCorrections Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-email-validation-3/ev3-operations/ev3-validateemailfullnocorrections/)

## ValidateEmailFastNoCorrections Request URLs (Query String Parameters)

### JSON
#### Trial

https://trial.serviceobjects.com/ev3/api.svc/ValidateEmailInfo/Fast/NoCorrections/jrehorik%40serviceobjects.com/{LicenseKey}/?format=json

#### Production

https://sws.serviceobjects.com/ev3/api.svc/ValidateEmailInfo/Fast/NoCorrections/jrehorik%40serviceobjects.com/{LicenseKey}/?format=json

#### Production Backup

https://swsbackup.serviceobjects.com/ev3/api.svc/ValidateEmailInfo/Fast/NoCorrections/jrehorik%40serviceobjects.com/{LicenseKey}/?format=json

### XML
#### Trial

https://trial.serviceobjects.com/ev3/api.svc/ValidateEmailInfo/Fast/NoCorrections/jrehorik%40serviceobjects.com/{LicenseKey}/?format=xml

#### Production

https://sws.serviceobjects.com/ev3/api.svc/ValidateEmailInfo/Fast/NoCorrections/jrehorik%40serviceobjects.com/{LicenseKey}/?format=xml

#### Production Backup

https://swsbackup.serviceobjects.com/ev3/api.svc/ValidateEmailInfo/Fast/NoCorrections/jrehorik%40serviceobjects.com/{LicenseKey}/?format=xml
