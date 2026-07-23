# WOPR Systems Web Security

## Reporting a vulnerability

Email `support@wopr.systems` with the affected URL, reproduction steps, and potential
impact. Do not include secrets or personal data in the initial report.

## Implemented baseline

This public marketing application is reviewed against NIST CSF 2.0 outcomes, relevant
NIST SP 800-53 controls, OWASP ASVS 5.0, and the OWASP Web Security Testing Guide. This
is an engineering baseline, not a claim of certification or organization-wide compliance.

- **Govern / Identify:** source-controlled configuration, explicit staging and production
  indexing controls, locked dependencies, automated route/metadata/mobile checks, and a
  documented production cutover.
- **Protect:** unprivileged runtime user, read-only container root, all Linux capabilities
  dropped, `no-new-privileges`, PID limit, localhost-only origin binding, strict TypeScript,
  restrictive response headers, no third-party fonts or browser scripts, and exact framework
  versions with transitive security overrides.
- **Detect:** container health checks, bounded Docker JSON logs, and external availability
  checks at the proxy layer.
- **Respond / Recover:** source and image backups are captured before deployment, and the
  deployment script automatically rolls the preview back if build or health verification fails.

## Verification commands

```sh
npm ci
npm test
npm run build
npm audit --audit-level=moderate
SITE_AUDIT_URL=https://preview.wopr.systems npm run audit:site
MOBILE_AUDIT_URL=https://preview.wopr.systems npm run audit:mobile
```

The mobile audit covers `/`, `/why`, and `/join` at 320, 360, 375, 390, 412, and 768 CSS
pixels. It checks horizontal overflow and opens both the global and local navigation on
every route.

## Production cutover

Preview must remain `SITE_URL=https://preview.wopr.systems` and `ALLOW_INDEXING=false`.
For the production image, build with `SITE_URL=https://wopr.systems` and
`ALLOW_INDEXING=true`, then verify canonical URLs, `robots.txt`, `sitemap.xml`, redirects,
and the production checkout flow before changing traffic.

## Residual organizational controls

NIST and OWASP alignment extends beyond this container. Credential rotation, MFA and access
reviews, alert routing, incident-response exercises, restore tests, supplier review, periodic
penetration testing, and evidence retention must be managed as ongoing operational controls.
