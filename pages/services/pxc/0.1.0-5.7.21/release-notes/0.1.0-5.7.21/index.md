---
layout: layout.pug
navigationTitle: 0.1.0-5.7.21
title: Release Notes
menuWeight: 10
excerpt: Release Notes for version 0.1.0-5.7.21
featureMaturity:
enterprise: false
model: /services/pxc/data.yml
render: mustache
---



## Version 0.1.0-5.7.21

This is the first release of the DC/OS {{ model.techName }} service. The  latest stable release version of {{ model.techName }} installation will be supported on DCOS cluster 1.09 and above. This has been built using the current stable version of SDK (Version 0.40.2).

### Breaking Changes

This is a first release and you must perform a fresh install. You cannot upgrade to version x.x.x from x x.x.x version of the package. 

### Improvements

Based on the latest stable release of the dcos-commons SDK (Version 0.42.0), this installation provides numerous benefits:

- Integration with DC/OS features such as virtual networking and DC/OS access controls
- Orchestrated software and configuration update, ability to add new nodes, increase memory and CPU. Installation on a DCOS cluster provides the ability to restart and replace nodes.
- Placement constraints for pods.
- Uniform user experience across all {{ model.techAcronym }} cluster nodes.
- SSL Authentication and Data at Rest encryption
- PAM with OpenLDAP Authentication
- Foldered Installation
- Backup to and restore from all S3-compatible support

### Bug Fixes

This is the first release to the DC/OS Universe. Reported bugs will be fixed in subsequent releases.

### Documentation

Released first version of service guide.