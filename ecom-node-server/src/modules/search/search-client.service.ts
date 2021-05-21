import { AppSearchRequestService } from "./search-request.service";
import jwt from 'jsonwebtoken'
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppSearchClient {
  private client: AppSearchRequestService;
  private engine: string;

  constructor(config: ConfigOptions) {
    this.client = new AppSearchRequestService(config.apiKey, config.endpoint);
    this.engine = config.engine;
  }

  /**
   * Takes a paging object in the format {current, page} and 
   * converts it to an array of query string parameters, like
   * ['page[current]=1', 'page[size]=10']
   */
  buildPagingParams(options) {
    return Object.keys(options)
      .map((key) => {
        const value = options[key];
        if (!value) return null;
        return `page[${key}]=${value}`;
      })
      .filter((v) => v);
  }

  /**
   * Send a search request to the App Search Api
   * https://swiftype.com/documentation/app-search/api/overview
   *
   * @param {String} engineName unique Engine name
   * @param {String} query String that is used to perform a search request.
   * @param {Object} options Object used for configuring the search like search_fields and result_fields
   * @returns {Promise<Object>} a Promise that returns a result {Object} when resolved, otherwise throws an Error.
   */
  search(query, options = {}) {
    options = Object.assign({}, options, { query });
    return this.client.get(
      `engines/${encodeURIComponent(this.engine)}/search`,
      options,
    );
  }

  /**
   * Run multiple searches for documents on a single request
   *
   * @param {String} engineName unique Engine name
   * @param {Array} searches Searches to execute, [{query: String, options: Object}]
   * @returns {Promise<Object>} a Promise that returns an array of results {Object} when resolved, otherwise throws an Error.
   */
  multiSearch(searches) {
    searches = searches.map((search) => {
      return Object.assign({}, search.options, { query: search.query });
    });

    return this.client.post(
      `engines/${encodeURIComponent(this.engine)}/multi_search`,
      {
        queries: searches,
      },
    );
  }

  /**
   * Sends a query suggestion request to the App Search Api
   *
   * @param {String} engineName unique Engine name
   * @param {String} query String that is used to perform a query suggestion request.
   * @param {Object} options Object used for configuring the request
   */
  querySuggestion(query, options = {}) {
    options = Object.assign({}, options, { query });
    return this.client.post(
      `engines/${encodeURIComponent(this.engine)}/query_suggestion`,
      options,
    );
  }

  /**
   * Index a document.
   *
   * @param {String} engineName unique Engine name
   * @param {Object} document document object to be indexed.
   * @returns {Promise<Object>} a Promise that returns a result {Object} when resolved, otherwise throws an Error.
   */
  indexDocument(document) {
    return this.indexDocuments([document]).then((processedDocumentResults) => {
      return new Promise((resolve, reject) => {
        const processedDocumentResult = processedDocumentResults[0];
        const errors = processedDocumentResult['errors'];
        if (errors.length) {
          reject(new Error(errors.join('; ')));
        }
        delete processedDocumentResult['errors'];
        resolve(processedDocumentResult);
      });
    });
  }

  /**
   * Index a batch of documents.
   *
   * @param {String} engineName unique Engine name
   * @param {Array<Object>} documents Array of document objects to be indexed.
   * @returns {Promise<Array<Object>>} a Promise that returns a result {Object} when resolved, otherwise throws an Error.
   */
  indexDocuments(documents) {
    return this.client.post(
      `engines/${encodeURIComponent(this.engine)}/documents`,
      documents,
    );
  }

  /**
   * Partial update a batch of documents.
   *
   * @param {String} engineName unique Engine name
   * @param {Array<Object>} documents Array of document objects to be updated.
   * @returns {Promise<Array<Object>>} a Promise that returns an array of status objects, otherwise throws an Error.
   */
  updateDocuments(documents) {
    return this.client.patch(
      `engines/${encodeURIComponent(this.engine)}/documents`,
      documents,
    );
  }

  /**
   * List all documents
   *
   * @param {String} engineName unique Engine name
   * @param {Object} options see the <a href="https://swiftype.com/documentation/app-search/api/documents#list">App Search API</a> for supported search options
   * @returns {Promise<Array<Object>>} a Promise that returns an array of documents, otherwise throws an Error.
   */
  listDocuments(options: QueryOptions = {}) {
    const pagingParams = this.buildPagingParams(options.page || {});
    const prefix = pagingParams.length ? '?' : '';

    return this.client.get(
      `engines/${encodeURIComponent(
        this.engine,
      )}/documents/list${prefix}${pagingParams.join('&')}`,
      {},
    );
  }

  /**
   * Retrieve a batch of documents.
   *
   * @param {String} engineName unique Engine name
   * @param {Array<String>} ids Array of document ids to be retrieved
   * @returns {Promise<Array<Object>>} a Promise that returns an array of documents, otherwise throws an Error.
   */
  getDocuments(ids) {
    return this.client.get(
      `engines/${encodeURIComponent(this.engine)}/documents`,
      { ids },
    );
  }

  /**
   * Destroy a batch of documents.
   *
   * @param {String} engineName unique Engine name
   * @param {Array<String>} ids Array of document ids to be destroyed
   * @returns {Promise<Object>} a Promise that returns a result {Object} when resolved, otherwise throws an Error. Includes "result" keys to maintain backward compatibility.
   */
  destroyDocuments(ids) {
    return this.client
      .delete(`engines/${encodeURIComponent(this.engine)}/documents`, { ids })
      .then((response: any[]) => {
        response.forEach((docResult) => {
          docResult.result = docResult.deleted;
        });
        return response;
      });
  }

  /**
   * List all engines
   *
   * @returns {Promise<Object>} a Promise that returns a result {Object} when resolved, otherwise throws an Error.
   */
  listEngines(options: QueryOptions = {}) {
    const pagingParams = this.buildPagingParams(options.page || {});
    const prefix = pagingParams.length ? '?' : '';

    return this.client.get(`engines${prefix}${pagingParams.join('&')}`, {});
  }

  /**
   * Retrieve an engine by name
   *
   * @param {String} engineName unique Engine name
   * @returns {Promise<Object>} a Promise that returns a result {Object} when resolved, otherwise throws an Error.
   */
  getEngine(engineName) {
    return this.client.get(`engines/${encodeURIComponent(this.engine)}`, {});
  }

  /**
   * Create a new engine
   *
   * @param {String} engineName unique Engine name
   * @param {Object} options
   * @returns {Promise<Object>} a Promise that returns a result {Object} when resolved, otherwise throws an Error.
   */
  createEngine(options) {
    return this.client.post(`engines`, {
      name: this.engine,
      ...options,
    });
  }

  /**
   * Add a Source Engine to a Meta Engine
   *
   * @param {String} engineName Name of Meta Engine
   * @param {Array[String]} sourceEngines Names of Engines to use as Source Engines
   * @returns {Promise<Object>} a Promise that returns a result {Object} when resolved, otherwise throws an Error.
   */
  addMetaEngineSources(sourceEngines) {
    return this.client.post(
      `engines/${this.engine}/source_engines`,
      sourceEngines,
    );
  }

  /**
   * Remove a Source Engine from a Meta Engine
   *
   * @param {String} engineName Name of Meta Engine
   * @param {Array[String]} sourceEngines Names of existing Source Engines to remove
   * @returns {Promise<Object>} a Promise that returns a result {Object} when resolved, otherwise throws an Error.
   */
  deleteMetaEngineSources(sourceEngines) {
    return this.client.delete(
      `engines/${this.engine}/source_engines`,
      sourceEngines,
    );
  }

  /**
   * Delete an engine
   *
   * @param {String} engineName unique Engine name
   * @returns {Promise<Object>} a Promise that returns a result {Object} when resolved, otherwise throws an Error.
   */
  destroyEngine(engineName) {
    return this.client.delete(`engines/${encodeURIComponent(this.engine)}`, {});
  }

  /**
   * List all Curations
   *
   * @param {String} engineName unique Engine name
   * @returns {Promise<Object>} a Promise that returns a result {Object} when resolved, otherwise throws an Error.
   */
  listCurations(options: QueryOptions = {}) {
    const pagingParams = this.buildPagingParams(options.page || {});
    const prefix = pagingParams.length ? '?' : '';

    return this.client.get(
      `engines/${encodeURIComponent(
        this.engine,
      )}/curations${prefix}${pagingParams.join('&')}`,
      {},
    );
  }

  /**
   * Retrieve a Curation by id
   *
   * @param {String} engineName unique Engine name
   * @param {String} curationId unique Curation id
   * @returns {Promise<Object>} a Promise that returns a result {Object} when resolved, otherwise throws an Error.
   */
  getCuration(curationId) {
    return this.client.get(
      `engines/${encodeURIComponent(
        this.engine,
      )}/curations/${encodeURIComponent(curationId)}`,
      {},
    );
  }

  /**
   * Create a new Curation
   *
   * @param {String} engineName unique Engine name
   * @param {Object} newCuration body of the Curation object
   * @returns {Promise<Object>} a Promise that returns a result {Object} when resolved, otherwise throws an Error.
   */
  createCuration(newCuration) {
    return this.client.post(
      `engines/${encodeURIComponent(this.engine)}/curations`,
      newCuration,
    );
  }

  /**
   * Update an existing curation
   *
   * @param {String} engineName unique Engine name
   * @param {String} curationId unique Curation id
   * @param {Object} newCuration body of the Curation object
   * @returns {Promise<Object>} a Promise that returns a result {Object} when resolved, otherwise throws an Error.
   */
  updateCuration(curationId, newCuration) {
    return this.client.put(
      `engines/${encodeURIComponent(
        this.engine,
      )}/curations/${encodeURIComponent(curationId)}`,
      newCuration,
    );
  }

  /**
   * Create a new meta engine
   *
   * @param {String} engineName unique Engine name
   * @param {Array[String]} sourceEngines list of engine names to use as source engines
   * @returns {Promise<Object>} a Promise that returns a result {Object} when resolved, otherwise throws an Error.
   */
  createMetaEngine(sourceEngines) {
    return this.client.post(`engines`, {
      name: this.engine,
      type: 'meta',
      source_engines: sourceEngines,
    });
  }

  /**
   * Delete a curation
   *
   * @param {String} engineName unique Engine name
   * @param {String} curationId unique Curation name
   * @returns {Promise<Object>} a Promise that returns a result {Object} when resolved, otherwise throws an Error.
   */
  destroyCuration(curationId) {
    return this.client.delete(
      `engines/${encodeURIComponent(
        this.engine,
      )}/curations/${encodeURIComponent(curationId)}`,
      {},
    );
  }

  /**
   * Retrieve a schema by engine name
   *
   * @param {String} engineName unique Engine name
   * @returns {Promise<Object>} a Promise that returns the current schema {Object} when resolved, otherwise throws an Error.
   */
  getSchema(engineName) {
    return this.client.get(
      `engines/${encodeURIComponent(this.engine)}/schema`,
      {},
    );
  }

  /**
   * Update an existing schema
   *
   * @param {String} engineName unique Engine name
   * @param {Object} schema body of schema object
   * @returns {Promise<Object>} a Promise that returns the current schema {Object} when resolved, otherwise throws an Error.
   */
  updateSchema(schema) {
    return this.client.post(
      `engines/${encodeURIComponent(this.engine)}/schema`,
      schema,
    );
  }

  /**
   * Creates a jwt search key that can be used for authentication to enforce a set of required search options.
   *
   * @param {String} apiKey the API Key used to sign the search key
   * @param {String} apiKeyName the unique name for the API Key
   * @param {Object} options Object see the <a href="https://swiftype.com/documentation/app-search/authentication#signed">App Search API</a> for supported search options
   * @returns {String} jwt search key
   */
  static createSignedSearchKey(apiKey, apiKeyName, options = {}) {
    const payload = Object.assign({}, options, { api_key_name: apiKeyName });
    return jwt.sign(payload, apiKey, {
      algorithm: SIGNED_SEARCH_TOKEN_JWT_ALGORITHM,
    });
  }
}
