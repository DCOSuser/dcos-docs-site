const algoliasearch = require('algoliasearch');
const Bluebird = require('bluebird');
const sanitizeHtml = require('sanitize-html');
const extname = require('path').extname;

/**
 * Search indexing for algolia
 */

/**
 * Parses buffer to string and sanitizes html.
 * Removes all contained <pre></pre> tags.
 * Removes all tags and replaces with whitespace.
 * @param {Buffer} buffer
 */
const sanitize = buffer => {
  let string = buffer.toString();
  let parsedString = sanitizeHtml(string, {
    allowedTags: [],
    allowedAttributes: [],
    selfClosing: [],
    nonTextTags: ['style', 'script', 'textarea', 'noscript', 'pre']
  });
  parsedString = parsedString.replace(/\s+/g, ' ');
  if (parsedString.length > 2000) {
    parsedString = parsedString.substring(0, 2000) + '…';
  }
  return parsedString;
};

module.exports = function(options) {
  /**
   * Algolia Configuration
   * @param {Object} options
   * @param {string} options.projectId
   * @param {string} options.privateKey
   * @param {string} options.index
   * @param {boolean} options.clearIndex
   */
  options = options || {};

  for (let parameter of ['projectId', 'privateKey', 'index']) {
    if (!options.hasOwnProperty(parameter)) {
      console.error(`Algolia: "${parameter}" option must be set, skipping indexation`);
      return;
    }
  }

  const client = algoliasearch(options.projectId, options.privateKey);
  const index = client.initIndex(options.index);

  /**
   * Algolia Indexing Settings
   */
  index.setSettings({
    searchableAttributes: ['title', 'contents'],
    attributesForFaceting: ['section', 'product', 'version', 'type'],
    customRanking: ['asc(section)', 'desc(version)']
  });

  return function(files, metalsmith, done) {
    let clearIndex;
    let metadata = metalsmith.metadata();
    if (!metadata) {
      console.error('Metadata must be configured');
      return;
    }
    let hierarchy = metadata.hierarchy;
    if (!hierarchy) {
      console.error('Hierarchy must be configured');
      return;
    }

    if (options.clearIndex === true) {
      clearIndex = new Bluebird(resolve => {
        index.clearIndex(err => {
          if (err) console.error('Algolia: Error while cleaning index:', err);
        });
        resolve();
      });
    } else {
      clearIndex = Bluebird.resolve();
    }

    // Initialize indexing
    clearIndex.then(() => {
      let promises = [];
      let objects = [];
      let indexed = 0;

      // Loop through metalsmith object
      Object.keys(files).forEach(file => {
        if ('.html' != extname(file)) return;

        let pathParts = file.split('/');
        pathParts.pop();

        let fileData = files[file];
        let data = {};

        if (pathParts[0] === 'service-docs') {
          let product;
          data.section = 'Service Docs';
          // If in /service-docs/product/**
          if (pathParts[1]) {
            let productPath = pathParts.slice(0, 2).join('/');
            product = hierarchy.findByPath(productPath).title || '';
            if (product) {
              data.product = product;
            }
          }
          // If in /service-docs/product/version/**
          if (pathParts[2]) {
            let regex = /v[0-9].[0-9](.*)/g;
            let isVersion = regex.test(pathParts[2]);
            if (isVersion) {
              data.version = pathParts[2].substr(1);
            }
          }
        }

        if (pathParts[0] === 'docs') {
          product = 'DC/OS';
          data.section = 'DC/OS Docs';
          data.product = product;
          // If in /docs/*
          if (pathParts[1]) {
            data.version = product + ' ' + pathParts[1];
          }
        }

        let type = false;
        if (fileData.enterprise) type = 'enterprise';
        if (fileData.oss) type = 'oss';

        data.objectID = file;
        data.title = fileData.title;
        data.path = fileData.path;
        data.type = type;
        data.contents = sanitize(fileData.contents);

        if (fileData.excerpt) {
          data.excerpt = fileData.excerpt;
        } else {
          let excerptPath = pathParts.join('/');
          let objectHierarchy = hierarchy.findByPath(excerptPath) || '';
          let excerpt = objectHierarchy.excerpt || '';
          if (objectHierarchy && excerpt) {
            data.excerpt = excerpt;
          }
        }

        objects.push(data);
      });

      for (let object of objects) {
        promises.push(
          new Bluebird(resolve => {
            index.addObject(object, (err, content) => {
              if (err) {
                console.error(`Algolia: Skipped "${object.path}": ${err.message}`);
              } else {
                indexed++;
              }

              resolve();
            });
          })
        );
      }

      Bluebird.all(promises).then(() => {
        done();
      });
    });
  };
};
