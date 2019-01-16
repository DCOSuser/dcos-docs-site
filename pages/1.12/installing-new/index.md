---
layout: layout.pug
title: Installing
menuWeight: 30
excerpt: Installing DC/OS
---

The process of installing DC/OS to be your datacenter operating system consists of starting from a bootstrap node, creating a dynamically configured version of DC/OS,  and installing it onto each node that will form your cluster. This installation file contains a Bash install script and a Docker container that is loaded with everything you need to deploy the customized DC/OS build. The Docker container contains all of the elements for DC/OS so it can even be used for offline installation. Once installed, it typically takes about 10 minutes for DC/OS to finish initializing and build the cluster.

Methods
There are two main methods of installing DC/OS onto your cluster. The terraform installer utilizes cloud provider modules to provision, deploy and maintain your cluster instances according to tested best-practice configurations on the major cloud provider of your choice. If you have an on-prem or privately controlled/owned datacenter, you must ensure the proper infrastructure requirements are met before installing DC/OS to form a cluster. Once your cluster is set up, the process of creating a config and generating the install is simple. This process can be done manually by visiting each node, or scripted to partially automate some of the more mundane tasks.

Eval/Prod
Spinning up a production cluster to take on your workloads begins with the same basic configuration file as a proof of concept or demo would. The only difference is in setting up your infrastructure (1 master vs 5 for example), security and storage settings. DC/OS has defaults that enable it to work with minimal req params.

OpenEdition/Enterprise
Marketing lines about community is important, split along enterprise needs of security, networking, storage
