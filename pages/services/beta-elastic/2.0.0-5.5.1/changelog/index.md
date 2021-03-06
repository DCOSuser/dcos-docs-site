---
layout: layout.pug
navigationTitle:  Changelog
title: Changelog
menuWeight: 60
excerpt:
featureMaturity:
enterprise: false
---

<!-- This source repo for this topic is https://github.com/mesosphere/dcos-commons -->


# Changelog

## elastic-1.0.11-5.4.0-beta

### Breaking Changes

- Kibana has been removed from the Elastic package, along with the proxylite helper service. Please see the '[Connecting Clients](connecting.md)' section for instructions on how to provision and connect Kibana on DC/OS. 

### Improvements/Features

- Added an option to toggle installation of commercial X-Pack plugin (disabled by default).
- Increased ingest node default RAM to 2GB [(issue: #908)](https://github.com/mesosphere/dcos-commons/issues/908).
- Added a configurable health check user/password to use as Elastic credentials during readiness/health checks.

### Upgrades

- Upgraded to Elastic 5.4.0.
- Upgraded to Support Diagnostics Version 5.12.
- Upgraded to dcos-commons-0.16.0.
