---
layout: layout.pug
navigationTitle:  Release Notes
title: Release Notes
menuWeight: 120
excerpt:
featureMaturity:
enterprise: false
---

<!-- This source repo for this topic is https://github.com/mesosphere/dcos-jenkins-service -->

# Version 3.5.3-2.150.1

3.5.3-2.150.1 release of DC/OS Jenkins Service.

## Improvements
- Update to version 2.150.1 of Jenkins.
- Set 'keepalive' for NGINX.
- Switch to Spartan addresses for the Mesos Master to make connection to the Mesos leader resilient to failovers.
- Bump all bundled plugins. See [here](https://github.com/mesosphere/dcos-jenkins-service#included-in-this-repo)
